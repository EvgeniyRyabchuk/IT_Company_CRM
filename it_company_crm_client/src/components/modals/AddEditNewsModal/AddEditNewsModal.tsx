import React, {useEffect, useState} from 'react';
import {Vacancy} from "../../../types/employeement";
import {ComponentMode, ModalProps} from "../../../types/global";
import {Box, Button, DialogActions, Fade, Modal, TextField} from "@mui/material";
import {modalStyle} from "../../../assets/components/Modals";
import TextEditor from "../../UI/TextEditor/TextEditor";
import useAuth from "../../../hooks/useAuth";
import {News} from "../../../types/news";

const AddEditNewsModal : React.FC<ModalProps &
    {mode: ComponentMode, selectedNews: News | null | undefined}>

    = ({open, setOpen, onClose, onSave, mode,
           selectedNews}) => {

    const { user } = useAuth();
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');

    const [editableNews, setEditableNews] = useState<News | null>(selectedNews ?? null);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(selectedNews) {
            setEditableNews(selectedNews);
        }
    }, [selectedNews]);

    useEffect(() => {
        if(open) {}
        else {
            setError(null);
            setTitle('');
            setText('');
        }
    }, [open])


    const addNews = (e: any) => {
        if(mode === 'create') {
            if(!title || !text || title === '' || text === '') {
                setError('fill all needs field')
                return;
            }
        }
        else if(mode === 'update' && editableNews) {
            if(!editableNews.title ||
                !editableNews.text ||
                editableNews.title === '' ||
                editableNews.text === '') {
                setError('fill all needs field')
                return;
            }
        } else { return; }

        let news = {};
        if(mode === 'create') {
            news = {
                title,
                text,
                user_id: user!.id
            };
        } else if(mode === 'update') {
            news = {...editableNews};
        }
        onSave(news, mode);
        setOpen(false);
    }

    return (
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
                    <Box sx={modalStyle} style={{width: '800px'}}>
                        { error && <p style={{ color: 'red'}}>{error}</p>}
                        <TextField
                            id="outlined-basic"
                            label="Title"
                            variant="outlined"
                            fullWidth
                            sx={{my: 2}}
                            value={mode === 'create' ? title : editableNews?.title}
                            onChange={(e: any) => {
                                if (mode == 'create')
                                    setTitle(e.target.value)
                                else if(mode === 'update' && editableNews)
                                  setEditableNews({ ...editableNews, title: e.target.value})
                            }}
                        />

                        <TextEditor
                            height='500px'
                            onChange={(content) => {
                                if (mode == 'create')
                                    setText(content)
                                else if(mode === 'update' && editableNews)
                                    setEditableNews({ ...editableNews, text: content})
                            }}
                            value={mode === 'create' ? text : editableNews?.text}
                        />

                        <DialogActions sx={{mt: 2}} >
                            <Box style={{width: '100%', display: 'flex', justifyContent: 'center'}} >
                                <Button onClick={onClose} color="primary">
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    autoFocus
                                    onClick={addNews}>
                                    {mode === 'create' && 'Add News'}
                                    {mode === 'update' && 'Update News'}
                                </Button>
                            </Box>
                        </DialogActions>

                    </Box>
                </Fade>

            </Modal>
    )
};

export default AddEditNewsModal;