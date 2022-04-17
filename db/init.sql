CREATE TABLE IF NOT EXISTS preset (
    id INT NOT NULL,
    name VARCHAR NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO preset (id, name, user_id, created_at)
VALUES (1, 'My preset #1', 11, '2022-04-07');

INSERT INTO preset (id, name, user_id, created_at)
VALUES (2, 'My preset #2', 12, '2022-04-08');
