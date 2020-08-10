import { RequestConfig } from 'umi'
import store from 'store'

const BASE_URL = 'http://linklink.in:3000'

export const request: RequestConfig = {
	requestInterceptors: [
		(url) => {
			if (url === '/login/cellphone') return { url: `${BASE_URL}${url}` }

			const { cookie } = store.get('userinfo')

			return {
				url: `${BASE_URL}${url}?cookie=${cookie}`
			}
		}
	]
}
