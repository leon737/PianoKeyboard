<template>
    <div class="container">
        <ul>
            <li v-for="chord in chords" 
                :key="`${chord.root}:${chord.suffix}:${chord.subSuffix}`" 
                @mouseenter="mouseEnter(chord)" 
                @mouseleave="mouseLeave(chord)">
                {{chord.rootName}}{{chord.suffix}}<span class="sub">{{chord.subSuffix}}</span>
            </li>
        </ul>
    </div>
</template>
<script>

import ChordService from '@/services/ChordService'

const chordService = new ChordService();

export default {
    data () {
        return {
            chords: [],
            selectedChord: void(0)        
        }
    },
    computed: {        
        notes() { return this.$store.state.notes.map(n => n.index) }
    },
    methods: {
        emitKeySelectedEvent(chord) {
             this.$store.dispatch('changeChordDemoKeys', {key: chord});
        },
        mouseEnter (chord) {
            this.selectedChord = chord;
            this.emitKeySelectedEvent(chord);            
        },
        mouseLeave (chord) {
            this.selectedChord = void(0);
            this.emitKeySelectedEvent(void(0));
        }
    },
    watch: {
        notes (newValue, oldValue) {
            this.chords = chordService.chords.filter(x => x.containsAllNotes(newValue));
        }
    }
    
}
</script>
<style scoped>
    .container {
        width: 300px;
        column-count: 4;
        column-gap: 50px;
    }

    ul {
        margin: 0;
    }

    li {
        cursor: pointer;
    }

    li:hover {
        background-color: lightcyan;
        font-weight: bold;
    }

    .parallel-key {
        color: aqua;
    }

    span.sub {
        vertical-align: sub;
        font-size: 14px;
    }
</style>


