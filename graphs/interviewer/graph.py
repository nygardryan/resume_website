
from .nodes.chatbot_node import chatbot
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_core.messages import SystemMessage
from .state import State

from langgraph.checkpoint.memory import InMemorySaver

memory = InMemorySaver()

graph_builder = StateGraph(State)

graph_builder.add_node("chatbot", chatbot)
graph_builder.add_edge(START, "chatbot")


graph = graph_builder.compile(checkpointer=memory)