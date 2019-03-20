import {service} from '@/utils/request'
import axios from 'axios'

//全局请求
export function InitiateRequest(url, data, FunctionName) {
    return service({
        url: url,
        method: 'post',
        data
    })
}
const mymock = axios.create({
    timeout: 15000 // 请求超时时间
})
mymock.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    })
//mock模拟请求
export function mock(url) {
    return mymock.post(url)
}
