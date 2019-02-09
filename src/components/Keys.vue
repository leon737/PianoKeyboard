<template>
    <div class="container">   
        <group-selector v-model="groupBy" />
        <div>
            <ul>
                <li v-for="key in orderedKeys" 
                    :key="`${key.root}:${key.type}`" 
                    :class="getKeyClass(key)"
                    @mouseenter="mouseEnter(key)" 
                    @mouseleave="mouseLeave(key)"
                    @click="click(key)">
                    {{key.rootName}}{{key.type}}                     
                    <span v-if="key.definition.signCount > 0 && highlightedKey == key">
                        {{key.definition.signCount}}{{key.definition.sign == 'sharp' ? '♯' : '♭'}}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

import {find, orderBy} from 'lodash';
import GroupSelector from '@/components/GroupSelector'

export default {
    components: { GroupSelector },
    data () {
        return {            
            highlightedKey: void(0),
            groupBy: 'kind'
        }
    },
    computed: {
        keys() { return this.$store.getters.keys },
        selectedParallelKey() {
            if (!this.highlightedKey) return void(0);
            return find(this.$store.getters.allKeys, x => x.containsAllNotes(this.highlightedKey.notes) && x != this.highlightedKey);
        },
        notes() { return this.$store.state.notes.map(n => n.index) },
        orderedKeys() { 
            return orderBy(this.keys, v => this.groupBy == 'root' ? v.root : v.type);
        },
        selectedKey() { return this.$store.state.selectedKey },
        selectedChord() { return this.$store.state.selectedChord }
    },
    methods: {
        emitKeySelectedEvent(key) {
            this.$store.dispatch('changeDemoKeys', { key });
        },
        mouseEnter (key) {
            this.highlightedKey = key;
            this.emitKeySelectedEvent(key);            
        },
        mouseLeave (key) {
            this.highlightedKey = void(0);
            this.emitKeySelectedEvent(void(0));
        },
        click (key) {
            this.$store.dispatch('setSelectedKey', key);
        },
        getKeyClass(key) {
            const selectedKeyClass = key == this.selectedKey ? 'selected-key' : '';
            const parallelKeyClass = key == this.selectedParallelKey ? 'parallel-key' : '';
            return `${selectedKeyClass} ${parallelKeyClass}`;
        }
        
    }
}
</script>
<style scoped>    

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


