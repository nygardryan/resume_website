"""LangGraph builder for the chatbot conversation flow."""

from langgraph.graph import StateGraph, START, END
import sys
import os

# Add the current directory to the path for imports
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)

from models.state import State
from nodes.chatbot_node import chatbot


def create_chatbot_graph():
    """Create and configure the chatbot LangGraph.
    
    Returns:
        Compiled LangGraph ready for streaming conversations.
    """
    # Create the state graph
    graph_builder = StateGraph(State)
    
    # Add the chatbot node
    graph_builder.add_node("chatbot", chatbot)
    
    # Define the conversation flow
    graph_builder.add_edge(START, "chatbot")
    graph_builder.add_edge("chatbot", END)
    
    # Compile and return the graph
    return graph_builder.compile()
