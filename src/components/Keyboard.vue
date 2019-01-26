<template>
    <div>
        <div>
            <input type="checkbox" v-model="lockKeys" @change="lockKeysChanged" />Lock keys
            <input type="button" @click="reset" value="Reset" />
        </div>
        <div style="position:relative">
            <div v-for="key in keys" 
                :key="key.index" class="key" 
                :style="{left:`${getLeft(key.index)}px`}" 
                :class="getWhiteOrBlackKeyClass(key.index)"
                @mousedown="keyDown(key.index)"
                @mouseup="keyUp(key.index)">
            </div>
        </div>
    </div>
</template>

<script>

import _ from 'lodash';

import $ from 'expose-loader?jQuery!jquery';
import 'ms-signalr-client';

import EventBus from '@/services/EventBus';

const connection = $.hubConnection('http://127.0.0.1:8088');
const proxy = connection.createHubProxy('MyHub');

const octavesCount = 3;
const keys = _.range(octavesCount * 12).map((__, i) => ({index: i, down: false}));

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
            const demoKeySelected = _.indexOf(this.demoKeys, this.demoChordMode ? index : index % 12) >= 0;
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
                _.each(this.keys, v => {v.down = false});
                this.emitKeyChangedEvent();
            }
        },
        emitKeyChangedEvent() {
            this.$store.dispatch('changePressedKeys', {keys: this.keys.filter(x => !!x.down)});
        },
        reset() {
             _.each(this.keys, v => {v.down = false});
                this.emitKeyChangedEvent();
        }
    },
    mounted() {
        EventBus.$on('note on', note => {
            if (note < 36 || note > 71) return;
            this.keys[note - 36].down = true;
            this.emitKeyChangedEvent();
        });
        EventBus.$on('note off', note => {
            if (note < 36 || note > 71) return;
            this.keyUp(note - 36);
        })
    } 
}
</script>
<style scoped>
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
</style>


