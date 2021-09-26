import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})
export default {
    getOrganizers() {
        return apiClient.get('/organizers')
    },
    getOrganizerList(perPage, page) {
        return apiClient.get('/organizerList?_limit=' + perPage + '&_page=' + page)
    },
    //Added new call
    getOrganizer(id) {
        return apiClient.get('/organizers/' + id)
    },
    saveOrganizer(organizer) {
        return apiClient.post('/organizers', organizer)
    },
    getOrganizerByKeyword(keyword, perPage, page) {
        return apiClient.get(
            'organizerList?_limit=' + perPage + '&_page=' + page + '&title=' + keyword
        )
    },
    uploadFile(file) {
        let formData = new FormData()
        formData.append('file', file)
        return apiClient.post('/uploadFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}