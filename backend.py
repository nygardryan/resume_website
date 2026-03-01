from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from graphs.interactive_mode.graph import graph as interactive_mode_graph
import uuid
import re

app = FastAPI(title="Resume Website API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    thread_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    thread_id: str


BRIEF_RESPONSE_WORD_LIMIT = 90
DETAILED_RESPONSE_WORD_LIMIT = 180
DETAIL_REQUEST_TERMS = {
    "detail",
    "detailed",
    "more detail",
    "deep dive",
    "full breakdown",
    "comprehensive",
    "elaborate",
    "longer answer",
}


def _requested_detailed_answer(message: str) -> bool:
    normalized_message = message.lower()
    return any(term in normalized_message for term in DETAIL_REQUEST_TERMS)


def _normalize_response_format(response: str) -> str:
    # Keep formatting lightweight and readable by default.
    normalized = response.replace("**", "").strip()
    normalized = re.sub(r"\n{3,}", "\n\n", normalized)
    return normalized


def _truncate_to_word_limit(response: str, word_limit: int) -> str:
    words = response.split()
    if len(words) <= word_limit:
        return response

    truncated = " ".join(words[:word_limit]).rstrip(",;:")
    if not truncated.endswith((".", "!", "?")):
        truncated += "..."
    return truncated


@app.get("/")
async def root():
    return {"message": "Resume Website API"}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat endpoint that uses the interactive_mode graph to process messages.
    
    Args:
        request: ChatRequest containing the user message and optional thread_id
        
    Returns:
        ChatResponse containing the assistant's response and thread_id
    """
    try:
        # Generate or use provided thread_id for conversation state
        thread_id = request.thread_id or str(uuid.uuid4())
        
        # Create the config for the graph with the thread_id
        config = {"configurable": {"thread_id": thread_id}}
        
        # Prepare the input for the graph
        # The graph expects messages in the format: [{"role": "user", "content": "..."}]
        # This matches the format used in cli.py
        user_message = {"role": "user", "content": request.message}
        
        # Stream the graph to get the response
        # Initialize state with messages and user_interrupt_needed
        response_content = None
        for event in interactive_mode_graph.stream(
            {"messages": [user_message], "user_interrupt_needed": False}, 
            config=config
        ):
            for value in event.values():
                if "messages" in value and len(value["messages"]) > 0:
                    last_message = value["messages"][-1]
                    if hasattr(last_message, "content") and isinstance(last_message.content, str):
                        response_content = last_message.content
        
        if response_content is None:
            raise HTTPException(status_code=500, detail="Failed to get response from chatbot")

        word_limit = (
            DETAILED_RESPONSE_WORD_LIMIT
            if _requested_detailed_answer(request.message)
            else BRIEF_RESPONSE_WORD_LIMIT
        )
        response_content = _truncate_to_word_limit(
            _normalize_response_format(response_content),
            word_limit,
        )

        return ChatResponse(response=response_content, thread_id=thread_id)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat request: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

