<?php
require_once 'common.php';

class Webhook
{
    //base url
    public $base_url = 'https://dev-payedin-api-vowex3bi3a-ez.a.run.app/payments/verify';
    public $conn;
    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function validateBulkPayment()
    {
        $sel = mysqli_query($this->conn, "SELECT * FROM payedin_bulk_reg WHERE is_processed = 0");
        $num = mysqli_num_rows($sel);
        //records exist
        if($num > 0) {
            while($row = mysqli_fetch_array($sel)) {
                //connect to payedin to get record
                $request_data = json_encode(array("reference" => 'KC-1656674409313'));
                $response = perform_http_request('POST', $this->base_url, $request_data);
                dd($response);
            }
        }
    }

    public function validateSinglePayment()
    {

    }
}