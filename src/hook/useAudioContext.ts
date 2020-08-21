import { useMemo, useRef } from 'react'

const Index = (audio_dom: HTMLAudioElement | null) => {
	const getAudioContext = () => {
		if (window.AudioContext) return new window.AudioContext()
		if (window.webkitAudioContext) return new window.webkitAudioContext()

		return false
	}

	const context = useRef<AudioContext | false>(getAudioContext())

	return useMemo(
		() => {
			const audio_ctx = context.current

			if (!audio_ctx) return
			if (!audio_dom) return

			const source = audio_ctx.createMediaElementSource(audio_dom)
			const analyser = audio_ctx.createAnalyser()

                  source.connect(analyser)
                  
			analyser.fftSize = 4096
                  analyser.connect(audio_ctx.destination)

			return { audio_ctx, analyser }
		},
		[ audio_dom ]
	)
}

export default Index
