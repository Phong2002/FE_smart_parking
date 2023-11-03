import axios from "axios";
import FormData from 'form-data';
var  URL_API = `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`

export default {
    get:(endpoint, callback)=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${URL_API}/${endpoint}`,
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem("TOKEN"),
                // ...data.getHeaders()
            },
          
        };
        axios(config)
            .then((response) => {
                callback(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    post:(endpoint, datax, callback)=>{
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${URL_API}/${endpoint}`,
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem("TOKEN"),
                // ...data.getHeaders()
            },
            data : datax
        };
        axios(config)
            .then((response) => {
                callback(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    put:(endpoint, datax, callback)=>{
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${URL_API}/${endpoint}`,
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem("TOKEN"),
                // ...data.getHeaders()
            },
            data : datax
        };
        axios(config)
            .then((response) => {
                callback(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    delete:(endpoint, callback)=>{
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${URL_API}/${endpoint}`,
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem("TOKEN"),
            },
        
        };
        axios(config)
            .then((response) => {
                callback(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

