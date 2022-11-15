import React, {useEffect, useState} from 'react';
import {ComponentMode, ModalProps} from "../../../types/global";
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    DialogActions,
    Fade,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Modal,
    TextField
} from "@mui/material";
import {modalStyle} from "../../../assets/components/Modals";
import {VacancyService} from "../../../services/VacancyService";
import {Vacancy} from "../../../types/employeement";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Close, Delete, Edit} from "@mui/icons-material";


const AddEditVacancyModal : React.FC<ModalProps & { onDelete: (vacancy: Vacancy) => void}>
    = ({open, setOpen, onClose, onSave, onDelete}) => {

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleAccordionChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
    };

    const [error, setError] = useState<string | null>(null);

    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [required, setRequired] = useState<boolean>(true);

    const [mode, setMode] = useState<ComponentMode>('create');
    const [editableVacancy, setEditableVacancy] = useState<Vacancy | null>(null);

    const reset = () => {
        setEditableVacancy(null);
        setMode('create');

        setTitle('');
        setText('');
        setRequired(true);

        setExpanded(false);
    }

    const getVacancies = async () => {
        const { data } = await VacancyService.getVacancies();
        setVacancies(data);
    }

    useEffect(() => {
        if(open) {
            getVacancies();
        }
        else {
            setError(null);
            setTitle('');
            setText('');
        }
    }, [open])


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
                    <Box sx={modalStyle} style={{width: '900px'}}>

                        <Grid container spacing={10}>
                            <Grid item xs={12} md={6}>
                                <h2 className='text-center'>Add Vacancy Form</h2>

                                <div>
                                    <Autocomplete
                                        size='small'
                                        freeSolo
                                        disablePortal
                                        id="combo-box-types"
                                        options={vacancies.map(e => e.title)}
                                        sx={{ my: 2 }}
                                        value={mode === 'create' ? title :
                                            mode === 'update' ? editableVacancy?.title : ''}
                                        renderInput={(params) =>
                                            <TextField {...params} label="Title" />}
                                        onChange={(e: any, value) => {
                                            if(mode === 'create')
                                                setTitle(value ?? '');
                                            else if(mode === 'update' && editableVacancy)
                                                setEditableVacancy({...editableVacancy, title: value ?? ''});
                                        }}
                                        onInput={(e: any) => {
                                            if(mode === 'create')
                                                setTitle(e.target.value);
                                            else if(mode === 'update' && editableVacancy)
                                                setEditableVacancy({...editableVacancy, title: e.target.value});
                                        }}
                                    />

                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="Description"
                                        multiline
                                        sx={{width: '100%'}}
                                        rows={10}
                                        value={mode === 'create' ? text :
                                            mode === 'update' ? editableVacancy?.text : ''}
                                        onChange={(e: any) => {
                                            if(mode === 'create')
                                                setText(e.target.value);
                                            else if(mode === 'update' && editableVacancy)
                                                setEditableVacancy({...editableVacancy, text: e.target.value});
                                        }}
                                        variant="filled"
                                    />

                                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={mode === 'create' ? required :
                                                            mode === 'update' && editableVacancy?.required }
                                                        onChange={(event) => {
                                                            if(mode === 'create') {
                                                                setRequired(event.target.checked)
                                                            } else if(mode === 'update' && editableVacancy) {
                                                                setEditableVacancy({
                                                                    ...editableVacancy, required: event.target.checked
                                                                });
                                                            }
                                                        }}
                                                    />}
                                                label="Required" />
                                        </FormGroup>
                                    </div>

                                </div>

                                <div style={{color: 'red'}}>
                                    {
                                        error ?? ''
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <h2 className='text-center'>Vacancy List</h2>

                                <div style={{height: '380px', overflowY: 'auto'}}>
                                    {
                                        vacancies.map(vacancy =>
                                            <Accordion expanded={expanded === `panel_${vacancy.id}`}
                                                       onChange={handleAccordionChange(`panel_${vacancy.id}`)}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header">
                                                    <Typography sx={{ flexShrink: 0 }}>
                                                        {vacancy.title}
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>
                                                        {vacancy.text}
                                                    </Typography>
                                                    <hr/>
                                                    <Box sx={{
                                                            px: 1,
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'}}>
                                                        <div>
                                                            {vacancy.required ? 'Required' : 'No required'}
                                                        </div>
                                                        <div>
                                                            Total Application Count
                                                            :
                                                            {vacancy.job_applications?.length ?? 0}
                                                        </div>
                                                        <div>
                                                            {
                                                                mode === 'update' &&
                                                                editableVacancy &&
                                                                editableVacancy.id === vacancy.id ?
                                                                <IconButton
                                                                    onClick={() => {
                                                                        setMode('create');
                                                                        setEditableVacancy(null);
                                                                    }}>
                                                                    <Close />
                                                                </IconButton>
                                                                    :
                                                                    <IconButton
                                                                        onClick={() => {
                                                                            setMode('update');
                                                                            setEditableVacancy(vacancy);
                                                                        }}
                                                                    >
                                                                        <Edit/>
                                                                    </IconButton>
                                                            }
                                                        </div>

                                                    </Box>
                                                    <hr/>
                                                        <IconButton
                                                            style={{ width: '100%', fontSize: '15px'}}
                                                            onClick={() => {
                                                                onDelete(vacancy)
                                                                onClose();
                                                            }}
                                                        >
                                                            <span>Remove</span> <Delete />
                                                        </IconButton>


                                                </AccordionDetails>
                                            </Accordion>
                                        )
                                    }
                                </div>
                            </Grid>
                        </Grid>


                        <DialogActions sx={{mt: 2}} >
                            <Box style={{width: '100%', display: 'flex', justifyContent: 'center'}} >
                                <Button onClick={onClose} color="primary">
                                    Cancel
                                </Button>

                                <Button
                                    color="primary"
                                    autoFocus
                                    onClick={() => {
                                        if(mode === 'create') {
                                            if(!title || !text || title === '' || text === '') {
                                                setError('fill all needs field')
                                                return;
                                            }
                                        }
                                        else if(mode === 'update' && editableVacancy) {
                                            if(!editableVacancy.title ||
                                                !editableVacancy.text ||
                                                editableVacancy.title === '' ||
                                                editableVacancy.text === '') {
                                                setError('fill all needs field')
                                                return;
                                            }
                                        } else { return; }

                                        let newVacancy = {};
                                        if(mode === 'create') {
                                            newVacancy = {
                                                title,
                                                text,
                                                required
                                            };
                                        } else if(mode === 'update') {
                                            newVacancy = {...editableVacancy};
                                        }
                                        onSave(newVacancy, mode);

                                        setOpen(false);
                                        reset();
                                    }}>
                                    {
                                        mode === 'create' && 'Add Vacancy'
                                    }
                                    {
                                        mode === 'update' && 'Update Vacancy'
                                    }
                                </Button>
                            </Box>
                        </DialogActions>

                    </Box>
                </Fade>

            </Modal>
        </div>
    );
};

export default AddEditVacancyModal;