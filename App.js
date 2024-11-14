import React, { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ReactFlowProvider } from 'reactflow';

function App() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const updateNodeAndEdgeCount = (newNodes, newEdges) => {
        setNodes(newNodes);
        setEdges(newEdges);
    };

    return (
        <div>
            <PipelineToolbar />
            <ReactFlowProvider>
                <PipelineUI updateNodeAndEdgeCount={updateNodeAndEdgeCount} />
                <SubmitButton nodes={nodes} edges={edges} />
            </ReactFlowProvider>
        </div>
    );
}

export default App;
