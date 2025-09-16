"""Test script for the refactored chatbot.

This file demonstrates how to use the new structured chatbot implementation.
The original code has been refactored into the backend/chatbot directory.
"""

from backend.chatbot import StreamHandler


def main():
    """Test the refactored chatbot implementation."""
    print("Testing the refactored chatbot...")
    print("=" * 50)
    
    # Create a stream handler using the new structure
    stream_handler = StreamHandler()
    
    # Test with a sample input
    test_input = "What do you know about LangGraph?"
    print(f"User: {test_input}")
    stream_handler.print_stream(test_input)
    
    print("\n" + "=" * 50)
    print("Test completed! The chatbot is now properly structured.")
    print("Run 'python backend/chatbot/main.py' to use the interactive version.")


if __name__ == "__main__":
    main()
