import axios from 'axios'
import util from '@/util/util.js'
import { Toast } from 'mint-ui'

// ----------------------------------------------------------------
// 开始动画
export default function ajax(url = '', params = {}, type = 'GET', isUrl = false) {
	let promise
	return new Promise((resolve, reject) => {
		// 设置headers
		var headers = {
			// 'k': 'ae33f8f114f45938b86fa5b920fecda4',
			// 'u': 'fa7608620b016707ecb3232c43e1565a',
			// 'Authorization': 'APPCODE 27c2bdd6227a4962b0779b6f6e1c881c',
			// 'X-Ca-Stage': 'test',
			'u':util.getCookie('UserID') ? util.getCookie('UserID'): util.getCookie('u'),
			'k':util.getCookie('token') ? util.getCookie('token'): util.getCookie('k'), 
		}
		if (type === 'GET') {
			let paramsStr = ''
			// 拼接请求字符串
			Object.keys(params).forEach(key => {
				paramsStr += key + '=' + encodeURIComponent(params[key]) + '&'
			})
			// 处理最后一个&
			if (paramsStr !== '') {
				paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'))
			}
			// 完整路径
			url += '?' + paramsStr
			
			promise = axios.get(url, {
				headers
			})
		} else if (type === 'POST') {
			promise = axios.post(url, params, {
				headers
			})
		}
		// 返回请求数据
		promise.then(reqponse => {
			resolve(reqponse.data)
		}).catch(error => {
			reject(error)
			Toast({
        message: '网络连接失败'
      })
		})
	})
}
// let loading = null
// function startLoading () {
//   loading = Loading.service({
//     lock: true,
//     // text: '拼命加载中',
//     // background: 'rgba(0,0,0,0.7)'
//     text: '',
//     background: 'transparent'
//   })
// }
// // 结束加载动画
// function endLoading () {
//   loading.close()
// }
// 请求过期时间
// axios.defaults.timeout = 5000
// axios.defaults.withCredentials=true
// // 请求拦截
// axios.interceptors.request.use(config => {
//   startLoading()
//   return config
// }, error => {
//   return Promise.reject(error)
// })
// // 响应拦截
// axios.interceptors.response.use(response => {
//   endLoading()
//   return response
// }, error => {
//   endLoading()
//   // Message.error(error.response.data)
//   return Promise.reject(error)
// })
