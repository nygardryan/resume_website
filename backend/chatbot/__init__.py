"""Resume chatbot package for Ryan Nygard's website.

This package provides a structured chatbot implementation using LangGraph
for handling conversations with recruiters and hiring managers.
"""

from .handlers import StreamHandler
from .graph import create_chatbot_graph
from .models import State

__version__ = "1.0.0"
__all__ = ["StreamHandler", "create_chatbot_graph", "State"]
