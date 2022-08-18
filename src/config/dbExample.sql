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

CREATE TABLE public.posts (
    "id" serial NOT NULL UNIQUE,
    "userId" int NOT NULL,
    "link" TEXT NOT NULL,
    "body" TEXT,
    "createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
    CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.likes (
    "id" serial NOT NULL UNIQUE,
    "postId" int NOT NULL,
    "userId" int NOT NULL,
    "createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
    CONSTRAINT "likes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public."followedUsers" (
    "id" serial NOT NULL UNIQUE,
    "userId" INT NOT NULL REFERENCES users(id),
	"followedUserId" INT NOT NULL REFERENCES users(id),
    CONSTRAINT "followingUsers_pk" PRIMARY KEY ("id"),
    "createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()'
) WITH (
  OIDS=FALSE
);

CREATE TABLE public."hashtagPost" (
    "id" serial NOT NULL UNIQUE,
    "postId" int NOT NULL,
    "hashtagId" int NOT NULL,
    "createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
    CONSTRAINT "hashtagPost_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.hashtag (
    "id" serial NOT NULL UNIQUE,
    "name" varchar(100) NOT NULL UNIQUE,
    "usedCount" int NOT NULL DEFAULT 1  ,
    CONSTRAINT "hashtag_pk" PRIMARY KEY ("id"),
    "createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()'
) WITH (
  OIDS=FALSE
);



ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE;
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;

ALTER TABLE "hashtagPost" ADD CONSTRAINT "hashtagPost_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE;
ALTER TABLE "hashtagPost" ADD CONSTRAINT "hashtagPost_fk1" FOREIGN KEY ("hashtagId") REFERENCES "hashtag"("id") ON DELETE CASCADE;