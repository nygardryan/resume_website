


from .llm import llm_with_tools
from .tools import tools
from .nodes.chatbot_node import chatbot
from .nodes.tool_node import tool_node

from .nodes.user_interrupt_node import user_interrupt_node
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import tools_condition
from langchain_core.messages import SystemMessage
from .state import State

from langgraph.checkpoint.memory import InMemorySaver

memory = InMemorySaver()

def should_interrupt_user(state: State):
    """
    Conditional function to determine if we should interrupt the user.
    """
    if state.get("user_interrupt_needed", False):
        return "user_interrupt"
    else:
        return "chatbot"

graph_builder = StateGraph(State)

graph_builder.add_node("chatbot", chatbot)
graph_builder.add_edge(START, "chatbot")

graph_builder.add_node("tools", tool_node)
graph_builder.add_conditional_edges("chatbot", tools_condition)

graph_builder.add_edge("tools", "chatbot")

graph = graph_builder.compile(checkpointer=memory)