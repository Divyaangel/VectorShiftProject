//customInputNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const customInputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="customInput"
    fields={[
      { name: 'name', label: 'Name', type: 'text', defaultValue: data?.inputName || id.replace('customInput-', 'input_') },
      { name: 'type', label: 'Type', type: 'select', options: ['Text', 'File'], defaultValue: data.inputType || 'Text' },
    ]}
    handles={[
      { id: `${id}-value`, type: 'source', Position:Position.Right},
    ]}
  />
);
