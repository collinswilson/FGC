<?php
	include 'DB/conn_db.php';
	//session_start();

	class Authenticate{

		public function login($conn, $username, $password, $table){
			include 'DB/conn_db.php';

			//$sql = "SELECT * FROM $table WHERE hotel_username = '$username' AND password= '$password'";

			$sel = mysqli_query($conn, "SELECT * FROM $table WHERE email = '$username' AND password= '$password'");

			$selCamp = mysqli_query($conn, "SELECT * FROM camps WHERE status = 'active'");

			$num = mysqli_num_rows($sel);

			if($num == 1){

				$row = mysqli_fetch_array($sel);
				$rowCamp = mysqli_fetch_array($selCamp);

				$id = $row['id'];
				$email = $row['email'];
				$firstname = $row['firstname'];
				$lastname = $row['lastname'];

				$campId = @$rowCamp['id'];
				$regularFee = @$rowCamp['regular_fee'];
				$campName = @$rowCamp['name'];

				$_SESSION['userId'] = $id;
				$_SESSION['campId'] = $campId;
				$_SESSION['firstname'] = $firstname;
				$_SESSION['lastname'] = $lastname;
				$_SESSION['email'] = $email;
				$_SESSION['regularFee'] = $regularFee;
				$_SESSION['campName'] = $campName;

				//return $id;

				echo "1";

			}

			else{

				echo "0";

			}	

			mysqli_close($conn);

		}

		public static function lockUser(){

			if(!isset($_SESSION['hotel_id']) && !isset($_SESSION['staff_id'])){

				echo '<script> document.location = "index.php" </script>';

			}

		}

	}

?>