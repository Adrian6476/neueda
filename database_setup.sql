-- Database setup script for Weather Query System
-- Run this script to manually create the database and tables

CREATE DATABASE IF NOT EXISTS weather_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE weather_app;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username)
);

-- Create weather_queries table for logging user queries
CREATE TABLE IF NOT EXISTS weather_queries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    city VARCHAR(100) NOT NULL,
    query_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_query_time (query_time)
);

-- Insert some sample city codes for testing (optional)
-- These correspond to common Chinese cities
-- Beijing: 110101
-- Shanghai: 310101  
-- Guangzhou: 440101
-- Shenzhen: 440301
