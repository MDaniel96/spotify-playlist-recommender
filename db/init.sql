CREATE TABLE IF NOT EXISTS user_ (
    id INT NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO user_ (id, email, password)
VALUES (11, 'abc@gmail.com', 'secret1');

INSERT INTO user_ (id, email, password)
VALUES (12, 'def@gmail.com', 'secret2');


CREATE TABLE IF NOT EXISTS preset (
    id INT NOT NULL,
    name VARCHAR NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user_(id)
);

INSERT INTO preset (id, name, user_id, created_at)
VALUES (1, 'My preset #1', 11, '2022-04-07');

INSERT INTO preset (id, name, user_id, created_at)
VALUES (2, 'My preset #2', 12, '2022-04-08');
