"""Configuration settings for the chatbot."""

from langchain.chat_models import init_chat_model


def get_llm():
    """Initialize and return the configured LLM.
    
    Returns:
        The configured chat model instance.
    """
    return init_chat_model("anthropic:claude-3-7-sonnet-latest")
