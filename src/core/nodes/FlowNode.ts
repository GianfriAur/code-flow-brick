import {CompilableNode} from "./CompilableNode.ts";


export abstract class FlowNode extends CompilableNode {
    constructor(name: string) {
        super('flow.' + name);
    }

}
