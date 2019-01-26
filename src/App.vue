<template>
  <div id="app">
    <div class="keyboard-container">
      <Keyboard/>
    </div>
    <div class="lists-container">      
      <div>
        <Keys/>
      </div>
      <div>
        <Chords/>
      </div>
    </div>
  </div>
</template>

<script>
import Keyboard from './components/Keyboard.vue'
import Keys from './components/Keys.vue'
import Chords from './components/Chords.vue'

export default {
  name: 'app',
  components: {
    Keyboard,
    Keys,
    Chords
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

.lists-container {
  width: 1110px;
  position:relative; 
  margin-top:180px;
  display: grid;
  grid-template: 100% / 1fr 1fr;
}
</style>
