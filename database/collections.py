
from pymilvus import MilvusClient, model


RESUME_COLLECTION = "resumes"
ANSWER_COLLECTION = "answers"

db_collections = [RESUME_COLLECTION, ANSWER_COLLECTION]


embedding_fn = model.DefaultEmbeddingFunction()

def create_collections(client: MilvusClient):
    for collection in db_collections:
        if client.has_collection(collection_name=collection):
            continue
        client.create_collection(collection_name=collection, dimension=768)

def clear_database(client: MilvusClient):
    for collection in db_collections:
        if client.has_collection(collection_name=collection):
            client.drop_collection(collection_name=collection)


def insert_answer(client: MilvusClient, question: str, answer: str):
    client.insert(collection_name=ANSWER_COLLECTION, data=[{"question": question, "answer": answer, "vector": embedding_fn.encode_queries([question])[0]}])


def search_answers(client: MilvusClient, question: str):
    return client.search(collection_name=ANSWER_COLLECTION, data=embedding_fn.encode_queries([question])[0], limit=10, output_fields=["question", "answer"])



