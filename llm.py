from langchain.chat_models import init_chat_model


llm = init_chat_model(
    model="claude-3-5-haiku-20241022",
)