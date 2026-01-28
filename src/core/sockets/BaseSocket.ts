import {ClassicPreset, type NodeEditor} from 'rete';
import {type FlowConnectorRepoInitEvent} from "../FlowConnectorRepository.ts";
import {type SocketData} from "rete-connection-plugin";

// Soluzione 2: interface
export interface BaseSocketData extends SocketData {
    payload: BaseSocket;
}

export class BaseSocket extends ClassicPreset.Socket {
    constructor(name: string) {
        super("core." + name);
    }

    isCompatibleWith(_socket: BaseSocket) {
        return true;
    }

}

window.addEventListener('code-flow-brick.flow-connector-repository.init', (event) => {
    const {repository} = (event as FlowConnectorRepoInitEvent).detail;

    repository.addConnectionValidator((from: BaseSocketData, to: BaseSocketData, editor: NodeEditor<any>) => {

        if (from.payload.name !== to.payload.name) {
            console.log("Socket types don't match");
            return false;
        }

        const connections = editor.getConnections();

        const inputAlreadyConnected = connections.some(conn => {
            const targetSide = from.side === 'output' ? to : from;
            return targetSide.side === 'input'
                && conn.target === targetSide.nodeId
                && conn.targetInput === targetSide.key;
        });

        if (inputAlreadyConnected) {
            console.log("Input already connected");
            return false;
        }

    }, 100)
});
