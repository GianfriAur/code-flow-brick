import {ClassicPreset} from 'rete';

export class BaseSocket extends ClassicPreset.Socket {
    constructor(name: string) {
        super("core." + name);
    }

    isCompatibleWith(_socket: BaseSocket) {
        return true;
    }

}
