import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    demoKeys: []
  },
  mutations: {
    changePressedKeys(state, payload) {
        state.notes = payload.keys;
    },
    changeDemoKeys(state, payload) {
        if (!!payload.key) {
            state.demoKeys = payload.key.notes;
          }
          else {
            state.demoKeys = [];
          }
    }
  },
  actions: {
      changePressedKeys(context, payload) {   
        context.commit('changePressedKeys', payload);
      },
      changeDemoKeys(context, payload) {
        context.commit('changeDemoKeys', payload);
    }

  },
  getters: {
    
  }
})
