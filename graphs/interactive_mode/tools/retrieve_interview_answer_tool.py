from langchain_core.tools import tool
import pdb





@tool
def retrieve_interview_question_answer_tool(interview_question: str):
    """
    Retrieves the answer to a given interview question.
    
    Args:
        interview_question: The question to answer.
    
    Returns:
        List of tuples of (question, answer)
    """
    pdb.set_trace()

    return [("Where was the last place you worked?", "I worked at RLDatix from 2022 to present."), ("What is your favorite programming language?", "I like Python because it is a versatile language that can be used for a variety of tasks.")]
