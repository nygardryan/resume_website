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
        List of tuples of (question, answer)
    """
    print("INTERVIEW QUESTION ASKED: " + interview_question)

    answers = search_answers(client, interview_question)

    response = []

    for answer in answers:
        response.append((answer["question"], answer["answer"]))

    print("ANSWERS: ", response)

    return response