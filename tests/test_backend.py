import types

import pytest
from fastapi import HTTPException


class _FakeGraph:
    def __init__(self, events=None, error=None):
        self.events = events or []
        self.error = error
        self.calls = []

    def stream(self, payload, config=None):
        self.calls.append((payload, config))
        if self.error:
            raise self.error
        for event in self.events:
            yield event


@pytest.mark.asyncio
async def test_root_endpoint(import_fresh):
    backend = import_fresh("backend")
    result = await backend.root()
    assert result == {"message": "Resume Website API"}


@pytest.mark.asyncio
async def test_chat_success_with_provided_thread_id(monkeypatch, import_fresh):
    backend = import_fresh("backend")
    fake_graph = _FakeGraph(
        events=[
            {"chatbot": {"messages": [types.SimpleNamespace(content="hello from bot")]}}
        ]
    )
    monkeypatch.setattr(backend, "interactive_mode_graph", fake_graph)

    request = backend.ChatRequest(message="hello", thread_id="thread-123")
    response = await backend.chat(request)

    assert response.response == "hello from bot"
    assert response.thread_id == "thread-123"

    payload, config = fake_graph.calls[0]
    assert payload["messages"] == [{"role": "user", "content": "hello"}]
    assert payload["user_interrupt_needed"] is False
    assert config == {"configurable": {"thread_id": "thread-123"}}


@pytest.mark.asyncio
async def test_chat_generates_thread_id_when_missing(monkeypatch, import_fresh):
    backend = import_fresh("backend")
    fake_graph = _FakeGraph(
        events=[{"chatbot": {"messages": [types.SimpleNamespace(content="generated id")]}}]
    )
    monkeypatch.setattr(backend, "interactive_mode_graph", fake_graph)
    monkeypatch.setattr(backend.uuid, "uuid4", lambda: "uuid-from-test")

    request = backend.ChatRequest(message="hello")
    response = await backend.chat(request)

    assert response.thread_id == "uuid-from-test"


@pytest.mark.asyncio
async def test_chat_raises_when_no_message_content(monkeypatch, import_fresh):
    backend = import_fresh("backend")
    fake_graph = _FakeGraph(events=[{"chatbot": {"messages": []}}])
    monkeypatch.setattr(backend, "interactive_mode_graph", fake_graph)

    with pytest.raises(HTTPException) as exc:
        await backend.chat(backend.ChatRequest(message="hello", thread_id="t"))

    assert exc.value.status_code == 500
    assert "Failed to get response from chatbot" in exc.value.detail


@pytest.mark.asyncio
async def test_chat_wraps_graph_errors(monkeypatch, import_fresh):
    backend = import_fresh("backend")
    fake_graph = _FakeGraph(error=RuntimeError("graph failed"))
    monkeypatch.setattr(backend, "interactive_mode_graph", fake_graph)

    with pytest.raises(HTTPException) as exc:
        await backend.chat(backend.ChatRequest(message="hello", thread_id="t"))

    assert exc.value.status_code == 500
    assert "graph failed" in exc.value.detail
