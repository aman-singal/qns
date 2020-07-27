import React from 'react'
import {Field, ErrorMessage} from 'formik'
import {TextField, withStyles, StylesProvider} from '@material-ui/core'


const FormTextStyle= withStyles({
    '@global':{
        ".MuiFormHelperText-contained":{
            color: 'red'
        }
    }
})(() => null)

function FormTextField({name, label , type , placeholder}) {
    return (
        <div>
            <StylesProvider>
                <FormTextStyle />
                <Field as={TextField }  
                required
                // autoComplete="off"
                name={name} 
                label={label}
                placeholder={placeholder}
                variant="outlined"
                type={type}
                helperText={<ErrorMessage name={name}  />}
                
                style={{width: '300px'}}
                />
            </StylesProvider>

        </div>
    )
}

export default FormTextField
