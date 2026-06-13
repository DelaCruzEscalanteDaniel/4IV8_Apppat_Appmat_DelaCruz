-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cine_db
-- ------------------------------------------------------
-- Server version	9.7.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '27a99ac4-4996-11f1-90a7-e41fd54e7d5b:1-84,
86f0b0e2-5097-11f1-a71d-24b2b9878614:1-126';

--
-- Table structure for table `directores`
--

DROP TABLE IF EXISTS `directores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `directores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directores`
--

LOCK TABLES `directores` WRITE;
/*!40000 ALTER TABLE `directores` DISABLE KEYS */;
INSERT INTO `directores` VALUES (1,'Christopher Nolan','1970-07-30','2026-06-08 00:11:57'),(3,'Quentin Tarantino','1963-03-27','2026-06-08 00:30:13'),(5,'Guillermo del Toro','1964-10-09','2026-06-08 00:54:01'),(26,'Steven Spielberg','1946-12-18','2026-06-09 04:36:37'),(27,'Martin Scorsese','1942-11-17','2026-06-09 04:36:37'),(28,'Francis Ford Coppola','1939-04-07','2026-06-09 04:36:37'),(29,'David Fincher','1962-08-28','2026-06-09 04:36:37'),(30,'Denis Villeneuve','1967-10-03','2026-06-09 04:36:37'),(31,'Wes Anderson','1969-05-01','2026-06-09 04:36:37'),(32,'Tim Burton','1958-08-25','2026-06-09 04:36:37'),(33,'James Cameron','1954-08-16','2026-06-09 04:36:37'),(34,'Pedro Almodóvar','1949-09-24','2026-06-09 04:36:37'),(35,'Alejandro González Iñárritu','1975-07-01','2026-06-09 04:36:37'),(36,'Damien Chazelle','1985-01-19','2026-06-09 04:36:37'),(37,'Jon Favreau','1966-10-19','2026-06-09 04:36:37'),(38,'Russo Brothers','1975-04-02','2026-06-09 04:36:37'),(39,'Greta Gerwig','1983-08-04','2026-06-09 04:36:37'),(40,'M. Night Shyamalan','1970-08-06','2026-06-09 04:36:37'),(41,'Ari Aster','1986-07-26','2026-06-09 04:36:37');
/*!40000 ALTER TABLE `directores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Acción','Películas de acción','2026-06-08 00:11:57'),(2,'Ciencia Ficción','Tecnología y futuro','2026-06-08 00:11:57'),(3,'Drama','Historias emocionales','2026-06-08 00:11:57'),(6,'Comedia','Películas diseñadas para hacer reír al público','2026-06-09 04:36:16'),(8,'Terror','Películas diseñadas para asustar y crear suspense','2026-06-09 04:36:16'),(9,'Romance','Películas centradas en relaciones amorosas','2026-06-09 04:36:16'),(10,'Thriller','Películas de suspenso y misterio','2026-06-09 04:36:16'),(11,'Aventura','Películas con viajes y descubrimientos emocionantes','2026-06-09 04:36:16'),(12,'Fantasía','Películas con magia y mundos imaginarios','2026-06-09 04:36:16'),(13,'Animación','Películas animadas para todas las edades','2026-06-09 04:36:16'),(14,'Documental','Películas basadas en hechos reales','2026-06-09 04:36:16'),(15,'Crimen','Películas sobre investigación de crímenes','2026-06-09 04:36:16'),(16,'Superhéroes','Películas basadas en cómics de superhéroes','2026-06-09 04:36:16'),(17,'Deportes','Películas sobre eventos deportivos','2026-06-09 04:36:16'),(18,'Musical','Películas con canciones y bailes','2026-06-09 04:36:16');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peliculas`
--

