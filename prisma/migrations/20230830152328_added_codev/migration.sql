-- CreateTable
CREATE TABLE "Codev" (
    "id" TEXT NOT NULL,
    "gistId" TEXT NOT NULL,
    "input" TEXT,
    "output" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Codev_pkey" PRIMARY KEY ("id")
);
