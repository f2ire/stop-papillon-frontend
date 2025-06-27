import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/api'

export const fetchSessions = async () => {
    const response = await axios.get(`${API_BASE_URL}/sessions/`);
    return response.data;
}