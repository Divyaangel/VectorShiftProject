

import { useState, useEffect, useCallback } from 'react';
import { Position, Handle, useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const [handles, setHandles] = useState([]);

  // Function to update handles based on text content
  const updateHandlesFromText = useCallback((text) => {
    const variablePattern = /{{\s*([^{}]+)\s*}}/g;
    const variables = [...text.matchAll(variablePattern)].map(match => match[1]);

    const newHandles = variables.map((variable, index) => ({
      id: `${id}-${variable}`,
      type: 'target',
      Position: Position.Left,  // Correct 'position' prop instead of 'Position'
      style: { top: `${(index + 1) * 20}px` },
      label: variable // Label to show the variable name next to handle
    }));

    setHandles(newHandles);
    updateNodeInternals(id); // Update node internals after handles change
  }, [id, updateNodeInternals]);

  // Update handles when the text changes
  useEffect(() => {
    updateHandlesFromText(data?.text || '{{input}}');
  }, [data?.text, updateHandlesFromText]);

  return (
    <BaseNode
      id={id}
      title="Text"
      fields={[
        {
          name: 'text',
          label: 'Text',
          type: 'text',
          defaultValue: data?.text || '{{input}}',
          onChange: (newText) => updateHandlesFromText(newText), // Trigger handle update on text change
        },
      ]}
      handles={handles} // Pass dynamic handles to BaseNode
    />
  );
};

