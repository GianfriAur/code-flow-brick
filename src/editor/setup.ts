import {NodeEditor, ClassicPreset} from 'rete';
import type {GetSchemes} from 'rete';
import {AreaPlugin, AreaExtensions} from 'rete-area-plugin';
import {ConnectionPlugin, Presets as ConnectionPresets} from 'rete-connection-plugin';
import {ReactPlugin, Presets as ReactPresets} from 'rete-react-plugin';
import type {ReactArea2D} from 'rete-react-plugin';
import {createRoot} from 'react-dom/client';
import {setup as setupFlowConnectorRepository} from "../core/FlowConnectorRepository.ts";

// Use ClassicPreset types for compatibility with rendering plugins
class Connection<A extends ClassicPreset.Node, B extends ClassicPreset.Node> extends ClassicPreset.Connection<A, B> {
}

type Schemes = GetSchemes<ClassicPreset.Node, Connection<ClassicPreset.Node, ClassicPreset.Node>>;
type AreaExtra = ReactArea2D<Schemes>;

export async function createVisualEditor(container: HTMLElement): Promise<{
    editor: NodeEditor<Schemes>;
    area: AreaPlugin<Schemes, AreaExtra>;
}> {
    const editor = new NodeEditor<Schemes>();

    const area = new AreaPlugin<Schemes, AreaExtra>(container);
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();
    const render = new ReactPlugin<Schemes, AreaExtra>({createRoot});

    // Use default presets
    render.addPreset(ReactPresets.classic.setup());

    connection.addPreset(() => setupFlowConnectorRepository<Schemes>(editor));
    console.log(ConnectionPresets.classic.setup());

    // Register plugins
    editor.use(area);
    area.use(connection);
    area.use(render);

    // Enable zoom, pan and selection
    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
        accumulating: AreaExtensions.accumulateOnCtrl()
    });
    AreaExtensions.simpleNodesOrder(area);

    return {editor, area};
}

export async function arrangeNodes(
    area: AreaPlugin<Schemes, AreaExtra>,
    editor: NodeEditor<Schemes>
): Promise<void> {
    const nodes = editor.getNodes();

    // Simple auto-layout
    let x = 50;
    let y = 50;
    const nodeWidth = 220;
    const nodeHeight = 180;
    const padding = 40;
    let col = 0;
    const maxCols = 4;

    for (const node of nodes) {
        await area.translate(node.id, {x, y});

        col++;
        if (col >= maxCols) {
            col = 0;
            x = 50;
            y += nodeHeight + padding;
        } else {
            x += nodeWidth + padding;
        }
    }

    // Fit view
    AreaExtensions.zoomAt(area, nodes);
}

// Re-export Connection class for use in main
export class NodeConnection<
    A extends ClassicPreset.Node,
    B extends ClassicPreset.Node
> extends ClassicPreset.Connection<A, B> {
}
