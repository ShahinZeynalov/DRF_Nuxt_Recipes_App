import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

export default {
  login(context) {
    console.log('----', context);
    return apiClient.post('login/', context)
  },
  logout(token) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
    return axios({
      baseURL: 'http://127.0.0.1:8000/api/v1/',
      withCredentials: false,
      url: 'logout/', 
      method: 'post',
      headers: headers
    })
  },
  me({ config }) {
    return apiClient.get('user/', config)
  }
}