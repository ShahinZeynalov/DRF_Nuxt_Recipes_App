import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getRecipes () {
    return apiClient.get('/api/v1/recipes/')
  },
  getRecipe (id) {
    return apiClient.get(`/api/v1/recipes/${id}`)
  },
  addRecipe (formData, config) {
    console.log('---formData', formData, '---config', config);
    return apiClient.post(`/api/v1/recipes/`, formData, config)
  },
  updateRecipe (formData, config) {
    return apiClient.patch(`/api/v1/recipes/${formData.get('id')}/`, formData, config)
  },
  deleteRecipe (id) {
    return apiClient.delete(`/api/v1/recipes/${id}`)
  },
}