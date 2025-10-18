#!/usr/bin/env python3
"""
Main entry point for the LangGraph chatbot project.
"""

from cli import interactive_mode, interview_mode, interview_ai_with_human_in_loop_mode


if __name__ == "__main__":
    try:
        interview_ai_with_human_in_loop_mode()
    except Exception as e:
        print(e)
        