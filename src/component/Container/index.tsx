import React from 'react'
import Loading from '../Loading'
import styles from './index.less'

interface IProps {
	children: React.ReactChild
	loading: boolean
}

const Index = ({ children, loading }: IProps) => {
	return (
		<div className={`${styles._local} ${loading ? styles.loading : ''}`}>
			{loading ? children : <Loading />}
		</div>
	)
}

export default Index
