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
		songlist: []
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
            *getPlaylistDetail({ payload }: any, { call, put }: any) {
			const { id } = payload
			const { code, playlist: { tracks } } = yield call(Service.getPlaylistDetail, id)

			if (code !== 200) return

			yield put({
				type: 'updateState',
				payload: { songlist: tracks }
                  })
                  
                  store.set(`songlist_${id}`, tracks)
		}
	}
})
