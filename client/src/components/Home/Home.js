import React , {useEffect , useState} from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import {useCookies} from 'react-cookie'
import AppBar from '../sub-components/AppBar'
import {Button} from '@material-ui/core'
import {  withStyles, StylesProvider } from '@material-ui/core/styles';

const HomeStyles = withStyles({
       ".Primary-Button" :{
            borderRadius: '50px',
            width: '500px',
            height: '50px',
            marginBottom: '20px',
            backgroundColor: 'green'
    }
})(()=> null)


function Home() {

    let history = useHistory();
    const [cookies, removeCookie] = useCookies(['secureID']);
    const [access,setAccess] = useState(false)

    useEffect(() => {

        if(cookies.secureID){
            axios({
                method: 'post',
                url: 'https://dry-spire-00712.herokuapp.com/api/access',
                headers: {}, 
                data: {
                  id: cookies.secureID.id,
                }
              })
              .then(res =>{
                  if(res.data.status === 'error'){
                      removeCookie('secureID')
                      history.push('/')
                  }else{
                      setAccess(res.data.data)
                  }
              })
        }else{
            history.push('/login')
        }
         
        
    }, [])

    return (
        <div>
                <AppBar text="Home"/>
                <div style={{justifyContent: 'center', alignItems: 'center' , display: 'flex' , marginTop: '70px'}}>
                    <Button variant="contained" color="primary" style={{backgroundColor: 'green'}}>
                    I am a Green Button
                    </Button>

                    {access? <Button variant="contained" color="secondary">
                        I am a red Button
                    </Button>
                    :
                    null}
                </div>
        </div>
    )
}

export default Home
