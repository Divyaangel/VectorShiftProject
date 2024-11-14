
import React from 'react';


export const SubmitButton = ({ nodes, edges}) => {
    const handleSubmit = async () => {
        try {
            // Prepare the data to send to the backend
            const pipelineData = {
                nodes: nodes.map(node => ({ id: node.id })),  // Assuming nodes have id
                edges: edges.map(edge => ({
                    source: edge.source,
                    target: edge.target
                }))
            };
            console.log(pipelineData);

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Server error: ${errorMessage}`);
            }

            const data = await response.json();
            alert(`Number of nodes: ${data.num_nodes}\nNumber of edges: ${data.num_edges}\nIs DAG: ${data.is_dag}`);
        } catch (error) {
            console.error("Error submitting pipeline:", error);
            alert(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '100vw',
        }}>
            <button 
                onClick={handleSubmit}
                style={{
                    width: '90%',
                    height: '50px',
                    backgroundColor: '#1e86c0',
                    color: 'white',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Finish
            </button>
        </div>
    );
};

