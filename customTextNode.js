import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const customTextNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="customText"
    fields={[
      { name: 'text', label: 'Text', type: 'text', defaultValue: data?.text || '{{input}}' },
    ]}
    handles={[
      { id: `${id}-output`, type: 'target', Position:Position.Left },
    ]}
  />
);