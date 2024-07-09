-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 06, 2024 at 04:36 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10
use capstone



/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capstone`
--

-- --------------------------------------------------------

--
-- Table structure for table `binh_luan`
--

CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL,
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  `ngay_binh_luan` date NOT NULL,
  `noi_dung` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hinh_anh`
--

CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL,
  `ten_hinh` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  `duong_dan` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  `mo_ta` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  `nguoi_dung_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `luu_anh`
--

CREATE TABLE `luu_anh` (
	`luu_anh_id` int NOT NULL,
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  `ngay_luu` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nguoi_dung`
--

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL,
  `email` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  `mat_khau` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `ho_ten` varchar(40) COLLATE utf8mb3_unicode_ci NOT NULL,
  `tuoi` int NOT NULL,
  `role` VARCHAR(50)  COLLATE utf8mb3_unicode_ci NOT NULL,
  `token` VARCHAR(100)  COLLATE utf8mb3_unicode_ci NOT NULL,
  `refresh_token` VARCHAR(100)  COLLATE utf8mb3_unicode_ci NOT NULL,
  `anh_dai_dien` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `binh_luan`
--
ALTER TABLE `binh_luan`
  ADD PRIMARY KEY (`binh_luan_id`),
  ADD KEY `fk_binhLuan_nguoiDung` (`nguoi_dung_id`),
  ADD KEY `fk_binhLuan_hinhAnh` (`hinh_id`);

--
-- Indexes for table `hinh_anh`
--

ALTER TABLE `hinh_anh`
  ADD PRIMARY KEY (`hinh_id`),
  ADD KEY `fk_hinhAnh_nguoiDung` (`nguoi_dung_id`);

--
-- Indexes for table `luu_anh`
--
ALTER TABLE `luu_anh`
  ADD PRIMARY KEY (`luu_anh_id`),
  ADD KEY `fk_luuAnh_hinhAnh` (`hinh_id`);

--
-- Indexes for table `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD PRIMARY KEY (`nguoi_dung_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hinh_anh`
--
ALTER TABLE `hinh_anh`
  MODIFY `hinh_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `luu_anh`
--
ALTER TABLE `luu_anh`
  MODIFY `luu_anh_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  MODIFY `nguoi_dung_id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--
ALTER TABLE `binh_luan`
  MODIFY `binh_luan_id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for table `binh_luan`
--
ALTER TABLE `binh_luan`
  ADD CONSTRAINT `fk_binhLuan_hinhAnh` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_binhLuan_nguoiDung` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `hinh_anh`
--
ALTER TABLE `hinh_anh`
  ADD CONSTRAINT `fk_hinhAnh_nguoiDung` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `luu_anh`
--
ALTER TABLE `luu_anh`
  ADD CONSTRAINT `fk_luuAnh_hinhAnh` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_luuAnh_nguoiDung` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
