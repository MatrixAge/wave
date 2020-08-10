import { RequestConfig } from 'umi'
import { message as _message } from 'antd'
import store from 'store'

const BASE_URL = 'http://linklink.in:3000'

export const request: RequestConfig = {
	timeout: 8000,
	requestInterceptors: [
		(url: string) => {
			if (url === '/login/cellphone') return { url: `${BASE_URL}${url}` }

			const { cookie } = store.get('userinfo')

			return {
				url: `${BASE_URL}${url}?cookie=${cookie}`
			}
		}
	],
	errorHandler: async (err: any) => {
		const { code, message } = await err.response.json()

		if (code !== 200) {
		      _message.error(message, 5)
            }

		return err
	}
}
