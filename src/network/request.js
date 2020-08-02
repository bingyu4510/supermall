import axios from "axios"
export function request(config) {

    const instance = axios.create({
        // baseURL: 'http://106.54.54.237:8000/api/wh',
        baseURL: 'http://127.127.32.32:8000/api/c3p0',
        timeout: 10000
    });
    instance.interceptors.response.use(rem => {
            return rem.data
        }), res => {
            // console.log(res)
        }
        // instance(config)返回的也是一个promise，所以不用自己再封装一个
    return instance(config)
}
