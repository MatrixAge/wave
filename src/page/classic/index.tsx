import React from 'react'
import styles from './index.less'

export default () => {
	return (
		<div className={`${styles._local} w_100 h_100vh fixed z_index_1000`}>
			<div id='wave' className='w_100 h_100vh flex align_center justify_center'>
				<canvas id='myCanvas1' width='700' height='600' />
				<canvas id='myCanvas' width='450' height='450'>
					您的浏览器不支持canvas标签
				</canvas>
				<span id='wavejs'>WAVE.JS</span>
			</div>
		</div>
	)
}
