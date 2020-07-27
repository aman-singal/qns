import React from 'react'
import {Field, ErrorMessage} from 'formik'
import {TextField , MenuItem} from '@material-ui/core'

const SelectHelper = React.forwardRef((props, ref) => {
    return (
        <div>
            <Field as={TextField }  
                required
                // autoComplete="off"
                name={props.name} 
                label={props.label}
                variant="outlined"
                helperText={<ErrorMessage name={props.name}  />}
                style={{width: '300px'}}
                select
                // placeholder={props.placeholder}
                ref={ref}
                >
                {props.options.map((item , index) =>{
                    return (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                    )
                })}
                </Field>
        </div>
    )
})

export default SelectHelper
