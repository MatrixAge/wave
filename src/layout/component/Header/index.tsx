import React from 'react'
import { StarOutlined } from '@ant-design/icons'
import styles from './index.less'

const Index = () => {
	return (
		<div
			className={`${styles._local} w_100 border_box flex flex_column justify_center align_center`}
		>
			<img
				className='logo cursor_point'
				src={require('@/image/logo_wave_nobg.png')}
				alt='logo'
			/>
			<div className='info_wrap border_box fixed top_0 left_0 w_100vw h_100vh flex justify_center align_center'>
				<div className='info border_box flex flex_column'>
					<div className='info_row_item w_100 border_box flex justify_between align_center transition_normal'>
						<div className='name flex align_center'>
							<img
								className='icon icon_github mr_10'
								src={require('@/image/icon_github.svg')}
								alt='icon_github'
							/>
							<span className='text'>Github</span>
						</div>
						<div className='value'>
							<a
								href='https://github.com/MatrixAge/wave'
								target='_blank'
								rel='noopener noreferrer'
							>
								github.com/MatrixAge/wave
							</a>
						</div>
					</div>
					<span className='title w_100 text_center inline_block font_bold'>
						Related
					</span>
					<div className='info_block_items w_100 border_box flex flex_wrap'>
						<a
							className='info_block_item umi relative'
							href='https://github.com/umijs/umi'
							target='_blank'
							rel='noopener noreferrer'
						>
							<div className='bg absolute w_100 h_100' />
							<div className='content relative w_100 border_box h_100 flex flex_column justify_center align_center transition_normal'>
								<span className='name'>UmiJS</span>
								<div className='star_wrap absolute flex align_center'>
                                                      <StarOutlined style={{fontSize:'13px'}} />
									<span className='count ml_6'>8.6k</span>
								</div>
							</div>
                                    </a>
                                    <a
							className='info_block_item cloud_music relative'
							href='https://github.com/Binaryify/NeteaseCloudMusicApi'
							target='_blank'
							rel='noopener noreferrer'
						>
							<div className='bg absolute w_100 h_100' />
							<div className='content relative w_100 border_box h_100 flex flex_column justify_center align_center transition_normal'>
								<span className='name'>NeteaseCloudMusicApi</span>
								<div className='star_wrap absolute flex align_center'>
                                                      <StarOutlined style={{fontSize:'13px'}} />
									<span className='count ml_6'>16.3k</span>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Index
