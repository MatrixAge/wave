import React from 'react'
import styles from './index.less'

interface IProps {
	visible: boolean
	maskVisible?: boolean
}

export default ({ visible, maskVisible }: IProps) => {
	return (
		<div
			className={`
                        ${styles.loading_wrap} 
                        ${visible ? styles.visible : ''} 
                        ${maskVisible ? styles.maskVisible : ''}
                  `}
		>
			<div className='loading'>
				<div className='icon_source_bottom icon_source' />
				<div className='icon_source_top icon_source' />
			</div>
		</div>
	)
}
