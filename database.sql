CREATE TABLE "Todos" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(80) NOT NULL,
    "complete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "Todos" 
	("task","complete") 
VALUES 
	('Do your homework!', True),
	('Wash your clothes', False);