import {FlowNode} from '../FlowNode.ts';
import {ClassicPreset} from "rete";
import {FlowSocket} from "../../sockets/FlowSocket.ts";
//import {FlowSocket} from '../../sockets.ts';
//import type {FlowCodeResult, ICompileContext} from '../../types.ts';

export class StartNode extends FlowNode {

    title: string = 'aaaa';

    constructor() {
        super('start');
        this.addOutput('flowIn', new ClassicPreset.Output(new FlowSocket(), 'Flow', false));
        this.addInput('flowOut', new ClassicPreset.Input(new FlowSocket(), 'Flow', false));
    }

}
