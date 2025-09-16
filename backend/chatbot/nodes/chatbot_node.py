"""Chatbot node implementation for the LangGraph."""

import sys
import os

# Add the current directory to the path for imports
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)

from models.state import State
from config.settings import get_llm


def chatbot(state: State) -> dict:
    """Process user messages and generate AI responses.
    
    Args:
        state: The current conversation state containing messages.
        
    Returns:
        Dictionary containing the AI response message.
    """
    llm = get_llm()
    return {"messages": [llm.invoke(state["messages"])]}
