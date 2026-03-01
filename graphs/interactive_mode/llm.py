import os
from langchain.chat_models import init_chat_model
from .tools import tools


DEFAULT_ANTHROPIC_MODEL = "claude-haiku-4-5-20251001"
DEFAULT_MAX_TOKENS = 160
DEFAULT_TEMPERATURE = 0.2


def _parse_int_env(var_name: str, default_value: int) -> int:
    raw_value = os.getenv(var_name)
    if raw_value is None:
        return default_value
    try:
        return int(raw_value)
    except ValueError:
        return default_value


def _parse_float_env(var_name: str, default_value: float) -> float:
    raw_value = os.getenv(var_name)
    if raw_value is None:
        return default_value
    try:
        return float(raw_value)
    except ValueError:
        return default_value

llm = init_chat_model(
    model=os.getenv("ANTHROPIC_MODEL", DEFAULT_ANTHROPIC_MODEL),
    max_tokens=_parse_int_env("ANTHROPIC_MAX_TOKENS", DEFAULT_MAX_TOKENS),
    temperature=_parse_float_env("ANTHROPIC_TEMPERATURE", DEFAULT_TEMPERATURE),
)


llm_with_tools = llm.bind_tools(tools)