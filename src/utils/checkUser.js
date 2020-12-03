import Cookies from 'js-cookie'

export const isUserLogin = () =>{
    if(Cookies.get('uid')){
        return true
    }
    else{
        return false
    }
}