import { useEffect, RefObject } from 'react'

export const usePlayer = (
	audio: RefObject<HTMLAudioElement>,
	playing: boolean,
	setStateAnimate: any
) => {
	useEffect(
		() => {
			const audio_dom = audio.current

			if (!audio_dom) return

			const getState = async (): Promise<any> => {
				return new Promise((resolve) => {
					const timer = setInterval(() => {
						if (audio_dom.readyState === 4) {
							clearInterval(timer)
							resolve()
						}
					}, 30)
				})
			}

			const startPause = async () => {
				if (playing) {
					await getState()

					const res: any = await audio_dom.play()

					setStateAnimate(true)

					if (res) return

					audio_dom.oncanplay = () => {
                                    setStateAnimate(true)
                                    
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
