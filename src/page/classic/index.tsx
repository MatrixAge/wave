import React, { memo } from 'react'
import { ConnectProps } from 'umi'
import styles from './index.less'

interface IProps extends ConnectProps {
	audio: HTMLAudioElement
	analyser: AnalyserNode
}

const Index = (props: IProps) => {
	const { audio, analyser } = props

	return (
		<div
			className={`${styles._local} fixed w_100vw h_100vh flex justify_center align_center`}
			onClick={() => {
				// history.push('/')
			}}
		/>
	)
}

export default memo(Index)
