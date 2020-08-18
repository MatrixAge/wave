import React, { memo, useRef } from 'react'
import { connect } from 'umi'
import { message } from 'antd'
import store from 'store'
import Header from './component/Header'
import List from './component/List'
import Player from './component/Player'
import Playlist from './component/Playlist'
import Login from './component/Login'
import styles from './index.less'
import { IAudioContext } from './component/Player'

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
	songlist,
	song_url,
	current_song,
	playing
}: any) => {
	const audio_ctx = useRef<IAudioContext>(null)

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
		ref: audio_ctx,
		song_url,
		current_song,
		playing,
		showPlayList: () => {
			if (!login) {
				message.warning('please login your netease cloud music account first!')

				return
			}

			dispatch({
				type: 'app/updateState',
				payload: { visible_playlist: true }
			})

			const playlist = store.get('playlist')
			const playlist_active_id = store.get('playlist_active_id')

			if (playlist) {
				const real_active_id = playlist_active_id
					? playlist_active_id
					: playlist[0].id
				const songlist = store.get(`songlist_${real_active_id}`)

				if (songlist) {
					dispatch({
						type: 'app/updateState',
						payload: { songlist }
					})

					return
				}

				dispatch({
					type: 'app/getPlaylistDetail',
					payload: {
						id: real_active_id
					}
				})

				return
			}

			dispatch({ type: 'app/getPlaylist' })
		},
		changeStatus: (status?: boolean) => {
			if (!Object.keys(current_song).length) return
			if (!song_url) return

			if (status === true || status === false) {
				dispatch({
					type: 'app/updateState',
					payload: { playing: status }
				})

				return
			}

			dispatch({
				type: 'app/updateState',
				payload: { playing: !playing }
			})
		},
		changeSong (type: 'prev' | 'next') {
			const playlist = store.get('playlist')
			const playlist_active_index = store.get('playlist_active_index')
			const songlist_active_item = store.get('songlist_active_item')

			if (!playlist) return
			if (!playlist_active_index) return

			const current_playlist: any = playlist[playlist_active_index]
			const current_songlist: any = store.get(`songlist_${current_playlist.id}`)

			if (!current_songlist) return

			let current_song: any

			if (!songlist_active_item) {
				current_song = current_songlist[0]
			} else {
				if (type === 'prev') {
					if (songlist_active_item.index === 0) return

					current_song = current_songlist[songlist_active_item.index - 1]

					store.set('songlist_active_item', {
						index: songlist_active_item.index - 1,
						id: current_song.id
					})
				}

				if (type === 'next') {
					if (songlist_active_item.index === current_songlist.length - 1) return

					current_song = current_songlist[songlist_active_item.index + 1]

					store.set('songlist_active_item', {
						index: songlist_active_item.index + 1,
						id: current_song.id
					})
				}
			}

			dispatch({
				type: 'app/updateState',
				payload: {
					current_song,
					playing: false
				}
			})

			dispatch({
				type: 'app/getSongUrl',
				payload: { id: current_song.id }
			})
		}
	}

	const props_playlist = {
		visible: visible_playlist,
		playlist,
		songlist,
		loading: loading_getPlaylistDetail,
		hidePlayList: () => {
			dispatch({
				type: 'app/updateState',
				payload: { visible_playlist: false }
			})
		},
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
		},
		getSongUrl: (id: number, song: any) => {
			dispatch({
				type: 'app/updateState',
				payload: {
					current_song: song,
					play: false
				}
			})

			dispatch({
				type: 'app/getSongUrl',
				payload: { id }
			})
		},
		showLogin: () => {
			dispatch({
				type: 'app/updateState',
				payload: { visible_login: true }
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
			{React.Children.map(children, (child) =>
				React.cloneElement(child, { audio_ctx })
			)}
		</div>
	)
}

export default memo(
	connect(
		({
			app: {
				login,
				profile,
				visible_login,
				playlist,
				visible_playlist,
				songlist,
				song_url,
				current_song,
				playing
			},
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
				songlist,
				song_url,
				current_song,
				playing
			}
		}
	)(Index)
)
