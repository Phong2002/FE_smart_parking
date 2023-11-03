import React from 'react';

export default {

    isAuthenticated: () => {
        return window.localStorage.getItem('TOKEN') !== null
    },

    getEmail: () => {
        const token = localStorage.getItem('TOKEN')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (payload) {
                return payload['email'];
            }
        }
    },

    getUserId: () => {
        const token = localStorage.getItem('TOKEN')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (payload) {
                return payload['id'];
            }
        }
    },

    getRole: () => {
        const token = localStorage.getItem('TOKEN')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload) {
                return payload['role'];
            }
        }
    },



    getFullName: () => {
        const token = localStorage.getItem('TOKEN')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload) {
                return payload['fullname'];
            }
        }
    },

    getAvtURL: () => {
        const token = localStorage.getItem('TOKEN')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload) {
                return payload['avtURL'];
            }
        }
    },


    isAdmin: () => {
        const token = localStorage.getItem('TOKEN')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload['role'];

            if (payload) {
                if ((role !== null || role !== undefined) && role === 'Admin') {
                    return true;
                }
            }
        }

        return false;
    },

    isUser: () => {
        const token = localStorage.getItem('TOKEN')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload['role'];

            if (payload) {
                if ((role !== null || role !== undefined) && role === 'User') {
                    return true;
                }
            }
        }

        return false;
    },


} 