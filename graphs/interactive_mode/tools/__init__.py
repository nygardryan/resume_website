
from .resume_tool import resume_tool
from .retrieve_interview_answer_tool import retrieve_interview_question_answer_tool
from .user_interrupt_tool import human_assistance
from config import HUMAN_INTERRUPT

if HUMAN_INTERRUPT:
    tools = [resume_tool, retrieve_interview_question_answer_tool, human_assistance]
else:
    tools = [resume_tool, retrieve_interview_question_answer_tool]

