


from langchain_core.tools import tool
from langgraph.types import Command, interrupt
from database.collections import insert_answer
from database import client
import pdb

@tool
def human_assistance(question: str) -> str:
    """Request human to answer a question."""
    human_response = input("Human Assistance: " + question)
    insert_answer(client, question, human_response)
    
    return human_response

