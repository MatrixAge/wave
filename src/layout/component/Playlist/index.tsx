import React, { memo, useState } from 'react'
import { Tooltip } from 'antd'
import { LoadingOutlined, SyncOutlined, SwapOutlined, DownCircleOutlined } from '@ant-design/icons'
import styles from './index.less'

interface IProps {
	visible: boolean
	loading: boolean
	playlist: Array<any>
	songlist: Array<any>
	getPlaylistDetail: (id: number) => void
	syncPlaylist: () => void
	syncPlaylistDetail: (id: number) => void
}

const Index = (props: IProps) => {
	const {
		visible,
		loading,
		playlist,
		songlist,
		getPlaylistDetail,
		syncPlaylist,
		syncPlaylistDetail
	} = props
	const [ state_active_playlist_item_id, setStateActivePlaylistItemId ] = useState<
		number | null
	>(null)
	const [ state_active_songlist_item_id, setStateActiveSonglistItemId ] = useState<
		number | null
	>(null)

	return (
		<div
			className={`${styles._local} w_100 border_box flex justify_center fixed left_0 bottom_0`}
		>
			{visible && <div className='mask w_100vw h_100vh fixed top_0 left_0' />}
			{visible && (
				<div className='list_wrap w_100 h_100vh fixed top_0 left_0 flex justify_center align_center'>
					<div className='list border_box flex relative'>
						<div className='options_wrap absolute w_100 border_box flex justify_between align_center'>
							<div className='left flex align_center'>
								<Tooltip title='sync playlist'>
									<SyncOutlined
										className='mr_12 ml_2'
										onClick={() => syncPlaylist()}
									/>
								</Tooltip>
								<Tooltip title='sync songlist'>
									<SwapOutlined
										className='sync'
										onClick={() => {
											if (
												state_active_playlist_item_id
											) {
												syncPlaylistDetail(
													state_active_playlist_item_id
												)
											}
										}}
									/>
								</Tooltip>
							</div>
							<div className='right flex align_center'>
								<Tooltip title='hide'>
									<DownCircleOutlined />
								</Tooltip>
							</div>
						</div>
						<div className='playlist h_100 border_box flex flex_column '>
							<div className='top_mask playlist_mask absolute top_0 w_100' />
							<div className='bottom_mask playlist_mask absolute bottom_0 w_100' />
							{playlist.map((item) => (
								<div
									className={`
                                                            playlist_item 
                                                            ${item.id ===
										state_active_playlist_item_id
											? 'active'
											: ''} w_100 border_box flex align_center
                                                      `}
									key={item.id}
									onClick={() => {
										setStateActivePlaylistItemId(item.id)
										getPlaylistDetail(item.id)
									}}
								>
									<img
										className='icon_playlist'
										src={require('@/image/icon_playlist.svg')}
										alt='icon_playlist'
									/>
									<span className='list_name line_clamp_1'>
										{item.name}
									</span>
								</div>
							))}
						</div>
						<div className='songlist h_100 border_box'>
							{loading ? (
								<div className='loading_wrap w_100 h_100 flex justify_center align_center'>
									<LoadingOutlined
										style={{
											fontSize: '24px',
											color: 'white'
										}}
									/>
								</div>
							) : (
								songlist.map(
									(item) =>
										item.noCopyrightRcmd === null && (
											<div
												className={`
                                                                        songlist_item ${item.id ===
												state_active_songlist_item_id
													? 'active'
													: ''} w_100 border_box flex align_center
                                                                        `}
												key={item.id}
												onClick={() => {
													setStateActiveSonglistItemId(
														item.id
													)
												}}
											>
												<img
													className='icon_song'
													src={require('@/image/icon_song.svg')}
													alt='icon_song'
												/>
												<span className='list_name line_clamp_1'>
													{item.name}
												</span>
											</div>
										)
								)
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default memo(Index)
