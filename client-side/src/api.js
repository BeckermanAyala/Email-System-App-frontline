import axios from "axios";

const API_URL = "http://localhost:5000/api"; 

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};


export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data; 
};

export const register = async (name, email, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
    return response.data; 
};

export const fetchEmails = async (status) => {
    const response = await axios.get(`${API_URL}/emails/${status}`);
    return response.data.emails; 
};

export const createEmail = async (emailData) => {
    const response = await axios.post(`${API_URL}/emails/create`, emailData);
    return response.data.emailId; 
};

export const updateDraft = async (emailId, updatedData) => {
    const response = await axios.put(`${API_URL}/emails/draft/${emailId}`, updatedData);
    return response.data.email; 
};
