/*
  Warnings:

  - Changed the type of `purchase_date` on the `purchase` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "purchase" DROP COLUMN "purchase_date",
ADD COLUMN     "purchase_date" TIME NOT NULL;
