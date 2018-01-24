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
$sql = "CREATE TABLE GuestSurvey (
id VARCHAR(20) PRIMARY KEY, 
answer VARCHAR(10) NOT NULL
)";

if ($conn->query($sql) === TRUE) {
    echo "Table GuestSurvey created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();


?>