/*
  Warnings:

  - A unique constraint covering the columns `[userId,eatenAt]` on the table `Meal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Meal_userId_eatenAt_key" ON "public"."Meal"("userId", "eatenAt");
