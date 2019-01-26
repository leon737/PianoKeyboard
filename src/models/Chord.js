import _ from 'lodash';

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

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
        if (_.endsWith(this.suffix, '2') || _.endsWith(this.suffix, '4') || _.endsWith(this.suffix, '7') || _.endsWith(suffix, '9')) {
            this.suffix = this.suffix.substring(0, this.suffix.length - 1);
            this.subSuffix = suffix[suffix.length -1];
        }
        if (_.endsWith(this.suffix, '11')) {
            this.suffix = this.suffix.substring(0, this.suffix.length - 2);
            this.subSuffix = '11';
        }        
        this.notes = notes;
        this.inversions = makeInversions(this.notes);
    }

    get rootName () {
        return noteNames[this.root];
    }

    containsAllNotes(notes) {
        return _.every(notes, x => {
            return _.indexOf(this.notes.map(z => z % 12), x % 12) >= 0}
            );
    }

}