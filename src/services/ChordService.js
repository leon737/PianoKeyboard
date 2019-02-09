import {flatten, map, range, intersection} from 'lodash'
import Chord from '@/models/Chord';
import types from '@/models/chords'

const makeChord = p => {  
    return new Chord(p.root, p.type.suffix, p.type.notes.map(v => (p.root + v)));
};

export default class ChordService {
    constructor() {
        this.chords = flatten(
            map(types, type => 
                range(12).map(root => makeChord({
                    root,
                    type
                }))
            )); 
    } 
    
    getChords(notes, selectedKey) {   
        const chordsByNotes = this.chords.filter(x => x.containsAllNotes(notes));
        if (!selectedKey)
            return chordsByNotes;                    
        const chordsBySelectedKey = this.chords.filter(x => selectedKey.containsAllNotes(x.notes));
        if (!notes || !notes.length)
            return chordsBySelectedKey;   
        return intersection(chordsByNotes, chordsBySelectedKey);
    }
}