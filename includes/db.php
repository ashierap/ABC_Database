<?php

$host = "localhost"; // Change this if your database is hosted elsewhere
$username = "your_username"; // Change this to your database username
$password = "your_password"; // Change this to your database password
$database = "abc_game_data"; // Change this to your database name

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Uncomment the line below if you want to set character set (optional)
// $conn->set_charset("utf8");

?>
