import _ from 'lodash'
import Key from '@/models/Key';

const makeSeq = steps => {
    return steps.map((v, i) => {
        let r = 0;
        for (let j = 0; j <= i; ++j)
            r += steps[j];
        return r;
    });
};

const major = makeSeq([0, 2, 2, 1, 2, 2, 2, 1]);
const minor = makeSeq([0, 2, 1, 2, 2, 1, 2, 2]);

const makeKey = p => {
    const seq = p.type == 'major' ? major : minor;
    return new Key(p.root, p.type, seq.map(v => (p.root + v) % 12));
};

export default class KeyService {
    constructor() {
        this.keys = 
            _.range(12).map(v => makeKey({
                root: v,
                type: 'major'
            }))
            .concat(_.range(12).map(v => makeKey({
                root: v,
                type: 'minor'
            })));
    }    
}