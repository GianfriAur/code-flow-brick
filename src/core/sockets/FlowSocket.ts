import {BaseSocket, type BaseSocketData} from "./BaseSocket.ts";
import type {FlowConnectorRepoInitEvent} from "../FlowConnectorRepository.ts";
import type {NodeEditor} from "rete";
import {hasLoop} from "../utility.ts";

export class FlowSocket extends BaseSocket {
    constructor() {
        super("flow");
    }

    isCompatibleWith(socket: BaseSocket) {
        return socket instanceof FlowSocket;
    }
}


window.addEventListener('code-flow-brick.flow-connector-repository.init', (event) => {
    const {repository} = (event as FlowConnectorRepoInitEvent).detail;

    repository.addConnectionValidator((from: BaseSocketData, to: BaseSocketData, editor: NodeEditor<any>) => {
        if (from.payload.name === 'core.flow' || to.payload.name === 'core.flow') {
            if (from.nodeId === to.nodeId) {
                console.log("Cannot connect node to itself");
                return false;
            }
        }

        if (from.payload.name !== to.payload.name) {
            console.log("Socket types don't match");
            return false;
        }

        const [source, target] = from.side === 'output'
            ? [from.nodeId, to.nodeId]
            : [to.nodeId, from.nodeId];


        if (hasLoop(target, source, editor)) {
            console.log("Connection would create a cycle");
            return false;
        }

    }, 110)
});

