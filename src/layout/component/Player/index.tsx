import React, { memo, useState, useEffect, useRef, useCallback } from 'react'
import {
	StepBackwardOutlined,
	PauseOutlined,
	StepForwardOutlined,
	SoundOutlined,
	UnorderedListOutlined
} from '@ant-design/icons'
import { getDuration, getCurrentTime } from './util'
import { usePlayer } from './util/hook'
import styles from './index.less'

interface IProps {
	song_url: string
	current_song: any
	playing: boolean
	showPlayList: () => void
	changeStatus: (status?: boolean) => void
}

const Index = (props: IProps) => {
	const { song_url, current_song, playing, showPlayList, changeStatus } = props
	const has_current = Object.keys(current_song).length > 0
	const audio_ctx = new window.AudioContext()

	const [ state_duration_time, setStateDurationTime ] = useState<string>('')
	const [ state_current_time, setStateCurrentTime ] = useState<string>('')
	const [ state_current, setStateCurrent ] = useState<number>(0)
	const [ state_percent, setStatePercent ] = useState<number>(0)
	const audio = useRef<HTMLAudioElement>(null)

	usePlayer(audio, playing)

	useEffect(
		() => {
			const audio_dom = audio.current

			if (!audio_dom) return
			if (!song_url) return

			audio_dom.src = song_url
			audio_dom.load()
			audio_dom.ondurationchange = () => getDuration(audio_dom, setStateDurationTime)
			audio_dom.ontimeupdate = () => {
				const current = Math.floor(audio_dom.currentTime)

				if (current === state_current) return

				setStateCurrent(current)
			}
		},
		[ song_url ]
	)

	useEffect(
		() => {
			const audio_dom = audio.current

			if (!audio_dom) return

			setStatePercent(Math.floor(audio_dom.currentTime * 100 / audio_dom.duration))
			getCurrentTime(audio_dom, setStateCurrentTime)

                  if (audio_dom.currentTime === audio_dom.duration) {
                        changeStatus(false)
			}
		},
		[ state_current ]
	)

	return (
		<div
			className={`${styles._local} w_100 border_box flex justify_center fixed left_0 bottom_0`}
		>
			<audio id='audio' ref={audio} preload='auto' />
			<div className='player border_box flex justify_center align_center relative'>
				<div
					className='info_wrap flex w_100 h_100 border_box justify_between align_center transition_normal'
					style={{
						backgroundImage:
							'linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3))',
						backgroundSize: `${state_percent}% 100%`,
						backgroundRepeat: 'no-repeat'
					}}
				>
					<div className='flex align_center'>
						<div
							className={`
                                                cover 
                                                ${playing ? 'playing' : 'pause'} 
                                                flex justify_center align_center
                                          `}
						>
							<img
								className={`
                                                      img_cover 
                                                      ${!current_song.hasOwnProperty('al')
										? 'placeholder'
										: ''}
                                                `}
								alt='cover'
								src={
									has_current ? (
										current_song.al.picUrl
									) : (
										'' ||
										require('@/image/logo_netease_music_white.svg')
									)
								}
							/>
						</div>
						<div className='producer_wrap flex flex_column'>
							<span className='song_name line_clamp_1'>
								{has_current ? current_song.name : ''}
							</span>
							<div className='producer w_100 inline_block line_clamp_1'>
								{has_current ? (
									current_song.ar.map((item: any) => (
										<span
											className='producer_name'
											key={item.id}
										>
											{item.name}
										</span>
									))
								) : (
									''
								)}
							</div>
						</div>
					</div>
					<div className='options_wrap flex align_center'>
						<div className='duration_value flex align_center'>
							<span className='current'>{state_current_time}</span>
							<span>/</span>
							<span className='total'>{state_duration_time}</span>
						</div>
						<SoundOutlined className='option' />
						<UnorderedListOutlined
							className='option'
							onClick={() => showPlayList()}
						/>
					</div>
				</div>
				<div className='controls_wrap h_100 absolute flex justify_center align_center'>
					<div className='controls flex align_center'>
						<StepBackwardOutlined className='prev cursor_point' />
						<div
							className='status_wrap flex justify_center align_center cursor_point'
							onClick={() => changeStatus()}
						>
							{playing ? (
								<PauseOutlined className='start_pause' />
							) : (
								<img
									className='icon_play'
									src={require('@/image/icon_play.svg')}
									alt='icon_play'
								/>
							)}
						</div>
						<StepForwardOutlined className='next cursor_point' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default memo(Index)
