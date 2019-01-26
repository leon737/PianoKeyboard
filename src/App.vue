<template>
  <div id="app">
    <div class="keyboard-container">
      <Keyboard @keysChanged="keysChanged" :demoKeys="demoKeys"/>
    </div>
    <div style="position:relative; margin-top:180px">
      <Keys :notes="notes" @keySelected="keySelected"/>
    </div>
  </div>
</template>

<script>
import Keyboard from './components/Keyboard.vue'
import Keys from './components/Keys.vue'

export default {
  name: 'app',
  components: {
    Keyboard,
    Keys
  },
  data() {
    return {
      notes: [],
      demoKeys: []
    }
  },
  methods: {
    keysChanged(e) {
      this.notes = e.keys.map(v => v.index);
    },
    keySelected(e) {
      if (!!e.key) {
        this.demoKeys = e.key.notes;
      }
      else {
        this.demoKeys = [];
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.keyboard-container {
  position: relative;
  margin: 0 0 0 30px;
}
</style>
