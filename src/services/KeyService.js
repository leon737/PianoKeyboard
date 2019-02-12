import {range, intersection} from 'lodash'
import Key from '@/models/Key'
import modes from '@/models/modes'

const makeKey = p => {
    return new Key(p.root, p.mode);
};

export default class KeyService {
    constructor() {
        const keys = modes.map(mode => range(12).map(root => makeKey({
            root,
            mode
        })));
        this.keys = _.flatten(keys);
    } 
    
    getKeys(notes, selectedChord) {
        const keysByNotes = this.keys.filter(x => x.containsAllNotes(notes));
        if (!selectedChord)
            return keysByNotes;              
        const keysBySelectedChord = this.keys.filter(x => x.containsAllNotes(selectedChord.notes));
        if (!notes || !notes.length)
            return keysBySelectedChord;  
        return intersection(keysByNotes, keysBySelectedChord);
    }
}