
export default {
  namespaced: true,
  state: {
    lightBoxVisible: false,
    lightBoxList: [],
    lightBoxIndex: 0
  },
  getters: {

  },
  mutations: {
    showLightBox (state, {imgs, index = 0}) {
      if (typeof imgs === 'string') {
        state.lightBoxList = [imgs]
      } else {
        state.lightBoxList = imgs
      }
      state.lightBoxIndex = index
      state.lightBoxVisible = true
    },
    hideLightBox (state) {
      state.lightBoxVisible = false
      state.lightBoxList = []
      state.lightBoxIndex = 0
    }
  }
}
