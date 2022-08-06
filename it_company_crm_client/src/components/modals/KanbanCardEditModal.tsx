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

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '20px 40px'
};

const UserMenu = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 24,
    padding: 4,
    '& span': { margin: '0 8px' },
}));

// @ts-ignore
const StyledBox = styled(Box)(({ theme, textTransformStyle, ellipsis }) => ({
    textTransform: textTransformStyle || 'none',
    whiteSpace: ellipsis ? 'nowrap' : 'normal',
    overflow: ellipsis ? 'hidden' : '',
    textOverflow: ellipsis ? 'ellipsis' : '',
}));


type AppProps = {
    children?: any|undefined;
    className?: any|undefined;
    ellipsis?: any|undefined;
    textTransform?: any|undefined;

}
export const Span: React.FC<AppProps> = ({ children, className, ellipsis, textTransform, ...props }) => {

    return (
        <StyledBox
            component="span"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};

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
                    <Box sx={style}>

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
               {/*    style={{width: '500px', height: '300px', backgroundColor: 'white', margin: "100px auto"}}*/}
               {/*     position="relative"*/}
               {/*>*/}
               {/*     <Button variant="contained" onClick={() => setOpen(false)}></Button>*/}
               {/*</Box>*/}
            </Modal>

        </div>
    );
};

export default KanbanCardEditModal;