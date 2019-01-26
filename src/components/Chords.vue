<template>
    <div class="container">
        <span>Group by </span>
        <select v-model="groupBy">
            <option value="root">Root note</option>
            <option value="kind">Kind</option>
        </select>
        <div class="list">
            <ul>
                <li v-for="chord in orderedChords" 
                    :key="`${chord.root}:${chord.suffix}:${chord.subSuffix}`" >
                    <div class="chord-line">
                        <div
                            @mouseenter="mouseEnter(chord)" 
                            @mouseleave="mouseLeave(chord)">
                            {{chord.rootName}}{{chord.suffix}}<span class="sub">{{chord.subSuffix}}</span>
                        </div>
                        <div v-for="inversion in chord.inversions" 
                            :key="inversion.index" 
                            class="inversion"
                            @mouseenter="mouseEnter(chord, inversion.index)" 
                            @mouseleave="mouseLeave(chord)">
                                {{inversion.index}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

import ChordService from '@/services/ChordService'

const chordService = new ChordService();

export default {
    data () {
        return {
            chords: [],
            selectedChord: void(0),
            groupBy: 'root'        
        }
    },
    computed: {        
        notes() { return this.$store.state.notes.map(n => n.index) },
         orderedChords() { 
            return _.orderBy(this.chords, v => this.groupBy == 'root' ? v.root : v.suffix + v.subSuffix);
        }
    },
    methods: {
        emitKeySelectedEvent(chord, inversionIndex) {
             this.$store.dispatch('changeChordDemoKeys', {chord: chord, inversionIndex: inversionIndex});
        },
        mouseEnter (chord, inversionIndex) {
            this.selectedChord = chord;
            this.emitKeySelectedEvent(chord, inversionIndex);            
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
        width: 350px;        
    }

    .list {
        margin-top: 15px;
        column-count: 2;
        column-gap: 30px;
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

    span.sub {
        vertical-align: sub;
        font-size: 14px;
    }

    .inversion {
        background-color: red;
        border-radius: 50%;
        font-size: 12px;
        color: #fff;
        width: 15px;
        height: 15px;
        text-align: center;
    }

     .inversion:hover {        
        color: darkred;
    }

    .chord-line {
        display: grid;
        grid-template-columns: 70px 16px 16px 16px 16px 16px;
    }
</style>


