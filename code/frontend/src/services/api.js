import axios from "axios";

import Ticket from './ticket';

const SERVER_URL = 'http://localhost:3001/api';

const api = {
    getCurrentTicket: (counterId) => {
        return new Promise((resolve, reject) => {
            axios.get(`${SERVER_URL}/tickets/${counterId}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        })
    },

    getNextTicket: (counterId) => {
        return new Promise((resolve, reject) => {
            axios.put(`${SERVER_URL}/tickets/${counterId}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        })
    },

    getServiceList: () => {
        return new Promise((resolve, reject) => {
            axios.get(`${SERVER_URL}/services`)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        })
    },

    postNewTicket: (serviceId) => {
        return new Promise((resolve, reject) => {
            axios.post(`${SERVER_URL}/tickets`, {serviceId: serviceId})
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        })
    }
};

export default api;