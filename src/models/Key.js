import {find, findIndex, indexOf, every} from 'lodash';
import scales from './scales'
import noteNames from '@/models/noteNames'

const getParallelKey = (root, type) => {    
    let index = root;
    if (type == 'major') 
        index += 6;
    else 
        index += 3;
    if (index > 11) index-= 12;
    return noteNames[index];
};

const getScaleDefinition = (root, type) => {
    const tRoot = type == 'major' ? noteNames[root] : getParallelKey(root, type);
    const definition = find(scales, x => x.root == tRoot);
    return definition;
};

export default class Key {
    constructor(root, type, notes) {
        this.root = root;
        this.definition = getScaleDefinition(root, type);
        this.type = type =='major' ? '' : 'm' ;
        this.notes = notes;        
    }

    get rootName () {
        return this.getNoteName(0);
    }

    getNoteName(index) {
        index = this.notes[index];
        if (index > 11) index -= 12;
        let name = noteNames[index];
        if (this.definition.sign == 'sharp') {
            if (this.definition.signCount == 6 && name == 'F') name = 'E#';
            if (this.definition.signCount == 7 && name == 'C') name = 'B#';
        }
        if (name.endsWith('#') && this.definition.sign == 'flat') {
            name = noteNames[index + 1] + '♭';
        }
        else {
            if(name.endsWith('#'))
                name = name[0] + '♯';
        }
        return name;
    }

    getNodeNameByLinearIndex(index) {
        const targetIndex = findIndex(this.notes, x => x == index);
        if (targetIndex >= 0) return this.getNoteName(targetIndex);
        return '';
    }


    containsAllNotes(notes) {
        return every(notes, x => {
            return indexOf(this.notes, x % 12) >= 0}
            );
    }

}