import axios from 'axios'
import config from '../config'
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'

// 创建axios实例
export const service = axios.create({
    baseURL: config.url, // api的base_url
    timeout: 15000, // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
    config.headers.Authorization = `bearer ${getToken()}`;
    return config
}, error => {
    Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (!res.Succeed) {
            Message({
                message: res.Message,
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        if (error.response&&error.response.status == 401) {
            removeToken("");
            let url = location.origin + "/#/login"
            location.href = url
        }
        let errorMessage = (error.response && error.response.data && error.response.data.Message) || "服务器请求出错"
        Message({
            message: errorMessage,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error.response || error.response.data)
    }
)