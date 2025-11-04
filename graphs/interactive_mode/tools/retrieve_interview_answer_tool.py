from langchain_core.tools import tool
from database.collections import search_answers
from database import client
import pdb


@tool
def retrieve_interview_question_answer_tool(interview_question: str):
    """
    Retrieves the answer to a given interview question.
    
    Args:
        interview_question: The question to answer.
    
    Returns:
        List of tuples of (question, answer) or empty list if no good answers found
    """

    answers = search_answers(client, interview_question)

    response = []

    print("ANSWERS: ", answers)
    
    for answer in answers:
        if answer:
            for a in answer:
                response.append((a["question"], a["answer"]))

    if not response or len(response) == 0:
        return []
    
    return response