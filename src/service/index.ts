import { request } from 'umi'
import API from '@/api'

export default {
	login: ({ phone, md5_password }: { phone: number; md5_password: string }) => {
		return request(API.API_login, { params: { phone, md5_password } })
	},
	refresh: () => {
		return request(API.API_refresh)
	}
}
