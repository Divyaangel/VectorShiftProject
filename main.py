from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from sqlalchemy.orm.exc import UnmappedInstanceError



app = FastAPI()
# Add CORS middleware to allow requests from any origin

# Define the data models for Node and Edge
origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

# Function to check if the graph is a DAG
def is_dag(nodes, edges):
    in_degree = {}
    adj_list = {}

    for node in nodes:
        in_degree[node.id] = 0
        adj_list[node.id] = []

    for edge in edges:
        in_degree[edge.target] += 1
        adj_list[edge.source].append(edge.target)

    queue = []
    for node_id in in_degree:
        if in_degree[node_id] == 0:
            queue.append(node_id)

    processed_count = 0
    while queue:
        current_node = queue.pop(0)
        processed_count += 1

        for neighbor in adj_list[current_node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return processed_count == len(nodes)

# Define the model to receive the pipeline data (nodes and edges)
class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

# POST endpoint to parse the pipeline and check if it's a DAG
@app.post("/pipelines/parse")
async def parse_pipeline(data: PipelineData):
    print(data)
    num_nodes = len(data.nodes)
    num_edges = len(data.edges)
    is_dag_flag = is_dag(data.nodes, data.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag_flag
    }
