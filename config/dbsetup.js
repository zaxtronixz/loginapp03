/////////////////////////////////////////////////////////////////
//// CREATING TABLE: The user table is to be created during app setup

CREATE TABLE users (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(50) NOT NULL,
password VARCHAR(50) NOT NULL,
accstatus VARCHAR(5) NOT NULL,
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)


/////////////////////////////////////////////////////////////////////////
//// INSERTING RECORDS: The syntax to insert records into a user table

INSERT INTO login_users(firstname, lastname, password, email, accstatus) VALUES (?,?,?,?,?), ['testfirstname', 'testlastname', 'test', 'test@example.com','off'];


/////////////////////////////////////////////////////////////////////////////
//// CORRECTION: it was noted that the table did not contain password column

// add a new column to the table
ALTER TABLE users
ADD password VARCHAR(50);

// modify an existing column
ALTER TABLE users
MODIFY password VARCHAR(50) NOT NULL;