import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    demoKeys: [],
    demoChordMode: false,
    selectedKey: void(0),
    selectedChord: void(0)
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
    },
    setSelectedKey(state, payload) {
      if (state.selectedKey == payload)
        payload = void(0);
      state.selectedKey = payload;
    },
    setSelectedChord(state, payload) {
      if (state.selectedChord == payload)
        payload = void(0);
      state.selectedChord = payload;
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
        payload.key = !!payload.chord ? {          
          notes: !!payload.inversionIndex ? _.find(payload.chord.inversions, x => x.index == payload.inversionIndex).notes : payload.chord.notes
        } : void(0);
        context.commit('changeDemoKeys', payload);
        context.commit('changeDemoChordMode', true);
      },
      setSelectedKey(context, payload) {
        context.commit('setSelectedKey', payload);
      },
      setSelectedChord(context, payload) {
        context.commit('setSelectedChord', payload);
      }
  },
  getters: {
    
  }
})
