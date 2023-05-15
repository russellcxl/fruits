/*
  Warnings:

  - You are about to drop the column `customer_name` on the `purchase` table. All the data in the column will be lost.
  - You are about to drop the column `customer_phone_number` on the `purchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "purchase" DROP COLUMN "customer_name",
DROP COLUMN "customer_phone_number";
