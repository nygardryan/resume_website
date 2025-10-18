from graphs.interactive_mode.state import State
from graphs.interactive_mode.graph import graph as interactive_mode_graph
from graphs.interviewer.graph import graph as interviewer_mode_graph
from database import client


config = {"configurable": {"thread_id": "1"}}

def interactive_mode():

    def stream_graph_updates(user_input: str):
        for event in interactive_mode_graph.stream({"messages": [{"role": "user", "content": user_input}]}, config=config):
            for value in event.values():
                print("Assistant:", value["messages"][-1].content)


    while True:
        try:
            user_input = input("User: ")
            if user_input.lower() in ["quit", "exit", "q"]:
                print("Goodbye!")
                break
            stream_graph_updates(user_input)
        except:
            # fallback if input() is not available
            user_input = "What do you know about LangGraph?"
            print("User: " + user_input)
            stream_graph_updates(user_input)
            break



def interview_mode():
    def stream_graph_updates(user_input: str):
        for event in interviewer_mode_graph.stream({"messages": [{"role": "user", "content": user_input}]}, config=config):
            for value in event.values():
                print("Assistant:", value["messages"][-1].content)


    while True:
        try:
            user_input = input("User: ")
            if user_input.lower() in ["quit", "exit", "q"]:
                print("Goodbye!")
                break
            stream_graph_updates(user_input)
        except:
            # fallback if input() is not available
            user_input = "What do you know about LangGraph?"
            print("User: " + user_input)
            stream_graph_updates(user_input)
            break


def interview_ai_with_human_in_loop_mode():

    def message_interviewee(question: str):
        for event in interactive_mode_graph.stream({"messages": [{"role": "user", "content": question}]}, config=config):
            for value in event.values():
                message = value["messages"][-1].content
                if type(message) == str:
                    return message
    
    def message_interviewer(answer: str):
        print("Response to Interviewer: " + answer)
        for event in interviewer_mode_graph.stream({"messages": [{"role": "user", "content": answer}]}, config=config):
            for value in event.values():
                message = value["messages"][-1].content
                if type(message) == str:
                    return message


    interviewer_message = "Hello"
    interviewee_message = "Hello"
    while True:
        try:
            interviewer_message = message_interviewer(interviewee_message)

            interviewee_message = message_interviewee(interviewer_message)

        except Exception as e:
            print(e)
            m = e
            break
