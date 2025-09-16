"""Stream handler for chatbot conversation streaming."""

from typing import Generator
import sys
import os

# Add the current directory to the path for imports
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)

from graph.graph_builder import create_chatbot_graph


class StreamHandler:
    """Handles streaming of chatbot responses."""
    
    def __init__(self):
        """Initialize the stream handler with a compiled graph."""
        self.graph = create_chatbot_graph()
    
    def stream_response(self, user_input: str) -> Generator[str, None, None]:
        """Stream chatbot responses for the given user input.
        
        Args:
            user_input: The user's message input.
            
        Yields:
            String responses from the chatbot.
        """
        for event in self.graph.stream({"messages": [{"role": "user", "content": user_input}]}):
            for value in event.values():
                yield value["messages"][-1].content
    
    def print_stream(self, user_input: str) -> None:
        """Print streaming responses to console.
        
        Args:
            user_input: The user's message input.
        """
        for response in self.stream_response(user_input):
            print("Assistant:", response)
