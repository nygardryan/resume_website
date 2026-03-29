def test_create_collections_creates_missing_only(import_fresh):
    collections = import_fresh("database.collections")
    client = collections.MilvusClient("dummy.db")
    client.collections.add(collections.RESUME_COLLECTION)

    collections.create_collections(client)

    created = [call["collection_name"] for call in client.create_collection_calls]
    assert created == [collections.ANSWER_COLLECTION]


def test_clear_database_drops_existing_collections(import_fresh):
    collections = import_fresh("database.collections")
    client = collections.MilvusClient("dummy.db")
    client.collections = set(collections.db_collections)

    collections.clear_database(client)

    dropped = [call["collection_name"] for call in client.drop_collection_calls]
    assert dropped == collections.db_collections


def test_insert_answer_uses_embedding_vector(import_fresh):
    collections = import_fresh("database.collections")
    client = collections.MilvusClient("dummy.db")

    collections.insert_answer(client, "What is Python?", "A language")

    assert len(client.insert_calls) == 1
    payload = client.insert_calls[0]
    assert payload["collection_name"] == collections.ANSWER_COLLECTION
    row = payload["data"][0]
    assert row["question"] == "What is Python?"
    assert row["answer"] == "A language"
    assert len(row["vector"]) == 768


def test_search_answers_queries_correct_collection(import_fresh):
    collections = import_fresh("database.collections")
    client = collections.MilvusClient("dummy.db")

    collections.search_answers(client, "Tell me about yourself")

    assert len(client.search_calls) == 1
    query = client.search_calls[0]
    assert query["collection_name"] == collections.ANSWER_COLLECTION
    assert query["limit"] == 10
    assert query["output_fields"] == ["question", "answer"]
