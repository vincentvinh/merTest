import axios from 'axios'
import authHeader from './auth-header.service'
const API_URL = 'http://127.0.0.1:8000/api/v1/'

class UserService {
  me () {
    console.log(authHeader())
    axios.defaults.headers.common.Authorization = authHeader()
    return axios
      .get(API_URL + 'users/me')
      .then(response => {
        console.log(response.data)

        return response.data
      })
  }
}

export default new UserService()
