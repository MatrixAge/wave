import React from 'react'
import styles from './index.less'

const wave_items: Array<any> = Array.from({ length: 30 }, (_, x) => x)

const Index = () => {
	return (
		<div className={`${styles._local} w_100 border_box`}>
			<div className='wave_items w_100 border_box flex flex_wrap'>
				{wave_items.map((item, index) => (
					<div className='wave_item border_box flex cursor_point' key={index}>
						{item}
					</div>
				))}
			</div>
		</div>
	)
}

export default Index