DROP TABLE IF EXISTS `peliculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peliculas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `director_id` int DEFAULT NULL,
  `anio_lanzamiento` year DEFAULT NULL,
  `duracion` int DEFAULT NULL,
  `sinopsis` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_pelicula_director` (`director_id`),
  CONSTRAINT `fk_pelicula_director` FOREIGN KEY (`director_id`) REFERENCES `directores` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peliculas`
--

LOCK TABLES `peliculas` WRITE;
/*!40000 ALTER TABLE `peliculas` DISABLE KEYS */;
INSERT INTO `peliculas` VALUES (1,'Interstellar',1,2014,169,'Viaje espacial para salvar a la humanidad','2026-06-08 00:11:57'),(2,'Jurassic Park',NULL,1993,127,'Parque temático con dinosaurios','2026-06-08 00:11:57'),(3,'El Origen',1,2010,148,'Un ladrón especializado en acceder al subconsciente durante los sueños es contratado para hacer lo opuesto: implantar una idea.','2026-06-09 04:36:37'),(4,'Pulp Fiction',3,1994,154,'Varias historias entrelazadas de criminales, boxeadores y bandidos en Los Ángeles.','2026-06-09 04:36:37'),(5,'El Padrino',5,1972,175,'La historia de la familia mafiosa Corleone y su imperio criminal.','2026-06-09 04:36:37'),(6,'The Matrix',1,1999,136,'Un hacker descubre la verdadera naturaleza de su realidad.','2026-06-09 04:36:37'),(7,'Interstellar',1,2014,169,'Un piloto y científicos viajan a través de un agujero de gusano para encontrar un nuevo hogar para la humanidad.','2026-06-09 04:36:37'),(8,'Kill Bill Vol. 1',3,2003,111,'Una novia vengativa se propone matar a las personas que la dispararon en su boda.','2026-06-09 04:36:37'),(9,'El Padrino Parte II',5,1974,200,'La historia paralela de los inicios de Vito Corleone y la carrera de su hijo Michael.','2026-06-09 04:36:37'),(10,'The Dark Knight',1,2008,152,'Batman enfrenta al Joker, un criminal caótico que busca destruir Gotham.','2026-06-09 04:36:37'),(11,'The Dark Knight Rises',1,2012,165,'Batman sale del retiro para enfrentar a Bane, un enemigo implacable.','2026-06-09 04:36:37'),(12,'Inception',1,2010,148,'Un especialista en robo de secretos es contratado para implantar una idea.','2026-06-09 04:36:37'),(13,'Dunkirk',1,2017,106,'La evacuación de los soldados aliados durante la Segunda Guerra Mundial.','2026-06-09 04:36:37'),(14,'Tenet',1,2020,150,'Un agente debe prevenir la Tercera Guerra Mundial viajando a través del tiempo.','2026-06-09 04:36:37'),(15,'Once Upon a Time in America',5,1984,229,'La vida de dos amigos criminales desde la juventud hasta la vejez.','2026-06-09 04:36:37'),(53,'El Origen',1,2010,148,'Un ladrón especializado en acceder al subconsciente durante los sueños es contratado para hacer lo opuesto: implantar una idea.','2026-06-09 04:38:52'),(54,'Pulp Fiction',3,1994,154,'Varias historias entrelazadas de criminales, boxeadores y bandidos en Los Ángeles.','2026-06-09 04:38:52'),(55,'El Padrino',5,1972,175,'La historia de la familia mafiosa Corleone y su imperio criminal.','2026-06-09 04:38:52'),(56,'The Matrix',1,1999,136,'Un hacker descubre la verdadera naturaleza de su realidad.','2026-06-09 04:38:52'),(57,'Interstellar',1,2014,169,'Un piloto y científicos viajan a través de un agujero de gusano para encontrar un nuevo hogar para la humanidad.','2026-06-09 04:38:52'),(58,'Kill Bill Vol. 1',3,2003,111,'Una novia vengativa se propone matar a las personas que la dispararon en su boda.','2026-06-09 04:38:52'),(59,'El Padrino Parte II',5,1974,200,'La historia paralela de los inicios de Vito Corleone y la carrera de su hijo Michael.','2026-06-09 04:38:52'),(60,'The Dark Knight',1,2008,152,'Batman enfrenta al Joker, un criminal caótico que busca destruir Gotham.','2026-06-09 04:38:52'),(61,'The Dark Knight Rises',1,2012,165,'Batman sale del retiro para enfrentar a Bane, un enemigo implacable.','2026-06-09 04:38:52'),(62,'Inception',1,2010,148,'Un especialista en robo de secretos es contratado para implantar una idea.','2026-06-09 04:38:52'),(63,'Dunkirk',1,2017,106,'La evacuación de los soldados aliados durante la Segunda Guerra Mundial.','2026-06-09 04:38:52'),(64,'Tenet',1,2020,150,'Un agente debe prevenir la Tercera Guerra Mundial viajando a través del tiempo.','2026-06-09 04:38:52'),(65,'Once Upon a Time in America',5,1984,229,'La vida de dos amigos criminales desde la juventud hasta la vejez.','2026-06-09 04:38:52'),(103,'El Origen',1,2010,148,'Un ladrón especializado en acceder al subconsciente durante los sueños es contratado para hacer lo opuesto: implantar una idea.','2026-06-09 04:42:08'),(104,'Pulp Fiction',3,1994,154,'Varias historias entrelazadas de criminales, boxeadores y bandidos en Los Ángeles.','2026-06-09 04:42:08'),(105,'El Padrino',5,1972,175,'La historia de la familia mafiosa Corleone y su imperio criminal.','2026-06-09 04:42:08'),(106,'The Matrix',1,1999,136,'Un hacker descubre la verdadera naturaleza de su realidad.','2026-06-09 04:42:08'),(107,'Interstellar',1,2014,169,'Un piloto y científicos viajan a través de un agujero de gusano para encontrar un nuevo hogar para la humanidad.','2026-06-09 04:42:08'),(108,'Kill Bill Vol. 1',3,2003,111,'Una novia vengativa se propone matar a las personas que la dispararon en su boda.','2026-06-09 04:42:08'),(109,'El Padrino Parte II',5,1974,200,'La historia paralela de los inicios de Vito Corleone y la carrera de su hijo Michael.','2026-06-09 04:42:08'),(110,'The Dark Knight',1,2008,152,'Batman enfrenta al Joker, un criminal caótico que busca destruir Gotham.','2026-06-09 04:42:08'),(111,'The Dark Knight Rises',1,2012,165,'Batman sale del retiro para enfrentar a Bane, un enemigo implacable.','2026-06-09 04:42:08'),(112,'Inception',1,2010,148,'Un especialista en robo de secretos es contratado para implantar una idea.','2026-06-09 04:42:08'),(113,'Dunkirk',1,2017,106,'La evacuación de los soldados aliados durante la Segunda Guerra Mundial.','2026-06-09 04:42:08'),(114,'Tenet',1,2020,150,'Un agente debe prevenir la Tercera Guerra Mundial viajando a través del tiempo.','2026-06-09 04:42:08'),(115,'Once Upon a Time in America',5,1984,229,'La vida de dos amigos criminales desde la juventud hasta la vejez.','2026-06-09 04:42:08');
/*!40000 ALTER TABLE `peliculas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resenas`
--

DROP TABLE IF EXISTS `resenas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resenas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pelicula_id` int NOT NULL,
  `genero_id` int NOT NULL,
  `calificacion` int NOT NULL,
  `comentario` text,
  `fecha_resena` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_resena_pelicula` (`pelicula_id`),
  KEY `fk_resena_genero` (`genero_id`),
  CONSTRAINT `fk_resena_genero` FOREIGN KEY (`genero_id`) REFERENCES `generos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_resena_pelicula` FOREIGN KEY (`pelicula_id`) REFERENCES `peliculas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `resenas_chk_1` CHECK ((`calificacion` between 1 and 10))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resenas`
--

LOCK TABLES `resenas` WRITE;
/*!40000 ALTER TABLE `resenas` DISABLE KEYS */;
INSERT INTO `resenas` VALUES (1,1,2,10,'Una obra maestra','2026-06-08 00:11:57'),(2,2,1,9,'Muy entretenida','2026-06-08 00:11:57');
/*!40000 ALTER TABLE `resenas` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-08 22:48:42
