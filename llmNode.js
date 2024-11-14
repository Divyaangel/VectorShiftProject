//llmNode.js

import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const LLMNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="LLM"
    fields={[
      { name: 'description', label: '', type: 'text', defaultValue: 'This is a LLM.', readOnly: true }
    ]}
    handles={[
      { id: `${id}-system`, type: 'target', Position: Position.Left,style: { top: `${100 / 3}%` } },
      { id: `${id}-prompt`, type: 'target', Position: Position.Left,style: { top: `${200 / 3}%` }  },
      { id: `${id}-response`, type: 'source', Position: Position.Right }
    ]}
    
  />
);

