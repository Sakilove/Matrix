const state = {
  switchOn: false
}

const mutations = {
  TURN_ON_SWITCH (state) {
    state.switchOn = true
  },
  TURN_OFF_SWITCH (state) {
    state.switchOn = false
  }
}

const actions = {
  turnOnSwitch ({ commit }) {
    commit('TURN_ON_SWITCH')
  },
  turnOffSwitch ({ commit }) {
    commit('TURN_OFF_SWITCH')
  }
}

const getters = {
  switchOn: state => state.switchOn
}

export default {
  state,
  mutations,
  actions,
  getters
}
