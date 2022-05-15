
import axios from 'axios';

export const database = axios.get('http://localhost:3000/docs')
.then(function (response) { 
    return response.data;
}).catch(function (error) {
    console.log(error);
});

export const addDoc = async (collection, data) => {
    const response = await axios.post(`http://localhost:3000/${collection}`, data);
    return response.data;


}