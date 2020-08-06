import React, { memo } from 'react'
import styles from './index.less'

const wave_items: Array<any> = Array.from({ length: 9 }, (_, x) => x)

const Index = () => {
	return (
		<div className={`${styles._local} w_100vw h_100vh border_box fixed top_0 left_0 flex justify_center align_center`}>
			<div className='wave_items border_box flex justify_center transition_slow'>
				{wave_items.map((_, index) => (
					<div
						className='wave_item border_box flex justify_center align_center cursor_point transition_normal'
						key={index}
					>
						{index}
					</div>
				))}
			</div>
		</div>
	)
}

export default memo(Index)
