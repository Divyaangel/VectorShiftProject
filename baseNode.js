import { useState } from 'react';
import { Handle , Position} from 'reactflow';

export const BaseNode = ({ id, title, fields, handles }) => {
  const [fieldValues, setFieldValues] = useState(
    fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.defaultValue,
    }), {})
  );

  const handleFieldChange = (name, value) => {
    setFieldValues((prevValues) => ({ ...prevValues, [name]: value }));
    // Trigger any provided onChange function
    const field = fields.find(f => f.name === name);
    if (field?.onChange) {
      field.onChange(value);
    }
  };

  return (
    <div style={{ width: 300, border: '1px solid black' }}>
      <div style={{ backgroundColor: '#007fff', padding: '5px', color: 'white' }}>
        <span>{title}</span>
      </div>

      {fields.map((field) => (
        <div key={field.name} style={{ margin: '10px', border: '1px solid grey', padding: '5px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>{field.label}:</label>
          {field.type === 'text' ? (
            <textarea
              value={fieldValues[field.name]}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              rows="1"
              style={{
                width: '100%',
                resize: 'none',
                overflow: 'hidden',
                minHeight: '20px',
                padding: '1px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          ) : (
            <select
              value={fieldValues[field.name]}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              style={{
                width: '100%',
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              {field.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}
        </div>
      ))}

      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.Position}
          id={handle.id}
          style={handle.style}
        >
          <span style={{ marginLeft: '-50px' }}>{handle.label}</span> {/* Display variable name */}
        </Handle>
      ))}
    </div>
  );
};
