-- CreateTable
CREATE TABLE "public_url" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "actualUrl" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "ip" TEXT,

    CONSTRAINT "public_url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public_url_test" (
    "createdAt" TIMESTAMP(3) NOT NULL,
    "urlId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "status" "UrlTestStatus" NOT NULL,
    "message" TEXT,
    "content" TEXT,

    CONSTRAINT "public_url_test_pkey" PRIMARY KEY ("createdAt","urlId","testId")
);

-- CreateIndex
CREATE INDEX "public_url_link_idx" ON "public_url"("link");

-- CreateIndex
CREATE INDEX "public_url_ip_idx" ON "public_url"("ip");

-- CreateIndex
CREATE UNIQUE INDEX "public_url_actualUrl_link_key" ON "public_url"("actualUrl", "link");

-- CreateIndex
CREATE INDEX "public_url_test_urlId_idx" ON "public_url_test"("urlId");

-- CreateIndex
CREATE INDEX "public_url_test_testId_idx" ON "public_url_test"("testId");

-- AddForeignKey
ALTER TABLE "public_url_test" ADD CONSTRAINT "public_url_test_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "public_url"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_url_test" ADD CONSTRAINT "public_url_test_testId_fkey" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
