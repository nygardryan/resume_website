from ..state import State
from langchain_core.messages import HumanMessage
from database.collections import insert_answer
from database import client


def user_interrupt_node(state: State):
    """
    Node that handles user interrupts when no good answers are found.
    Asks the user for input using Python's input() function and stores the answer in the database.
    """
    print("\n" + "="*50)
    print("USER INTERRUPT: No relevant answers found in database.")
    print("Please provide an answer to the interview question:")
    print("="*50)
    
    # Get the last message to extract the question
    last_message = state["messages"][-1]
    question = last_message.content if hasattr(last_message, 'content') else str(last_message)
    
    print(f"\nQuestion: {question}")
    user_answer = input("Your answer: ")
    
    # Insert the question and answer into the database
    try:
        insert_answer(client, question, user_answer)
        print(f"✓ Answer saved to database for future reference.")
    except Exception as e:
        print(f"⚠ Warning: Could not save answer to database: {e}")
    
    # Create a message with the user's answer
    user_message = HumanMessage(content=f"User provided answer: {user_answer}")
    
    return {
        "messages": [user_message],
        "user_interrupt_needed": False
    }
