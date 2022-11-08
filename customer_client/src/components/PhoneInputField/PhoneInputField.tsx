import React, {useRef} from 'react';

import './style.css'

import {Box, createStyles, makeStyles, styled, Theme} from "@mui/material";

// @ts-ignore
import classes from './st.module.scss';

// @ts-ignore
import PhoneInput, {CountryData} from 'react-phone-input-2'
import {toUpper} from "lodash";


export const PhoneBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        width: '100%',
        margin: '20px 0px'
    },
    "& > div": {
        [theme.breakpoints.down("md")]: { width: '100%' },
    },
}));


const PhoneInputField : React.FC<any>
    = ({onChange, value, ...props}) => {

    const r = useRef<any>();

    return (
        <PhoneBox className={`${classes.BoxInline}`} >
            <Box style={{ margin: '0 auto'}}>
                <PhoneInput
                    onChange={(number, data: CountryData) => {
                        data.countryCode = toUpper(data.countryCode);
                        onChange({number, countryData: data})
                    }}
                    value={value}
                    specialLabel={''}
                    country={'ua'}
                    inputStyle={{
                        borderColor: (props.touched && props.error) && "red",
                        color: 'black'
                    }}
                    {...props}
                />
                {(props.touched && props.error) &&
                    <p style={{color:'red'}}
                       className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-filled MuiFormHelperText-marginDense">
                        {props.error}
                    </p>
                }
            </Box>
        </PhoneBox>
    )
}

export default PhoneInputField;