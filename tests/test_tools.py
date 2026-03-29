def test_resume_tool_reads_file(monkeypatch, import_fresh, tmp_path):
    module = import_fresh("graphs.interactive_mode.tools.resume_tool")
    resume_file = tmp_path / "resume.txt"
    resume_file.write_text("resume body", encoding="utf-8")
    monkeypatch.setattr(module, "resume_path", tmp_path)

    content = module.resume_tool("resume.txt")

    assert "Contents of resume.txt" in content
    assert "resume body" in content


def test_resume_tool_missing_file(import_fresh, tmp_path, monkeypatch):
    module = import_fresh("graphs.interactive_mode.tools.resume_tool")
    monkeypatch.setattr(module, "resume_path", tmp_path)

    content = module.resume_tool("missing.txt")

    assert "not found" in content


def test_resume_tool_handles_read_errors(import_fresh, monkeypatch):
    module = import_fresh("graphs.interactive_mode.tools.resume_tool")

    class _BadPath:
        def __truediv__(self, _name):
            class _BrokenFile:
                def exists(self):
                    return True

            return _BrokenFile()

    monkeypatch.setattr(module, "resume_path", _BadPath())
    monkeypatch.setattr(
        "builtins.open",
        lambda *_args, **_kwargs: (_ for _ in ()).throw(OSError("cannot open")),
    )

    result = module.resume_tool("resume.txt")

    assert "Error reading resume file" in result


def test_retrieve_interview_question_answer_tool_flattens_results(monkeypatch, import_fresh):
    module = import_fresh("graphs.interactive_mode.tools.retrieve_interview_answer_tool")

    def _fake_search(_client, _question):
        return [
            [{"question": "q1", "answer": "a1"}],
            [{"question": "q2", "answer": "a2"}],
        ]

    monkeypatch.setattr(module, "search_answers", _fake_search)

    result = module.retrieve_interview_question_answer_tool("question")

    assert result == [("q1", "a1"), ("q2", "a2")]


def test_retrieve_interview_question_answer_tool_empty(import_fresh, monkeypatch):
    module = import_fresh("graphs.interactive_mode.tools.retrieve_interview_answer_tool")
    monkeypatch.setattr(module, "search_answers", lambda *_args, **_kwargs: [])

    result = module.retrieve_interview_question_answer_tool("question")
    assert result == []


def test_human_assistance_persists_answer(monkeypatch, import_fresh):
    module = import_fresh("graphs.interactive_mode.tools.user_interrupt_tool")
    monkeypatch.setattr("builtins.input", lambda _prompt: "human answer")
    calls = []

    def _fake_insert(client, question, answer):
        calls.append((client, question, answer))

    monkeypatch.setattr(module, "insert_answer", _fake_insert)

    result = module.human_assistance("What is your strength?")

    assert result == "human answer"
    assert calls
    assert calls[0][1:] == ("What is your strength?", "human answer")
