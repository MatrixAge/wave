import React, { memo, useEffect } from 'react'
import { ConnectProps } from 'umi'
import styles from './index.less'
import { IAudioContext } from '@/layout/component/Player'

interface IProps extends ConnectProps {
	audio_ctx: React.RefObject<IAudioContext>
}

const Index = (props: IProps) => {
	const { audio_ctx } = props

	// useEffect(() => {
	// 		if (!audio_ctx.current) return
	// 		if (!audio_ctx.current.analyser) return

	// 		const array = new Uint8Array(128)
	// 		audio_ctx.current.analyser.getByteFrequencyData(array)
		
	// }, [])

	return (
		<div className={`${styles._local} fixed z_index_1000`}>
			<div id='wave' className='w_100 h_100 flex align_center justify_center'>
				<canvas id='myCanvas1' width='700' height='600' />
				<canvas id='myCanvas' width='450' height='450'>
					您的浏览器不支持canvas标签
				</canvas>
				<span id='wavejs'>WAVE.JS</span>
			</div>
		</div>
	)
}

export default memo(Index)
