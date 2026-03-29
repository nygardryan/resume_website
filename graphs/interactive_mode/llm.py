from langchain.chat_models import init_chat_model
from .tools import tools


llm = init_chat_model(
    model="claude-sonnet-4-20250514",
)


llm_with_tools = llm.bind_tools(tools)