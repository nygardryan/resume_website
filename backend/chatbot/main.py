"""Main entry point for the chatbot application."""

import sys
import os

# Add the current directory to the path to enable relative imports
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

from handlers.stream_handler import StreamHandler


def main():
    """Main function to run the chatbot interactive session."""
    stream_handler = StreamHandler()
    
    print("Welcome to Ryan's Resume Chatbot!")
    print("Type 'quit', 'exit', or 'q' to end the conversation.")
    print("-" * 50)
    
    while True:
        try:
            user_input = input("User: ")
            if user_input.lower() in ["quit", "exit", "q"]:
                print("Goodbye!")
                break
            stream_handler.print_stream(user_input)
        except KeyboardInterrupt:
            print("\nGoodbye!")
            break
        except Exception as e:
            # Fallback if input() is not available
            print(f"Error with input: {e}")
            user_input = "What do you know about LangGraph?"
            print("User: " + user_input)
            stream_handler.print_stream(user_input)
            break


if __name__ == "__main__":
    main()
