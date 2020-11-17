import axios from 'axios'
import vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: "http://localhost/admin/api"
})


// 配置请求头
http.interceptors.request.use(config => {
  // token 类型，行业规范
  if(sessionStorage.token){
    config.headers.Authorization = 'Bearer ' + (sessionStorage.token || ' ') 
  }
  return config
}, err => {
  return Promise.reject(err)
})


http.interceptors.response.use(res => {
  return res

}, err => {
  if (err.response.data.msg) {
    vue.prototype.$message({
      message: err.response.data.msg,
      type: 'error'
    })
    if(err.response.status === 401){
      router.push('/login')
    }
  }
  console.log()
  return Promise.reject(err)
})


export default http
