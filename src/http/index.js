import axios from "axios";
// import { getStorage } from "../util/Storage";

const $http = axios.create({
    baseURL: '',
    timeout: 3 * 1000,
    // headers: { 'X-Custom-Header': 'foobar' }
});

// 添加请求拦截器
$http.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    // config.headers.accessToken = getStorage("blogUserToken").userToken ? getStorage("blogUserToken").userToken : '';
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
$http.interceptors.response.use(function(response) {
    // 对响应数据做点什么

    return response;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

/**
 * get方法 对应get请求
 * @param {string} url 【请求的url地址】
 * @param  {Object} params 【请求时携带的参数】
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        //  异步操作
        $http.get(url, {
                params
            })
            .then(res => {
                // console.log(1)
                resolve(res)
            })
            .catch(err => {
                // console.log(2)
                reject(err)
            })
    })

}
/**
 * post方法 对应post请求
 * @param {string} url 【请求的url地址】
 * @param  {Object} params 【请求时携带的参数】
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        //  异步操作
        $http.post(url, params)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })

}