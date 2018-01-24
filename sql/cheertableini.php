<?php
$servername = "localhost";
$username = "pieceonly";
$password = "oneon240";
$dbname = "pieceonly";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// sql to create table
$sql = "CREATE TABLE GuestCheer (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
cheername VARCHAR(30) NOT NULL,
cheertext VARCHAR(140) NOT NULL
)";

if ($conn->query($sql) === TRUE) {
    echo "Table GuestCheer created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();


?>