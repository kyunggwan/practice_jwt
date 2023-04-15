import axios from 'axios'

//axios 인스턴스 생성
const BASE_URL = "http://3.35.179.46:8080/data/"
const BASE_FLASK_URL = "http://3.35.179.46:5000/data/"

const axiosAPI = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options })
  return instance
}

const axiosAuthAPI = (url, options) => {
  const token = sessionStorage.getItem('accessToken') || ''
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` }, //bearer를 사용하는건 암묵적 약속
    ...options,
  });
  // return instance
  instance.interceptors.response.use(    
    (response) => {      
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status },
      } = error;
      
      const originalRequest = config;
  
      if (status === 401) {
        const accessToken = sessionStorage.getItem('accessToken');
        const refreshToken = sessionStorage.getItem('refreshToken');
        
        try {
          const { data } = await axios({
            method: 'post',
            url: "http://3.35.179.46:8080/data/auth/reissue",
            data: { "accessToken": accessToken, "refreshToken": refreshToken },
          });
          console.log(data)
          const newAccessToken = data.accessToken;
          const newRefreshToken = data.refreshToken;
          
          originalRequest.headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + newA