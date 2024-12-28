-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2024 at 05:19 PM
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
-- Database: `central-reservas`
--

-- --------------------------------------------------------

--
-- Table structure for table `listadoreservas`
--

CREATE TABLE `listadoreservas` (
  `reserva_id` int(11) NOT NULL,
  `sala_id` int(11) NOT NULL,
  `sala_fecha` varchar(10) NOT NULL,
  `sala_hora` varchar(5) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `reserva_estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `listadoreservas`
--

INSERT INTO `listadoreservas` (`reserva_id`, `sala_id`, `sala_fecha`, `sala_hora`, `usuario_id`, `reserva_estado`) VALUES
(1, 1, '2024-12-25', '08:00', 28, 1),
(2, 3, '2024-12-26', '09:30', 21, 0),
(3, 5, '2024-12-27', '10:00', 23, 1),
(4, 7, '2024-12-28', '14:00', 34, 1),
(5, 9, '2024-12-29', '16:30', 34, 0),
(6, 6, '2025/06/06', '14:00', 666, 1),
(7, 6, '2025-06-06', '14:00', 666, 0);

-- --------------------------------------------------------

--
-- Table structure for table `listadosalas`
--

CREATE TABLE `listadosalas` (
  `sala_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `capacidad` int(11) NOT NULL,
  `apta_proyector` tinyint(1) NOT NULL,
  `image_space` varchar(255) DEFAULT NULL,
  `destacado` tinyint(1) NOT NULL DEFAULT 0,
  `habilitado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `listadosalas`
--

INSERT INTO `listadosalas` (`sala_id`, `name`, `capacidad`, `apta_proyector`, `image_space`, `destacado`, `habilitado`) VALUES
(1, 'Box de reuniones chica', 8, 1, 'space_1', 0, 1),
(2, 'Sala de conferencias grande', 50, 0, 'space_2', 1, 1),
(3, 'Box individual', 1, 0, 'space_3', 0, 1),
(4, 'Sala de juntas ejecutiva', 20, 1, 'space_4', 1, 0),
(5, 'Box colaborativo', 12, 1, 'space_5', 0, 1),
(6, 'Sala multifuncional', 30, 0, 'space_6', 1, 1),
(7, 'Espacio abierto coworking', 25, 1, 'space_7', 0, 0),
(8, 'Sala privada', 10, 1, 'space_8', 1, 1),
(9, 'Auditorio pequeño', 40, 0, 'space_9', 0, 1),
(10, 'Zona creativa', 15, 1, 'space_10', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `rangoshorarios`
--

CREATE TABLE `rangoshorarios` (
  `id` int(11) NOT NULL,
  `horario` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rangoshorarios`
--

INSERT INTO `rangoshorarios` (`id`, `horario`) VALUES
(1, '08:00'),
(2, '08:30'),
(3, '09:00'),
(4, '09:30'),
(5, '10:00'),
(6, '10:30'),
(7, '11:00'),
(8, '11:30'),
(9, '12:00'),
(10, '12:30'),
(11, '13:00'),
(12, '13:30'),
(13, '14:00'),
(14, '14:30'),
(15, '15:00'),
(16, '15:30'),
(17, '16:00'),
(18, '16:30'),
(19, '17:00'),
(20, '17:30'),
(21, '18:00'),
(22, '18:30');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `dni`, `password`, `nombre`, `apellido`, `email`, `isAdmin`) VALUES
(1, '111', '$2b$10$xSEaa5zL/VKorLYaEK1e7.HekOIl.N/jOodcpOBtFVB8M8Fl44z6O', 'Admin', 'con Poder', 'jorge.ruanova@gmail.com', 1),
(4, '222', '$2b$10$XHRxOJxsqZzwSKvlb/v8me8r95kwZWUFo8qSGx34UUdXjDpp2kT7e', 'Pepe Usuario', 'sin Poder', 'pepe.usuario@gmail.com', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `listadoreservas`
--
ALTER TABLE `listadoreservas`
  ADD PRIMARY KEY (`reserva_id`),
  ADD KEY `sala_id` (`sala_id`);

--
-- Indexes for table `listadosalas`
--
ALTER TABLE `listadosalas`
  ADD PRIMARY KEY (`sala_id`);

--
-- Indexes for table `rangoshorarios`
--
ALTER TABLE `rangoshorarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `horario` (`horario`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `listadoreservas`
--
ALTER TABLE `listadoreservas`
  MODIFY `reserva_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `listadosalas`
--
ALTER TABLE `listadosalas`
  MODIFY `sala_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `rangoshorarios`
--
ALTER TABLE `rangoshorarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `listadoreservas`
--
ALTER TABLE `listadoreservas`
  ADD CONSTRAINT `listadoreservas_ibfk_1` FOREIGN KEY (`sala_id`) REFERENCES `listadosalas` (`sala_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
