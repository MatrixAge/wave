import { useEffect, RefObject } from 'react'

export const usePlayer = (audio: RefObject<HTMLAudioElement>, playing: boolean) => {
	useEffect(
		() => {
			const audio_dom = audio.current

			if (!audio_dom) return

                  audio_dom.oncanplay = () => {
				if (playing) {
                              if (audio_dom.currentTime > 0) return

					audio_dom.play()
				}

				return
			}

			if (playing) {
                        if (audio_dom.currentTime > 0) return
                        
				audio_dom.play()
			} else {
				audio_dom.pause()
			}
		},
		[ playing ]
	)
}
