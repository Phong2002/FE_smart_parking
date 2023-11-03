import axios from "axios";

var  URL_API = `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`

const saveToken = response =>{
    const token = response.split(' ')[1];
    localStorage.setItem('TOKEN', token);
}

 export const logoutAction =()=>{
     localStorage.clear();
}

export const LoginAction = (data,action)=>{
    console.log(`=========${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`)
    let config = {
        method: 'post',
        url: `${URL_API}/api/v1/auth/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };
    axios(config)
        .then((response) => {
            console.log(response)
            if(response.data.statusCode===200){
                saveToken(response.data.access_token)
                action.success()
            }
            else {
                action.error()
            }
        })
        .catch((error) => {
            console.log(error)
        });
}


export const RegisterAction = (data,action)=>{
    console.log(`=========${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`)
    let payload = JSON.stringify({
        "firstName": data.firstName,
        "lastName":data.lastName,
        "userName":data.username,
        "email":data.email,
        "phoneNumber":data.phoneNumber,
        "password":data.password,
    });
    let config = {
        method: 'post',
        url: `${URL_API}/api/v1/auth/register`,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };
    axios(config)
        .then((response) => {
            console.log(response)
            if(response.data.statusCode===200){
                action.success()
            }
            else {
                action.error()
            }
        })
        .catch((error) => {
            console.log(error)
        });
}