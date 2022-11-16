import React, {useEffect, useState} from 'react';
import {ModalProps} from "../../../types/global";
import {Order, UndoOrderCase, UndoOrderCaseGrouped} from "../../../types/order";
import {Autocomplete, Box, Button, DialogActions, Fade, Modal, TextField} from "@mui/material";
import {modalStyle} from "../../../assets/components/Modals";
import {OrderService} from "../../../services/OrderService";
import {FlexJustifyCenter} from "../../../assets/components/Shared";


interface GroupedCases {
    type: string,
    reasons: string[]
}

const UndoOrderModal : React.FC<ModalProps & {
    order: Order
}> =
    ({open, setOpen, onClose, onSave, order}) => {

        const loading = open;
        const [error, setError] = useState<string | null>(null);

        const [extraReasonText, setExtraReasonText] = useState<string>('');
        const [type, setType] = useState<string>('');
        const [reason, setReason] = useState<string>('');

        const [undoOrderCase, setUndoOrderCase] = useState<UndoOrderCase | null>(null);

        const [cases, setCases] = useState<UndoOrderCaseGrouped | null>(null);
        const getUndoOrderCases = async () : Promise<UndoOrderCaseGrouped> => {
            const { data } = await OrderService.getUndoOrderCases();
            return data;
        }

        useEffect(() => {
            if(!open) {
                setError(null);
                setType('');
                setReason('');
                setExtraReasonText('')
            }
        }, [open])

        useEffect(() => {
            let active = true;
            if (!loading) {
                return undefined;
            }
            (async () => {
                const caseList = await getUndoOrderCases();
                if (active) {
                    setCases(caseList);
                }
            })();
            return () => {
                active = false;
            };
        }, [loading]);

        const onSaveBtnCLick = () => {
            if(!type || !reason || type === '' || reason === '') {
                setError('fill all needs field')
                return;
            }
            const undoOrderReason = {
                extra_reason_text: extraReasonText,
                orderUndoCase: {
                    type_name: type,
                    reason: reason
                },
                order_id: order.id,
            }
            onSave(undoOrderReason);
            setOpen(false);
        }

        return (
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={onClose}
                    closeAfterTransition
                    BackdropProps={{ timeout: 500 }}>
                    <Fade in={open}>
                        <Box sx={modalStyle}>
                            <h1>Add undo reason</h1>
                            <div>
                                {
                                    cases &&
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-types"
                                        options={Object.keys(cases)}
                                        sx={{ width: 300, my: 2 }}
                                        renderInput={(params) => <TextField {...params} label="Type" />}
                                        onChange={(e: any, value) => {
                                            setType(value ?? '');
                                        }}
                                    />
                                }
                                {
                                    cases && type && type !== '' &&
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-reason"
                                        options={cases[type]}
                                        sx={{ width: 300, my: 2 }}
                                        renderInput={(params) =>
                                            <TextField {...params} label="Reason" />}
                                        onChange={(e: any, value) => {
                                            if(value)
                                                setReason(value);
                                        }}
                                    />
                                }

                                <TextField
                                    id="filled-multiline-flexible"
                                    label="Extra Reason"
                                    multiline
                                    sx={{width: '100%'}}
                                    rows={4}
                                    value={extraReasonText}
                                    onChange={(e: any) =>
                                        setExtraReasonText(e.target.value)}
                                    variant="filled"
                                />
                            </div>

                            <div style={{color: 'red'}}>
                                { error ?? '' }
                            </div>

                            <DialogActions sx={{mt: 2}} >
                                <FlexJustifyCenter sx={{ width: '100%' }}>
                                    <Button onClick={onClose} color="primary">
                                        Cancel
                                    </Button>

                                    <Button
                                        color="primary"
                                        autoFocus
                                        onClick={onSaveBtnCLick}>
                                        Add Reason
                                    </Button>
                                </FlexJustifyCenter>
                            </DialogActions>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        );
};

export default UndoOrderModal;