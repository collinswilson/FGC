<?php

    // use PHPMailer\PHPMailer\PHPMailer;

    // use PHPMailer\PHPMailer\SMTP;

    // use PHPMailer\PHPMailer\Exception;



    include 'Authenticate.php';



    // require 'PHPMailer-master/src/Exception.php';

    // require 'PHPMailer-master/src/PHPMailer.php';

    // require 'PHPMailer-master/src/SMTP.php';



    class User{

        public $firstname;

        public $lastname;

        public $email;

        public $password;

        public $joinedOn;

        public $conn;



        function __construct($conn, $firstname, $lastname, $email, $password, $joinedOn){

            $this->firstname = $firstname;

            $this->lastname = $lastname;

            $this->email = $email;

            $this->password = $password;

            $this->joinedOn = $joinedOn;

            $this->conn = $conn;

        }

        function getPayedInBulk ($tx_ref){
            // echo "in bbb";
            $sel = mysqli_query($this->conn, "SELECT * FROM payedin_bulk_reg WHERE tx_ref = '$tx_ref'");
            $num = mysqli_num_rows($sel);
            if($num > 0) {

                while($row = mysqli_fetch_array($sel)){
                    $participantArray = json_decode($row["list"], true);
                    $userId = $row['user_id'];
                    $campId = $row['camp_id'];
                    $date_time = date("Y-m-d h:i:s A");
                    $this->bulkRegisterCamp($participantArray, $tx_ref, $userId, $campId, $date_time);
                }
            //     echo json_encode($returnArray);
            } else {
                echo json_encode($row);
            }
        }

        function getPayedInUser ($tx_ref){
            $returnArray = array();
            $sel = mysqli_query($this->conn, "SELECT * FROM payedin_camp_reg WHERE tx_ref = '$tx_ref'");
            $num = mysqli_num_rows($sel);
            if($num > 0) {
                while($row = mysqli_fetch_array($sel)){
                    $holdingArray = array();
                    $holdingArray["id"] = $row["id"];
                    $holdingArray["firstname"] = $row["firstname"];
                    $holdingArray["lastname"] = $row["lastname"];
                    $holdingArray["userId"] = $row["user_id"];
                    $holdingArray["campId"] = $row["camp_id"];
                    $holdingArray["tx_ref"] = $row["tx_ref"];
                    array_push($returnArray, $holdingArray);
                    $sql = mysqli_query($this->conn, "SELECT * FROM camp_reg_ WHERE tx_ref = '$tx_ref'");
                    $query = mysqli_num_rows($sql);
                    if($query < 1){
                        $this->registerCampAnonymous($row["firstname"], 
                        $row["lastname"], $row['phone'], 
                        $row['email'], $row['age_group'], 
                        $row['gender'], $row['cwk'],
                        $row['hmk'], $row['member'], 
                        $row['district'], $row['arrival'], 
                        $row['house'], $row['support_kc'], 
                        $row['date_created'], 
                        $row['regType'],$row['ref'], 
                        $row['user_id'], $row['camp_id'] , $row['tx_ref']);
                    }
                }
                echo json_encode($returnArray);
            } else {
                echo json_encode($row);
            }
        }

        
        function registerPayedInUser($firstname, $lastname, $phone, $email, $ageGroup, $gender, $kidsComing, $kidsNumber,
        $member, $district, $arrivalDate, $houseAccess, $anyAmount, $date_time, $regType, $ref, $userId, $campId, $payment_status, $tx_ref) {
            $tableFields = "firstname, lastname, phone, email, age_group, gender, cwk, hmk, member, district, arrival, house, support_kc, camp_id, user_id, reg_type, date_created, ref, payment_status, tx_ref";
            $variables = "'$firstname', '$lastname', '$phone', '$email', '$ageGroup', '$gender', '$kidsComing', '$kidsNumber', '$member', '$district', '$arrivalDate', '$houseAccess', '$anyAmount', '$campId', '$userId', '$regType', '$date_time', '$ref', '$payment_status', '$tx_ref'";
            $table = "payedin_camp_reg";
            $success = "Registration Successful";
            $failure = "Oops! Something went wrong, please try again";
            Query::dbInsert($this->conn, $table, $tableFields, $variables, $success, $failure);
        }



        function registerUser(){

            $sel = mysqli_query($this->conn, "SELECT * FROM users WHERE email = '$this->email'");

            $num = mysqli_num_rows($sel);

            if($num > 0){

                echo "Email already existing";

            }else{

                $tableFields = "firstname, lastname, email, password, joined_on";

                $variables = "'$this->firstname','$this->lastname','$this->email', '$this->password', '$this->joinedOn'";

                $table = "users";

                $success = "Registration Successful";

                $failure = "Oops! Something went wrong, please try again";

                Query::dbInsert($this->conn, $table, $tableFields, $variables, $success, $failure);

            }

        }



        function logUserIn(){

            $auth = new Authenticate();

            $auth->login($this->conn, $this->email, $this->password, "users");

        }

        

        function registerCamp($firstname, $lastname, $phone, $email, $ageGroup, $gender, $kidsComing, $kidsNumber, $member, $district, $arrivalDate, $houseAccess, $anyAmount, $date_time, $regType, $ref, $userId, $campId){

            $tableFields = "firstname, lastname, phone, email, age_group, gender, cwk, hmk, member, district, arrival, house, support_kc, camp_id, user_id, reg_type, date_created, ref";

            $variables = "'$firstname', '$lastname', '$phone', '$email', '$ageGroup', '$gender', '$kidsComing', '$kidsNumber', '$member', '$district', '$arrivalDate', '$houseAccess', '$anyAmount', '$campId', '$userId', '$regType', '$date_time', '$ref'";

            $table = "camp_reg_";

            $success = "Registration Successful";

            $failure = "Oops! Something went wrong, please try again";

            Query::dbInsert($this->conn, $table, $tableFields, $variables, $success, $failure);

        }

        function bulkRegisterCamp($participantArray, $tx_ref, $userId, $campId, $date_time){
            $savedIds = [];
            $success = "Registration Successful";
            $failure = "Oops! Something went wrong, please try again";

            for($i = 0 ; $i < count($participantArray); $i++){
                $firstname = $participantArray[$i]["firstname"];
                $lastname = $participantArray[$i]["lastname"];
                $phone = $participantArray[$i]["phone"];
                $email = $participantArray[$i]["email"];
                $ageGroup = $participantArray[$i]["ageGroup"];
                $gender = $participantArray[$i]["gender"];
                $kidsComing = $participantArray[$i]["kidsComing"];
                $kidsNumber = $participantArray[$i]["kidsNumber"];
                $member = $participantArray[$i]["member"];
                $district = $participantArray[$i]["district"];
                $arrivalDate = $participantArray[$i]["arrivalDate"];
                $houseAccess = $participantArray[$i]["houseAccess"];
                $anyAmount = $participantArray[$i]["anyAmount"];
                $regType = $participantArray[$i]["regType"];
                $date_time = $date_time;
                $campId = 4;
                $userId = $userId;
                $tx_ref = $tx_ref;      
                $ref = "";
                $tableFields = "firstname, lastname, phone, email, age_group, gender, cwk, hmk, member, district, arrival, house, support_kc, camp_id, user_id, reg_type, date_created, ref, tx_ref";
                $variables = "'$firstname', '$lastname', '$phone', '$email', '$ageGroup', '$gender', '$kidsComing', '$kidsNumber', '$member', '$district', '$arrivalDate', '$houseAccess', '$anyAmount', '$campId', '$userId', '$regType', '$date_time', '$ref', '$tx_ref'";    
                $table = "camp_reg_";
                // Query::dbInsert($this->conn, $table, $tableFields, $variables, $success, $failure);
                if(mysqli_query($this->conn, "INSERT INTO `$table` ($tableFields) VALUES ($variables)")) {
                    $last_id = $this->conn->insert_id;
                    array_push($savedIds, $last_id);
                }
            }
            if(count($savedIds) > 0) {
                echo $success;
            } else {
                echo $failure;
            }
        }

        function pbulkRegisterCamp($list, $tx_ref, $userId, $campId, $date_time){
            $tableFields = "list, tx_ref, user_id, camp_id, date";
            $variables = "'$list', '$tx_ref', '$userId', '$campid', '$date_time'";    
            $table = "payedin_bulk_reg";
            $success = "Registration Successful";
            $failure = "Oops! Something went wrong, please try again";
            Query::pbulkdbInsert($this->conn, $table, $tableFields, $variables, $success, $failure);

        }

        

        function registerCampAnonymous($firstname, $lastname, $phone, $email, $ageGroup, $gender, $kidsComing, $kidsNumber,
        $member, $district, $arrivalDate, $houseAccess, $anyAmount, $date_time, $regType, $ref, $userId, $campId, $tx_ref = null){
            $tableFields = "firstname, lastname, phone, email, age_group, gender, cwk, hmk, member, district, arrival, house, support_kc, camp_id, user_id, reg_type, date_created, ref, tx_ref";
            $variables = "'$firstname', '$lastname', '$phone', '$email', '$ageGroup', '$gender', '$kidsComing', '$kidsNumber', '$member', '$district', '$arrivalDate', '$houseAccess', '$anyAmount', '$campId', '$userId', '$regType', '$date_time', '$ref', '$tx_ref'";
            $table = "camp_reg_";
            $success = "Registration Successful";
            $failure = "Oops! Something went wrong, please try again";
            Query::payedindbInsert($this->conn, $table, $tableFields, $variables, $success, $failure);
        }



        function fetchCamps(){

            $returnArray = array();

            $sel = mysqli_query($this->conn, "SELECT * FROM camps ORDER BY id DESC");

            while($row = mysqli_fetch_array($sel)){

                $holdingArray = array();

                $holdingArray["id"] = $row["id"];

                $holdingArray["name"] = $row["name"];

                $holdingArray["theme"] = $row["theme"];

                $holdingArray["start"] = $row["start"];

                $holdingArray["end"] = $row["end"];

                $holdingArray["created"] = $row["date_created"];

                $holdingArray["status"] = $row["status"];



                array_push($returnArray, $holdingArray);

            }



            echo json_encode($returnArray);

        }



        function fetchAuxData(){

            $returnArray = array();

            $sel = mysqli_query($this->conn, "SELECT * FROM camps WHERE status='active'");

            while($row = mysqli_fetch_array($sel)){

                $returnArray["id"] = $row["id"];

                $returnArray["name"] = $row["name"];

                $returnArray["fee"] = $row["regular_fee"];

                // $holdingArray["theme"] = $row["theme"];

                // $holdingArray["start"] = $row["start"];

                // $holdingArray["end"] = $row["end"];

                // $holdingArray["created"] = $row["date_created"];

                // $holdingArray["status"] = $row["status"];

            }

            

            return $returnArray;

        }



        function fetchUsers(){

            $returnArray = array();

            $sel = mysqli_query($this->conn, "SELECT * FROM users ORDER BY id DESC");

            

            while($row = mysqli_fetch_array($sel)){

                $holdingArray = array();

                $holdingArray["id"] = $row["id"];

                $holdingArray["firstname"] = $row["firstname"];

                $holdingArray["lastname"] = $row["lastname"];

                $holdingArray["email"] = $row["email"];

                $holdingArray["dc"] = $row["joined_on"];



                array_push($returnArray, $holdingArray);

            }



            echo json_encode($returnArray);

        }



        function fetchTHistory(){

            $returnArray = array();

            $userId = $_SESSION["userId"];



            $sel = mysqli_query($this->conn, "SELECT * FROM camp_reg_ WHERE user_id = '$userId' ORDER BY id DESC");

            

            while($row = mysqli_fetch_array($sel)){

                $holdingArray = array();



                $campId = $row["camp_id"];

                $selCamp = mysqli_query($this->conn, "SELECT * FROM camps WHERE id = '$campId'");

                $rowCamp = @mysqli_fetch_array($selCamp);

                $campName = @$rowCamp["name"];



                $holdingArray["regType"] = $row["reg_type"];

                $holdingArray["firstname"] = $row["firstname"];

                $holdingArray["lastname"] = $row["lastname"];

                $holdingArray["paymentRef"] = $row["ref"];

                $holdingArray["date"] = $row["date_created"];

                $holdingArray["campName"] = $campName;

                if($row["support_kc"] == ""){

                    $holdingArray["amount"] = $_SESSION['regularFee'];

                }else{

                    if($row["reg_type"] == "regular"){

                        $holdingArray["amount"] = $row["support_kc"] + $_SESSION['regularFee'];

                    }else{

                        $holdingArray["amount"] = $row["support_kc"];

                    }

                }



                array_push($returnArray, $holdingArray);

            }



            echo json_encode($returnArray);

        }



        function fetchHistory($campId){

            $returnArray = array();

            $userId = $_SESSION["userId"];



            $sel = mysqli_query($this->conn, "SELECT * FROM camp_reg_ WHERE user_id = '$userId' AND camp_id = '$campId' ORDER BY id DESC");

            

            while($row = mysqli_fetch_array($sel)){

                $holdingArray = array();



                $campId = $row["camp_id"];

                $selCamp = mysqli_query($this->conn, "SELECT * FROM camps WHERE id = '$campId'");

                $rowCamp = mysqli_fetch_array($selCamp);

                $campName = $rowCamp["name"];



                $holdingArray["regType"] = $row["reg_type"];

                $holdingArray["firstname"] = $row["firstname"];

                $holdingArray["lastname"] = $row["lastname"];

                $holdingArray["gender"] = $row["gender"];

                $holdingArray["hmk"] = $row["hmk"];

                $holdingArray["ageGroup"] = $row["age_group"];

                $holdingArray["district"] = $row["district"];

                $holdingArray["arrival"] = $row["arrival"];

                $holdingArray["paymentRef"] = $row["ref"];

                $holdingArray["date"] = $row["date_created"];

                $holdingArray["campName"] = $campName;

                $holdingArray["amount"] = $row["support_kc"];



                array_push($returnArray, $holdingArray);

            }



            echo json_encode($returnArray);

        }



        function fetchHistoryAdmin($campId, $userId){

            $returnArray = array();



            $sel = mysqli_query($this->conn, "SELECT * FROM camp_reg_ WHERE user_id = '$userId' AND camp_id = '$campId' ORDER BY id DESC");

            

            while($row = mysqli_fetch_array($sel)){

                $holdingArray = array();



                $campId = $row["camp_id"];

                $selCamp = mysqli_query($this->conn, "SELECT * FROM camps WHERE id = '$campId'");

                $rowCamp = mysqli_fetch_array($selCamp);

                $campName = $rowCamp["name"];

                $regularFee = @$_SESSION['regularFee'];



                $holdingArray["regType"] = $row["reg_type"];

                $holdingArray["firstname"] = $row["firstname"];

                $holdingArray["lastname"] = $row["lastname"];

                $holdingArray["gender"] = $row["gender"];

                $holdingArray["hmk"] = $row["hmk"];

                $holdingArray["ageGroup"] = $row["age_group"];

                $holdingArray["district"] = $row["district"];

                $holdingArray["arrival"] = $row["arrival"];

                $holdingArray["paymentRef"] = $row["ref"];

                $holdingArray["date"] = $row["date_created"];

                $holdingArray["campName"] = $campName;

                $holdingArray["amount"] = $row["support_kc"];



                if($row["reg_type"] == "regular"){

                    $holdingArray["amount"] = (int)$holdingArray["amount"] + (int)$regularFee;

                }



                array_push($returnArray, $holdingArray);

            }



            echo json_encode($returnArray);

        }



        function logout(){

            session_destroy();

            echo "Logout Successfully";

        }



        function verifyEmail($email){

            $sel = mysqli_query($this->conn, "SELECT * FROM users WHERE email = '$email'");

            $num = mysqli_num_rows($sel);

            if($num > 0){

                $code = random_int(100000, 999999);

                $up = mysqli_query($this->conn, "UPDATE users SET code = '$code' WHERE email = '$email'");

                if($up){

                    $mail = new PHPMailer(true);

                    try {

                        //Server settings

                        //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output

                        $mail->isSMTP();                                            //Send using SMTP

                        $mail->Host       = 'host67.registrar-servers.com';                     //Set the SMTP server to send through

                        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication

                        $mail->Username   = 'registration@foursquareyouthcamp.com';                     //SMTP username

                        $mail->Password   = '^GUF@&%OIPxk';                               //SMTP password

                        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; //PHPMailer::ENCRYPTION_STARTTLS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged

                        $mail->Port       = 465;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above



                        //Recipients

                        $mail->setFrom('registration@foursquareyouthcamp.com', 'Foursquare Youth Camp');

                        //$mail->addAddress('joe@example.net', 'Joe User');     //Add a recipient

                        $mail->addAddress($email);               //Name is optional

                        //$mail->addReplyTo('info@example.com', 'Information');

                        //$mail->addCC('cc@example.com');

                        //$mail->addBCC('bcc@example.com');



                        //Attachments

                        //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments

                        //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name



                        //Content

                        $mail->isHTML(true);                                  //Set email format to HTML

                        $mail->Subject = 'Forgot Password Code';

                        $mail->Body    = 'This is your forgot password code <b>'.$code.'</b>';

                        //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';



                        $mail->send();

                        echo 'Message sent';

                    } catch (Exception $e) {

                        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";

                    }

                }else{

                    echo "Message could not be sent";

                }

            }else{

                echo '404';

            }

        }



        function verifyCode($email, $code){

            $sel = mysqli_query($this->conn, "SELECT * FROM users WHERE email = '$email' AND code = '$code'");

            $num = mysqli_num_rows($sel);

            if($num > 0){

                echo 'Valid';

            }else{

                echo 'Invalid';

            }

        }



        function changePassword($email, $np, $rp){

            $up = mysqli_query($this->conn, "UPDATE users SET password = '$np' WHERE email = '$email'");

            if($up){

                echo 'Successful';

            }else{

                echo 'Failed';

            }

        }

    }



?>