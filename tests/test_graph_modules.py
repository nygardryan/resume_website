def test_should_interrupt_user_routes_correctly(import_fresh):
    module = import_fresh("graphs.interactive_mode.graph")

    assert module.should_interrupt_user({"user_interrupt_needed": True}) == "user_interrupt"
    assert module.should_interrupt_user({"user_interrupt_needed": False}) == "chatbot"
    assert module.should_interrupt_user({}) == "chatbot"


def test_graph_modules_compile_graph_objects(import_fresh):
    interactive_graph = import_fresh("graphs.interactive_mode.graph")
    interviewer_graph = import_fresh("graphs.interviewer.graph")

    assert hasattr(interactive_graph.graph, "stream")
    assert hasattr(interviewer_graph.graph, "stream")
