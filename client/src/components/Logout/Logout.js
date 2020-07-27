import React  , {useEffect} from 'react'
import { useHistory } from "react-router-dom";
import {useCookies} from 'react-cookie'

function Logout() {

    let history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(['secureID']);

    useEffect(() => {
        
        if(cookies.secureID){
            removeCookie('secureID')
            history.push('/login')
        }else{
            history.push('/login')
        }
        
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default Logout
