import React , {useState} from 'react'
import {Typography , StylesProvider, withStyles , Button , Paper, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, } from 'formik';
import * as Yup from 'yup'
import FormTextField from '../sub-components/TextFieldHelper'
import axios from 'axios'
import Alert from '../sub-components/Alert'
import { useHistory } from "react-router-dom";
import {useCookies} from 'react-cookie'
import AppBar from '../sub-components/AppBar'
import '../Global.css'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginLeft: '20px',
      marginRight: '20px',
    },
    paper: {
      padding: theme.spacing(2),
    //   textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    education:{
        
    },
    types:{
        marginTop: '20px',
        color: 'black',
    }

  }));


const RegisterStyle = withStyles({

    "MuiTypography-body1":{
        marginTop: '80px',
        fontSize: '70px'
    }


})(()=> null)



    const validationSchema = Yup.object().shape({
        email: Yup.string()
        .email("Enter a valid Email address")
        .required("Email address is required"),

        password: Yup.string()
        // .min(6, "Password Should be atleast 6 char long")
        .required("Password is required"),

       

    })


function Login() {

    let history = useHistory();
    const classes = useStyles();
    const [isLoading,setLoading] = useState(false) 
    const [error,setError] = useState('')
    const [cookies, setCookie, removeCookie] = useCookies(['secureID']);

    return (
        <StylesProvider>
            <RegisterStyle />
            <div >
            <Formik 
            initialValues={{email: '' , password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values  , {setSubmitting })=> {
                console.log('submit req send')
                setLoading(true)
                axios({
                    method: 'post',
                    url: 'http://localhost:4000/api/login',
                    headers: {}, 
                    data: {
                      email: values.email,
                      password: values.password,
                    }
                  })
                  .then((res) =>{
                      console.log(res.data)
                      if(res.data.status === 'success'){
                        
                        if(cookies){
                            removeCookie('secureID' , '/')
                        }
                        setCookie('secureID' , res.data.data , '/' )
                        history.push('/')
                      
                    }
                      else{
                        setError(res.data.message)
                      }
                  })
                  .catch(err => {
                      console.log('err in the req' , err)
                  })
                  setLoading(false)
                  setSubmitting(false)
            }}
            >
                {({ isSubmitting }) => (
                <Form>
                    <AppBar text="Login"/>
                    <div className={classes.root}>
                        <Grid container spacing={5}>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>
                                {error !== '' ? <Alert severity="error" alertText={error} />: null}
                                <Typography style={{fontSize: '30px'}}>Login</Typography>
                                <div style={{marginTop: '10px'}}>
                                    <FormTextField name="email" label="Email" placeholder="Email Address" type="email" />
                                </div>
                                <div style={{marginTop: '10px'}}>
                                    <FormTextField name="password" label="Password" placeholder="Password" type="password" />
                                </div>
                                <div style={{marginTop: '20px'}}>
                                    <Button type="submit" disabled={isSubmitting} variant="contained" onClick={()=>{console.log("1")}} color="primary" style={{width: '300px'}}>
                                    {isLoading?  "Loading..." : "Login"}
                                    </Button>
                                </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </Form>
            )}
            </Formik>    
            </div>
        </StylesProvider> 
        
    )
}

export default Login