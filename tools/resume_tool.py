from pathlib import Path
from langchain_core.tools import tool





resume_path = Path("resumes")







@tool
def resume_tool(resume_file_name: str):
    """
    Opens and returns the contents of a resume file from the resumes folder.
    
    Available resume options:
    - Default Resume
    - Backend Engineer
    - DevOps Engineer
    - Full-Stack Engineer
    - Senior Python Engineer

    Args:
        resume_file_name: The name of the resume file to open. Must be one of the available options.
    
    Returns:
        The contents of the resume file as a string
    """
    try:
        print(f"Opening resume file: {resume_file_name}")
        # Construct the path to the resume file
        full_resume_path = resume_path / resume_file_name
        
        # Check if the file exists
        if not full_resume_path.exists():
            return f"Resume file '{resume_file_name}' not found in the resumes folder."
        
        # Read and return the contents
        with open(full_resume_path, 'r', encoding='utf-8') as file:
            content = file.read()
            return f"Contents of {resume_file_name}:\n\n{content}"
    
    except Exception as e:
        return f"Error reading resume file '{resume_file_name}': {str(e)}"