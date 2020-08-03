import React from 'react'
import Header from './component/Header'
import List from './component/List'
import Player from './component/Player'
import styles from './index.less'

interface IProps {
	children: React.ReactChild
}

export default ({ children }: IProps) => {
	return (
		<div className={`${styles._local} w_100 border_box flex justify_center`}>
			<div className='width_wrap flex flex_column'>
				<Header />
				<List />
				<Player />
				{children}
			</div>
		</div>
	)
}
