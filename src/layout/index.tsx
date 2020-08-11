import React, { memo } from 'react'
import { connect } from 'umi'
import store from 'store'
import Header from './component/Header'
import List from './component/List'
import Player from './component/Player'
import Playlist from './component/Playlist'
import Login from './component/Login'
import styles from './index.less'

const Index = ({
	children,
	dispatch,
	loading_login,
	loading_getPlaylistDetail,
	login,
	profile,
	visible_login,
	playlist,
	visible_playlist,
	songlist
}: any) => {
	const props_header = {
		login,
		profile,
		showLogin: () => {
			dispatch({
				type: 'app/updateState',
				payload: { visible_login: true }
			})
		}
	}

	const props_login = {
		visible: visible_login,
		loading: loading_login,
		hideLogin: () => {
			dispatch({
				type: 'app/updateState',
				payload: { visible_login: false }
			})
		},
		login: ({ phone, md5_password }: { phone: number; md5_password: string }): void => {
			dispatch({
				type: 'app/login',
				payload: { phone, md5_password }
			})
		}
	}

	const props_player = {
		showPlayList: () => {
			dispatch({
				type: 'app/updateState',
				payload: { visible_playlist: true }
			})

			if (store.get('playlist')) return

			dispatch({ type: 'app/getPlaylist' })
		}
	}

	const props_playlist = {
		visible: visible_playlist,
		playlist,
		songlist,
		loading: loading_getPlaylistDetail,
		getPlaylistDetail: (id: number) => {
			const songlist = store.get(`songlist_${id}`)

			if (songlist) {
				dispatch({
					type: 'app/updateState',
					payload: { songlist }
				})

				return
			}

			dispatch({
				type: 'app/getPlaylistDetail',
				payload: { id }
			})
		},
		syncPlaylist: () => {
			dispatch({ type: 'app/getPlaylist' })
		},
		syncPlaylistDetail: (id: number) => {
			dispatch({
				type: 'app/getPlaylistDetail',
				payload: { id }
			})
		}
	}

	return (
		<div className={`${styles._local} w_100 border_box flex flex_column align_center`}>
			<Header {...props_header} />
			<List />
			<Player {...props_player} />
			<Login {...props_login} />
			<Playlist {...props_playlist} />
			{children}
		</div>
	)
}

export default memo(
	connect(
		({
			app: { login, profile, visible_login, playlist, visible_playlist, songlist },
			loading
		}: any) => {
			const loading_login = loading.effects['app/login']
			const loading_getPlaylistDetail = loading.effects['app/getPlaylistDetail']

			return {
				loading_login,
				loading_getPlaylistDetail,
				login,
				profile,
				visible_login,
				playlist,
				visible_playlist,
				songlist
			}
		}
	)(Index)
)
