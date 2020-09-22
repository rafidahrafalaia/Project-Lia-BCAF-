-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: project_lia
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `roles` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `role_id` varchar(255) DEFAULT NULL,
  `updated_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('03553a1c-a0f3-468b-8490-f9ff6f13f72e','fsdssf','rafidah','rafalia','08212122111113','a100d2ec209b9692c1d4e7dfd515b4981f7e6825','Admin','0000-00-00 00:00:00.000000',NULL,NULL,NULL,NULL),('189df082-d512-4b5c-9a02-87af4b9eb7df','xxx@akun5.com',NULL,NULL,'33','1234',NULL,'2020-08-29 16:18:24.085000','rafidah','rafalia',NULL,NULL),('517ddf0b-e011-42c8-9735-08a3eb7abf79','user1@gmail.com','fdgghg','rafalia','082124567822','1973fd8ce8cd44a43035939be880f8eaf64067c3','Admin','0000-00-00 00:00:00.000000',NULL,NULL,NULL,NULL),('7cd558d0-9e61-40bc-9026-9104a8d58f60','xxx@akun.com','ra','ra','1231','1234','owner','2020-08-28 10:02:25.907000',NULL,NULL,NULL,NULL),('824537d7-a1dd-4a4d-9d99-a3ed0a9103dd','aaa@akun.com',NULL,NULL,'08212456782243','$2a$10$1VYyZc0wOKnaHDH2R3kIQek7Kdf3eCjCpCy5fvigRdd7U7u/G6WnS',NULL,'2020-08-29 18:11:43.716000','saj','rafaliada','0acaa49e-e8d5-11ea-8f57-00090ffe0001',NULL),('876b846a-ad17-48cb-a0e8-3a451675c88a','rafaliarafidah@gmail.com','rafidah','rafalia','08212122111113','LLL123123','Admin','0000-00-00 00:00:00.000000',NULL,NULL,NULL,NULL),('a8d8699a-a20f-433a-b2a1-6010175d37b9','xxx@xxx.com',NULL,NULL,NULL,'$2a$10$49VJBGTe.nahZdHJRncdvulGthD8PwcXs4aLsKK0Op9qfve2YIsCW',NULL,'2020-09-08 23:31:22.459000','RAFIDAH','Firdausi','0acaa49e-e8d5-11ea-8f57-00090ffe0001',NULL),('b773ca58-1533-46a7-9e9d-8a85de146c78','xxx@akun.com',NULL,NULL,'12312332','1234',NULL,'2020-08-29 14:51:00.396000','ras','RAFALIA',NULL,NULL),('bcefde7a-84d8-4240-a03d-0f4ebc6815bf','davin.elchabib@gmail.com','dsdasa','ddsa','08212122111113','dsa','Admin','0000-00-00 00:00:00.000000',NULL,NULL,NULL,NULL),('e34a93b5-16ef-4b2f-905b-d6537560b180','xxx@xxx.com',NULL,NULL,NULL,'$2a$10$cYpyORcqTw0dGJWn8bYdweZvVXHk6n..Ca2qCos2yetlo4zq.qJzW',NULL,'2020-09-08 23:31:22.825000','RAFIDAH','Firdausi','0acaa49e-e8d5-11ea-8f57-00090ffe0001',NULL),('ea392684-4e9a-43b4-84c3-e14c529099f2','zzz@akun.com',NULL,NULL,'111','2f1b4c5af501d549d6150b25cc6dac3010f52d50',NULL,'2020-08-29 16:22:14.874000','rafidah','rafalia','0acaa49e-e8d5-11ea-8f57-00090ffe0001',NULL),('f7aed8a4-3253-4ea2-b5b7-ffb3511f7afd','aaa@xx.com',NULL,NULL,'33','1425cf53a4b74534e8e1a59dbd7edbbb5d689223',NULL,'2020-08-29 17:49:16.791000','rafidah','dsad','0acaa49e-e8d5-11ea-8f57-00090ffe0001',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-22  9:59:47
