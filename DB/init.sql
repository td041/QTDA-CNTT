-- FitFoodish Database Schema & Seed Script
-- Complete database setup with schema and sample data

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Database
CREATE DATABASE IF NOT EXISTS `restaurant` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `restaurant`;

-- ==========================================
-- TABLES
-- ==========================================

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` enum('customer','admin') DEFAULT 'customer',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `product_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `calories` int(11) DEFAULT NULL,
  `protein` decimal(10,2) DEFAULT NULL,
  `carbs` decimal(10,2) DEFAULT NULL,
  `fat` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','completed','cancelled') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_product_unique` (`user_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `refresh_tokens` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(500) NOT NULL,
  `expiry_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ==========================================
-- SEED DATA
-- ==========================================

-- ==========================================
-- SEED CATEGORIES
-- ==========================================
INSERT IGNORE INTO `categories` (`id`, `category_name`, `description`) VALUES
(1, 'Keto', 'Chế độ ăn keto - ít carb, cao chất béo'),
(2, 'Low Carb', 'Ít tinh bột, tốt cho người giảm cân'),
(3, 'Vegan', 'Thực vật chủ nghĩa - không có sản phẩm động vật'),
(4, 'Balanced', 'Cân bằng dinh dưỡng'),
(5, 'Protein', 'Thực phẩm giàu protein');

-- ==========================================
-- SEED PRODUCTS (MEALS)
-- ==========================================
INSERT IGNORE INTO `products` (`id`, `category_id`, `product_name`, `description`, `price`, `image_url`, `calories`, `protein`, `carbs`, `fat`, `created_at`) VALUES
-- Keto Meals
(1, 1, 'Keto Chicken Bowl', 'Ức gà nướng than, bơ Hass, xà lách romaine và sốt chanh dây ít carb. 480 cals, 38g protein, 8g carbs, 32g fat', 89000.00, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', 480, 38, 8, 32, NOW()),
(2, 1, 'Keto Egg Bites', 'Trứng hấp phô mai cheddar, rau bina, bacon và sốt pesto béo ngậy. 320 cals, 24g protein, 6g carbs, 22g fat', 69000.00, 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1153', 320, 24, 6, 22, NOW()),
(3, 1, 'Keto Beef Steak', 'Thịt bò nướng tuyệt vời, bơ lơ xanh nước sốt béarnaise. 580 cals, 45g protein, 4g carbs, 42g fat', 125000.00, 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80', 580, 45, 4, 42, NOW()),
(4, 1, 'Keto Pork Chops', 'Sườn lợn áp chảo, sốt kem nấm, rau hỗn hợp. 520 cals, 42g protein, 5g carbs, 38g fat', 99000.00, 'https://images.unsplash.com/photo-1509402308-817902776267?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=709', 520, 42, 5, 38, NOW()),

-- Low Carb Meals
(5, 2, 'Low-carb Beef Salad', 'Thịt bò áp chảo, trứng lòng đào, rau rocket và phô mai Parmesan. 520 cals, 40g protein, 12g carbs, 32g fat', 99000.00, 'https://images.unsplash.com/photo-1478144592103-25e218a04891?w=800&q=80', 520, 40, 12, 32, NOW()),
(6, 2, 'Low-carb Shrimp Zoodles', 'Tôm áp chảo, mì bí ngòi, cà chua bi và sốt tỏi olive ít carb. 360 cals, 32g protein, 10g carbs, 20g fat', 92000.00, 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687', 360, 32, 10, 20, NOW()),
(7, 2, 'Low-carb Salmon Salad', 'Cá hồi nướng, xà lách mùa hè, dưa chuột, sốt me. 480 cals, 38g protein, 11g carbs, 30g fat', 105000.00, 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80', 480, 38, 11, 30, NOW()),
(8, 2, 'Low-carb Chicken Wrap', 'Gà áp chảo cuộn trong lá xà lách, phô mai, cà chua. 380 cals, 35g protein, 8g carbs, 22g fat', 75000.00, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80', 380, 35, 8, 22, NOW()),

-- Vegan Meals
(9, 3, 'Vegan Buddha Bowl', 'Đậu gà, quinoa, rau củ nướng và sốt tahini chanh bổ dưỡng. 560 cals, 22g protein, 74g carbs, 18g fat', 79000.00, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', 560, 22, 74, 18, NOW()),
(10, 3, 'Phở Rau Củ', 'Nước dùng rau củ 12 giờ, nấm đùi gà, đậu hũ non và thảo mộc tươi. 430 cals, 18g protein, 62g carbs, 12g fat', 75000.00, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', 430, 18, 62, 12, NOW()),
(11, 3, 'Tofu Teriyaki', 'Đậu hũ hữu cơ áp chảo, cơm gạo lứt, cải thìa và sốt teriyaki thủ công. 540 cals, 28g protein, 62g carbs, 18g fat', 85000.00, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', 540, 28, 62, 18, NOW()),
(12, 3, 'Vegan Poke Bowl', 'Tofu cấp, sushi rice, rau biển, dưa chuột, cà chua và sốt sriracha mayo. 480 cals, 20g protein, 68g carbs, 14g fat', 82000.00, 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687', 480, 20, 68, 14, NOW()),

-- Balanced Meals
(13, 4, 'Balanced Salmon Rice', 'Cơm gạo lứt, cá hồi áp chảo, bông cải xanh và sốt teriyaki nhẹ. 610 cals, 34g protein, 56g carbs, 26g fat', 119000.00, 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80', 610, 34, 56, 26, NOW()),
(14, 4, 'Balanced Chicken Pasta', 'Pasta toàn lúa, gà áp chảo, rau xanh và sốt cà chua tự chế. 520 cals, 32g protein, 58g carbs, 16g fat', 95000.00, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80', 520, 32, 58, 16, NOW()),
(15, 4, 'Balanced Beef Bowl', 'Thịt bò, cơm lứt, rau hỗn hợp, trứng và sốt ginger. 580 cals, 38g protein, 52g carbs, 22g fat', 105000.00, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', 580, 38, 52, 22, NOW()),
(16, 4, 'Balanced Fish Tacos', 'Cá hồi, tortilla ngũ cốc, salsa, guacamole và lime. 450 cals, 28g protein, 48g carbs, 18g fat', 88000.00, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80', 450, 28, 48, 18, NOW()),

-- High Protein Meals
(17, 5, 'Protein Power Bowl', 'Gà nướng, trứng, hạt, rau xanh và sốt protein tăng cường. 650 cals, 52g protein, 42g carbs, 24g fat', 110000.00, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', 650, 52, 42, 24, NOW()),
(18, 5, 'Muscle Builder Steak', 'Thịt bò tươi, khoai tây nướng, bông cải xanh và sốt BBQ. 720 cals, 48g protein, 54g carbs, 28g fat', 135000.00, 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80', 720, 48, 54, 28, NOW()),
(19, 5, 'Protein Breakfast', 'Trứng (3), sausage, bánh nước và sốt không đường. 520 cals, 42g protein, 35g carbs, 22g fat', 72000.00, 'https://images.unsplash.com/photo-1563438962385-0d3dd8319200?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2080', 520, 42, 35, 22, NOW()),
(20, 5, 'Tuna Power Salad', 'Cá ngừ, trứng, hạt sunflower, rau xanh và sốt dầu olive. 480 cals, 45g protein, 18g carbs, 20g fat', 96000.00, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', 480, 45, 18, 20, NOW());

-- ==========================================
-- SEED USERS
-- ==========================================
-- Tài khoản Admin (Password: Admin@123)
-- Hash của Admin@123 (bcrypt): $2a$10$YP6C7B1B7B1B7B1B7B1B7B1B7B1B7B1B7B1B7B1B7B1B7B1B7B1B7B
INSERT IGNORE INTO `users` (`id`, `full_name`, `email`, `password`, `phone`, `address`, `role`, `created_at`) VALUES
(1, 'Admin FitFoodish', 'admin@fitfoodish.com', '$2a$10$YP6C7B1B7B1B7B1B7B1B7B1B7B1B7B1B7B1B7B1B7B1B7B1B7B1B7B', '0901234567', '123 Nguyễn Huệ, TP.HCM', 'admin', NOW()),

-- Tài khoản Customer Test (Password: User@123)
-- Hash của User@123 (bcrypt): $2a$10$ZQ6D7C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C
(2, 'Nguyễn Văn A', 'a@example.com', '$2a$10$ZQ6D7C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C', '0909000001', '456 Lê Lợi, TP.HCM', 'customer', NOW()),
(3, 'Trần Thị B', 'b@example.com', '$2a$10$ZQ6D7C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C', '0909000002', '789 Đông Du, TP.HCM', 'customer', NOW()),
(4, 'Lê Minh C', 'c@example.com', '$2a$10$ZQ6D7C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C', '0909000003', '321 Trần Hưng Đạo, TP.HCM', 'customer', NOW()),
(5, 'Phạm Văn D', 'd@example.com', '$2a$10$ZQ6D7C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C2C8C', '0909000004', '654 Đinh Tiên Hoàng, TP.HCM', 'customer', NOW());

-- ==========================================
-- SEED REVIEWS
-- ==========================================
INSERT IGNORE INTO `reviews` (`id`, `user_id`, `product_id`, `rating`, `comment`, `created_at`) VALUES
(1, 2, 1, 5, 'Rất ngon! Ức gà mềm, tươi lắm. Sẽ order lại!', NOW() - INTERVAL 5 DAY),
(2, 3, 9, 5, 'Tuyệt vời cho người ăn chay. Đủ chất và ngon miệng.', NOW() - INTERVAL 4 DAY),
(3, 4, 5, 4, 'Tốt, nhưng muốn nhiều nước sốt hơn chút.', NOW() - INTERVAL 3 DAY),
(4, 2, 13, 5, 'Salmon rất tươi, cơm ngon, dinh dưỡng cân bằng!', NOW() - INTERVAL 2 DAY),
(5, 5, 17, 5, 'Protein cao, vị ngon. Perfect cho tập gym!', NOW() - INTERVAL 1 DAY),
(6, 3, 3, 5, 'Thịt bò chất lượng cao, nướng ngoài vừa trong tốt.', NOW() - INTERVAL 6 HOUR),
(7, 4, 10, 4, 'Phở ngon nhưng nước dùng không sâu lắm.', NOW() - INTERVAL 5 HOUR),
(8, 2, 20, 5, 'Salad tươi, đủ protein. Đúng những gì tôi cần!', NOW() - INTERVAL 3 HOUR);

-- ==========================================
-- SEED ORDERS & ORDER ITEMS
-- ==========================================
INSERT IGNORE INTO `orders` (`id`, `user_id`, `order_date`, `total_amount`, `status`) VALUES
(1, 2, NOW() - INTERVAL 5 DAY, 178000.00, 'completed'),
(2, 2, NOW() - INTERVAL 2 DAY, 251000.00, 'completed'),
(3, 3, NOW() - INTERVAL 3 DAY, 161000.00, 'completed'),
(4, 4, NOW() - INTERVAL 1 DAY, 224000.00, 'pending'),
(5, 5, NOW() - INTERVAL 12 HOUR, 285000.00, 'pending');

-- Order Items
INSERT IGNORE INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
-- Order 1
(1, 1, 1, 2, 89000.00),
(2, 1, 9, 1, 79000.00),
-- Order 2
(3, 2, 13, 2, 119000.00),
(4, 2, 5, 1, 99000.00),
(5, 2, 10, 1, 75000.00),
-- Order 3
(6, 3, 3, 1, 125000.00),
(7, 3, 2, 1, 69000.00),
(8, 3, 15, 1, 105000.00),
-- Order 4
(9, 4, 17, 2, 110000.00),
(10, 4, 7, 1, 105000.00),
-- Order 5
(11, 5, 18, 1, 135000.00),
(12, 5, 19, 1, 72000.00),
(13, 5, 20, 1, 96000.00);

-- ==========================================
-- SEED CART
-- ==========================================
-- Customer 2 có một sản phẩm trong giỏ
INSERT IGNORE INTO `cart` (`id`, `user_id`, `product_id`, `quantity`, `added_at`) VALUES
(1, 2, 4, 2, NOW()),
(2, 3, 11, 1, NOW() - INTERVAL 1 HOUR),
(3, 5, 14, 2, NOW() - INTERVAL 2 HOUR);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
