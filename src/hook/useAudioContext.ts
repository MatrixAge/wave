const getAudioContext = () => {
	if (window.AudioContext) return new window.AudioContext()
	if (window.webkitAudioContext) return new window.webkitAudioContext()

	return false
}

// const context = useRef<IAudioContext | undefined | false>(getAudioContext())

// const audio_ctx = context.current
// if (!audio_ctx) return

// const source = audio_ctx.createMediaElementSource(audio_dom)
// const analyser = audio_ctx.createAnalyser()

// analyser.fftSize = 4096
// source.connect(analyser)
// analyser.connect(audio_ctx.destination)

// audio_ctx.analyser = analyser
