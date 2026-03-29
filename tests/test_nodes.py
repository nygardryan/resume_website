import types


def test_interactive_chatbot_node_invokes_llm(import_fresh):
    module = import_fresh("graphs.interactive_mode.nodes.chatbot_node")
    state = {"messages": [types.SimpleNamespace(content="Hello")]}

    result = module.chatbot(state)

    assert "messages" in result
    assert result["messages"][0].content == "llm-response"


def test_interviewer_chatbot_node_invokes_llm(import_fresh):
    module = import_fresh("graphs.interviewer.nodes.chatbot_node")
    state = {"messages": [types.SimpleNamespace(content="Tell me about yourself")]}

    result = module.chatbot(state)

    assert "messages" in result
    assert result["messages"][0].content == "llm-response"


def test_user_interrupt_node_stores_answer(monkeypatch, import_fresh):
    module = import_fresh("graphs.interactive_mode.nodes.user_interrupt_node")
    monkeypatch.setattr("builtins.input", lambda _prompt: "manual answer")
    calls = []

    def _fake_insert(client, question, answer):
        calls.append((client, question, answer))

    monkeypatch.setattr(module, "insert_answer", _fake_insert)
    state = {"messages": [types.SimpleNamespace(content="What is your experience?")]}

    result = module.user_interrupt_node(state)

    assert result["user_interrupt_needed"] is False
    assert "manual answer" in result["messages"][0].content
    assert calls[0][1:] == ("What is your experience?", "manual answer")


def test_user_interrupt_node_handles_insert_failure(monkeypatch, import_fresh):
    module = import_fresh("graphs.interactive_mode.nodes.user_interrupt_node")
    monkeypatch.setattr("builtins.input", lambda _prompt: "manual answer")

    def _raise(*_args, **_kwargs):
        raise RuntimeError("db down")

    monkeypatch.setattr(module, "insert_answer", _raise)
    state = {"messages": [types.SimpleNamespace(content="Question?")]}

    result = module.user_interrupt_node(state)

    assert result["user_interrupt_needed"] is False
    assert "manual answer" in result["messages"][0].content


def test_tool_node_uses_configured_tools(import_fresh):
    module = import_fresh("graphs.interactive_mode.nodes.tool_node")

    assert hasattr(module, "tool_node")
    assert hasattr(module.tool_node, "tools")
    assert len(module.tool_node.tools) >= 1
