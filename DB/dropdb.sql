-- Reset Flyway history for fresh migration
-- Run this if migrations fail

DROP TABLE IF EXISTS `refresh_tokens`;
DROP TABLE IF EXISTS `cart`;
DROP TABLE IF EXISTS `reviews`;
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `categories`;

-- Now Flyway will recreate everything from V1 and V2
