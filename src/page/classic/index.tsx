import React, { memo } from 'react'
import styles from './index.less'

const Index = () => {
	return (
		<div
			className={`${styles._local} fixed w_100vw h_100vh flex justify_center align_center`}
		>
			123
		</div>
	)
}

export default memo(Index)
