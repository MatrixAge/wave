import { RequestConfig } from 'umi'
import { message as _message } from 'antd'
import store from 'store'

const BASE_URL = 'https://linklink.in/wave'

export const request: RequestConfig = {
	prefix: BASE_URL,
	requestInterceptors: [
		(url: string) => {
			if (url === '/login/cellphone') return { url: `${BASE_URL}${url}` }

                  const userinfo = store.get('userinfo')

			if (userinfo) {
				return {
					url: `${url}?cookie=${userinfo.cookie}`
				}
			} else {
				return {
					url: `${url}`
				}
			}
		}
	],
      errorHandler: async (err: any) => {
		const { code, message, msg } = await err.response.json()

		if (code !== 200) {
			_message.error(message || msg, 5)
		}

		return err
	}
}
