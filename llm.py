from langchain.chat_models import init_chat_model
from tools import tools


llm = init_chat_model(
    model="claude-3-5-haiku-20241022",
)


llm_with_tools = llm.bind_tools(tools)