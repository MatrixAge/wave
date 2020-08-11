import React, { memo, useState } from 'react'
import { StarOutlined, CloseCircleOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons'
import useDisableScroll from '@/hook/useDisableScroll'
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

interface IProps {
	login: boolean
	profile: any
	showLogin: () => void
}

const Index = (props: IProps) => {
	const { login, profile, showLogin } = props
	const [ state_visible_info, setStateVisibleInfo ] = useState(false)

	useDisableScroll(state_visible_info, 'modal_more')

	return (
		<div className={`${styles._local} w_100 border_box`}>
			<div className='header_wrap w_100 border_box flex justify_center fixed top_0 left_0'>
				<div className='header border_box flex justify_between align_center'>
					<img
						className='logo cursor_point transition_normal'
						src={require('@/image/logo_wave_nobg.png')}
						alt='logo'
						onClick={() => setStateVisibleInfo(true)}
					/>
					<span className='name'>wave.fm</span>
					<div className='options flex align_center'>
						{login ? (
							<a
								href={`https://music.163.com/#/user/home?id=${profile.userId}`}
								target='_blank'
								rel='noopener noreferrer'
							>
								<img
									className='avatar'
									src={profile.avatarUrl}
									alt='avatar'
								/>
							</a>
						) : (
							<UserOutlined
								className='option'
								onClick={() => showLogin()}
							/>
						)}
						<MenuOutlined
							className='option'
							onClick={() => setStateVisibleInfo(true)}
						/>
					</div>
				</div>
			</div>
			<div className='header_wrap_placeholder w_100 border_box' />
			{state_visible_info && (
				<div className='mask w_100vw h_100vh fixed top_0 left_0' />
			)}
			{state_visible_info && (
				<div
					id='modal_more'
					className='info_wrap border_box fixed top_0 left_0 w_100vw h_100vh flex justify_center align_center'
				>
					<div className='info border_box flex flex_column relative'>
						<div
							className='btn_close absolute cursor_point'
							onClick={() => setStateVisibleInfo(false)}
						>
							<CloseCircleOutlined style={{ fontSize: '24px' }} />
						</div>
						<div className='info_row_item_wrap w_100 border_box'>
							<a
								className='info_row_item w_100 border_box flex justify_between align_center'
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
						</div>
						<span className='title w_100 text_center inline_block'>
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
												style={{
													fontSize: '13px'
												}}
											/>
											<span className='count ml_4'>
												{item.star}
											</span>
										</div>
									</div>
								</a>
							))}
						</div>
						<span className='title w_100 text_center inline_block'>
							Statement
						</span>
						<div className='statement one w_100 border_box flex flex_column align_center'>
							<span>The Project is no-profit and supported by</span>
							<span>Netease CloudMusic</span>
							<span>（网易云音乐）</span>
						</div>
						<div className='statement two w_100 border_box flex flex_column align_center'>
							<span>Inspired by Active Theory works</span>
							<a
								href='https://emmitfenn.com'
								target='_blank'
								rel='noopener noreferrer'
							>
								emmitfenn.com
							</a>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default memo(Index)
