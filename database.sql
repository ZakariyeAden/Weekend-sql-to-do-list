CREATE TABLE "Todos" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(80) NOT NULL
);

INSERT INTO "Todos" 
	("task") 
VALUES 
	('Do your homework!'),
	('Wash your clothes');