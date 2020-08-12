import { request } from 'umi'
import API from '@/api'

export default {
	login: ({ phone, md5_password }: { phone: number; md5_password: string }) => {
		return request(API.API_login, { params: { phone, md5_password } })
	},
	refresh: () => {
		return request(API.API_refresh)
	},
	getPlaylist: (uid: number) => {
		return request(API.API_getPlaylist, { params: { uid } })
	},
	getPlaylistDetail: (id: number) => {
		return request(API.API_getPlaylistDetail, { params: { id } })
	},
	getSongUrl: (id: number) => {
		return request(API.API_getSongUrl, { params: { id } })
	}
}
