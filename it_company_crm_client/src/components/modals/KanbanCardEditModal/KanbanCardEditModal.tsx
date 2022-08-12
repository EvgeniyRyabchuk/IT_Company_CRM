import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Button, DialogActions,
    Fade, Hidden,
    makeStyles,
    MenuItem,
    Modal,
    Select, styled,
    TextareaAutosize,
    TextField,
    Typography
} from "@mui/material";
import {modalStyle, Span, UserMenu} from "../../../assets/components/Modals";



type KanbanCardEditModal = {
    open: any;
    setOpen: any;
    onClose: any;
    card: any;
    onSave: any;
}


const KanbanCardEditModal : React.FC<KanbanCardEditModal> = ({open, setOpen, onClose, card, onSave}) => {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [priority, setPriority] = useState('');
    const [color, setColor] = useState({ background: '#fff'});



    useEffect(() => {
        if(card) {
            setTitle(card.title);
            setDescription(card.description);
            setPriority(card.priority);
            setColor({ background: card.bgcolor});
        }

    }, [card])

    const save = () => {
        onSave({title, description, priority, color, id: card.id, laneId: card.laneId});
    }


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={onClose}
                closeAfterTransition

                BackdropProps={{
                    timeout: 500,
                }}
            >
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
                                onChange={(e: any) => setPriority(e.target.value)}
                            >
                                <MenuItem value={'A'}>A</MenuItem>
                                <MenuItem value={'B'}>B</MenuItem>
                                <MenuItem value={'C'}>C</MenuItem>
                                <MenuItem value={'D'}>D</MenuItem>
                                <MenuItem value={'E'}>E</MenuItem>
                            </Select>

                            <UserMenu>
                                <Hidden xsDown>
                                    <Span>
                                        Owner <strong>Jeka Ryabchuk</strong>
                                    </Span>
                                </Hidden>

                                <Avatar
                                    src='http://matx-react.ui-lib.com/assets/images/face-1.png'
                                    sx={{ cursor: 'pointer' }}
                                />
                            </UserMenu>
                        </Box>

                        <DialogActions sx={{mt: 2}} >
                            <Box style={{width: '100%', display: 'flex', justifyContent: 'center'}} >
                                <Button onClick={() => setOpen(false)} color="primary">
                                    Disagree
                                </Button>

                                <Button onClick={save} color="primary" autoFocus>
                                    Agree
                                </Button>
                            </Box>
                        </DialogActions>

                    </Box>
                </Fade>
               {/*<Box*/}
               {/*    modalStyle={{width: '500px', height: '300px', backgroundColor: 'white', margin: "100px auto"}}*/}
               {/*     position="relative"*/}
               {/*>*/}
               {/*     <Button variant="contained" onClick={() => setOpen(false)}></Button>*/}
               {/*</Box>*/}
            </Modal>

        </div>
    );
};

export default KanbanCardEditModal;