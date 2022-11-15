import React, {useEffect, useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import {Box, Stack} from "@mui/system";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import moment from "moment";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {JobApplicationService} from "../../services/JobApplicationService";
import {VacancyService} from "../../services/VacancyService";

interface CheckBoxGroup {
    id: number;
    name: string;
    checked: boolean;
}

export interface JobApplicationFilterData {
    jobApplicationStatus: number[];
    vacancies: number[],
    createdAtRange: string[];
}

const ProjectFilter : React.FC<{
    isOpen: boolean,
    onFilterChange: (data: JobApplicationFilterData) => void}> = ({
           isOpen,
           onFilterChange
    }) => {

    const [defaultValues, setDefaultValues] = useState<{createdAtRange: Date[]}>({
        createdAtRange: [
            new Date('1970-01-01T00:00:00'),
            new Date(),
        ]
    });

    const [checkBoxJobApplicationStatuses, setCheckBoxJobApplicationStatuses] = useState<CheckBoxGroup[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<number[]>([]);

    const [checkBoxVacancies, setCheckBoxVacancies] = useState<CheckBoxGroup[]>([]);
    const [selectedVacancy, setSelectedVacancy] = useState<number[]>([]);

    // @ts-ignore
    const [fromCreatedAt, setFromCreatedAt] = React.useState<Date>(defaultValues.createdAtRange[0]);
    // @ts-ignore
    const [toCreatedAt, setToCreatedAt] = React.useState<Date>(defaultValues.createdAtRange[1] );

    const handleCheckBoxCheck = (ragetId: number, checked: boolean, checkType : 'status' | 'vacancy') => {
        const checkBoxList = checkType === 'status' ? checkBoxJobApplicationStatuses : checkBoxVacancies;
        const newCheckBoxList = checkBoxList.map((e) => {
                if(e.id === ragetId) {
                    e.checked = checked
                    return e;
                } else { return e; }
        });
        if(checkType === 'status')
            setCheckBoxJobApplicationStatuses(newCheckBoxList)
        else if(checkType === 'vacancy')
            setCheckBoxVacancies(newCheckBoxList);

        const types = checkBoxList.filter((e) => e.checked === true);
        if(checkType === 'status')
            setSelectedStatus(types.map(e => e.id));
        else if(checkType === 'vacancy')
            setSelectedVacancy(types.map(e => e.id));

    }

    useEffect(() => {
        const fetchStatuses = async () => {
            const { data }  = await JobApplicationService.getJobApplicationStatuses();
            const newCheckBoxList = data.map((e) => {
                return {id: e.id, name: e.name, checked: false}
            });
            setCheckBoxJobApplicationStatuses(newCheckBoxList);
        }
        const fetchVacancies = async () => {
            const { data }  = await VacancyService.getVacancies();
            const newCheckBoxList = data.map((e) => {
                return {id: e.id, name: e.title, checked: false}
            });
            setCheckBoxVacancies(newCheckBoxList);
        }
        const fetchJobApplicationMinMax = async () => {
            const {data} = await JobApplicationService.getMinMaxValues();
            const minMaxCreatedAt = data.minMaxCreatedAtRange;

            const newDefaultValue = {
                createdAtRange: [
                    new Date(minMaxCreatedAt[0]),
                    new Date(minMaxCreatedAt[1])
                ]
            };
            setDefaultValues(newDefaultValue)

            setFromCreatedAt(newDefaultValue.createdAtRange[0]);
            setToCreatedAt(newDefaultValue.createdAtRange[1]);
        }

        fetchStatuses();
        fetchVacancies();
        fetchJobApplicationMinMax();
    }, [])

    useEffect(() => {
        if(isOpen) {
            const data : JobApplicationFilterData = {
                jobApplicationStatus: selectedStatus,
                vacancies: selectedVacancy,
                createdAtRange: [
                    moment(fromCreatedAt).format('DD-MM-yyyy'),
                    moment(toCreatedAt).format('DD-MM-yyyy'),
                ]
            }
            onFilterChange(data);
        }
    }, [selectedStatus, selectedVacancy, fromCreatedAt, toCreatedAt]);

    const resetToDefault = () => {
        setSelectedStatus([]);
        setSelectedVacancy([]);
        const newJobApplicationCheckBoxList = checkBoxVacancies.map((e) => {
            e.checked = false;
            return e;
        })
        const newVacancyCheckBoxList = checkBoxVacancies.map((e) => {
            e.checked = false;
            return e;
        });

        setCheckBoxJobApplicationStatuses(newJobApplicationCheckBoxList);
        setCheckBoxVacancies(newVacancyCheckBoxList);
        setFromCreatedAt(defaultValues.createdAtRange[0]);
        setToCreatedAt(defaultValues.createdAtRange[1]);
    }

    return (
        <div
            style={{
                height: isOpen ? '300px' : '0',
                border: isOpen ? '2px dashed gray' : 'inherit',
                transition: '0.3s height',
                overflow: "hidden",
                overflowY: 'scroll',
                margin:  isOpen ? '10px' : '0'
            }}>
            <div style={{
                top: '10px',
                left: '10px',
                display: 'flex',
                position: 'relative'
            }}>
                <Button
                    variant='contained'
                    onClick={resetToDefault}
                    style={{
                        backgroundColor: 'gray',
                        color: 'white',
                        marginLeft: '10px'
                    }}>
                    Reset
                </Button>
            </div>

            <Grid container spacing={3} style={{ padding: '30px', margin: '0'}}>
                <Grid item md={4} xs={12}>
                    <Accordion defaultExpanded={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Job Application Statuses</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                { checkBoxJobApplicationStatuses.map((type: CheckBoxGroup) =>
                                    <FormControlLabel
                                        key={type.id}
                                        control={
                                            <Checkbox
                                                checked={type.checked}
                                                onChange={(e, data) =>
                                                    handleCheckBoxCheck(type.id, data, 'status')
                                                }

                                            />
                                        } label={type.name} />
                                )}
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>

                </Grid>

                <Grid item md={4} xs={12}>
                    <Box sx={{ width: 250 }}>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Vacancy List</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    { checkBoxVacancies.map((type: CheckBoxGroup) =>
                                        <FormControlLabel
                                            key={type.id}
                                            control={
                                                <Checkbox
                                                    checked={type.checked}
                                                    onChange={(e, data) =>
                                                        handleCheckBoxCheck(type.id, data, 'vacancy')
                                                    }

                                                />
                                            } label={type.name} />
                                    )}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Grid>

                <Grid item md={4} xs={12}>
                    <Typography id="non-linear-slider" gutterBottom>
                        Created date range
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
                                label="From date"
                                inputFormat="dd/MM/yyyy"
                                value={fromCreatedAt}
                                onChange={(value) => value && setFromCreatedAt(value)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DesktopDatePicker
                                label="To date"
                                inputFormat="dd/MM/yyyy"
                                value={toCreatedAt}
                                onChange={(value) => value && setToCreatedAt(value)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </Grid>
            </Grid>
        </div>
    )
};

export default ProjectFilter;