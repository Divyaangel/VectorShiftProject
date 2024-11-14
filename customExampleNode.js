//llmNode.js

import { BaseNode } from './baseNode'
import { Position } from 'reactflow';

export const customExampleNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="customExample"
    fields={[
      { name: 'description', label: '', type: 'text', defaultValue: 'This is a Example.', readOnly: true }
    ]}
    handles={[
      { id: `${id}-system`, type: 'target', Position: Position.Left,style: { top: `${100 / 3}%` } },
      { id: `${id}-prompt`, type: 'target', Position: Position.Left,style: { top: `${200 / 3}%` }  },
      { id: `${id}-response`, type: 'source', Position: Position.Right }
    ]}
    
  />
);

