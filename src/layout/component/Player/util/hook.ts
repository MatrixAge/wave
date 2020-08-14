import { useEffect, RefObject } from 'react'

export const usePlayer = (audio: RefObject<HTMLAudioElement>, playing: boolean) => {
	useEffect(
		() => {
			const audio_dom = audio.current

			if (!audio_dom) return

			const startPause = async () => {
				if (playing) {
					const res: any = await audio_dom.play()

					if (res) return

					audio_dom.oncanplay = () => {
						audio_dom.play().catch((e) => {
							console.log(e)
						})
					}
				} else {
					audio_dom.pause()
				}
			}

			startPause()
		},
		[ playing ]
	)
}
