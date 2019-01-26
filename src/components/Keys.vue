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
                :class="getParallelKeyClass(key)"
                @mouseenter="mouseEnter(key)" 
                @mouseleave="mouseLeave(key)">
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
            selectedKey: void(0),
            groupBy: 'kind'
        }
    },
    computed: {
        selectedParallelKey() {
            if (!this.selectedKey) return void(0);
            return _.find(keyService.keys, x => x.containsAllNotes(this.selectedKey.notes) && x != this.selectedKey);
        },
        notes() { return this.$store.state.notes.map(n => n.index) },
        orderedKeys() { 
            return _.orderBy(this.keys, v => this.groupBy == 'root' ? v.root : v.type);
        }
    },
    methods: {
        emitKeySelectedEvent(key) {
            this.$store.dispatch('changeDemoKeys', {key: key});
        },
        mouseEnter (key) {
            this.selectedKey = key;
            this.emitKeySelectedEvent(key);            
        },
        mouseLeave (key) {
            this.selectedKey = void(0);
            this.emitKeySelectedEvent(void(0));
        },
        getParallelKeyClass(key) {
            return key == this.selectedParallelKey ? 'parallel-key' : '';
        }
    },
    watch: {
        notes (newValue, oldValue) {
            this.keys = keyService.keys.filter(x => x.containsAllNotes(newValue));
        }
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
</style>


