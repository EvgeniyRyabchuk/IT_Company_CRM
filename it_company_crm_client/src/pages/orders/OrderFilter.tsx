import React, {useEffect, useState} from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Slider,
    TextField,
    Typography
} from "@mui/material";
import {Box, Stack} from "@mui/system";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {ProjectService} from "../../services/ProjectService";
import useDebounce from "../../hooks/useDebounce";
import moment from "moment";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface CheckBoxGroup {
    id: number;
    name: string;
    checked: boolean;
}

export interface OrderFilterData {
    projectTypes: number[];
    budgetRange: number[],
    deadlineRange: string[];
}

const ProjectFilter : React.FC<{
    isOpen: boolean,
    onFilterChange: (data: OrderFilterData) => void}> = ({
           isOpen,
           onFilterChange
    }) => {

    const [defaultValues, setDefaultValues] = useState<{budgetRange: number[], deadlineRange: Date[]}>({
        budgetRange: [1, 999999],
        deadlineRange: [
            new Date('1970-01-01T00:00:00'),
            new Date(),
        ]
    });

    const [checkBoxProjectTypes, setCheckBoxProjectTypes] = useState<CheckBoxGroup[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<number[]>([]);


    const [budgetValues, setBudgetValues] = useState<number[]>(defaultValues.budgetRange);
    const debouncedBudget = useDebounce(budgetValues, 500);

    // @ts-ignore
    const [fromDeadline, setFromDeadline] = React.useState<Date>(defaultValues.budgetRange[0]);

    // @ts-ignore
    const [toDeadline, setToDeadline] = React.useState<Date>(defaultValues.budgetRange[1] );

    console.log(defaultValues)

    const handleProjectTypeCheck = (typeId: number, checked: boolean) => {
        const newCheckBoxList = checkBoxProjectTypes.map((e) => {
                if(e.id === typeId) {
                    e.checked = checked
                    return e;
                } else { return e; }
        });
        setCheckBoxProjectTypes(newCheckBoxList)
        const types = checkBoxProjectTypes.filter((e) => e.checked === true);
        setSelectedTypes(types.map(e => e.id));
    }

    useEffect(() => {
        const fetchProjectTypes = async () => {
            const { data } = await ProjectService.getProjectTypes();
            const newCheckBoxList = data.map((e) => {
                return {id: e.id, name: e.name, checked: false}
            });
            setCheckBoxProjectTypes(newCheckBoxList);
        }
        const fetchProjectMinMax = async () => {
            const {data} = await ProjectService.getMinMaxValues();
            const minMaxBudget = data.minMaxProjectBudget;
            const minMaxDeadline = data.minMaxProjectDeadline;

            const newDefaultValue = {
                budgetRange: [
                    parseInt(minMaxBudget[0]),
                    parseInt(minMaxBudget[1])
                ],
                deadlineRange: [
                    new Date(minMaxDeadline[0]),
                    new Date(minMaxDeadline[1])
                ]
            };
            setDefaultValues(newDefaultValue)

            setBudgetValues(newDefaultValue.budgetRange);
            setFromDeadline(newDefaultValue.deadlineRange[0]);
            setToDeadline(newDefaultValue.deadlineRange[1]);
        }

        fetchProjectTypes();
        fetchProjectMinMax();
    }, [])

    useEffect(() => {
        if(isOpen) {
            const data : OrderFilterData = {
                projectTypes: selectedTypes,
                budgetRange: debouncedBudget,
                deadlineRange: [
                    moment(fromDeadline).format('DD-MM-yyyy'),
                    moment(toDeadline).format('DD-MM-yyyy'),
                ]
            }
            onFilterChange(data);
        }
    }, [selectedTypes, debouncedBudget, fromDeadline, toDeadline]);

    const resetToDefault = () => {
        setSelectedTypes([]);
        const newCheckBoxList = checkBoxProjectTypes.map((e) => {
            e.checked = false;
            return e;
        })
        setCheckBoxProjectTypes(newCheckBoxList);
        setBudgetValues(defaultValues.budgetRange);
        setFromDeadline(defaultValues.deadlineRange[0]);
        setToDeadline(defaultValues.deadlineRange[1]);
    }

    useEffect(() => {
        console.log(checkBoxProjectTypes);
    }, [checkBoxProjectTypes])

    return (
        <div
            style={{
                height: isOpen ? '300px' : '0',
                border: isOpen ? '2px dashed gray' : 'inherit',
                transition: '0.3s height',
                overflow: "hidden",
                overflowY: 'scroll',
                margin:  isOpen ? '10px' : '0'
            }}
        >

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
                    }}
                >
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
                            <Typography>Project types</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                { checkBoxProjectTypes.map((type: CheckBoxGroup) =>
                                    <FormControlLabel
                                        key={type.id}
                                        control={
                                            <Checkbox
                                                checked={type.checked}
                                                onChange={(e, data) =>
                                                    handleProjectTypeCheck(type.id, data)
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
                        <Typography id="non-linear-slider" gutterBottom>
                            Storage: ${budgetValues[0]} | ${budgetValues[1]}
                        </Typography>

                        <Slider
                            min={defaultValues.budgetRange[0]}
                            max={defaultValues.budgetRange[1]}
                            value={budgetValues}
                            onChange={(e: any, data: number | number[]) => {
                                if (!Array.isArray(data)) {
                                    return;
                                }
                                setBudgetValues(data)
                            }}
                        />
                    </Box>
                </Grid>

                <Grid item md={4} xs={12}>
                    <Typography id="non-linear-slider" gutterBottom>
                        Deadline date range
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>

                            <DesktopDatePicker
                                label="From date"
                                inputFormat="dd/MM/yyyy"
                                value={fromDeadline}
                                onChange={(value) => value && setFromDeadline(value)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DesktopDatePicker
                                label="To date"
                                inputFormat="dd/MM/yyyy"
                                value={toDeadline}
                                onChange={(value) => value && setToDeadline(value)}
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