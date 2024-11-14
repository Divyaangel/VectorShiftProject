//ui.js 
import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { customExampleNode } from './nodes/customExampleNode';
import { customInputNode } from './nodes/customInputNode';
import { customLLMNode } from './nodes/customLlmNode';
import { customOutputNode } from './nodes/customeOutputNode';
import { customTextNode } from './nodes/customTextNode';
import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  customInput2: customInputNode,
  llm2: customLLMNode,
  customOutput2: customOutputNode,
  text2: customTextNode,
  example: customExampleNode
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  removeNode: state.removeNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = ({ updateNodeAndEdgeCount, onFinish }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    removeNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    return { id: nodeID, nodeType: `${type}` };
  };

  const updateCounts = useCallback(() => {
    updateNodeAndEdgeCount(nodes, edges);
    console.log(`Number of nodes: ${nodes.length}\nNumber of edges: ${edges.length}`);
  }, [nodes, edges, updateNodeAndEdgeCount]);

  useEffect(() => {
    updateNodeAndEdgeCount(nodes, edges);
  }, [nodes, edges, updateNodeAndEdgeCount]);

  const handleNodesChange = useCallback(
    (changes) => {
      onNodesChange(changes);
      updateCounts();
    },
    [onNodesChange, updateCounts]
  );

  const handleEdgesChange = useCallback(
    (changes) => {
      onEdgesChange(changes);
      updateCounts();
    },
    [onEdgesChange, updateCounts]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
        updateCounts();
      }
    },
    [reactFlowInstance, getNodeID, addNode, updateCounts]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Connection validation function
  const isValidConnection = (connection) => {
    console.log("Attempted Connection:", connection);

    // Example rule: allow only connections between specific handle IDs or types
    // Modify this logic based on your connection rules
    return connection.sourceHandle !== connection.targetHandle;
  };

  return (
    <div ref={reactFlowWrapper} style={{ width: '100vw', height: '70vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]} 
        connectionLineType="smoothstep"
        isValidConnection={isValidConnection} // Apply the validation function
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
