import React, { memo, useState, useEffect, useRef } from 'react'
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
	changeSong: (type: 'prev' | 'next') => void
}

const Index = (props: IProps) => {
	const { song_url, current_song, playing, showPlayList, changeStatus, changeSong } = props
	const has_current = Object.keys(current_song).length > 0

	const [ state_duration_time, setStateDurationTime ] = useState<string>('')
	const [ state_current_time, setStateCurrentTime ] = useState<string>('')
	const [ state_duration, setStateDuration ] = useState<number>(0)
	const [ state_current, setStateCurrent ] = useState<number>(0)
	const [ state_percent, setStatePercent ] = useState<number>(0)
	const [ state_animate, setStateAnimate ] = useState<boolean>(false)
	const audio = useRef<HTMLAudioElement>(null)
	const context = useRef(new window.AudioContext())

	usePlayer(audio, playing, setStateAnimate)

	useEffect(() => {
		const audio_dom = audio.current
		const audio_ctx = context.current

		if (!audio_dom) return
		if (!audio_ctx) return

		const source = audio_ctx.createMediaElementSource(audio_dom)
		const analyser = audio_ctx.createAnalyser()

		analyser.fftSize = 4096
		source.connect(analyser)
		analyser.connect(audio_ctx.destination)

		setTimeout(() => {
			const myCanvas: any = document.getElementById('myCanvas')
			const myCanvas1: any = document.getElementById('myCanvas1')

			if (!myCanvas) return
			if (!myCanvas1) return

			const canvasCtx = myCanvas.getContext('2d')
			const canvasCtx1 = myCanvas1.getContext('2d')

			const draw = () => {
				var cwidth = myCanvas.width,
					cheight = myCanvas.height,
					cwidth1 = myCanvas1.width,
					cheight1 = myCanvas1.height,
					array = new Uint8Array(128)

				analyser.getByteFrequencyData(array)
				canvasCtx.clearRect(0, 0, cwidth, cheight)
				canvasCtx1.clearRect(0, 0, cwidth1, cheight1)
				canvasCtx1.beginPath()
				canvasCtx1.arc(290, 290, 242, 0, 2 * Math.PI)
				canvasCtx1.fillStyle = 'black'
				canvasCtx1.fill()
				canvasCtx1.closePath()

				canvasCtx.fillStyle = 'white'

				for (var i = 0; i < array.length; i++) {
					var num = 0
					num = num + array[i]
					canvasCtx.beginPath()
					canvasCtx.arc(100, 120, array[45] / 3, 0, 2 * Math.PI)
					canvasCtx.arc(290, 120, array[110] / 3, 0, 2 * Math.PI)
					canvasCtx.fillRect(i * 3, 280, 1, array[i] / 8)
					canvasCtx.fill()
					canvasCtx.closePath()

					var rad
					if (array[3] > 200) {
						rad = array[3] - 210
					} else {
						rad = 0
					}

					canvasCtx1.beginPath()
					canvasCtx1.arc(290, 290, 240 + rad, 0, 2 * Math.PI)
					canvasCtx1.fillStyle = 'black'
					canvasCtx1.fill()
					canvasCtx1.closePath()
				}

				requestAnimationFrame(draw)
			}

			draw()
		}, 3000)
	}, [])

	useEffect(
		() => {
			const audio_dom = audio.current

			setStateCurrentTime('')
			setStateDurationTime('')
			setStateDuration(0)
			setStateCurrent(0)
			setStatePercent(0)
			setStateAnimate(false)

			if (!audio_dom) return

			audio_dom.pause()
			audio_dom.src = song_url

			audio_dom.ondurationchange = () => {
				setStateDuration(audio_dom.duration)
				getDuration(audio_dom, setStateDurationTime)
			}

			audio_dom.ontimeupdate = () => {
				setStateCurrent(Math.floor(audio_dom.currentTime))
			}
		},
		[ song_url ]
	)

	useEffect(
		() => {
			const audio_dom = audio.current

			if (!audio_dom) return

			const currentTime = Math.ceil(audio_dom.currentTime)
			const duration = Math.ceil(audio_dom.duration)

			setStatePercent(Math.ceil(currentTime * 100 / duration))
			getCurrentTime(audio_dom, setStateCurrentTime)

			if (currentTime === duration) {
				const timer = setInterval(() => {
					if (audio_dom.ended) {
						setStateCurrentTime('')
						setStateCurrent(0)
						setStatePercent(0)
						changeStatus(false)
						setStateAnimate(false)

						clearInterval(timer)
					}
				}, 30)
			}
		},
		[ state_current ]
	)

	return (
		<div
			className={`${styles._local} w_100 border_box flex justify_center fixed left_0 bottom_0`}
		>
			<audio id='audio' ref={audio} preload='auto' crossOrigin='anonymous' />
			<div
				className='player border_box flex justify_center align_center relative transition_normal'
				style={{
					background: `${has_current && playing
						? 'none'
						: 'var(--color_gradient)'}`
				}}
			>
				{has_current &&
				state_animate && (
					<div
						className={`
                                          bg_cover
                                          flex w_100 h_100 absolute left_0 top_0 transition_normal
                                          ${playing ? 'playing' : 'pause'} 
                                     `}
						style={{
							backgroundImage: `url(${current_song.al.picUrl})`,
							backgroundSize: `100%`,
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center center',
							animationDuration: `${state_duration
								? state_duration
								: '0'}s`
						}}
					/>
				)}
				<div
					className='info_wrap flex w_100 h_100 border_box justify_between align_center transition_normal relative'
					style={{
						backgroundImage:
							'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3))',
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
							<span className='current'>
								{state_current_time ? state_current_time : '00:00'}
							</span>
							<span>/</span>
							<span className='total'>
								{state_duration_time ? (
									state_duration_time
								) : (
									'00:00'
								)}
							</span>
						</div>
						<UnorderedListOutlined
							className='option'
							onClick={() => showPlayList()}
						/>
					</div>
				</div>
				<div className='controls_wrap h_100 absolute flex justify_center align_center'>
					<div className='controls flex align_center'>
						<StepBackwardOutlined
							className='prev cursor_point'
							onClick={() => {
								setStatePercent(0)
								setStateAnimate(false)
								changeSong('prev')
							}}
						/>
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
						<StepForwardOutlined
							className='next cursor_point'
							onClick={() => {
								setStatePercent(0)
								setStateAnimate(false)
								changeSong('next')
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default memo(Index)
