-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: mmsdb
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artworks`
--

DROP TABLE IF EXISTS `artworks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artworks` (
  `ArtID` int NOT NULL AUTO_INCREMENT,
  `ArtName` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `AuthorID` int NOT NULL,
  `ArtYear` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `ArtCharacteristics` varchar(150) COLLATE utf8mb4_bin DEFAULT NULL,
  `ArtPosition` varchar(45) COLLATE utf8mb4_bin DEFAULT NULL,
  `ImgLink` varchar(45) COLLATE utf8mb4_bin DEFAULT NULL,
  `Description` varchar(150) COLLATE utf8mb4_bin DEFAULT 'This is the Description of the artwork',
  `Likes` int DEFAULT '0',
  PRIMARY KEY (`ArtID`),
  UNIQUE KEY `ArtName` (`ArtName`),
  UNIQUE KEY `ImgLink` (`ImgLink`),
  KEY `AuthorID` (`AuthorID`),
  CONSTRAINT `artworks_ibfk_1` FOREIGN KEY (`AuthorID`) REFERENCES `authors` (`AuthorID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artworks`
--

LOCK TABLES `artworks` WRITE;
/*!40000 ALTER TABLE `artworks` DISABLE KEYS */;
INSERT INTO `artworks` VALUES (1,'Life of Christ',2,'c.1435','Christianity','A1','http://20.169.254.228/art1.jpg','This is the Description of the artwork',0),(2,'The Night Watch',3,'1642','Oil on canvas, Baroque painting, Dutch Golden painting','A4','http://20.169.254.228/art2.jpg','This is the Description of the artwork',0),(3,'Mona Lisa',4,'c. 1503-1506, perhaps until c.1517','Oil on poplar panel, Portrait, Renaissance','B2','http://20.169.254.228/art3.jpg','This is the Description of the artwork',4),(4,'The Last Supper',4,'c. 1495–1498','Renaissance, Christian, classicism, realism','B6','http://20.169.254.228/art4.jpg','This is the Description of the artwork',1),(5,'David',5,'c. 1501 – June 8, 1504',NULL,'C1','http://20.169.254.228/art5.jpg','This is the Description of the artwork',1),(6,'Girl with a Pearl Earring',6,'c. 1665',NULL,'D2','http://20.169.254.228/art6.jpg','This is the Description of the artwork',0),(7,'The Starry Night',7,'1889',NULL,'D5','http://20.169.254.228/art7.jpg','This is the Description of the artwork',1),(8,'Wheatfield with Crows',7,'July 1890',NULL,'D6','http://20.169.254.228/art8.jpg','This is the Description of the artwork',0),(9,'The Birth of Venus',8,'c. 1485',NULL,'E4','http://20.169.254.228/art9.jpeg','This is the Description of the artwork',0),(10,'The Kiss',9,'1907-1908',NULL,'E2','http://20.169.254.228/art10.jpeg','This is the Description of the artwork',0);
/*!40000 ALTER TABLE `artworks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `AuthorID` int NOT NULL AUTO_INCREMENT,
  `AuthorName` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `AuthorNationality` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT 'Unknown',
  `AuthorYear` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT 'Unknown',
  PRIMARY KEY (`AuthorID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Unknown','Unknown','Unknown'),(2,'Meuse Valley','Unknown','Unknown'),(3,'Rembrandt Harmenszoon van Rijn','Dutch','15 July 1606 - 4 October 1669'),(4,'Leonardo da Vinci','Italian','15 April 1452 - 2 May 1519'),(5,'Michelangelo di Lodovico Buonarroti Simoni','Italian','6 March 1475 - 18 February 1564'),(6,'Joannis Vermeer','Dutch','31 October 1632 - 15 December 1675'),(7,'Vincent Willem van Gogh','Dutch','30 March 1853 - 29 July 1890'),(8,'Alessandro di Mariano di Vanni Filipepi','Italian','c. 1445 - May 17, 1510'),(9,'Gustav Klimt','Austro-Hungarian','14 July 1862 - 6 February 1918');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `TicketNo` int NOT NULL AUTO_INCREMENT,
  `UID` int NOT NULL,
  `TDate` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `TTime` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `TicketCode` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `TStatus` varchar(45) COLLATE utf8mb4_bin DEFAULT 'booked',
  PRIMARY KEY (`TicketNo`,`UID`,`TDate`,`TTime`),
  KEY `UID` (`UID`),
  KEY `TDate` (`TDate`,`TTime`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE CASCADE,
  CONSTRAINT `books_ibfk_2` FOREIGN KEY (`TDate`, `TTime`) REFERENCES `timeslots` (`TDate`, `TTime`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buys`
--

DROP TABLE IF EXISTS `buys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buys` (
  `UID` int NOT NULL DEFAULT '0',
  `GID` int NOT NULL,
  `GQuantity` int NOT NULL,
  `BTime` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT 'TBC',
  `BDate` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT 'TBC',
  `BillNum` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT 'TBC',
  `BStatus` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`UID`,`GID`,`GQuantity`,`BTime`,`BDate`),
  KEY `GID` (`GID`),
  CONSTRAINT `buys_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE SET DEFAULT,
  CONSTRAINT `buys_ibfk_2` FOREIGN KEY (`GID`) REFERENCES `goods` (`GID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buys`
--

LOCK TABLES `buys` WRITE;
/*!40000 ALTER TABLE `buys` DISABLE KEYS */;
/*!40000 ALTER TABLE `buys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods` (
  `GID` int NOT NULL AUTO_INCREMENT,
  `GName` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `GCategory` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `GAmount` int NOT NULL,
  `GPrice` float(5,2) NOT NULL,
  PRIMARY KEY (`GID`),
  UNIQUE KEY `GName` (`GName`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (1,'Museum Book','Book',92,25.00),(2,'Museum Book Limited Edition','Book',0,50.00),(3,'Picasso Tote Bag','Bag',14,13.00),(4,'Monalisa Tote Bag','Bag',19,13.00),(5,'Museum Book German Edition','Book',19,25.00);
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `UID` int DEFAULT '0',
  `ArtID` int NOT NULL,
  KEY `UID` (`UID`),
  KEY `ArtID` (`ArtID`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE SET DEFAULT,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`ArtID`) REFERENCES `artworks` (`ArtID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,4),(1,3),(13,3),(13,7),(2,5),(2,3),(2,4);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `RID` int NOT NULL AUTO_INCREMENT,
  `UID` int NOT NULL,
  `RText` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `RRatings` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`RID`),
  KEY `UID` (`UID`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,'Fantastic','5'),(2,2,'Amazing show of artworks','5'),(3,3,'Such beautiful display of artworks','4');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timeslots`
--

DROP TABLE IF EXISTS `timeslots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timeslots` (
  `TDate` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `TTime` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `Count` int NOT NULL DEFAULT '40',
  PRIMARY KEY (`TDate`,`TTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeslots`
--

LOCK TABLES `timeslots` WRITE;
/*!40000 ALTER TABLE `timeslots` DISABLE KEYS */;
INSERT INTO `timeslots` VALUES ('2023-05-23','09:00',40),('2023-05-23','11:00',40),('2023-05-23','13:00',40),('2023-05-23','15:00',40),('2023-05-23','17:00',40),('2023-05-24','09:00',40),('2023-05-24','11:00',40),('2023-05-24','13:00',40),('2023-05-24','15:00',40),('2023-05-24','17:00',40),('2023-05-25','09:00',40),('2023-05-25','11:00',40),('2023-05-25','13:00',40),('2023-05-25','15:00',40),('2023-05-25','17:00',40);
/*!40000 ALTER TABLE `timeslots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `UID` int NOT NULL,
  `Role` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `Token` varchar(60) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`UID`,`Role`,`Token`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (1,'employee','0C5739F88A99877395AD'),(1,'employee','0C96CBB7BC1A5BA5361B'),(1,'employee','0D51C6F4B91A1B6526A8'),(1,'employee','13E1FE5AEDDE7A0E00AB'),(1,'employee','194B9BC873C1FC09BB40'),(1,'employee','1E1C31C47FB90A99EB06'),(1,'employee','3116456A25EB06533CD0'),(1,'employee','3911F4D51FE108B6C530'),(1,'employee','3ECE224127E2F1E0FFB3'),(1,'employee','3EE5AD91AC5CE87CFB12'),(1,'employee','45C49458E6888EC0B500'),(1,'employee','45FEF11E716F5C8CC76E'),(1,'employee','4B9A11C70444E47D5256'),(1,'employee','4CF1A9A3B087720E2A4E'),(1,'employee','510C1A035A7C530A70D6'),(1,'employee','554F82A67E6D6AEEA7B9'),(1,'employee','55C4243E1626F02EF144'),(1,'employee','5AD31D13D4D3079C6898'),(1,'employee','634C8A30E345A7B8AA3A'),(1,'employee','67B52CA80BCF28D25858'),(1,'employee','69F7BC8AAC6FD93A988F'),(1,'employee','7174E123264FDB1874AC'),(1,'employee','7A21797AD199F7FDCB9B'),(1,'employee','7F9AD29E4046B4D13B5A'),(1,'employee','815259C462DFED2BD3C0'),(1,'employee','8C73FC0416F615D28C2D'),(1,'employee','8D0AD84F15E4150F6BB8'),(1,'employee','94D2060F0D20CA8DAE93'),(1,'employee','97DE7F7AD236FFE0D512'),(1,'employee','986E9A3106E1B5CECD53'),(1,'employee','9B4822D8FAB5A4FC506E'),(1,'employee','A0B3D8E9210A68EE20B0'),(1,'employee','AAB58E82C9C1B2E8E8D8'),(1,'employee','AC350B34E30783E90DEF'),(1,'employee','AE61C3A7C55C8E114444'),(1,'employee','B29E2386404F1B10843F'),(1,'employee','B3739DE34A21ACC5B455'),(1,'employee','B73A49CD27A84818A6E3'),(1,'employee','BB868168D1DDDFE7C5D4'),(1,'employee','BC88271D774425E251B6'),(1,'employee','C6A42A9365CF23F6D66A'),(1,'employee','CB50EFB5D7C59AD6E8C5'),(1,'employee','D1546096CA491C2014D9'),(1,'employee','D562BFE65ED6DCFD94D6'),(1,'employee','E252AD8391780CD7BF68'),(1,'employee','E518C2ED06844155B4C4'),(1,'employee','EB2A27E19CCF4BC5BF99'),(1,'employee','EBCFBFB6E62A61E80ADE'),(1,'employee','F23B9701002A7195CDE4'),(1,'employee','F8CB627B6BD47B75E58D'),(1,'employee','FBAFC0C2C07CA6EE2B54'),(2,'admin','54F30B32050393E5E353'),(2,'admin','C14C933606ED133B3110'),(2,'admin','CB34C5944A475D0F7FDA'),(3,'admin','18E9FC702816C2FC1E45'),(3,'admin','59F4DC9BA33DCF355EE9'),(3,'admin','7709E0059F005015E544'),(3,'admin','BFC1C823D93245249226'),(3,'admin','CD3771C5D470376C7954'),(3,'admin','F0966A6699778828AA95'),(4,'customer','2C7B5E2EB0F7F455A04D'),(4,'customer','3A20316EEE7F6C318F23'),(4,'customer','3ED27F79B60E3B37D8E8'),(4,'customer','4325BBF9F29F8C0AA76B'),(4,'customer','45B0EF46BA13DFD4613E'),(4,'customer','522AC81729D75674FE31'),(4,'customer','5C40AED1162CECB6EC64'),(4,'customer','5CF758AF92042D505008'),(4,'customer','5F3C501D5C4B0CBF10F7'),(4,'customer','785091ED1B02C1E95B16'),(4,'customer','79C3EA71EF6F0EEC633E'),(4,'customer','960F42961193F25BAFE8'),(4,'customer','9ABE6584474853FD101B'),(4,'customer','A0D9BEBA493C0EF5516B'),(4,'customer','A8C875FD7514D18E0A73'),(4,'customer','B3A9CDC765D5923D4823'),(4,'customer','C7240095B58F3F9A80E0'),(4,'customer','E32D78D1DED7BD84D578'),(4,'customer','EFB2DBF834EE6E96BF77'),(8,'customer','14C201D13B0B7B9C02A9'),(8,'customer','370C48D800BE9DD9F859'),(8,'customer','7DC3033BA3E59FA5C099'),(8,'customer','91FD80236438FA9F39F0'),(8,'customer','D52C6FB51462A4CF9EED'),(10,'customer','7AC2787E257A116D86E7'),(11,'customer','002F929F3A58D82C894C'),(11,'customer','17DE4D8F03E51F332C9E'),(11,'customer','C060A5285BFFBA3B25DA'),(11,'customer','E22822A3381ADA397B3A'),(12,'customer','17EAAF2F921EB1F7CEE6'),(12,'customer','27E9425AD0C86137554E'),(12,'customer','3E987F551B3FD588434E'),(12,'customer','471CD3DE98198E26F0FF'),(12,'customer','4B9C567DF6D3ADAD8601'),(12,'customer','4EC8A85671F5133FA420'),(12,'customer','5C22E04AB21C01FD9E2C'),(12,'customer','77705D34F3313231EBC7'),(12,'customer','7C4CE554B0759479AC31'),(12,'customer','8E4726C408F655111F6D'),(12,'customer','AB6B3F08A1CA764F01AE'),(12,'customer','AD14659F63B08EAB32AC'),(12,'customer','B124AF6BE8465F14FDC9'),(12,'customer','B95E0CDF09A43FA8C50E'),(12,'customer','C04EB718E8E94B6F581E'),(12,'customer','F3985F2245AD72D9E21C'),(12,'customer','FC074ADBCFCCDD9D1D04'),(13,'customer','7CB88F1C06A59FDBD7F1'),(14,'customer','B75029983CD0646F83AB');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UID` int NOT NULL AUTO_INCREMENT,
  `UName` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(300) COLLATE utf8mb4_bin DEFAULT NULL,
  `Phone` varchar(45) COLLATE utf8mb4_bin DEFAULT NULL,
  `Role` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT 'customer',
  PRIMARY KEY (`UID`),
  UNIQUE KEY `UName` (`UName`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'nguyenhuy2002','85bfb3784510d4b922435eed6a33d3d8bae4b5cd8d32af573fab1ba4ef971966','0123789456','employee'),(2,'ngbahoch','e9d57bcd6b8a5a37a52c89b6736464b2d0af5a71c642044fde359bf0bad02c04','1234567890','admin'),(3,'tranminhhoang','e9fd30567cf7dd9f99f2596617c92db3b4b6283a4f10568eea0892fde8d46511','0123456789','admin'),(4,'huynhhieu','23dd63f2ef6dd977a9c95ec2e8fc890e07b9cba66f702cc947d433856ea695c2','0123456789','customer'),(5,'ellivanquynh','e0af6dd987afac2ce8cae9f322785a5c32f9b2cfd34e65722f4342306e579dac','0123456789','employee'),(8,'17401@student.vgu.edu.vn',NULL,NULL,'customer'),(10,'hoangtm.work@gmail.com',NULL,NULL,'customer'),(11,'huynhhu3107@gmail.com',NULL,NULL,'customer'),(12,'hoanghoanglunvn@gmail.com',NULL,NULL,'customer'),(13,'jimhoth','364775434521011b549e9a1833f043aedce9b91813bf77a136bb8e7bfb8dae4f','0981113873','customer'),(14,'huynhhiu','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','2134567809','customer');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-21 10:57:55
