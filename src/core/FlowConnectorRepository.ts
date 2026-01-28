import type {ClassicScheme} from "rete-react-plugin";
import {ClassicFlow, type SocketData} from "rete-connection-plugin";
import {ClassicPreset, NodeEditor} from "rete";
import type {BaseNode} from "./nodes/CompilableNode.ts";
import type {Context} from "rete-connection-plugin/_types/flow/base";
import type {BaseSocketData} from "./sockets/BaseSocket.ts";

type NodeProps = | BaseNode

export class Connection<A extends NodeProps, B extends NodeProps> extends ClassicPreset.Connection<A, B> {
    isLoop?: boolean;
}

type ValidatorFunction<Schemes extends ClassicScheme> = (from: BaseSocketData, to: BaseSocketData, editor: NodeEditor<Schemes>) => boolean | undefined
type ConnectorFunction<Schemes extends ClassicScheme> = (from: BaseSocketData, to: BaseSocketData, context: Context<Schemes, any>) => true | undefined

type PrioritizeValidator<Schemes extends ClassicScheme> = {
    method: ValidatorFunction<Schemes>,
    priority: number
}
type PrioritizeConnector<Schemes extends ClassicScheme> = {
    method: ConnectorFunction<Schemes>,
    priority: number
}

export class FlowConnectorRepository<Schemes extends ClassicScheme, K extends any[]> extends ClassicFlow<Schemes, K> {

    validators: PrioritizeValidator<Schemes>[];
    connectors: PrioritizeConnector<Schemes>[];
    editor: NodeEditor<Schemes>;

    constructor(editor: NodeEditor<Schemes>) {
        super({
            canMakeConnection: (from: SocketData, to: SocketData) => this.canMakeConnection(from as BaseSocketData, to as BaseSocketData, this.editor),
            makeConnection: (from: SocketData, to: SocketData, context: Context<Schemes, any>) => this.makeConnection(from as BaseSocketData, to as BaseSocketData, context)
        });
        this.validators = [];
        this.connectors = [];
        this.editor = editor;
    }

    canMakeConnection(from: BaseSocketData, to: BaseSocketData, editor: NodeEditor<Schemes>): boolean | undefined {
        console.log(from, to, 'canMakeConnection');
        for (const validator of this.validators) {
            const result = validator.method(from, to, editor);
            if (result !== undefined) {
                return result;
            }
        }
        return true;
    }

    makeConnection(from: BaseSocketData, to: BaseSocketData, context: Context<Schemes, any>): true | undefined {
        console.log(from, to, context, 'makeConnection');
        for (const validator of this.connectors) {
            const result = validator.method(from, to, context);
            if (result !== undefined) {
                return result;
            }
        }
        return undefined;
    }

    addConnectionValidator(validator: ValidatorFunction<Schemes>, priority: number = 100) {
        this.validators.push({method: validator, priority: priority})
        this.validators.sort((a, b) => a.priority - b.priority);
    }

    addConnector(connector: ConnectorFunction<Schemes>, priority: number = 100) {
        this.connectors.push({method: connector, priority: priority})
        this.connectors.sort((a, b) => a.priority - b.priority);
    }

}

export type FlowConnectorRepoInitEvent = CustomEvent<{
    repository: FlowConnectorRepository<ClassicScheme, any[]>
}>;

export function setup<Schemes extends ClassicScheme>(editor: NodeEditor<Schemes>) {

    const repo = new FlowConnectorRepository<ClassicScheme, any[]>(editor);

    window.dispatchEvent(new CustomEvent('code-flow-brick.flow-connector-repository.init', {detail: {repository: repo}}) as FlowConnectorRepoInitEvent)

    return repo;
}
