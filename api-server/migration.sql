DROP TABLE IF EXISTS store, employee CASCADE;
-- DROP TABLE IF EXISTS order;



CREATE TABLE store (
    id serial PRIMARY KEY, 
    name varchar(20),
    location varchar(20)

);

CREATE TABLE employee (
    id serial PRIMARY KEY, 
    name varchar(20),
    position varchar(20),
    full_or_part varchar(20),
    store_id integer, 
    CONSTRAINT fk_store_id
        FOREIGN KEY(store_id)
        REFERENCES store(id)
        ON DELETE CASCADE

);