import React, { memo, useState, useEffect } from 'react'
import { Link } from 'umi'
import styles from './index.less'

interface IProps {
	clicked: boolean
	clickWaveItem: () => void
}

const wave_items = [
	{
		bg_top: '#E91E63',
		path: 'classic'
	},
	{
		bg_top: '#F44336',
		path: 'classic'
	},
	{
		bg_top: '#FF9800',
		path: 'classic'
	},
	{
		bg_top: '#D3C22F',
		path: 'classic'
	},
	{
		bg_top: '#4CAF50',
		path: 'classic'
	},
	{
		bg_top: '#00BCD4',
		path: 'classic'
	},
	{
		bg_top: '#448AFF',
		path: 'classic'
	},
	{
		bg_top: '#E040FB',
		path: 'classic'
	},
	{
		bg_top: '#7C4DFF',
		path: 'classic'
	}
]

const Index = (props: IProps) => {
	const { clicked, clickWaveItem } = props
	const [ state_mounted, setStateMounted ] = useState<boolean>(false)
	const [ state_active_index, setStateActiveIndex ] = useState<number | null>(null)

	useEffect(() => {
		setTimeout(() => {
			setStateMounted(true)
		}, 2000)
	}, [])

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

	const getBgTop = (index: number): string => {
		if (state_active_index !== null) {
			return `rgba(255,255,255,${1 / 9 * Math.abs(state_active_index - index)})`
		} else {
			return `rgba(255,255,255,${1 / 9 * (index + 1)})`
		}
	}

	return (
		<div
			className={`${styles._local} w_100vw h_100vh border_box fixed top_0 left_0 flex justify_center align_center`}
		>
			<div
				className='wave_items border_box flex justify_center'
				onMouseOut={() => {
					setStateActiveIndex(null)
				}}
			>
				{wave_items.map((item, index) => (
					<Link
						className={`
                                          wave_item 
                                          ${getItemClass(index)} 
                                          ${state_mounted ? 'mounted' : 'animation disabled'} 
                                          ${clicked ? 'clicked' : ''} 
                                          ${state_active_index === index ? 'active' : ''} 
                                          border_box flex justify_center align_center cursor_point relative
                                    `}
						style={{
							animationDuration: `${1.5 - index * 0.01}s`,
							animationDelay: `${state_active_index !== null
								? 0
								: 0 + index * 0.08}s`
						}}
						onMouseEnter={() => setStateActiveIndex(index)}
						onClick={() => clickWaveItem()}
						to={`/${item.path}`}
						key={index}
					>
						<div
							className='bg_bottom absolute w_100 h_100'
							style={{
								zIndex: 2,
								opacity: `${state_active_index !== null ? 1 : 0}`,
								background: `${state_active_index !== null
									? wave_items[state_active_index].bg_top
									: ''}`
							}}
						/>
						<div
							className='bg_top absolute w_100 h_100'
							style={{
								zIndex: 3,
								backgroundColor: `${getBgTop(index)}`
							}}
						/>
					</Link>
				))}
			</div>
		</div>
	)
}

export default memo(Index)
