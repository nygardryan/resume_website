# LangGraph Project

A structured Python project using LangGraph with Anthropic Claude for building conversational AI agents.

## Project Structure

```
langgraph_project/
├── src/
│   └── langgraph_project/
│       ├── agents/           # LangGraph agents
│       ├── nodes/            # Graph nodes (processing steps)
│       ├── edges/            # Graph edges (conditional logic)
│       ├── state/            # State management
│       ├── utils/            # Utility functions
│       └── examples/         # Usage examples
├── tests/                    # Test files
├── docs/                     # Documentation
├── config/                   # Configuration files
├── scripts/                  # Utility scripts
├── requirements.txt          # Python dependencies
├── pyproject.toml           # Project configuration
└── main.py                  # Main entry point
```

## Features

- 🤖 **Chatbot Agent**: Built with LangGraph and Anthropic Claude
- 🔄 **State Management**: Pydantic-based state handling
- 🧩 **Modular Design**: Organized nodes, edges, and agents
- 🛠️ **Utilities**: Configuration and logging helpers
- 📝 **Examples**: Ready-to-run chat examples

## Quick Start

1. **Install dependencies** (using UV):
   ```bash
   uv pip install -r requirements.txt
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env and add your ANTHROPIC_API_KEY
   ```

3. **Run the chatbot**:
   ```bash
   python main.py
   ```

## Usage

### Basic Chat
```python
from langgraph_project.agents import ChatbotAgent

# Initialize the chatbot
chatbot = ChatbotAgent()

# Start chatting
response = chatbot.chat("Hello, how are you?")
print(response)
```

### Running Examples
```bash
# Run the simple chat example
python src/langgraph_project/examples/simple_chat.py
```

## Development

### Running Tests
```bash
pytest tests/
```

### Code Formatting
```bash
black src/
isort src/
```

### Type Checking
```bash
mypy src/
```

## Configuration

The project uses environment variables for configuration. See `.env.example` for available options:

- `ANTHROPIC_API_KEY`: Your Anthropic API key (required)
- `LOG_LEVEL`: Logging level (default: INFO)
- `DEBUG`: Debug mode (default: True)

## Dependencies

- **LangGraph**: For building stateful AI agent workflows
- **LangChain**: For LLM integration and utilities
- **Anthropic**: For Claude model access
- **Pydantic**: For data validation and state management
- **Python-dotenv**: For environment variable management

## License

MIT License - see LICENSE file for details.
