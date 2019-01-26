<template>
    <div class="container">
        <ul>
            <li v-for="key in keys" 
                :key="`${key.root}:${key.type}`" 
                :class="getParallelKeyClass(key)"
                @mouseenter="mouseEnter(key)" 
                @mouseleave="mouseLeave(key)">
                {{key.rootName}} {{key.type}}
            </li>
        </ul>
    </div>
</template>
<script>

import KeyService from '@/services/KeyService'

const keyService = new KeyService();

export default {
    props: {
        notes: Array
    },
    data () {
        return {
            keys: [],
            selectedKey: void(0)
        }
    },
    computed: {
        selectedParallelKey() {
            if (!this.selectedKey) return void(0);
            return _.find(keyService.keys, x => x.containsAllNotes(this.selectedKey.notes) && x != this.selectedKey);
        }
    },
    methods: {
        mouseEnter (key) {
            this.selectedKey = key;
            this.$emit('keySelected', {key: key});
            
        },
        mouseLeave (key) {
            this.selectedKey = void(0);
            this.$emit('keySelected', {key: void(0)});            
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
<style>
    .container {
        width: 150px;
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


