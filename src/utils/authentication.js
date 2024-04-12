import axios from "axios";

export const setAuthenticationHeaders = (token)=>{
    if(token)
    {
        axios.defaults.headers.common['Authorization'] = token;
    }
    else{
        delete axios.defaults.headers.common['Authorization'];
    }
}