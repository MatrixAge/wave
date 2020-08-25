declare module '*.js'
declare module '*.css'
declare module '*.less'
declare module '*.png'
declare module '*.svg' {
	export function ReactComponent (props: React.SVGProps<SVGSVGElement>): React.ReactElement
	const url: string
	export default url
}

declare module 'md5'
declare module 'lerp'
declare module 'store'
declare module 'dva-model-extend'
declare module 'threejs-meshline'

interface Window {
	webkitAudioContext: new (contextOptions?: AudioContextOptions | undefined) => AudioContext
}

declare namespace JSX {
	interface IntrinsicElements {
		meshLine: any
		meshLineMaterial: any
	}
}
