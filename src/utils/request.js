import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken, setToken } from '@/utils/auth'
import * as hashes from "jshashes";
import getUrl from './url'

// 创建axios实例
export const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  console.log(process.env.NODE_ENV)
  let prefix = getUrl.requestUrls[getUrl.allHttpRequest[config.url].prefix][process.env.NODE_ENV];
  let requrl = prefix + getUrl.allHttpRequest[config.url].url;
  getToken() && (config.headers.Authorization = `bearer ${getToken()}`)
  config.headers['content-type'] = 'application/json'
  config.url = requrl;

  return config
}, error => {

  console.log(error)
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
    let message = "服务端连接失败";
    if (error.response) {
      message = error.response.statusText;
      if (message == 'Unauthorized') {
        console.log(error.response)
        message = "请重新授权";
        // setToken("")
        // setTimeout(() => {
        //   location.href = "./#/login"
        // }, 1000);
      }
    }
    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

//请求配置
export function getData(Data, url, SystemEnName) {
  if (Data) {
    if (typeof (Data) != 'string') {
      Data = JSON.stringify(Data)
    }
  } else {
    Data = "";
  }
  let time = new Date().getTime();
  let token = getToken();
  return {
    Data: Data,
    FunctionEnName: "",
    SystemEnName: SystemEnName || "newProduct",
    Url: url,
    AccessToken: token,
    Time: time,
    Signature: new hashes.SHA256().hex_hmac(token, Data + "-.-" + url + "@.@" + time)
  };
}