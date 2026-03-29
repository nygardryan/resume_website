def test_database_init_creates_collections(import_fresh):
    module = import_fresh("database")

    created = [call["collection_name"] for call in module.client.create_collection_calls]
    assert created == ["resumes", "answers"]
