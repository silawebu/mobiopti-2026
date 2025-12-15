-- CreateEnum
CREATE TYPE "UrlTestStatus" AS ENUM ('ok', 'warning', 'critical');

-- CreateTable
CREATE TABLE "test_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "test_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isPaid" BOOLEAN NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "maxPoints" INTEGER NOT NULL,
    "severity" INTEGER NOT NULL,

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "url" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "url_test" (
    "createdAt" TIMESTAMP(3) NOT NULL,
    "urlId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "status" "UrlTestStatus" NOT NULL,
    "message" TEXT,
    "content" TEXT,

    CONSTRAINT "url_test_pkey" PRIMARY KEY ("createdAt","urlId","testId")
);

-- CreateIndex
CREATE UNIQUE INDEX "test_category_name_key" ON "test_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "test_title_key" ON "test"("title");

-- CreateIndex
CREATE INDEX "url_userId_idx" ON "url"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "url_userId_url_key" ON "url"("userId", "url");

-- CreateIndex
CREATE INDEX "url_test_urlId_idx" ON "url_test"("urlId");

-- CreateIndex
CREATE INDEX "url_test_testId_idx" ON "url_test"("testId");

-- AddForeignKey
ALTER TABLE "test" ADD CONSTRAINT "test_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "test_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "url" ADD CONSTRAINT "url_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "url_test" ADD CONSTRAINT "url_test_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "url"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "url_test" ADD CONSTRAINT "url_test_testId_fkey" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
