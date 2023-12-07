-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mydatabase
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydatabase
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mydatabase` ;

-- -----------------------------------------------------
-- Table `mydatabase`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydatabase`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `auth0_id` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NULL DEFAULT 'Anonym',
  `email` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `auth0_id_UNIQUE` (`auth0_id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydatabase`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydatabase`.`posts` (
  `post_id` INT NOT NULL AUTO_INCREMENT,
  `author_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  INDEX `posts_ibfk_1` (`author_id` ASC) VISIBLE,
  CONSTRAINT `posts_ibfk_1`
    FOREIGN KEY (`author_id`)
    REFERENCES `mydatabase`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydatabase`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydatabase`.`comments` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `post_id` INT NULL DEFAULT NULL,
  `author_id` INT NULL DEFAULT NULL,
  `content` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  INDEX `post_id` (`post_id` ASC) VISIBLE,
  INDEX `author_id` (`author_id` ASC) VISIBLE,
  CONSTRAINT `comments_ibfk_1`
    FOREIGN KEY (`post_id`)
    REFERENCES `mydatabase`.`posts` (`post_id`),
  CONSTRAINT `comments_ibfk_2`
    FOREIGN KEY (`author_id`)
    REFERENCES `mydatabase`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
