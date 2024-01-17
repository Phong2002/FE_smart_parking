import React from 'react';

export default {

    isAuthenticated: () => {
        return window.localStorage.getItem('TOKEN') !== null
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
        return localStorage.getItem('LASTNAME') +" "+ localStorage.getItem('FIRSTNAME')

    },
    getFirstName: () => {
        return localStorage.getItem('FIRSTNAME')
    },
    getLastName: () => {
        return localStorage.getItem('LASTNAME')
    },

    getAvtURL: () => {
        return localStorage.getItem('IMAGEURL')
    },

    getPhoneNumber: () => {
        return localStorage.getItem('PHONENUMBER')
    },
    getUsername: () => {
        return localStorage.getItem('USERNAME')
    },
    getEmail: () => {
        return localStorage.getItem('EMAIL')
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