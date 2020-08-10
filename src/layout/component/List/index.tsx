import React, { memo, useState } from 'react'
import styles from './index.less'

const wave_items: Array<any> = Array.from({ length: 9 }, (_, x) => x)

const Index = () => {
	const [ state_active_index, setStateActiveIndex ] = useState<number | null>(null)

	const getItemClass = (index: number) => {
		if (state_active_index !== null) {
			if (index - state_active_index === 0) {
				return `item_0 offset_${Math.abs(state_active_index - 4)}`
                  } else {
                        return 'item_' + Math.abs(index - state_active_index)
                  }
		} else {
			return ''
		}
	}

	return (
		<div
			className={`${styles._local} w_100vw h_100vh border_box fixed top_0 left_0 flex justify_center align_center`}
		>
			<div
				className='wave_items border_box flex justify_center transition_slow'
				onMouseOut={() => {
					setStateActiveIndex(null)
				}}
			>
				{wave_items.map((item, index) => (
					<div
						className={`
                                          wave_item 
                                          ${getItemClass(index)} 
                                          border_box flex justify_center align_center cursor_point
                                    `}
						onMouseEnter={() => {
							setStateActiveIndex(index)
						}}
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
