export const getDuration = (audio_dom: HTMLAudioElement, setStateDurationTime: any) => {
	const duration = Math.floor(audio_dom.duration % 60)

	if (isNaN(audio_dom.duration)) {
		setStateDurationTime('00:00')
	} else {
		if (duration < 10) {
			setStateDurationTime(
				'0' +
					Math.floor(audio_dom.duration / 60) +
					':0' +
					Math.floor(audio_dom.duration % 60)
			)
		} else {
			setStateDurationTime(
				'0' +
					Math.floor(audio_dom.duration / 60) +
					':' +
					Math.floor(audio_dom.duration % 60)
			)
		}
	}
}

export const getCurrentTime = (audio_dom: HTMLAudioElement, setStateCurrentTime: any) => {
	const current_time = Math.floor(audio_dom.currentTime % 60)

	if (current_time < 10) {
		setStateCurrentTime(
			'0' +
				Math.floor(audio_dom.currentTime / 60) +
				':0' +
				Math.floor(audio_dom.currentTime % 60)
		)
	} else {
		if (audio_dom.currentTime == NaN) {
			audio_dom.currentTime = 0
		}

		setStateCurrentTime(
			'0' +
				Math.floor(audio_dom.currentTime / 60) +
				':' +
				Math.floor(audio_dom.currentTime % 60)
		)
	}
}
