import _ from 'lodash';

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default class Key {
    constructor(root, type, notes) {
        this.root = root;
        this.type = type =='major' ? '' : 'm' ;
        this.notes = notes;
    }

    get rootName () {
        return noteNames[this.root];
    }

    containsAllNotes(notes) {
        return _.every(notes, x => {
            return _.indexOf(this.notes, x % 12) >= 0}
            );
    }

}