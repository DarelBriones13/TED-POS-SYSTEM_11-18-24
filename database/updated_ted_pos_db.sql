-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2024 at 12:37 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ted_pos_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `category_description`) VALUES
(1, 'motherboard', 'dasdasfa123'),
(2, 'cpu', 'gdfhgdlfhgewrhgksgbsd'),
(3, 'mouse', 'dasdasd'),
(4, 'headset', 'dhasgdadabndasd'),
(5, 'system unit', 'dasdasd'),
(6, 'fan', 'qwhrqsadasd'),
(7, 'gpu', 'sdasdasda'),
(8, 'utp cable', 'sdfdfnr'),
(9, 'sd card', 'ghmklhd'),
(10, 'ram', 'ldhajdas'),
(11, 'Camera', 'BAsbsdasdw');

-- --------------------------------------------------------

--
-- Table structure for table `inventories`
--

CREATE TABLE `inventories` (
  `inventory_id` int(11) NOT NULL,
  `stocks` int(11) DEFAULT NULL,
  `date_received` datetime DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `inventory_status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventories`
--

INSERT INTO `inventories` (`inventory_id`, `stocks`, `date_received`, `supplier_id`, `product_id`, `user_id`, `inventory_status`, `createdAt`, `updatedAt`) VALUES
(1, 100, '2024-11-17 00:00:00', 1, 1, 1, 'active', '2024-11-17 03:28:16', '2024-11-17 03:28:16'),
(2, 100, '2024-11-17 00:00:00', 4, 2, 1, 'active', '2024-11-17 06:33:20', '2024-11-17 06:33:20'),
(3, 100, '2024-11-17 00:00:00', 2, 3, 1, 'active', '2024-11-17 06:33:57', '2024-11-17 06:33:57'),
(4, 100, '2024-11-17 00:00:00', 2, 4, 1, 'active', '2024-11-17 06:33:57', '2024-11-17 06:33:57'),
(5, 100, '2024-11-17 00:00:00', 1, 5, 1, 'active', '2024-11-17 06:34:39', '2024-11-17 06:34:39'),
(6, 100, '2024-11-17 00:00:00', 1, 6, 1, 'inactive', '2024-11-17 06:35:28', '2024-11-17 06:35:28'),
(7, 100, '2024-12-07 00:00:00', 3, 7, 1, 'inactive', '2024-11-17 06:44:34', '2024-11-17 06:44:34'),
(8, 100, '2024-11-17 00:00:00', 2, 8, 3, 'inactive', '2024-11-17 06:48:30', '2024-11-17 06:48:30'),
(9, 100, '2024-11-17 00:00:00', 1, 9, 3, 'inactive', '2024-11-17 06:49:18', '2024-11-17 06:49:18'),
(10, 100, '2024-11-17 00:00:00', 3, 10, 1, 'inactive', '2024-11-17 09:57:06', '2024-11-17 09:57:06'),
(11, 100, '2024-11-17 00:00:00', 1, 11, 1, 'active', '2024-11-17 10:19:55', '2024-11-17 10:19:55'),
(12, 100, '2024-11-17 00:00:00', 1, 12, 1, 'active', '2024-11-17 10:54:42', '2024-11-17 10:54:42'),
(13, 100, '2024-11-17 00:00:00', 1, 13, 1, 'inactive', '2024-11-17 11:10:36', '2024-11-17 11:10:36');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_model` varchar(255) DEFAULT NULL,
  `product_img` varchar(255) DEFAULT NULL,
  `product_quantity` int(11) DEFAULT NULL,
  `purchase_price` decimal(10,0) DEFAULT NULL,
  `selling_price` decimal(10,0) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `product_status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_model`, `product_img`, `product_quantity`, `purchase_price`, `selling_price`, `category_id`, `product_status`, `createdAt`, `updatedAt`) VALUES
(1, 'Intel Core i7 Processor', 'Intel Core i7-13700K', '1731814096018.jpg', 100, 250000, 5000, 2, 'active', '2024-11-17 03:28:16', '2024-11-17 03:28:16'),
(2, 'NVIDIA GeForce RTX 4070', 'RTX 4070 Founders Edition', '1731825200442.jpg', 100, 100000, 50000, 7, 'active', '2024-11-17 06:33:20', '2024-11-17 06:33:20'),
(3, 'Samsung 980 PRO SSD', '980 PRO 1TB NVMe PCIe 4.0', '1731825237725.jpg', 100, 254210, 10000, 9, 'active', '2024-11-17 06:33:57', '2024-11-17 06:33:57'),
(4, 'Samsung 980 PRO SSD', '980 PRO 1TB NVMe PCIe 4.0', '1731825237726.jpg', 100, 254210, 10000, 9, 'active', '2024-11-17 06:33:57', '2024-11-17 06:33:57'),
(5, 'das', 'sdad', '1731825279310.jpg', 100, 45642, 25550, 1, 'active', '2024-11-17 06:34:39', '2024-11-17 06:34:39'),
(6, 'darel', 'darel', '1731825328248.jpg', 100, 100, 500, 5, 'inactive', '2024-11-17 06:35:28', '2024-11-17 06:35:28'),
(7, 'diven', 'diven', '1731825874940.jpg', 100, 500, 5, 11, 'inactive', '2024-11-17 06:44:34', '2024-11-17 06:44:34'),
(8, 'daniel', 'daniel', '1731826110888.jpg', 100, 50, 5, 4, 'inactive', '2024-11-17 06:48:30', '2024-11-17 06:48:30'),
(9, 'Intel Core i7 Processor', 'Intel Core i7-13700K', '1731826158905.jpg', 100, 52, 55, 1, 'inactive', '2024-11-17 06:49:18', '2024-11-17 06:49:18'),
(10, 'qwe', 'qwe', '1731837426490.jpg', 100, 123, 123, 7, 'inactive', '2024-11-17 09:57:06', '2024-11-17 09:57:06'),
(11, 'ty', 'ty', '1731838795369.jpg', 100, 50000, 100, 1, 'active', '2024-11-17 10:19:55', '2024-11-17 10:19:55'),
(12, 'bbb', 'qbbb', '1731840882821.jpg', 100, 100, 5, 1, 'active', '2024-11-17 10:54:42', '2024-11-17 10:54:42'),
(13, 'gay', 'gay', '1731841836818.jpg', 100, 10000, 500, 1, 'inactive', '2024-11-17 11:10:36', '2024-11-17 11:10:36');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20241010123432-create-users.js'),
('20241016032443-create-categories.js'),
('20241019114057-create-user.js'),
('20241105082210-create-supplier.js'),
('20241108012104-suppliers.js'),
('20241108012707-create-suppliers-table.js'),
('20241108012916-create-suppliers.js'),
('20241108013446-create-suppliers.js'),
('20241108015459-create-suppliers.js'),
('20241110121150-create-inventory.js'),
('20241110122553-create-products.js'),
('20241117023221-create-inventory.js'),
('20241117023520-create-products.js');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `supplier_id` int(11) NOT NULL,
  `supplier_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_num` varchar(100) DEFAULT NULL,
  `supplier_status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`supplier_id`, `supplier_name`, `address`, `contact_num`, `supplier_status`, `createdAt`, `updatedAt`) VALUES
