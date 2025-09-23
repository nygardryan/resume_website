

from llm import llm_with_tools
from state import State
from langchain_core.messages import SystemMessage
from pathlib import Path



personality_path = Path("personality.txt")
personality = personality_path.read_text()

def chatbot(state: State):
    return {"messages": [llm_with_tools.invoke([SystemMessage(content=personality)] + state["messages"])]}
