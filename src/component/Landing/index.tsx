import React from 'react'
import styles from './index.less'

export default () => {
	return (
		<div
			className={styles.loading_wrap}
		>
			<div className='loading'>
				<div className='icon_source_bottom icon_source' />
				<div className='icon_source_top icon_source' />
			</div>
		</div>
	)
}
