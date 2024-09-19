const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const BASE_URL = 'https://api.instafill.ai/v1/forms';
const SESSION_URL = 'https://api.instafill.ai/v1/session';
const PROFILE_URL = 'https://api.instafill.ai/api/profile';

class InstaFillClient {
    constructor(apiKey) {
        this.apiKey = apiKey || process.env.INSTAFILL_API_KEY;
        if (!this.apiKey) {
            throw new Error('API key must be provided either as a parameter or in the .env file');
        }
    }

    async createForm(data, contentType = 'application/json') {
        const headers = { 'Content-Type': contentType, 'x-api-key': this.apiKey };
        let response;
        if (contentType === 'application/json') {
            response = await axios.post(BASE_URL, data, { headers });
        } else if (contentType === 'application/octet-stream') {
            response = await axios.post(BASE_URL, data, { headers });
        } else {
            throw new Error('Unsupported content type');
        }
        return response.data;
    }

    async getForm(formId) {
        const url = `${BASE_URL}/${formId}`;
        const headers = { 'x-api-key': this.apiKey };
        const response = await axios.get(url, { headers });
        return response.data;
    }

    async listForms() {
        const headers = { 'x-api-key': this.apiKey };
        const response = await axios.get(BASE_URL, { headers });
        return response.data;
    }

    async updateForm(formId, data) {
        const url = `${BASE_URL}/${formId}`;
        const headers = { 'x-api-key': this.apiKey };
        const response = await axios.put(url, data, { headers });
        return response.data;
    }

    async createSession(data) {
        const headers = { 'Content-Type': 'application/json', 'x-api-key': this.apiKey };
        const response = await axios.post(SESSION_URL, data, { headers });
        return response.data;
    }

    async getSession(sessionId) {
        const url = `${SESSION_URL}/${sessionId}`;
        const headers = { 'x-api-key': this.apiKey };
        const response = await axios.get(url, { headers });
        return response.data;
    }

    async getProfiles(name = '', page = 1, size = 10, status = '') {
        const params = { name, page, size, status };
        const headers = { 'x-api-key': this.apiKey };
        const response = await axios.get(PROFILE_URL, { headers, params });
        return response.data;
    }

    async createProfile() {
        const headers = { 'x-api-key': this.apiKey };
        const response = await axios.get(`${PROFILE_URL}/new`, { headers });
        return response.data;
    }

    async getProfile(profileId) {
        const url = `${PROFILE_URL}/${profileId}`;
        const headers = { 'x-api-key': this.apiKey };
        const response = await axios.get(url, { headers });
        return response.data;
    }

    async deleteProfile(profileId) {
        const url = `${PROFILE_URL}/${profileId}`;
        const headers = { 'x-api-key': this.apiKey };
        const response = await axios.delete(url, { headers });
        return response.data;
    }

    async updateProfileName(profileId, name) {
        const url = `${PROFILE_URL}/${profileId}/name`;
        const headers = { 'Content-Type': 'application/json', 'x-api-key': this.apiKey };
        const data = { name };
        const response = await axios.put(url, data, { headers });
        return response.data;
    }

    async uploadFiles(profileId, files) {
        const url = `${PROFILE_URL}/${profileId}/files`;
        const headers = { 'x-api-key': this.apiKey };
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file.buffer, file.originalname);
        });
        const response = await axios.put(url, formData, { headers });
        return response.data;
    }

    async deleteFiles(profileId, fileIds) {
        const url = `${PROFILE_URL}/${profileId}/files`;
        const headers = { 'Content-Type': 'application/json', 'x-api-key': this.apiKey };
        const data = { ids: fileIds };
        const response = await axios.delete(url, { headers, data });
        return response.data;
    }

    async updateProfileTextInfo(profileId, textInfo) {
        const url = `${PROFILE_URL}/${profileId}/text`;
        const headers = { 'Content-Type': 'application/json', 'x-api-key': this.apiKey };
        const data = { text_info: textInfo };
        const response = await axios.put(url, data, { headers });
        return response.data;
    }
}

module.exports = InstaFillClient;