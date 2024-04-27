-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SYSTEM', 'USER', 'ASSISTANT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Context" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "date" INTEGER,
    "authors" VARCHAR(255)[],
    "tags" VARCHAR(255)[],
    "tokens" INTEGER,
    "content" TEXT,

    CONSTRAINT "Context_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SampleQuestion" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "content" TEXT NOT NULL,
    "contextId" TEXT NOT NULL,

    CONSTRAINT "SampleQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SampleAnswer" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ASSISTANT',
    "content" TEXT NOT NULL,
    "contextId" TEXT NOT NULL,
    "sampleQuestionId" TEXT NOT NULL,

    CONSTRAINT "SampleAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SampleChat" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "SampleChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FineTuneQuestion" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "content" TEXT NOT NULL,

    CONSTRAINT "FineTuneQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FineTuneAnswer" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ASSISTANT',
    "content" TEXT NOT NULL,
    "fineTuneQuestionId" TEXT NOT NULL,

    CONSTRAINT "FineTuneAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FineTuneChat" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "FineTuneChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SampleAnswer_sampleQuestionId_key" ON "SampleAnswer"("sampleQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "SampleChat_questionId_key" ON "SampleChat"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "SampleChat_answerId_key" ON "SampleChat"("answerId");

-- CreateIndex
CREATE UNIQUE INDEX "FineTuneAnswer_fineTuneQuestionId_key" ON "FineTuneAnswer"("fineTuneQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "FineTuneChat_questionId_key" ON "FineTuneChat"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "FineTuneChat_answerId_key" ON "FineTuneChat"("answerId");

-- AddForeignKey
ALTER TABLE "SampleQuestion" ADD CONSTRAINT "SampleQuestion_contextId_fkey" FOREIGN KEY ("contextId") REFERENCES "Context"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SampleAnswer" ADD CONSTRAINT "SampleAnswer_contextId_fkey" FOREIGN KEY ("contextId") REFERENCES "Context"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SampleAnswer" ADD CONSTRAINT "SampleAnswer_sampleQuestionId_fkey" FOREIGN KEY ("sampleQuestionId") REFERENCES "SampleQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SampleChat" ADD CONSTRAINT "SampleChat_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "SampleQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SampleChat" ADD CONSTRAINT "SampleChat_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "SampleAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SampleChat" ADD CONSTRAINT "SampleChat_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FineTuneAnswer" ADD CONSTRAINT "FineTuneAnswer_fineTuneQuestionId_fkey" FOREIGN KEY ("fineTuneQuestionId") REFERENCES "FineTuneQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FineTuneChat" ADD CONSTRAINT "FineTuneChat_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "FineTuneQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FineTuneChat" ADD CONSTRAINT "FineTuneChat_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "FineTuneAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FineTuneChat" ADD CONSTRAINT "FineTuneChat_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
