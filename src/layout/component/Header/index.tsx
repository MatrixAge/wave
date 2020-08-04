import React, { useState } from 'react'
import { StarOutlined, CloseCircleOutlined } from '@ant-design/icons'
import styles from './index.less'

interface IRelatedItem {
	name: string
	class: string
	href: string
	star: string
}

const related_items: Array<IRelatedItem> = [
	{
		name: 'UmiJS',
		class: 'umi',
		href: 'https://github.com/umijs/umi',
		star: '8.6k'
	},
	{
		name: 'Ant Design',
		class: 'ant_design',
		href: 'https://github.com/Binaryify/NeteaseCloudMusicApi',
		star: '62.2k'
	},
	{
		name: 'Netease Cloud Music Api',
		class: 'cloud_music',
		href: 'https://github.com/Binaryify/NeteaseCloudMusicApi',
		star: '16.3k'
	},
	{
		name: 'Vercel',
		class: 'vercel',
		href: 'https://vercel.com',
		star: '100k+'
	}
]

const Index = () => {
	const [ state_visible_info, setStateVisibleInfo ] = useState(false)
	return (
		<div
			className={`${styles._local} w_100 border_box flex flex_column justify_center align_center`}
		>
			<img
				className='logo cursor_point'
				src={require('@/image/logo_wave_nobg.png')}
				alt='logo'
				onClick={() => setStateVisibleInfo(true)}
			/>
			{state_visible_info && (
				<div className='info_wrap border_box fixed top_0 left_0 w_100vw h_100vh flex justify_center align_center'>
					<div className='info border_box flex flex_column relative'>
						<div
							className='btn_close absolute cursor_point'
							onClick={() => setStateVisibleInfo(false)}
						>
							<CloseCircleOutlined style={{ fontSize: '24px' }} />
						</div>
						<a
							className='info_row_item w_100 border_box flex justify_between align_center transition_normal'
							href='https://github.com/MatrixAge/wave'
							target='_blank'
							rel='noopener noreferrer'
						>
							<div className='name flex align_center'>
								<img
									className='icon icon_github mr_10'
									src={require('@/image/icon_github.svg')}
									alt='icon_github'
								/>
								<span className='text'>Github</span>
							</div>
							<div className='value'>
								<span>github.com/MatrixAge/wave</span>
							</div>
						</a>
						<span className='title w_100 text_center inline_block font_bold'>
							Related
						</span>
						<div className='info_block_items w_100 border_box flex flex_wrap'>
							{related_items.map((item) => (
								<a
									className={`info_block_item border_box ${item.class} relative`}
									href={item.href}
									target='_blank'
									rel='noopener noreferrer'
									key={item.class}
								>
									<div className='bg absolute w_100 h_100' />
									<div className='content relative w_100 border_box h_100 flex transition_normal'>
										<span className='name'>
											{item.name}
										</span>
										<div className='star_wrap absolute flex align_center'>
											<StarOutlined
												style={{ fontSize: '13px' }}
											/>
											<span className='count ml_4'>
												{item.star}
											</span>
										</div>
									</div>
								</a>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Index
