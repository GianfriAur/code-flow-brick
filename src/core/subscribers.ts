import type {FlowConnectorRepoInitEvent} from "./FlowConnectorRepository.ts";
import {Connection} from "./FlowConnectorRepository.ts";
import type {ClassicScheme} from "rete-react-plugin";
import {getSourceTarget} from "rete-connection-plugin";
import type {BaseNode} from "./nodes/CompilableNode.ts";
import type {Context} from "rete-connection-plugin/_types/flow/base";
import type {BaseSocketData} from "./sockets/BaseSocket.ts";

window.addEventListener('code-flow-brick.flow-connector-repository.init', (event) => {
    const {repository} = (event as FlowConnectorRepoInitEvent).detail;

    repository.addConnector((from: BaseSocketData, to: BaseSocketData, context: Context<ClassicScheme, any[]>) => {
        const [source, target] = getSourceTarget(from, to) || [null, null];
        const {editor} = context;

        if (source && target) {
            editor.addConnection(
                new Connection(
                    editor.getNode(source.nodeId) as BaseNode,
                    source.key as never,
                    editor.getNode(target.nodeId) as BaseNode,
                    target.key as never
                )
            );
            return true;
        }
    }, 1000)
});
