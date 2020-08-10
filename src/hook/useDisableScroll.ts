import { useEffect } from 'react'

const Index = (state_visible: boolean, id: string) => {
	useEffect(
		() => {
			const array_events = [ 'touchmove', 'scroll', 'mousewheel' ]

			if (state_visible) {
				const modal = document.getElementById(id)

				if (!modal) return

				array_events.map((item) => {
					modal.addEventListener(
						item,
						(event: any) => {
							event.preventDefault()
						},
						{ passive: false }
					)
				})
			} else {
				const modal = document.getElementById(id)

				if (!modal) return

				array_events.map((item) => {
					modal.removeEventListener(item, (event: any) => {
						event.preventDefault()
					})
				})
			}
		},
		[ state_visible ]
	)
}

export default Index
