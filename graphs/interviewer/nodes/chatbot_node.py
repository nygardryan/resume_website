

from ..llm import llm
from ..state import State
from langchain_core.messages import SystemMessage
from pathlib import Path


personality_path = Path(__file__).parent.parent / "personality.txt"
personality = personality_path.read_text()

def chatbot(state: State):
    return {"messages": [llm.invoke([SystemMessage(content=personality)] + state["messages"])]}
