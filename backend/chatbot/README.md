# Resume Chatbot

A structured chatbot implementation for Ryan Nygard's resume website, built with LangGraph and designed to interact with recruiters and hiring managers.

## Architecture

The chatbot is organized into several modules following clean coding principles:

### Directory Structure

```
backend/chatbot/
├── __init__.py              # Package initialization
├── main.py                  # Entry point for the application
├── models/                  # Data models and state definitions
│   ├── __init__.py
│   └── state.py            # LangGraph state structure
├── config/                  # Configuration settings
│   ├── __init__.py
│   └── settings.py         # LLM configuration
├── nodes/                   # LangGraph node implementations
│   ├── __init__.py
│   └── chatbot_node.py     # Main chatbot processing node
├── graph/                   # LangGraph setup and configuration
│   ├── __init__.py
│   └── graph_builder.py    # Graph creation and compilation
└── handlers/                # Business logic handlers
    ├── __init__.py
    └── stream_handler.py   # Streaming response handling
```

## Usage

### Running the Chatbot

```bash
cd backend/chatbot
python main.py
```

### Using as a Module

```python
from backend.chatbot import StreamHandler

# Create a stream handler
handler = StreamHandler()

# Stream responses
for response in handler.stream_response("Tell me about Ryan's experience"):
    print(response)
```

## Key Features

- **Modular Design**: Clean separation of concerns with dedicated modules
- **Type Safety**: Full type hints throughout the codebase
- **Streaming Support**: Real-time response streaming
- **Error Handling**: Robust error handling and fallback mechanisms
- **Documentation**: Comprehensive docstrings and comments

## Dependencies

- `langchain`: For LLM integration
- `langgraph`: For conversation graph management
- `typing_extensions`: For enhanced type hints
