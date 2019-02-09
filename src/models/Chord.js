import {endsWith, every, indexOf} from 'lodash';
import noteNames from '@/models/noteNames'

const makeInversions = notes => {
    const result = [];
    for(let i = 1; i <= notes.length - 1; ++i) {
        const temp = notes.slice();
        for (let j = 0; j < i; ++j)
            temp[j] += 12;
        result.push({
            index: i,
            notes: temp
        });
    }
    return result;
};

export default class Chord {
    constructor(root, suffix, notes) {
        this.root = root;
        this.suffix = suffix;
        this.subSuffix = '';
        if (endsWith(this.suffix, '2') || endsWith(this.suffix, '4') || endsWith(this.suffix, '7') || endsWith(suffix, '9')) {
            this.suffix = this.suffix.substring(0, this.suffix.length - 1);
            this.subSuffix = suffix[suffix.length -1];
        }
        if (endsWith(this.suffix, '11')) {
            this.suffix = this.suffix.substring(0, this.suffix.length - 2);
            this.subSuffix = '11';
        }        
        this.notes = notes;
        this.inversions = makeInversions(this.notes);
    }

    get rootName () {
        let noteName = noteNames[this.root];
        if (noteName.endsWith('#'))
            noteName = noteName[0] + '♯';
        return noteName;
    }

    getRootName(key) {
        return key.getNodeNameByLinearIndex(this.root);
    }

    containsAllNotes(notes) {
        return every(notes, x => {
            return indexOf(this.notes.map(z => z % 12), x % 12) >= 0}
            );
    }

}