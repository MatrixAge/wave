import store from 'store'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import commonModal from '@/util/model/common'
import Service from '@/service'

export default modelExtend(commonModal, {
	namespace: 'app',

	state: {
		login: false,
		profile: {},
		visible_login: false,
		playlist: store.get('playlist') || [],
		visible_playlist: false,
		songlist: [],
		song_url: '',
		current_song: {},
		playing: false,
		clicked: false
	},

	subscriptions: {
		setup ({ dispatch }: any) {
			dispatch({ type: 'refresh' })
		}
	},

	effects: {
		*login ({ payload }: any, { call, put }: any) {
			const { phone, md5_password } = payload

			const res = yield call(Service.login, { phone, md5_password })

			if (res.code !== 200) return

			yield put({
				type: 'updateState',
				payload: {
					login: true,
					profile: res.profile,
					visible_login: false
				}
			})

			message.success('login success')

			store.set('userinfo', res)
		},
		*refresh (_: any, { call, put }: any) {
			const userinfo = store.get('userinfo')

			if (!userinfo) return

			const { code } = yield call(Service.refresh)

			if (code === 200) {
				yield put({
					type: 'updateState',
					payload: {
						login: true,
						profile: store.get('userinfo').profile
					}
				})
			} else {
				message.error('login failed')

				yield put({
					type: 'updateState',
					payload: { login: false }
				})
			}

			yield put({ type: 'getDefaultSong' })
		},
		*getPlaylist (_: any, { call, put }: any) {
			const { profile: { userId } } = store.get('userinfo')

			const { code, playlist } = yield call(Service.getPlaylist, userId)

			if (code !== 200) return

			yield put({
				type: 'updateState',
				payload: { playlist }
			})

			store.set('playlist', playlist)
		},
		*getPlaylistDetail ({ payload }: any, { call, put }: any) {
			const { id } = payload
			const { code, playlist: { tracks } } = yield call(Service.getPlaylistDetail, id)

			if (code !== 200) return

			yield put({
				type: 'updateState',
				payload: { songlist: tracks }
			})

			store.set(`songlist_${id}`, tracks)
		},
		*getSongUrl ({ payload }: any, { call, put }: any) {
			const { id } = payload
			const { code, data } = yield call(Service.getSongUrl, id)

			if (code !== 200) return

			if (!data[0].url) {
				message.warning('copyright is limited,vip only!')

				yield put({
					type: 'updateState',
					payload: {
						playing: false,
						song_url: null
					}
				})

				return
			}

			yield put({
				type: 'updateState',
				payload: { song_url: data[0].url }
			})
		},
		*getDefaultSong (_: any, { put }: any) {
			const playlist_active_id = store.get('playlist_active_id')
			const songlist_active_item = store.get('songlist_active_item')

			if (!playlist_active_id) return
			if (!songlist_active_item) return

			const songlist = store.get(`songlist_${playlist_active_id}`)

			if (!songlist) return

			yield put({
				type: 'updateState',
				payload: { current_song: songlist[songlist_active_item.index] }
			})

			yield put({
				type: 'getSongUrl',
				payload: { id: songlist_active_item.id }
			})
		}
	}
})
