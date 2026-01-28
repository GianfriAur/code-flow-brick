import {BaseSocket} from "./BaseSocket.ts";

export class FlowSocket extends BaseSocket {
    constructor() {
        super("flow");
    }

    isCompatibleWith(socket: BaseSocket) {
        return socket instanceof FlowSocket;
    }
}


export function FlowSocketConnectionValidator() {
    return {
        validate: (from: any, to: any) => {
            console.log(from, to);
        }
    };
}
