import type {NodeEditor} from "rete";


export function hasLoop(startNodeId: string, endNodeId: string, editor: NodeEditor<any>): boolean {
    if (startNodeId === endNodeId) {
        return true;
    }

    const visited = new Set<string>();
    const stack = [startNodeId];

    while (stack.length > 0) {
        const currentNodeId = stack.pop()!;

        if (visited.has(currentNodeId)) {
            continue;
        }

        visited.add(currentNodeId);

        if (currentNodeId === endNodeId) {
            return true;
        }

        // Trova tutte le connessioni in uscita dal nodo corrente
        const connections = editor.getConnections();
        const outgoingConnections = connections.filter(conn => conn.source === currentNodeId);

        for (const conn of outgoingConnections) {
            if (!visited.has(conn.target)) {
                stack.push(conn.target);
            }
        }
    }

    return false;
}
