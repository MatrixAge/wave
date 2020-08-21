import React, { memo, useEffect } from 'react'
import { history, ConnectProps } from 'umi'
import styles from './index.less'

interface IProps extends ConnectProps {
	audio: HTMLAudioElement
	analyser: AnalyserNode
}

const Index = (props: IProps) => {
	const { audio, analyser } = props

	console.log(audio)
	console.log(analyser)

	useEffect(() => {
		if (!audio) return
		if (!analyser) return

		let cancel_id: number

		const log = () => {
			const array = new Uint8Array(128)
			analyser.getByteFrequencyData(array)

			console.log(array)
			cancel_id = requestAnimationFrame(log)
		}

		log()

		return () => {
			cancelAnimationFrame(cancel_id)
		}
	}, [])

	return (
		<div
			className={`${styles._local} fixed w_100vw h_100vh`}
			onClick={() => {
				history.push('/')
			}}
		>
			123
		</div>
	)
}

export default memo(Index)
