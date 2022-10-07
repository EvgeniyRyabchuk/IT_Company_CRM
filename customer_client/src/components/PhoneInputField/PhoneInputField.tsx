import React, {useRef} from 'react';

import './style.css'

import {Box, createStyles, makeStyles, styled, Theme} from "@mui/material";

// @ts-ignore
import classes from './st.module.scss';

// @ts-ignore
import PhoneInput from 'react-phone-input-2'


const PhoneInputField : React.FC<any>
    = ({onChange, value, ...props}) => {

    const r = useRef<any>();

    return (
        <Box className={classes.BoxInline} >
            <Box>
                <PhoneInput
                    onChange={onChange}
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
        </Box>
    )
}

export default PhoneInputField;