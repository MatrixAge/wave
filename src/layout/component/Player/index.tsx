import React, { memo } from 'react'
import {
	StepBackwardOutlined,
	PauseOutlined,
	StepForwardOutlined,
	SoundOutlined,
	UnorderedListOutlined
} from '@ant-design/icons'
import styles from './index.less'

interface IProps {
	showPlayList: () => void
}

const Index = (props: IProps) => {
	const { showPlayList } = props

	return (
		<div
			className={`${styles._local} w_100 border_box flex justify_center fixed left_0 bottom_0`}
		>
			<div className='player border_box flex justify_center align_center relative'>
				<div className='flex w_100 h_100 border_box justify_between align_center'>
					<div className='flex align_center'>
						<div className='cover flex'>
							<img
								className='img_cover'
								alt='cover'
								src='https://p2.music.126.net/lWau3wyyNgzJlQQLGMp8pw==/3340316325989302.jpg?param=100y100'
							/>
						</div>
						<div className='producer_wrap flex flex_column line_clamp_1'>
							<span className='song_name'>Colors</span>
							<span className='producer'>Tobu</span>
						</div>
					</div>
					<div className='options_wrap flex align_center'>
						<div className='duration_value flex align_center'>
							<span className='current'>1:26</span>
							<span>/</span>
							<span className='total'>3:44</span>
						</div>
						<SoundOutlined className='option' />
						<UnorderedListOutlined
							className='option'
							onClick={() => showPlayList()}
						/>
					</div>
				</div>
				<div className='controls_wrap h_100 absolute flex justify_center align_center'>
					<div className='controls flex align_center'>
						<StepBackwardOutlined className='prev' />
						<PauseOutlined className='start_pause' />
						<StepForwardOutlined className='next' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default memo(Index)
