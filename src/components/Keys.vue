<template>
    <div class="container">        
        <span>Group by </span>
        <select v-model="groupBy">
            <option value="root">Root note</option>
            <option value="kind">Kind</option>
        </select>
        <ul>
            <li v-for="key in orderedKeys" 
                :key="`${key.root}:${key.type}`" 
                :class="getKeyClass(key)"
                @mouseenter="mouseEnter(key)" 
                @mouseleave="mouseLeave(key)"
                @click="click(key)">
                {{key.rootName}}{{key.type}}
            </li>
        </ul>
    </div>
</template>
<script>

import KeyService from '@/services/KeyService'
import _ from 'lodash';

const keyService = new KeyService();

export default {
    data () {
        return {
            keys: [],
            highligtedKey: void(0),
            groupBy: 'kind'
        }
    },
    computed: {
        selectedParallelKey() {
            if (!this.highligtedKey) return void(0);
            return _.find(keyService.keys, x => x.containsAllNotes(this.highligtedKey.notes) && x != this.highligtedKey);
        },
        notes() { return this.$store.state.notes.map(n => n.index) },
        orderedKeys() { 
            return _.orderBy(this.keys, v => this.groupBy == 'root' ? v.root : v.type);
        },
        selectedKey() { return this.$store.state.selectedKey },
        selectedChord() { return this.$store.state.selectedChord }
    },
    methods: {
        emitKeySelectedEvent(key) {
            this.$store.dispatch('changeDemoKeys', {key: key});
        },
        mouseEnter (key) {
            this.highligtedKey = key;
            this.emitKeySelectedEvent(key);            
        },
        mouseLeave (key) {
            this.highligtedKey = void(0);
            this.emitKeySelectedEvent(void(0));
        },
        click (key) {
            this.$store.dispatch('setSelectedKey', key);
        },
        getKeyClass(key) {
            const selectedKeyClass = key == this.selectedKey ? 'selected-key' : '';
            const parallelKeyClass = key == this.selectedParallelKey ? 'parallel-key' : '';
            return `${selectedKeyClass} ${parallelKeyClass}`;
        },
        updateKeys() {
            this.keys = (() => {
                const keysByNotes = keyService.keys.filter(x => x.containsAllNotes(this.notes));
                if (!this.selectedChord)
                    return keysByNotes;              
                const keysBySelectedChord = keyService.keys.filter(x => x.containsAllNotes(this.selectedChord.notes));
                if (!this.notes || !this.notes.length)
                    return keysBySelectedChord;  
                return _.intersection(keysByNotes, keysBySelectedChord);
            })();
        }
    },
    watch: {
        notes () { this.updateKeys() },
        selectedChord() { this.updateKeys() }
    }
    
}
</script>
<style scoped>
    .container {
        width: 200px;
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

    .selected-key {
        font-size: 24px;
    }

</style>


