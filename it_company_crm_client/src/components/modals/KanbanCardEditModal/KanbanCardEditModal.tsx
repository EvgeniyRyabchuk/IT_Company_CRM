import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    DialogActions,
    Fade,
    Hidden,
    MenuItem,
    Modal,
    Select,
    TextareaAutosize,
    TextField
} from "@mui/material";
import {modalStyle, Span, UserMenu} from "../../../assets/components/Modals";
import {KanbanCard} from "../../../types/kanban";
import {Employee} from "../../../types/user";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../../http";
import {ModalProps} from "../../../types/global";


type KanbanCardEditModal = ModalProps & {
    card: KanbanCard | null | undefined;
    owner: Employee | null | undefined;
}

const KanbanCardEditModal : React.FC<KanbanCardEditModal> =
    ({open, setOpen, onClose, card,owner, onSave}) => {

    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [priority, setPriority] = useState<string>('');
    const [color, setColor] = useState<{background: string}>({ background: '#fff'});

    useEffect(() => {
        if(card) {
            setTitle(card.title);
            setDescription(card.description);
            setPriority(card.priority);
            setColor({ background: card.bgcolor});
        }
    }, [card])

    const save = () => {
        if(card)
            onSave({
                title,
                description,
                priority,
                color,
                id: card.id,
                lane_id: card.lane_id
        });
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={onClose}
                closeAfterTransition
                BackdropProps={{ timeout: 500}}>
                <Fade in={open}>
                    <Box sx={modalStyle}>
                        <TextField
                            id="standard-basic"
                            label="Standard"
                            variant="standard"
                            value={title}
                            onChange={(e: any) => setTitle(e.target.value)}
                            fullWidth
                        />
                        <Box sx={{mt: 2}}>
                            <TextareaAutosize
                                maxRows={4}
                                aria-label="maximum height"
                                placeholder="Maximum 4 rows"
                                value={description}
                                style={{ width: '100%', padding: '10px 5px' }}
                                onChange={(e: any) => setDescription(e.target.value)}
                            />
                        </Box>

                        <Box sx={{mt: 2, px: 2,  display: 'flex'}}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={priority}
                                label="Age"
                                onChange={(e: any) => setPriority(e.target.value)}>
                                <MenuItem value={'A'}>A</MenuItem>
                                <MenuItem value={'B'}>B</MenuItem>
                                <MenuItem value={'C'}>C</MenuItem>
                                <MenuItem value={'D'}>D</MenuItem>
                                <MenuItem value={'E'}>E</MenuItem>
                            </Select>

                            <UserMenu>
                                <Hidden xsDown>
                                    <Span>
                                        Owner <strong>{owner?.user.full_name}</strong>
                                    </Span>
                                </Hidden>
                                <Avatar
                                    src={`${API_URL_WITH_PUBLIC_STORAGE}/${owner?.user.avatar}`}
                                    sx={{ cursor: 'pointer' }}
                                />
                            </UserMenu>
                        </Box>

                        <DialogActions sx={{mt: 2}} >
                            <Box style={{width: '100%', display: 'flex', justifyContent: 'center'}} >
                                <Button onClick={() => setOpen(false)} color="primary">
                                    Cancel
                                </Button>

                                <Button onClick={save} color="primary" autoFocus>
                                    OK
                                </Button>
                            </Box>
                        </DialogActions>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default KanbanCardEditModal;