<?php
	 $dbhost = 'localhost';
	 $dbuser = 'root';
	 $dbpass = '';
	 $db = 'foukc';
	 $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $db);
	 if(!$conn ){
		die('Could not connect');
	 }
	//echo 'Connected successfully';

	//@mysqli_select_db( 'prohms' );

	//mysqli_close($conn);
?>