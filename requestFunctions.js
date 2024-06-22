const axios = require("axios");

const BASE_URL = 'http://localhost:3000';

const getItemList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/items`);
        return response.data;
    } catch (err) {
        console.error("Error fetching data", err.message);
        throw err
    }
}

const postItem = async (obj) => {
    try {
        const response = await axios.post(`${BASE_URL}/items`, obj);
        return response.data;
    } catch (err) {
        console.error("Error posting data", err.message);
        throw err 
    }
}

const getItem = async (name) => {
    try {
        const response = await axios.get(`${BASE_URL}/items/${name}`);
        return response.data;
    } catch (err) {
        console.error(`Error fetching "${name}" data`, err.message);
        throw err 
    }
}

const patchItem = async (name, obj) => {
    try {
        const response = await axios.patch(`${BASE_URL}/items/${name}`, obj);
        return response.data;
    } catch (err) {
        console.error(`Error patching "${name}" data`, err.message);
        throw err 
    }
}

const deleteItem = async (name) => {
    try {
        const response = await axios.delete(`${BASE_URL}/items/${name}`);
        return response.data;
    } catch (err) {
        console.error(`Error deleting "${name}"`, err.message);
        throw err 
    }
}

module.exports = {
    getItemList, postItem, getItem, patchItem, deleteItem
}