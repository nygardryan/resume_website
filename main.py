#!/usr/bin/env python3
"""
Main entry point for the LangGraph chatbot project.
"""

import sys
from pathlib import Path
import os
from typing import Annotated

from langchain.chat_models import init_chat_model
from typing_extensions import TypedDict

from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_core.tools import tool
from langchain_core.messages import SystemMessage
from typing import Literal
from enum import Enum

from langchain.chat_models import init_chat_model

class State(TypedDict):
    messages: Annotated[list, add_messages]


graph_builder = StateGraph(State)

personality_path = Path("personality.txt")
personality = personality_path.read_text()
llm = init_chat_model(
    model="claude-3-5-haiku-20241022",
)

resume_path = Path("resumes")
available_resumes = [f.name for f in resume_path.iterdir() if f.is_file()]

ResumeType = Literal[tuple(available_resumes)]

@tool
def resume_tool(resume_file_name: ResumeType):
    """
    Opens and returns the contents of a resume file from the resumes folder.
    
    Available resume options:
    - Default Resume
    - Backend Engineer
    - DevOps Engineer
    - Full-Stack Engineer
    - Senior Python Engineer

    Args:
        resume_file_name: The name of the resume file to open. Must be one of the available options.
    
    Returns:
        The contents of the resume file as a string
    """
    try:
        print(f"Opening resume file: {resume_file_name}")
        # Construct the path to the resume file
        full_resume_path = resume_path / resume_file_name
        
        # Check if the file exists
        if not full_resume_path.exists():
            return f"Resume file '{resume_file_name}' not found in the resumes folder."
        
        # Read and return the contents
        with open(full_resume_path, 'r', encoding='utf-8') as file:
            content = file.read()
            return f"Contents of {resume_file_name}:\n\n{content}"
    
    except Exception as e:
        return f"Error reading resume file '{resume_file_name}': {str(e)}"

resume_tool.invoke("Backend Engineer")

tools = [resume_tool]

llm_with_tools = llm.bind_tools(tools)

def chatbot(state: State):
    return {"messages": [SystemMessage(personality)] + [llm_with_tools.invoke(state["messages"])]}

tool_node = ToolNode(tools=tools)

graph_builder.add_node("chatbot", chatbot)
graph_builder.add_node("tools", tool_node)

graph_builder.add_conditional_edges("chatbot", tools_condition)
graph_builder.add_edge("tools", "chatbot")
graph_builder.add_edge(START, "chatbot")
graph = graph_builder.compile()


def main():
    def stream_graph_updates(user_input: str):
        for event in graph.stream({"messages": [{"role": "user", "content": user_input}]}):
            for value in event.values():
                print("Assistant:", value["messages"][-1].content)


    while True:
        try:
            user_input = input("User: ")
            if user_input.lower() in ["quit", "exit", "q"]:
                print("Goodbye!")
                break
            stream_graph_updates(user_input)
        except:
            # fallback if input() is not available
            user_input = "What do you know about LangGraph?"
            print("User: " + user_input)
            stream_graph_updates(user_input)
            break

if __name__ == "__main__":
    main()
