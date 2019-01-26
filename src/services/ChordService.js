import _ from 'lodash'
import Chord from '@/models/Chord';

const types = [
    {
        suffix: '',
        notes: [0, 4, 7]
    }, 
    {
        suffix: 'm',
        notes: [0, 3, 7]
    }, 
    {
        suffix: 'dim',
        notes: [0, 3, 6]
    }, 
    {
        suffix: 'M7',
        notes: [0, 4, 7, 11]
    },
    {
        suffix: 'm7',
        notes: [0, 3, 7, 10]
    }, 
    {
        suffix: '7',
        notes: [0, 4, 7, 10]
    }, 
    {
        suffix: 'sus2',
        notes: [0, 2, 7]
    },
    {
        suffix: 'sus4',
        notes: [0, 5, 7]
    }, 
    {
        suffix: 'aug',
        notes: [0, 4, 8]
    },
    {
        suffix: '9',
        notes: [0, 4, 7, 10, 14]
    },
    {
        suffix: 'maj11',
        notes: [0, 4, 7, 11, 14, 17]
    }
];

const makeChord = p => {  
    return new Chord(p.root, p.type.suffix, p.type.notes.map(v => (p.root + v)));
};

export default class ChordService {
    constructor() {
        this.chords = _.flatten(
            _.map(types, t => 
                _.range(12).map(v => makeChord({
                    root: v,
                    type: t
                }))
            )); 
    }    
}