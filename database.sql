CREATE TABLE "Todo" (
    "id" SERIAL PRIMARY KEY,
    "todo" VARCHAR(80) NOT NULL
);

INSERT INTO "Todo" 
	("todo") 
VALUES 
	('Do your homework!'),
	('Wash your clothes');