(1, 'Briones', 'Purok#4 Lunao. Gingoog City', '09152113686', 'active', '2024-11-10 09:38:55', '2024-11-10 09:38:55'),
(2, 'Sabaria', 'Purok#5 Lunao, Gingoog City', '09778996555', 'active', '2024-11-10 11:04:05', '2024-11-12 14:24:18'),
(3, 'Magbunag', 'Purok#1 Balanok, Gingoog City', '0997854236', 'active', '2024-11-12 14:24:01', '2024-11-12 14:24:01'),
(4, 'Villasan', 'Brgy.21 Magallanes, Gingoog City', '09778654313', 'inactive', '2024-11-13 13:45:47', '2024-11-13 13:45:53'),
(5, 'Antido', 'Basta', '654635321', 'inactive', '2024-11-17 07:28:38', '2024-11-17 07:35:12'),
(6, 'Labial', 'sample addres', '091524686', 'inactive', '2024-11-17 07:33:54', '2024-11-17 07:33:54'),
(7, 'sample', 'sample', '084984651', 'active', '2024-11-17 08:15:07', '2024-11-17 08:15:07'),
(8, 'anothersample', 'anothersampleaddress', '09454651631', 'active', '2024-11-17 08:42:50', '2024-11-17 08:42:50'),
(9, 'ert', 'qwe', '654654', 'inactive', '2024-11-17 09:55:19', '2024-11-17 09:55:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userType` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `userType`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'admin', 'admin123', 'admin', '2024-11-14 21:07:05', '2024-11-14 21:07:05'),
(2, 'Darel Briones', 'darelbriones13', '223311', 'Cashier', '2024-11-14 13:18:04', '2024-11-16 00:25:29'),
(3, 'Diven Briones', 'diven123', '123', 'Cashier', '2024-11-14 13:23:06', '2024-11-14 13:23:06'),
(4, 'Celjie Magbunag', 'cjieey123', '555', 'Manager', '2024-11-14 13:31:30', '2024-11-16 00:29:08'),
(7, 'Aj Mar Antido', 'ajmar123x', '123', 'Manager', '2024-11-16 01:22:25', '2024-11-16 01:22:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `inventories`
--
ALTER TABLE `inventories`
  ADD PRIMARY KEY (`inventory_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `inventories`
--
ALTER TABLE `inventories`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `supplier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
