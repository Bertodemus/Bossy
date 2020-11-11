DROP DATABASE IF EXISTS bossycms_db;

CREATE DATABASE bossycms_db;

USE bossycms_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
)

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    role VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NULL,
    deparment_id INT NOT NULL,
    PRIMARY KEY(id)
)

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id)
)