import React, { memo } from 'react'
import { connect } from 'umi'
import Header from './component/Header'
import List from './component/List'
import Player from './component/Player'
import Login from './component/Login'
import styles from './index.less'

const Index = ({ children, dispatch, login, profile, loading_login, visible_login }: any) => {
	const props_header = {
		login,
		profile,
		showLogin: () => {
			dispatch({
				type: 'app/updateState',
				payload: { visible_login: true }
			})
		}
	}

	const props_login = {
		visible: visible_login,
		loading: loading_login,
		hideLogin: () => {
			dispatch({
				type: 'app/updateState',
				payload: { visible_login: false }
			})
		},
		login: ({ phone, md5_password }: { phone: number; md5_password: string }): void => {
			dispatch({
				type: 'app/login',
				payload: { phone, md5_password }
			})
		}
	}

	return (
		<div className={`${styles._local} w_100 border_box flex flex_column align_center`}>
			<Header {...props_header} />
			<List />
			<Player />
			<Login {...props_login} />
			{children}
		</div>
	)
}

export default memo(
	connect(({ app: { login, profile, visible_login }, loading }: any) => {
		const loading_login = loading.effects['app/login']

		return { login, profile, visible_login, loading_login }
	})(Index)
)
