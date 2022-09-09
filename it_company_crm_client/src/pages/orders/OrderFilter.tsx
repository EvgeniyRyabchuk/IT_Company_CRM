import React, {useEffect, useState} from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Button,
    Checkbox, FormControl,
    FormControlLabel,
    FormGroup, FormLabel,
    Grid, Radio, RadioGroup,
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
import {OrderService} from "../../services/OrderService";

interface CheckBoxGroup {
    id: number;
    name: string;
    checked: boolean;
}

export interface OrderFilterData {
    projectExistMode: ProjectExistMode;
    orderStatuses: number[];
    deadlineRange: string[];
    createdOrderRange: string[],
}

enum ProjectExistMode {
    ALL,
    EXIST,
    NOT_EXIST,
}

const OrderFilter : React.FC<{
    isOpen: boolean,
    onFilterChange: (data: OrderFilterData, isReset: boolean) => void}> = ({
           isOpen,
           onFilterChange
    }) => {

    const [defaultValues, setDefaultValues] = useState<{
        deadlineRange: Date[],
        createdOrderRange: Date[]
    }>({
        createdOrderRange: [
            new Date('1970-01-01T00:00:00'),
            new Date(),
        ],
        deadlineRange: [
            new Date('1970-01-01T00:00:00'),
            new Date(),
        ],

    });

    const [checkBoxOrdersStatuses, setCheckBoxOrdersStatuses] = useState<CheckBoxGroup[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<number[]>([]);

    // @ts-ignore
    const [fromDeadline, setFromDeadline] = React.useState<Date>(defaultValues.deadlineRange[0]);

    // @ts-ignore
    const [toDeadline, setToDeadline] = React.useState<Date>(defaultValues.deadlineRange[1] );

    // @ts-ignore
    const [fromCreatedOrder, setFromCreatedOrder] = React.useState<Date>(defaultValues.createdOrderRange[0]);

    // @ts-ignore
    const [toCreatedOrder, setToCreatedOrder] = React.useState<Date>(defaultValues.createdOrderRange[1] );

    const [isReset, setIsReset] = useState<boolean>(false);

    const [projectMustExist, setProjectMustExist] = useState<ProjectExistMode>(ProjectExistMode.ALL);

    const handleOrderStatusCheck = (typeId: number, checked: boolean) => {
        const newCheckBoxList = checkBoxOrdersStatuses.map((e) => {
                if(e.id === typeId) {
                    e.checked = checked
                    return e;
                } else { return e; }
        });
        setCheckBoxOrdersStatuses(newCheckBoxList)
        const types = checkBoxOrdersStatuses.filter((e) => e.checked === true);
        setSelectedStatuses(types.map(e => e.id));
    }

    useEffect(() => {
        const fetchOrderStatuses = async () => {
            const { data } = await OrderService.getOrderStatuses();
            const newCheckBoxList = data.map((e) => {
                return {id: e.id, name: e.name, checked: false}
            });
            setCheckBoxOrdersStatuses(newCheckBoxList);
        }
        const fetchOrderMinMax = async () => {
            const {data} = await OrderService.getMinMaxValues();
            const minMaxDeadline = data.minMaxProjectDeadline;
            const minMaxCreatedAtOrder = data.minMaxOrderCreatedDate;

            const newDefaultValue = {
                deadlineRange: [
                    new Date(minMaxDeadline[0]),
                    new Date(minMaxDeadline[1])
                ],
                createdOrderRange: [
                    new Date(minMaxCreatedAtOrder[0]),
                    new Date(minMaxCreatedAtOrder[1])
                ]
            };
            setDefaultValues(newDefaultValue)

            setFromDeadline(newDefaultValue.deadlineRange[0]);
            setToDeadline(newDefaultValue.deadlineRange[1]);

            setFromCreatedOrder(newDefaultValue.createdOrderRange[0]);
            setToCreatedOrder(newDefaultValue.createdOrderRange[1]);
        }

        fetchOrderStatuses();
        fetchOrderMinMax();
    }, [])

    useEffect(() => {
        if(isOpen) {
            const deadlineRange = [
                moment(fromDeadline).format('DD-MM-yyyy'),
                moment(toDeadline).format('DD-MM-yyyy'),
            ];
            const data : OrderFilterData = {
                projectExistMode: projectMustExist,
                orderStatuses: selectedStatuses,
                deadlineRange: [],
                createdOrderRange: [
                    moment(fromCreatedOrder).format('DD-MM-yyyy'),
                    moment(toCreatedOrder).format('DD-MM-yyyy'),
                ]
            }

            if(projectMustExist === ProjectExistMode.EXIST) {
                data.deadlineRange = deadlineRange;
            }
            console.log(fromDeadline.getDate().toString(), toDeadline.getDate().toString());
            onFilterChange(data, isReset);
            if(isReset) setIsReset(false);
        }
    }, [selectedStatuses, fromDeadline, toDeadline, fromCreatedOrder, toCreatedOrder, projectMustExist]);

    const resetToDefault = () => {
        setSelectedStatuses([]);
        const newCheckBoxList = checkBoxOrdersStatuses.map((e) => {
            e.checked = false;
            return e;
        });
        setCheckBoxOrdersStatuses(newCheckBoxList);
        setFromDeadline(defaultValues.deadlineRange[0]);
        setToDeadline(defaultValues.deadlineRange[1]);
        setFromCreatedOrder(defaultValues.createdOrderRange[0]);
        setToCreatedOrder(defaultValues.createdOrderRange[1]);
        setProjectMustExist(ProjectExistMode.ALL);
        setIsReset(true);
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
            }}
        >

            <div style={{
                top: '10px',
                left: '10px',
                display: 'flex',
                position: 'relative',
                justifyContent: 'space-between',
                padding: '0 10px'
            }}>
                <Button
                    variant='contained'
                    onClick={resetToDefault}
                    style={{
                        backgroundColor: 'gray',
                        color: 'white',
                        marginLeft: '10px',
                        height: '40px'
                    }}
                >
                    Reset
                </Button>

                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Project is exist</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="female"
                                          control={<Radio />}
                                          label="All"
                                          checked={projectMustExist === ProjectExistMode.ALL}
                                          onChange={() => setProjectMustExist(ProjectExistMode.ALL)}
                        />
                        <FormControlLabel value="male"
                                          control={<Radio />}
                                          label="Project Exist"
                                          checked={projectMustExist === ProjectExistMode.EXIST}
                                          onChange={() => setProjectMustExist(ProjectExistMode.EXIST)}
                        />
                        <FormControlLabel value="other"
                                          control={<Radio />}
                                          label="Project Not Exist"
                                          checked={projectMustExist === ProjectExistMode.NOT_EXIST}
                                          onChange={() => setProjectMustExist(ProjectExistMode.NOT_EXIST)}
                        />
                    </RadioGroup>
                </FormControl>
            </div>

            <Grid
                container
                spacing={3}
                style={{ padding: '15px', margin: '0'}}
            >
                <Grid item md={4} xs={12}>

                    <Accordion defaultExpanded={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Order Statuses</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                { checkBoxOrdersStatuses.map((type: CheckBoxGroup) =>
                                    <FormControlLabel
                                        key={type.id}
                                        control={
                                            <Checkbox
                                                checked={type.checked}
                                                onChange={(e, data) =>
                                                    handleOrderStatusCheck(type.id, data)
                                                }

                                            />
                                        } label={type.name} />
                                )}
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>

                </Grid>

                <Grid item md={4} xs={12}>
                    <Typography id="non-linear-slider" gutterBottom>
                        Order created at data range
                    </Typography>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
                                label="From created at"
                                inputFormat="dd/MM/yyyy"
                                value={fromCreatedOrder}
                                onChange={(value) => value && setFromCreatedOrder(value)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DesktopDatePicker
                                label="To created at"
                                inputFormat="dd/MM/yyyy"
                                value={toCreatedOrder}
                                onChange={(value) => value && setToCreatedOrder(value)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>

                </Grid>

                <Grid item md={4} xs={12}>
                    <Typography id="non-linear-slider" gutterBottom>
                        Deadline date range
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>

                            <DesktopDatePicker
                                disabled={projectMustExist !== ProjectExistMode.EXIST}
                                label="From date"
                                inputFormat="dd/MM/yyyy"
                                value={fromDeadline}
                                onChange={(value) => value && setFromDeadline(value)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DesktopDatePicker
                                disabled={projectMustExist !== ProjectExistMode.EXIST}
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

export default OrderFilter;