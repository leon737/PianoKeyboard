<template>
    <div class="container">   
        <el-row>     
            <el-col :span="4">
                <div class="label">Group by</div>
            </el-col>
            <el-col :span="10">
                <el-select v-model="groupBy">
                    <el-option value="root" label="Root note"></el-option>
                    <el-option value="kind" label="Kind"></el-option>
                </el-select>
            </el-col>
        </el-row>
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

import _ from 'lodash';

export default {
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
            return _.find(this.$store.getters.allKeys, x => x.containsAllNotes(this.highlightedKey.notes) && x != this.highlightedKey);
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

    .label {
        line-height: 40px;
        
    }

</style>


