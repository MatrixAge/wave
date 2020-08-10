import React, { memo } from 'react'
import { Form, Input, Button } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import md5 from 'md5'
import styles from './index.less'

const { Item } = Form

interface IProps {
	visible: boolean
	loading: boolean
	hideLogin: () => void
	login: ({ phone, md5_password }: { phone: number; md5_password: string }) => void
}

const Index = (props: IProps) => {
	const { visible, loading, hideLogin, login } = props

	const onFinish = (values: any) => {
		const { phone, password } = values

		login({ phone, md5_password: md5(password) })
	}

	return (
		<div className={`${styles._local}`}>
			{visible && <div className='mask w_100vw h_100vh fixed top_0 left_0' />}
			{visible && (
				<div className='login_wrap w_100 h_100vh fixed top_0 left_0 flex justify_center align_center'>
					<div className='login border_box flex flex_column align_center relative'>
						<div className='btn_close absolute cursor_point'>
							<CloseCircleOutlined
								style={{ color: 'white', fontSize: '24px' }}
								onClick={() => hideLogin()}
							/>
						</div>
						<img
							className='logo_netease_music'
							src={require('@/image/logo_netease_music.svg')}
							alt='logo_netease_music'
						/>
						<Form className='w_100' name='login' onFinish={onFinish}>
							<Item
								name='phone'
								rules={[
									{
										required: true,
										pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
										message: 'Input your phone number!'
									}
								]}
							>
								<Input
									size='large'
									type='number'
									placeholder='phone'
								/>
							</Item>
							<Item
								name='password'
								rules={[
									{
										required: true,
										message: 'Input your password!'
									}
								]}
							>
								<Input
									size='large'
									type='password'
									placeholder='password'
								/>
							</Item>
							<Item>
								<Button
									className='btn_login w_100'
									size='large'
									type='primary'
									htmlType='submit'
									loading={loading || false}
								>
									Login
								</Button>
							</Item>
							<div className='statement w_100 flex flex_column align_center'>
								<span className='text'>
									login to your netease music account
								</span>
								<span className='text'>
									the token will be only saved in local
								</span>
							</div>
						</Form>
					</div>
				</div>
			)}
		</div>
	)
}

export default memo(Index)
