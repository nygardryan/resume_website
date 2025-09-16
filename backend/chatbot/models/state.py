"""State models for the chatbot LangGraph."""

from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph.message import add_messages


class State(TypedDict):
    """State structure for the chatbot conversation graph.
    
    This defines the state that flows through the LangGraph nodes,
    containing the conversation messages.
    """
    messages: Annotated[list, add_messages]
