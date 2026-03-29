import types


def _make_graph(messages):
    class _Graph:
        def __init__(self):
            self.calls = []

        def stream(self, payload, config=None):
            self.calls.append((payload, config))
            for message in messages:
                yield {"node": {"messages": [types.SimpleNamespace(content=message)]}}

    return _Graph()


def test_interactive_mode_exits_on_quit(monkeypatch, import_fresh, capsys):
    cli = import_fresh("cli")
    graph = _make_graph(["unused"])
    monkeypatch.setattr(cli, "interactive_mode_graph", graph)
    monkeypatch.setattr("builtins.input", lambda _prompt: "quit")

    cli.interactive_mode()

    out = capsys.readouterr().out
    assert "Goodbye!" in out
    assert graph.calls == []


def test_interactive_mode_fallback_on_input_error(monkeypatch, import_fresh, capsys):
    cli = import_fresh("cli")
    graph = _make_graph(["fallback reply"])
    monkeypatch.setattr(cli, "interactive_mode_graph", graph)

    def _raise(_prompt):
        raise RuntimeError("no stdin")

    monkeypatch.setattr("builtins.input", _raise)

    cli.interactive_mode()

    out = capsys.readouterr().out
    assert "User: What do you know about LangGraph?" in out
    assert "Assistant: fallback reply" in out
    assert len(graph.calls) == 1


def test_interview_mode_streams_assistant_response(monkeypatch, import_fresh, capsys):
    cli = import_fresh("cli")
    graph = _make_graph(["interview response"])
    monkeypatch.setattr(cli, "interviewer_mode_graph", graph)
    values = iter(["question", "q"])
    monkeypatch.setattr("builtins.input", lambda _prompt: next(values))

    cli.interview_mode()

    out = capsys.readouterr().out
    assert "Assistant: interview response" in out
    assert len(graph.calls) == 1


def test_interview_ai_with_human_in_loop_returns_messages(monkeypatch, import_fresh):
    cli = import_fresh("cli")

    interactive_graph = _make_graph(["candidate answer"])
    interviewer_graph = _make_graph(["interviewer question"])
    monkeypatch.setattr(cli, "interactive_mode_graph", interactive_graph)
    monkeypatch.setattr(cli, "interviewer_mode_graph", interviewer_graph)

    call_count = {"count": 0}

    original_stream = interviewer_graph.stream

    def stop_after_one_iteration(*_args, **_kwargs):
        call_count["count"] += 1
        if call_count["count"] > 1:
            raise KeyboardInterrupt("stop loop")
        return original_stream(*_args, **_kwargs)

    monkeypatch.setattr(interviewer_graph, "stream", stop_after_one_iteration)

    try:
        cli.interview_ai_with_human_in_loop_mode()
    except KeyboardInterrupt:
        pass

    assert call_count["count"] == 2
