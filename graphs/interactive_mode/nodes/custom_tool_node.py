from langgraph.prebuilt import ToolNode
from ..state import State
from langchain_core.messages import ToolMessage


class CustomToolNode(ToolNode):
    """
    Custom tool node that can detect when retrieve_interview_question_answer_tool
    returns empty results and set the user_interrupt_needed flag.
    """
    
    def __call__(self, state: State):
        # Call the parent ToolNode
        result = super().__call__(state)
        
        # Check if any tool messages indicate empty results from retrieve_interview_question_answer_tool
        for message in result.get("messages", []):
            if isinstance(message, ToolMessage):
                # Check if this is from the retrieve_interview_question_answer_tool
                if hasattr(message, 'tool') and message.tool == "retrieve_interview_question_answer_tool":
                    # Check if the result is empty (no good answers found)
                    if not message.content or message.content == "[]" or message.content == "No relevant answers found in database. Triggering user interrupt.":
                        return {
                            **result,
                            "user_interrupt_needed": True
                        }
        
        return {
            **result,
            "user_interrupt_needed": False
        }

