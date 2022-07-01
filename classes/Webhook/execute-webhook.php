<?php
include '../DB/conn_db.php';
require_once 'common.php';

//base url
$base_url = 'https://dev-payedin-api-vowex3bi3a-ez.a.run.app/payments/verify';

// $webhook = new Webhook($conn);
// $webhook->validateBulkPayment();
// echo "I entered here";
$sel = mysqli_query($conn, "SELECT * FROM payedin_bulk_reg WHERE is_processed = 1");
$num = mysqli_num_rows($sel);
//records exist
if($num > 0) {
    while($row = mysqli_fetch_array($sel)) {
        //connect to payedin to get record
        $request_data = json_encode(array("reference" => 'KC-1656674409313'));
        $response = perform_http_request('POST', $base_url, $request_data);
        echo $response;
    }
} else {
    echo "Nothing to process";
}


