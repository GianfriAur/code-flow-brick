import type {ClassicScheme} from "rete-react-plugin";
import {ClassicFlow, getSourceTarget, type SocketData} from "rete-connection-plugin";
import {ClassicPreset} from "rete";
import type {BaseNode} from "./nodes/CompilableNode.ts";
import type {Context} from "rete-connection-plugin/_types/flow/base";

type NodeProps = | BaseNode

export class Connection<A extends NodeProps, B extends NodeProps> extends ClassicPreset.Connection<A, B> {
    isLoop?: boolean;
}

type ValidatorFunction = (from: SocketData, to: SocketData) => boolean | undefined
type ConnectorFunction<Schemes extends ClassicScheme> = (from: SocketData, to: SocketData, context: Context<Schemes, any>) => true | undefined

type PrioritizeValidatorFunction = {
    method: ValidatorFunction,
    priority: number
}

export class FlowConnectorRepository<Schemes extends ClassicScheme, K extends any[]> extends ClassicFlow<Schemes, K> {

    validatorus: PrioritizeValidatorFunction[];

    constructor() {
        super({
            canMakeConnection(from: SocketData, to: SocketData) {
                console.log(from, to);
                return Boolean(true);
            },
            makeConnection(from: SocketData, to: SocketData, context: Context<Schemes, any>) {
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
            },
        });
        this.validatorus = [];
    }

    addConnectionValidator(validator: ValidatorFunction, priority: number = 100) {
        this.validatorus.push({method: validator, priority: priority})
    }

    addConnector(_connector: ConnectorFunction<Schemes>, _priority: number = 100) {

    }

}


export function setup() {
    return new FlowConnectorRepository();
}
