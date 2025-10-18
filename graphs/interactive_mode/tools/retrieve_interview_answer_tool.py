from langchain_core.tools import tool
from database.collections import search_answers
from database import client




@tool
def retrieve_interview_question_answer_tool(interview_question: str):
    """
    Retrieves the answer to a given interview question.
    
    Args:
        interview_question: The question to answer.
    
    Returns:
        List of tuples of (question, answer) or empty list if no good answers found
    """
    print("INTERVIEW QUESTION ASKED: " + interview_question)

    answers = search_answers(client, interview_question)

    response = []

    for answer in answers:
        response.append((answer["question"], answer["answer"]))

    print("ANSWERS: ", response)

    # If no answers found or answers are not relevant enough, return empty list
    # This will trigger the user interrupt
    if not response or len(response) == 0:
        print("No relevant answers found in database. Triggering user interrupt.")
        return []

    return response