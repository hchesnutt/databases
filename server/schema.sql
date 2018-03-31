DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

USE chat;

-- <column Name> <type> <default value>
DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username_id INTEGER,
  contents VARCHAR(200),
  roomname VARCHAR(24)
);

/* Create other tables and define schemas for them here! */
DROP TABLE IF EXISTS usernames;
CREATE TABLE usernames (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(24),
  UNIQUE KEY (username)
);
-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `messages` ADD FOREIGN KEY (username_id) REFERENCES `usernames` (`id`);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

