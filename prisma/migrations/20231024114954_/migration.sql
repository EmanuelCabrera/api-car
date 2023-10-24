/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Car` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Car_brandId_fkey` ON `car`;

-- DropIndex
DROP INDEX `Post_authorId_fkey` ON `post`;

-- CreateIndex
CREATE UNIQUE INDEX `Car_name_key` ON `Car`(`name`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
