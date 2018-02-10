const state = {
  switchOn: false,
  windowMaximize: false
}

const mutations = {
  TURN_ON_SWITCH (state) {
    state.switchOn = true
  },
  TURN_OFF_SWITCH (state) {
    state.switchOn = false
  },
  MAXIMIZE_WINDOW (state) {
    state.windowMaximize = true
  },
  MAXIMIZE_WINDOW_RESTORE (state) {
    state.windowMaximize = false
  }
}

const actions = {
  turnOnSwitch ({ commit }) {
    commit('TURN_ON_SWITCH')
  },
  turnOffSwitch ({ commit }) {
    commit('TURN_OFF_SWITCH')
  },
  maximizeWindow ({ commit }) {
    commit('MAXIMIZE_WINDOW')
  },
  maximizeWindowRestore ({ commit }) {
    commit('MAXIMIZE_WINDOW_RESTORE')
  }
}

const getters = {
  switchOn: state => state.switchOn,
  windowMaximize: state => state.windowMaximize
}

export default {
  state,
  mutations,
  actions,
  getters
}
