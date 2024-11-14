//outputNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Output"
    fields={[
      { name: 'name', label: 'Name', type: 'text', defaultValue: data?.outputName || id.replace('customOutput-', 'output_') },
      { name: 'type', label: 'Type', type: 'select', options: ['Text', 'Image'], defaultValue: data.outputType || 'Text' },
    ]}
    handles={[
      { id: `${id}-value`, type: 'target',Position:Position.Left },
    ]}
  />
);
