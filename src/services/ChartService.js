import axios from 'axios';

export default axios.create(
    { baseURL: 'https://org-chart-creator-backend.herokuapp.com/' }
);