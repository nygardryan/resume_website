
from pymilvus import MilvusClient


RESUME_COLLECTION = "resumes"
ANSWER_COLLECTION = "answers"

db_collections = [RESUME_COLLECTION, ANSWER_COLLECTION]



def create_collections(client: MilvusClient):
    for collection in db_collections:
        if client.has_collection(collection_name=collection):
            continue
        client.create_collection(collection_name=collection, dimension=768)

def clear_database(client: MilvusClient):
    for collection in db_collections:
        if client.has_collection(collection_name=collection):
            client.drop_collection(collection_name=collection)

