<?php

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $userName = $_POST["userName"];

    // Insert player into PLAYER_INFO table
    $sql = "INSERT INTO PLAYER_INFO (FirstName, LastName, UserName) VALUES ('$firstName', '$lastName', '$userName')";

    if ($conn->query($sql) === TRUE) {
        echo "Player created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();

?>
