import modelExtend from 'dva-model-extend'

export const model = {
	reducers: {
		updateState (state: any, { payload }: any) {
			return {
				...state,
				...payload
			}
		}
	}
}

const commonModal = modelExtend(model, {
	state: {},

	reducers: {}
})

export default commonModal
