DROP TABLE "things";

CREATE TABLE "things" (
  "id" SERIAL PRIMARY KEY,
  "body" text NOT NULL CHECK ("body" != ''),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "things"("body") VALUES ('test');

UPDATE "things" 
SET "body" = 'new body', "updatedAt" = CURRENT_TIMESTAMP
WHERE "id"= 1;

DELETE FROM "things" WHERE "id"= 1;