def test_database_init_creates_collections(monkeypatch, import_fresh):
    calls = []

    def fake_create_collections(client):
        calls.append(client)

    collections = import_fresh("database.collections")
    db = import_fresh("database.db")
    monkeypatch.setattr(collections, "create_collections", fake_create_collections)

    module = import_fresh("database")

    assert calls == [db.client]
    assert module.client is db.client
