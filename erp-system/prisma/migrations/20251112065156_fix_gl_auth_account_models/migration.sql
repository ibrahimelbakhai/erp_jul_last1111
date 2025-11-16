/*
  Warnings:

  - You are about to drop the `AuthAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `code` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `costCenterRequired` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `postingAllowed` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `reconciliation` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Account` table. All the data in the column will be lost.
  - Added the required column `provider` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerAccountId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AuthAccount_provider_providerAccountId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AuthAccount";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GLAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "postingAllowed" BOOLEAN NOT NULL DEFAULT true,
    "reconciliation" BOOLEAN NOT NULL DEFAULT false,
    "costCenterRequired" BOOLEAN NOT NULL DEFAULT false,
    "parentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GLAccount_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GLAccount_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "GLAccount" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("id", "type") SELECT "id", "type" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
CREATE TABLE "new_JournalLine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "journalId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "debit" REAL NOT NULL,
    "credit" REAL NOT NULL,
    "costCenterId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "JournalLine_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "JournalLine_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "GLAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "JournalLine_costCenterId_fkey" FOREIGN KEY ("costCenterId") REFERENCES "CostCenter" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_JournalLine" ("accountId", "costCenterId", "createdAt", "credit", "debit", "description", "id", "journalId", "updatedAt") SELECT "accountId", "costCenterId", "createdAt", "credit", "debit", "description", "id", "journalId", "updatedAt" FROM "JournalLine";
DROP TABLE "JournalLine";
ALTER TABLE "new_JournalLine" RENAME TO "JournalLine";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "GLAccount_companyId_code_key" ON "GLAccount"("companyId", "code");
