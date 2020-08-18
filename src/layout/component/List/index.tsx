import React, { memo, useState, useEffect } from 'react'
import styles from './index.less'

interface IProps {
	clicked: boolean
	clickWaveItem: () => void
}

const wave_items = [
	{
		bg_top: 'linear-gradient(45deg, rgb(175, 135, 206), rgb(234, 26, 127))'
	},
	{
		bg_top: 'linear-gradient(30deg, rgb(234, 26, 127), rgb(254, 198, 3))'
	},
	{
		bg_top: 'linear-gradient(30deg, rgb(254, 198, 3), rgb(168, 243, 135))'
	},
	{
		bg_top: 'linear-gradient(30deg, rgb(168, 243, 135), rgb(22, 214, 250))'
	},
	{
		bg_top: 'linear-gradient(0deg, rgb(123, 223, 242), rgb(242, 181, 212))'
	},
	{
		bg_top: 'linear-gradient(0deg, rgb(178, 247, 239), rgb(123, 223, 242))'
	},
	{
		bg_top: 'linear-gradient(0deg, rgb(215, 241, 240), rgb(179, 219, 216))'
	},
	{
		bg_top: 'linear-gradient(0deg, rgb(254, 229, 224), rgb(255, 191, 197))'
	},
	{
		bg_top: 'linear-gradient(0deg, rgb(236, 225, 201), rgb(229, 203, 147))'
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
				className='wave_items border_box flex justify_center transition_slow'
				onMouseOut={() => {
					setStateActiveIndex(null)
				}}
			>
				{wave_items.map((_, index) => (
					<div
						className={`
                                          wave_item 
                                          ${getItemClass(index)} 
                                          ${state_mounted ? 'mounted' : 'animation disabled'} 
                                          ${clicked ? 'clicked' : ''} 
                                          ${state_active_index === index ? 'active' : ''} 
                                          border_box flex justify_center align_center cursor_point relative
                                    `}
						style={{
							zIndex:
								state_active_index !== null
									? 9 - Math.abs(state_active_index - index)
									: 0,
							animationDuration: `${1.5 - index * 0.01}s`,
							animationDelay: `${state_active_index !== null
								? 0
								: 0 + index * 0.08}s`
						}}
						onMouseEnter={() => setStateActiveIndex(index)}
						onClick={() => clickWaveItem()}
						key={index}
					>
						<div
							className='bg_bottom absolute w_100 h_100'
							style={{
								zIndex: 1,
								opacity: `${state_active_index !== null ? 1 : 0}`,
								background: `${state_active_index !== null
									? wave_items[state_active_index].bg_top
									: ''}`
							}}
						/>
						<div
							className='bg_top absolute w_100 h_100'
							style={{
								zIndex: 2,
								backgroundColor: `${getBgTop(index)}`
							}}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default memo(Index)
