export const Authenticate=(response,next)=>{
    if(window!=='undefined'){


        sessionStorage.setItem('token',JSON.stringify(response.data.jwt));
        sessionStorage.setItem('username',JSON.stringify(response.data.user.username));
        sessionStorage.setItem('role',JSON.stringify(response.data.user.role.name));


    }
    next();
}

export const getToken = ()=>{
    if (window !== 'undefined'){
        if (sessionStorage.getItem('token')){
            return JSON.parse(sessionStorage.getItem('token'));
        }
        else {
            return false;
        }

    }
    
}
export const getUsername = ()=>{
    if (window !== 'undefined'){
        if (sessionStorage.getItem('token')){
            return JSON.parse(sessionStorage.getItem('username'));
        }
        else {
            return false;
        }

    }
    
}
export const getRole = ()=>{
    if (window !== 'undefined'){
        if (sessionStorage.getItem('token')){
            return JSON.parse(sessionStorage.getItem('role'));
        }
        else {
            return false;
        }

    }
    
}

export const logout = next =>{

    if (window !== 'undefined'){
        sessionStorage.removeItem('token')
    }
    next();

}

export const isAuthenticated = () =>{
    if (getToken()){
        //console.log(getToken());
        return true;
    }
    else {
        return false;

    }
}