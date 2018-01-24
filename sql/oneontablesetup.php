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
$sql = "CREATE TABLE BASIC (

one_id int NOT NULL AUTO_INCREMENT,
submittime datetime NOT NULL,
name VARCHAR(40) NOT NULL,
birthdate VARCHAR(6) NOT NULL,
contactphone VARCHAR(15) NOT NULL,
contactemail VARCHAR(100) NOT NULL,
contacttwitter VARCHAR(50),
homeaddress VARCHAR(255),
webaddr1 VARCHAR(255),
webbanner1 VARCHAR(255),
webaddr2 VARCHAR(255),
webbanner2 VARCHAR(255),
webaddr3 VARCHAR(255),
webbanner3 VARCHAR(255),
boothstatus VARCHAR(40),
portraitstatus VARCHAR(40),
tradecardstatus VARCHAR(40),
illuststatus VARCHAR(40),
PRIMARY KEY (one_id),
UNIQUE (name)
)";

if ($conn->query($sql) === TRUE) {
    echo "Table BASIC created successfully. <br>";
} else {
    echo "<br> Error creating table BASIC: " . $conn->error;
}

$sql = "ALTER TABLE BASIC AUTO_INCREMENT=100";
$conn->query($sql); 


// sql to create table login credential
$sqla = "CREATE TABLE LGC (

one_id int NOT NULL,
name VARCHAR(40) NOT NULL,
contactemail VARCHAR(100) NOT NULL,
password VARCHAR(100) NOT NULL,
UNIQUE (name),
FOREIGN KEY (one_id) REFERENCES BASIC(one_id)
)";

if ($conn->query($sqla) === TRUE) {
    echo "Table LGC created successfully <br>";
} else {
    echo "<br> Error creating table LGC: " . $conn->error;
}





// sql to create table BOOTH
$sqlb = "CREATE TABLE BOOTH (

one_id int NOT NULL,
name VARCHAR(40) NOT NULL,
boothstatus VARCHAR(40) NOT NULL,
circlename VARCHAR(40) NOT NULL,
circlenicknames VARCHAR(50),
circlesize VARCHAR(10) NOT NULL,
circletype VARCHAR(40) NOT NULL,
circlegenre VARCHAR(40),
circleinfo VARCHAR(255) NOT NULL,
circlegrade VARCHAR(10) NOT NULL,
circleimage VARCHAR(255) NOT NULL,
circledeposit VARCHAR(10) NOT NULL,
UNIQUE (name),
FOREIGN KEY (one_id) REFERENCES BASIC(one_id)
)";

if ($conn->query($sqlb) === TRUE) {
    echo "Table BOOTH created successfully <br>";
} else {
    echo "<br> Error creating table BOOTH: " . $conn->error;
}




// sql to create table PORTRAIT
$sqlc = "CREATE TABLE PORTRAIT (

one_id int NOT NULL,
name VARCHAR(40) NOT NULL,
portraitstatus VARCHAR(40) NOT NULL,
portraitexp VARCHAR(10) NOT NULL,
portraitdesirechar VARCHAR(255) NOT NULL,
portraitavgworktime VARCHAR(40),
portraitexpworktime VARCHAR(40),
portraitsample1 VARCHAR(255) NOT NULL,
portraitsample2 VARCHAR(255),
portraitsample3 VARCHAR(255),
UNIQUE (name),
FOREIGN KEY (one_id) REFERENCES BASIC(one_id)
)";

if ($conn->query($sqlc) === TRUE) {
    echo "Table PORTRAIT created successfully <br>";
} else {
    echo "<br> Error creating table PORTRAIT: " . $conn->error;
}



// sql to create table TRADECARD
$sqld = "CREATE TABLE TRADECARD (

one_id int NOT NULL,
name VARCHAR(40) NOT NULL,
tradecardstatus VARCHAR(40) NOT NULL,
tctypeA VARCHAR(10),
tctypeB VARCHAR(10),
tcdesirechar VARCHAR(255) NOT NULL,
tcavgworktime VARCHAR(40),
tcexpworktime VARCHAR(40),
tcsample1 VARCHAR(255) NOT NULL,
tcsample2 VARCHAR(255),
tcsample3 VARCHAR(255),
tcpassword VARCHAR(100) NOT NULL,
UNIQUE (name),
FOREIGN KEY (one_id) REFERENCES BASIC(one_id)
)";

if ($conn->query($sqld) === TRUE) {
    echo "Table TRADECARD created successfully <br>";
} else {
    echo "<br> Error creating table TRADECARD: " . $conn->error;
}




// sql to create table ILLUST
$sqle = "CREATE TABLE ILLUST (

one_id int NOT NULL,
name VARCHAR(40) NOT NULL,
illuststatus VARCHAR(40) NOT NULL,
illusttype VARCHAR(10) NOT NULL,
illustminprice VARCHAR(10) NOT NULL,
illustmaxprice VARCHAR(10) NOT NULL,
illustbankaccount VARCHAR(20),
illustaccountnumber VARCHAR(50),
illustaccountname VARCHAR(20),
illustpassword VARCHAR(100) NOT NULL,
UNIQUE (name),
FOREIGN KEY (one_id) REFERENCES BASIC(one_id)
)";

if ($conn->query($sqle) === TRUE) {
    echo "Table ILLUST created successfully <br>";
} else {
    echo "<br> Error creating table ILLUST: " . $conn->error;
}








$conn->close();


?>