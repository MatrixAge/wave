import React, {
	memo,
	useState,
	useEffect,
	useRef,
	useImperativeHandle,
	forwardRef,
	MutableRefObject
} from 'react'
import {
	StepBackwardOutlined,
	PauseOutlined,
	StepForwardOutlined,
	UnorderedListOutlined
} from '@ant-design/icons'
import { getDuration, getCurrentTime } from './util'
import { usePlayer } from './util/hook'
import styles from './index.less'

interface IProps {
	login: boolean
	clicked: boolean
	song_url: string
	current_song: any
	playing: boolean
	showPlayList: () => void
	changeStatus: (status?: boolean) => void
	changeSong: (type: 'prev' | 'next') => void
}

export interface IAudioContext extends AudioContext {
	analyser?: AnalyserNode
}

const Index = (
	props: IProps,
	ref:
		| ((instance: IAudioContext | null) => void)
		| MutableRefObject<IAudioContext | null | undefined | false>
		| null
) => {
	const {
		login,
		clicked,
		song_url,
		current_song,
		playing,
		showPlayList,
		changeStatus,
		changeSong
	} = props
	const has_current = Object.keys(current_song).length > 0

	const [ state_duration_time, setStateDurationTime ] = useState<string>('')
	const [ state_current_time, setStateCurrentTime ] = useState<string>('')
	const [ state_duration, setStateDuration ] = useState<number>(0)
	const [ state_current, setStateCurrent ] = useState<number>(0)
	const [ state_percent, setStatePercent ] = useState<number>(0)
	const [ state_animate, setStateAnimate ] = useState<boolean>(false)
	const [ state_disabled, setStateDisabled ] = useState<boolean>(true)

	const getAudioContext = () => {
		if (window.AudioContext) return new window.AudioContext()
		if (window.webkitAudioContext) return new window.webkitAudioContext()

		return false
	}

	const audio = useRef<HTMLAudioElement>(null)
	const context = useRef<IAudioContext | undefined | false>(getAudioContext())

	usePlayer(audio, playing, setStateAnimate)

	useEffect(
		() => {
			const audio_dom = audio.current
			const audio_ctx = context.current

			if (!login) return
			if (!audio_dom) return
			if (!audio_ctx) return

			audio_dom.click()

			const source = audio_ctx.createMediaElementSource(audio_dom)
			const analyser = audio_ctx.createAnalyser()

			analyser.fftSize = 4096
			source.connect(analyser)
			analyser.connect(audio_ctx.destination)

			audio_ctx.analyser = analyser

			setTimeout(() => {
				setStateDisabled(false)
			}, 1000)
		},
		[ login ]
	)

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

	useImperativeHandle(ref, () => context.current)

	return (
		<div
			className={`
                        ${styles._local} 
                        ${clicked ? styles.clicked : ''} 
                        w_100 border_box flex justify_center fixed left_0 bottom_0
                  `}
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
				<div
					className={`
                                    ${state_disabled ? 'disabled' : ''}
                                    controls_wrap h_100 absolute flex justify_center align_center
                              `}
				>
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

export default memo(forwardRef(Index))
