import axios from "axios"
export function request(config) {

<<<<<<< HEAD
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000/api/x6/home/multidata',
    baseURL: 'http://123.207.32.32:8000/api/h8',
    timeout: 10000
  });
  instance.interceptors.response.use(rem => {
      return rem.data
    }), res => {
      // console.log(res)
    }
    // instance(config)返回的也是一个promise，所以不用自己再封装一个
  return instance(config)
=======
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
>>>>>>> c6416ea14b42a153cc83f526f89de70ddd83f653
}
