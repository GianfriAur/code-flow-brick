import {ClassicPreset} from 'rete';

//import type {CodeResult, ICompileContext} from '../types.ts';

export class BaseNode extends ClassicPreset.Node {
}

export class CompilableNode extends BaseNode {
    constructor(name: string) {
        super(name);
    }
}
