import importlib
import sys
import types

import pytest


class FakeVector(list):
    @property
    def shape(self):
        return (len(self),)


class DummyEmbeddingFunction:
    dim = 768

    def encode_documents(self, docs):
        return [FakeVector([float(i)] * self.dim) for i, _ in enumerate(docs)]

    def encode_queries(self, queries):
        return [FakeVector([0.25] * self.dim) for _ in queries]


class DummyMilvusClient:
    def __init__(self, *args, **kwargs):
        self.args = args
        self.kwargs = kwargs
        self.collections = set()
        self.create_collection_calls = []
        self.drop_collection_calls = []
        self.insert_calls = []
        self.search_calls = []

    def has_collection(self, collection_name):
        return collection_name in self.collections

    def create_collection(self, **kwargs):
        self.create_collection_calls.append(kwargs)
        self.collections.add(kwargs["collection_name"])

    def drop_collection(self, **kwargs):
        self.drop_collection_calls.append(kwargs)
        self.collections.discard(kwargs["collection_name"])

    def insert(self, **kwargs):
        self.insert_calls.append(kwargs)
        return {"insert_count": len(kwargs.get("data", []))}

    def search(self, **kwargs):
        self.search_calls.append(kwargs)
        return []


class DummyLLM:
    def __init__(self):
        self.bound_tools = None
        self.invocations = []

    def bind_tools(self, tools):
        self.bound_tools = tools
        return self

    def invoke(self, messages):
        self.invocations.append(messages)
        return types.SimpleNamespace(content="llm-response")


class DummyCompiledGraph:
    def __init__(self):
        self.calls = []
        self.events = []

    def stream(self, payload, config=None):
        self.calls.append((payload, config))
        for event in self.events:
            yield event


class DummyStateGraph:
    def __init__(self, state):
        self.state = state
        self.nodes = {}
        self.edges = []
        self.conditional_edges = []
        self.checkpointer = None

    def add_node(self, name, node):
        self.nodes[name] = node

    def add_edge(self, start, end):
        self.edges.append((start, end))

    def add_conditional_edges(self, name, condition):
        self.conditional_edges.append((name, condition))

    def compile(self, checkpointer=None):
        self.checkpointer = checkpointer
        return DummyCompiledGraph()


class DummyToolNode:
    def __init__(self, tools):
        self.tools = tools

    def __call__(self, *args, **kwargs):
        return {}


def passthrough_tool(func=None, **_kwargs):
    if func is None:
        return lambda inner: inner
    return func


@pytest.fixture(autouse=True)
def stub_external_dependencies(monkeypatch):
    pymilvus = types.ModuleType("pymilvus")
    pymilvus.MilvusClient = DummyMilvusClient
    pymilvus.model = types.SimpleNamespace(DefaultEmbeddingFunction=DummyEmbeddingFunction)
    monkeypatch.setitem(sys.modules, "pymilvus", pymilvus)

    langchain = types.ModuleType("langchain")
    chat_models = types.ModuleType("langchain.chat_models")
    chat_models.init_chat_model = lambda *args, **kwargs: DummyLLM()
    monkeypatch.setitem(sys.modules, "langchain", langchain)
    monkeypatch.setitem(sys.modules, "langchain.chat_models", chat_models)

    langchain_core = types.ModuleType("langchain_core")
    core_tools = types.ModuleType("langchain_core.tools")
    core_tools.tool = passthrough_tool
    core_messages = types.ModuleType("langchain_core.messages")

    class SystemMessage:
        def __init__(self, content):
            self.content = content

    class HumanMessage:
        def __init__(self, content):
            self.content = content

    core_messages.SystemMessage = SystemMessage
    core_messages.HumanMessage = HumanMessage

    monkeypatch.setitem(sys.modules, "langchain_core", langchain_core)
    monkeypatch.setitem(sys.modules, "langchain_core.tools", core_tools)
    monkeypatch.setitem(sys.modules, "langchain_core.messages", core_messages)

    langgraph = types.ModuleType("langgraph")
    graph_mod = types.ModuleType("langgraph.graph")
    graph_mod.StateGraph = DummyStateGraph
    graph_mod.START = "START"
    graph_mod.END = "END"
    graph_message_mod = types.ModuleType("langgraph.graph.message")
    graph_message_mod.add_messages = lambda messages, *_args, **_kwargs: messages
    prebuilt_mod = types.ModuleType("langgraph.prebuilt")
    prebuilt_mod.ToolNode = DummyToolNode
    prebuilt_mod.tools_condition = lambda _state: "tools"
    checkpoint_mod = types.ModuleType("langgraph.checkpoint")
    checkpoint_memory_mod = types.ModuleType("langgraph.checkpoint.memory")

    class InMemorySaver:
        pass

    checkpoint_memory_mod.InMemorySaver = InMemorySaver

    types_mod = types.ModuleType("langgraph.types")

    class Command:
        pass

    def interrupt(*_args, **_kwargs):
        return {"interrupted": True}

    types_mod.Command = Command
    types_mod.interrupt = interrupt

    monkeypatch.setitem(sys.modules, "langgraph", langgraph)
    monkeypatch.setitem(sys.modules, "langgraph.graph", graph_mod)
    monkeypatch.setitem(sys.modules, "langgraph.graph.message", graph_message_mod)
    monkeypatch.setitem(sys.modules, "langgraph.prebuilt", prebuilt_mod)
    monkeypatch.setitem(sys.modules, "langgraph.checkpoint", checkpoint_mod)
    monkeypatch.setitem(sys.modules, "langgraph.checkpoint.memory", checkpoint_memory_mod)
    monkeypatch.setitem(sys.modules, "langgraph.types", types_mod)


@pytest.fixture
def import_fresh():
    def _import(module_name):
        for loaded_name in list(sys.modules):
            if loaded_name == module_name or loaded_name.startswith(f"{module_name}."):
                sys.modules.pop(loaded_name, None)
        importlib.invalidate_caches()
        return importlib.import_module(module_name)

    return _import
