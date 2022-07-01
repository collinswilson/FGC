<?php
include 'DB/conn_db.php';
require_once 'common.php';

class Webhook
{
    //base url
    public $base_url = 'https://api.payedin.co/';

    //end point
    public $end_point = '';
    public function __construct()
    {

    }

    public function validateBulkPayment()
    {
        $sel = mysqli_query($this->conn, "SELECT * FROM payedin_bulk_reg WHERE is_processed = 0");
        $num = mysqli_num_rows($sel);
        //records exist
        if($num > 0) {
            while($row = mysqli_fetch_array($sel)) {
                //connect to payedin to get record
                $request_data = json_encode(array("reference" => $row['tx_ref']));
                $response = perform_http_request('POST', $this->base_url.$this->end_point, $request_data);
                dd($response);
            }
        }
    }

    public function validateSinglePayment()
    {

    }
}