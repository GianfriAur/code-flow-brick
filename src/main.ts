import {ClassicPreset} from 'rete';
import {createVisualEditor, arrangeNodes} from './editor/setup.ts';
import './core/subscribers.ts'
import {StartNode} from './core/nodes/flow/StartNode.ts';

const nodeFactories: Record<string, () => ClassicPreset.Node> = {
    'Start': () => new StartNode(),
}

/*

import {Compiler} from './core/compiler/Compiler.ts';
import {GraphValidator} from './core/validator/GraphValidator.ts';

// Import all nodes

import {ReturnNode} from './core/nodes/flow/ReturnNode.ts';
import {IfNode} from './core/nodes/flow/IfNode.ts';
import {WhileNode} from './core/nodes/flow/WhileNode.ts';
import {ForNode} from './core/nodes/flow/ForNode.ts';
import {ForEachNode} from './core/nodes/flow/ForEachNode.ts';

import {NumberLiteralNode} from './core/nodes/data/literals/NumberLiteralNode.ts';
import {StringLiteralNode} from './core/nodes/data/literals/StringLiteralNode.ts';
import {BooleanLiteralNode} from './core/nodes/data/literals/BooleanLiteralNode.ts';

import {MathOperationNode} from './core/nodes/data/math/MathOperationNode.ts';
import {ComparisonNode} from './core/nodes/data/math/ComparisonNode.ts';
import {LogicGateNode} from './core/nodes/data/logic/LogicGateNode.ts';
import {NotNode} from './core/nodes/data/logic/NotNode.ts';
import {StringConcatNode} from './core/nodes/data/string/StringConcatNode.ts';

import {ConsoleLogNode} from './core/nodes/action/ConsoleLogNode.ts';
import {SetVariableNode} from './core/nodes/action/SetVariableNode.ts';
import {GetVariableNode} from './core/nodes/action/GetVariableNode.ts';
import {ArrayPushNode} from './core/nodes/action/ArrayPushNode.ts';

import {CreateModelNode} from './core/nodes/model/CreateModelNode.ts';
import {GetPropertyNode} from './core/nodes/model/GetPropertyNode.ts';
import {SetPropertyNode} from './core/nodes/model/SetPropertyNode.ts';

// Import model definitions to register them
import './core/models/UserModel.ts';
import './core/models/BlogPostModel.ts';
*/
// Node factory for creating nodes from palette
/*
const nodeFactories: Record<string, () => ClassicPreset.Node> = {
    /* // Flow
     'Start': () => new StartNode(),
     'Return': () => new ReturnNode(),
     'If': () => new IfNode(),
     'While': () => new WhileNode(),
     'For': () => new ForNode(),
     'ForEach': () => new ForEachNode(),
     // Data
     'Number': () => new NumberLiteralNode(0),
     'String': () => new StringLiteralNode(''),
     'Boolean': () => new BooleanLiteralNode(false),
     'Math': () => new MathOperationNode('+'),
     'Compare': () => new ComparisonNode('==='),
     'Logic': () => new LogicGateNode('&&'),
     'Not': () => new NotNode(),
     'Concat': () => new StringConcatNode(),
     // Action
     'Log': () => new ConsoleLogNode(),
     'Set Var': () => new SetVariableNode('x'),
     'Get Var': () => new GetVariableNode('x'),
     'Array Push': () => new ArrayPushNode(),
     // Model
     'Create Model': () => new CreateModelNode('User'),
     'Get Property': () => new GetPropertyNode(''),
     'Set Property': () => new SetPropertyNode(''),


};

async function buildDemoGraph(editor: any): Promise<void> {
    /*
    // Create demo: for loop 1 to 5, log each number, then log "Done!"
    const start = new StartNode();
    const forLoop = new ForNode();
    const startNum = new NumberLiteralNode(1);
    const endNum = new NumberLiteralNode(6);
    const stepNum = new NumberLiteralNode(1);
    const logInLoop = new ConsoleLogNode();
    const logAfter = new ConsoleLogNode();
    const doneMsg = new StringLiteralNode('Done!');
    const returnNode = new ReturnNode();

    await editor.addNode(start);
    await editor.addNode(forLoop);
    await editor.addNode(startNum);
    await editor.addNode(endNum);
    await editor.addNode(stepNum);
    await editor.addNode(logInLoop);
    await editor.addNode(logAfter);
    await editor.addNode(doneMsg);
    await editor.addNode(returnNode);

    // Connect flow
    await editor.addConnection(new NodeConnection(start, 'flow', forLoop, 'flow'));
    await editor.addConnection(new NodeConnection(startNum, 'value', forLoop, 'start'));
    await editor.addConnection(new NodeConnection(endNum, 'value', forLoop, 'end'));
    await editor.addConnection(new NodeConnection(stepNum, 'value', forLoop, 'step'));
    await editor.addConnection(new NodeConnection(forLoop, 'body', logInLoop, 'flow'));
    await editor.addConnection(new NodeConnection(forLoop, 'counter', logInLoop, 'message'));
    await editor.addConnection(new NodeConnection(forLoop, 'done', logAfter, 'flow'));
    await editor.addConnection(new NodeConnection(doneMsg, 'value', logAfter, 'message'));
    await editor.addConnection(new NodeConnection(logAfter, 'flow', returnNode, 'flow'));


}

function updateOutput(editor: any): void {
    /*const validationDiv = document.getElementById('validation')!;
    const codeOutput = document.getElementById('codeOutput')!;
    const runBtn = document.getElementById('runBtn') as HTMLButtonElement;

    // Validate
    const validator = new GraphValidator(editor);
    const validationResult = validator.validate();

    if (validationResult.valid) {
        validationDiv.className = 'panel success';
        validationDiv.innerHTML = '<strong>✓ Valid</strong>';
        if (validationResult.warnings.length > 0) {
            validationDiv.innerHTML += '<ul>' +
                validationResult.warnings.map(w => `<li>⚠ ${w}</li>`).join('') + '</ul>';
        }
    } else {
        validationDiv.className = 'panel error';
        validationDiv.innerHTML = '<strong>✗ Errors:</strong><ul>' +
            validationResult.errors.map(e => `<li>${e}</li>`).join('') + '</ul>';
    }

    // Compile
    const compiler = new Compiler(editor);
    const compileResult = compiler.compile();

    if (compileResult.success) {
        codeOutput.textContent = compileResult.code;
        codeOutput.className = '';
        runBtn.disabled = false;

        runBtn.onclick = () => {
            const runOutput = document.getElementById('runOutput')!;
            const execResult = compiler.execute(compileResult.code);

            if (execResult.error) {
                runOutput.className = 'error';
                runOutput.textContent = `Error: ${execResult.error}\n\n${execResult.output.join('\n')}`;
            } else {
                runOutput.className = '';
                runOutput.textContent = execResult.output.join('\n') || '(no output)';
            }
        };
    } else {
        codeOutput.className = 'error';
        codeOutput.textContent = 'Compilation failed:\n' + compileResult.errors.join('\n');
        runBtn.disabled = true;
    }
}
*/
async function main(): Promise<void> {
    const appDiv = document.getElementById('app')!;

    appDiv.innerHTML = `
        <div class="layout">
            <div class="sidebar">
                <h2>Code Builder</h2>

                <div class="palette">
                    <h3>Flow</h3>
                    <div class="node-buttons" data-category="flow">
                        <button data-node="Start">Start</button>
                        <button data-node="Return">Return</button>
                        <button data-node="If">If</button>
                        <button data-node="While">While</button>
                        <button data-node="For">For</button>
                        <button data-node="ForEach">ForEach</button>
                    </div>

                    <h3>Data</h3>
                    <div class="node-buttons" data-category="data">
                        <button data-node="Number">Number</button>
                        <button data-node="String">String</button>
                        <button data-node="Boolean">Boolean</button>
                        <button data-node="Math">Math</button>
                        <button data-node="Compare">Compare</button>
                        <button data-node="Logic">Logic</button>
                        <button data-node="Not">Not</button>
                        <button data-node="Concat">Concat</button>
                    </div>

                    <h3>Actions</h3>
                    <div class="node-buttons" data-category="action">
                        <button data-node="Log">Log</button>
                        <button data-node="Set Var">Set Var</button>
                        <button data-node="Get Var">Get Var</button>
                        <button data-node="Array Push">Array Push</button>
                    </div>

                    <h3>Models</h3>
                    <div class="node-buttons" data-category="model">
                        <button data-node="Create Model">Create Model</button>
                        <button data-node="Get Property">Get Property</button>
                        <button data-node="Set Property">Set Property</button>
                    </div>
                </div>

                <div class="actions">
                    <button id="compileBtn" class="primary">Compile</button>
                    <button id="clearBtn" class="danger">Clear All</button>
                    <button id="demoBtn">Load Demo</button>
                </div>

                <div id="validation" class="panel"></div>
            </div>

            <div class="editor-container">
                <div id="rete" class="rete-editor"></div>
            </div>

            <div class="output-panel">
                <h3>Generated JavaScript</h3>
                <pre id="codeOutput"></pre>

                <button id="runBtn" class="primary">▶ Run</button>

                <h3>Console Output</h3>
                <pre id="runOutput"></pre>
            </div>
        </div>
    `;

    // Create visual editor
    const reteContainer = document.getElementById('rete')!;
    const {editor, area} = await createVisualEditor(reteContainer);

    // Build demo graph
    // await buildDemoGraph(editor);
    await arrangeNodes(area, editor);

    // Initial compile
    //  updateOutput(editor);

    // Setup node palette buttons
    document.querySelectorAll('.node-buttons button').forEach(btn => {
        btn.addEventListener('click', async () => {
            const nodeType = btn.getAttribute('data-node')!;
            const factory = nodeFactories[nodeType];
            if (factory) {
                const node = factory();
                await editor.addNode(node);
                // Position new node in center of view
                const viewBox = reteContainer.getBoundingClientRect();
                await area.translate(node.id, {
                    x: viewBox.width / 2 - 100,
                    y: viewBox.height / 2 - 50
                });
                await arrangeNodes(area, editor);
                //updateOutput(editor);
            }
        });

    });

    // Compile button
    document.getElementById('compileBtn')!.addEventListener('click', () => {
        //      updateOutput(editor);
    });

    // Clear button
    document.getElementById('clearBtn')!.addEventListener('click', async () => {
        await editor.clear();
        //   updateOutput(editor);
        document.getElementById('runOutput')!.textContent = '';
    });

    // Demo button
    document.getElementById('demoBtn')!.addEventListener('click', async () => {
        await editor.clear();
        // await buildDemoGraph(editor);
        await arrangeNodes(area, editor);
        //   updateOutput(editor);
    });

    // Update on editor changes
    editor.addPipe(context => {
        if (['nodecreated', 'noderemoved', 'connectioncreated', 'connectionremoved'].includes(context.type)) {
            // setTimeout(() => updateOutput(editor), 100);
        }
        return context;
    });


}

main().catch(console.error);
