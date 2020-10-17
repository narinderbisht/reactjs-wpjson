import axios from 'axios';

export default axios.create({
    baseURL: 'http://narindersingh.in/wp-json',
    headers: {
        "Content-type": "application/json"
    }
});