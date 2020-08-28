import React, { memo, useRef, useMemo } from 'react'
import { history } from 'umi'
import { ArrowLeftOutlined } from '@ant-design/icons'
import * as THREE from 'three'
import { Canvas, useFrame } from 'react-three-fiber'
import Controls from './component/Controls'
import styles from './index.less'

interface IProps {
	audio: HTMLAudioElement
	analyser: AnalyserNode
}

const Boxes = ({ count, analyser }: { count: number; analyser: AnalyserNode }) => {
	const ref_mesh = useRef<any>()
	const dummy = useMemo(() => new THREE.Object3D(), [])

	const instances = useMemo(
		() => {
			const temp: any = []

			for (let i = 0; i < count; i++) {
				temp.push({
					x: -36 + i * 1.2,
					y: 0,
					z: 0
				})
			}

			return temp
		},
		[ count ]
	)

	useFrame(() => {
		if (!analyser) return

		const array = new Uint8Array(count)

		analyser.getByteFrequencyData(array)

		instances.map((item: any, index: number) => {
			dummy.position.set(item.x, item.y, item.z)
			dummy.translateY(array[index] * 0.05 / 2)
			dummy.scale.setY(array[index] * 0.05)

			dummy.updateMatrix()
			ref_mesh.current.setMatrixAt(index, dummy.matrix)
		})

		ref_mesh.current.instanceMatrix.needsUpdate = true
	})

	return (
		<instancedMesh ref={ref_mesh} args={[ null as any, null as any, count ]}>
			<cylinderBufferGeometry attach='geometry' args={[ 0.5, 0.5, 1, 20 ]} />
			<meshStandardMaterial attach='material' color='#FFEBEE' />
		</instancedMesh>
	)
}

const Index = (props: IProps) => {
	const { analyser } = props

	return (
		<div
			className={`${styles._local} fixed w_100vw h_100vh flex justify_center align_center`}
		>
			<div
				className='icon_back_wrap flex justify_center align_center absolute transition_normal cursor_point'
				onClick={() => history.push('/')}
			>
				<ArrowLeftOutlined className='icon_back' />
			</div>
			<Canvas shadowMap camera={{ position: [ 0, 0, 60 ] }}>
				<Controls />
				<ambientLight position={[ 0, 0, 40 ]} intensity={0.6} />
				<spotLight
					color='#2196F3'
					intensity={0.5}
					position={[ 0, 0, 30 ]}
					castShadow
				/>
				<Boxes count={60} analyser={analyser} />
			</Canvas>
		</div>
	)
}

export default memo(Index)
