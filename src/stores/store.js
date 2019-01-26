import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    demoKeys: [],
    demoChordMode: false
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
    },
    changeDemoChordMode(state, payload) {
      state.demoChordMode = payload;
    }
  },
  actions: {
      changePressedKeys(context, payload) {   
        context.commit('changePressedKeys', payload);
      },
      changeDemoKeys(context, payload) {
        context.commit('changeDemoKeys', payload);
        context.commit('changeDemoChordMode', false);
      },
      changeChordDemoKeys(context, payload) {
        context.commit('changeDemoKeys', payload);
        context.commit('changeDemoChordMode', true);
      }
  },
  getters: {
    
  }
})
