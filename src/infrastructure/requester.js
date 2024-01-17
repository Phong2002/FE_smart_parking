import axios from "axios";
import FormData from 'form-data';
import UserService from "./UserService";
var URL_API = `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`

export default {
    get: (endpoint, callback) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${URL_API}/${endpoint}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("TOKEN"),
                // ...data.getHeaders()
            },

        };
        if (callback) {
            axios(config)
                .then((response) => {
                    callback(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            return axios(config)
        }

    },
    post: (endpoint, datax, callback) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${URL_API}/${endpoint}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("TOKEN"),
                // ...data.getHeaders()
            },
            data: datax
        };
        axios(config)
            .then((response) => {
                callback(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    put: (endpoint, datax, callback) => {
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${URL_API}/${endpoint}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("TOKEN"),
                // ...data.getHeaders()
            },
            data: datax
        };
        axios(config)
            .then((response) => {
                callback(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    patch: (endpoint, datax, callback) => {
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${URL_API}/${endpoint}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("TOKEN"),
                // ...data.getHeaders()
            },
            data: datax
        };
        axios(config)
            .then((response) => {
                callback(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    delete: (endpoint, callback) => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${URL_API}/${endpoint}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("TOKEN"),
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
    updateAvatar: (endpoint,file, callback) => {
        let data = new FormData();
        data.append('folderName', 'Avatar');
        data.append('userId',UserService.getUserId());
        data.append('file',file);

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${URL_API}/${endpoint}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("TOKEN"),
                'Content-Type': 'multipart/form-data', 
            },
            data: data
        };

        console.log("=================================config",config);

        axios.request(config)
            .then((response) => {
                callback(response)
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    },
    getImage:(url) =>{
        console.log("=====================ủl",url)
        if(url==null){
            return "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"
        }
        return `${URL_API}/api/v1/image?url=${url}`;
    }
}

