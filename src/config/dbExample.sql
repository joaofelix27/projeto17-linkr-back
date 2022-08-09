CREATE TABLE "users"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "createdAt" DATE DEFAULT NOW()
);

CREATE TABLE "sessions"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "userId" INT NOT NULL REFERENCES users(id),
    "token" TEXT,
    "createdAt" DATE DEFAULT NOW()
);