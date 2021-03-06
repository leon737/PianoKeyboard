<template>
    <div>
        <div>
            <el-checkbox v-model="lockKeys" @change="lockKeysChanged">Lock keys</el-checkbox>
            <el-button @click="reset" icon="el-icon-close"> Reset</el-button>
        </div>
        <div class="piano-keyboard">
            <div v-for="key in keys" 
                :key="key.index" class="key" 
                :style="{left:`${getLeft(key.index)}px`}" 
                :class="getWhiteOrBlackKeyClass(key.index)"
                @mousedown="keyDown(key.index)"
                @mouseup="keyUp(key.index)">
                    <div class="note-name">{{getNoteName(key.index)}}</div>
            </div>
        </div>
    </div>
</template>

<script>

import {range, each, some, indexOf} from 'lodash';
import $ from 'expose-loader?jQuery!jquery';
import 'ms-signalr-client';
import EventBus from '@/services/EventBus';

const connection = $.hubConnection('http://127.0.0.1:8088');
const proxy = connection.createHubProxy('MyHub');

const octavesCount = 4;
const keys = range(octavesCount * 12).map((__, i) => ({index: i, down: false}));

const isBlackKey = (index) => {
    const indexInsideOctave = index % 12;
    switch (indexInsideOctave) {
        case 1:
        case 3:
        case 6:
        case 8:
        case 10:
            return true;
        default:
            return false;
    }
};

proxy.on('addMessage', function(name, note) {
    EventBus.$emit(name, note);
});

// atempt connection, and handle errors
connection.start({ jsonp: true })
.done(function(){ console.log('Now connected, connection ID=' + connection.id); })
.fail(function(){ console.log('Could not connect'); });

export default {   
    data() {
        return {
            keys: keys,
            lockKeys: true
        }
    },
    computed: {
        demoKeys() { return this.$store.state.demoKeys},
        demoKey() { return this.$store.state.demoKey},
        demoChordMode() { return this.$store.state.demoChordMode}
    },
    methods: {
        getLeft(index) {
            let left = 0;
            for (let i = 0; i < index; ++i) {
                if (!isBlackKey(i)) {
                    left += 50;
                }
            }
            return left;
        },
        getWhiteOrBlackKeyClass(index)  {
            const baseClass = isBlackKey(index) ? 'black' : 'white';
            const upDownClass = this.keys[index].down ? 'down' : 'up';
            const demoKeySelected = indexOf(this.demoKeys, this.demoChordMode ? index : index % 12) >= 0;
            return [baseClass, demoKeySelected ? `${baseClass}-demo` : `${baseClass}-${upDownClass}`];
        },
        keyDown(index) {
            if (this.lockKeys) {
                this.keys[index].down = !this.keys[index].down;
            }
            else {
                this.keys[index].down = true;
            }
            this.emitKeyChangedEvent();
        },
        keyUp(index) {
            if (!this.lockKeys) {
                this.keys[index].down = false;
                this.emitKeyChangedEvent();
            }
        },
        lockKeysChanged(e) {
            if (!this.lockKeys) {
                each(this.keys, v => {v.down = false});
                this.emitKeyChangedEvent();
            }
        },
        emitKeyChangedEvent() {
            this.$store.dispatch('changePressedKeys', {keys: this.keys.filter(x => !!x.down)});
        },
        reset() {
             each(this.keys, v => {v.down = false});
                this.emitKeyChangedEvent();
            this.$store.dispatch('reset');
        },
        getNoteName(index) {
            if (!this.demoKey || !this.demoKey.getNoteName) return '';
            index = index % 12;
            if (some(this.demoKey.notes, x => x == index)) {               
               return this.demoKey.getNodeNameByLinearIndex(index);
            }
            return ''
        }
    },
    mounted() {
        EventBus.$on('note on', note => {
            if (note < 36 || note > 83) return;
            this.keys[note - 36].down = true;
            this.emitKeyChangedEvent();
        });
        EventBus.$on('note off', note => {
            if (note < 36 || note > 83) return;
            this.keyUp(note - 36);
        })
    } 
}
</script>
<style scoped>
    .piano-keyboard {
        position: relative;
        margin-top: 10px;
    }

    .key {
        position: absolute;
        top: 0;
        cursor: pointer;
    }

    .white {
        width: 50px;
        height: 150px;
        border: solid 1px #000;
        z-index: 0;
    }

    .black {
        width: 26px;
        height: 100px;
        z-index: 1;
        margin-left: -13px;
    }

    .white-up {
        background-color: #fff;
    }
    
    .black-up {
        background-color: #000;
    }

    .white-down {
        background-color: #aaa;
    }

    .black-down {
        background-color: #666;
    }

    .white-demo {
        background-color: lightgreen;
    }

    .black-demo {
        background-color: darkgreen;
    }

    .white .note-name {
        padding: 120px 0 0 0;
        color: #000;
        width: 100%;
        text-align: center;
    }

    .black .note-name {
        padding: 70px 0 0 0;
        color: #fff;
        width: 100%;
        text-align: center;
    }
</style>


