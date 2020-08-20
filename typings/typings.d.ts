declare module '*.css'
declare module '*.less'
declare module '*.png'
declare module '*.svg' {
	export function ReactComponent (props: React.SVGProps<SVGSVGElement>): React.ReactElement
	const url: string
	export default url
}

declare module 'md5'
declare module 'store'
declare module 'dva-model-extend'

interface Window {
	webkitAudioContext: new (contextOptions?: AudioContextOptions | undefined) => AudioContext
}
