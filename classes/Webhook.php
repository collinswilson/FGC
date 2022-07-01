<?php
include 'DB/conn_db.php';

class Webhook
{

    public function __construct()
    {

    }

    public function validateBulkPayment()
    {
        $sel = mysqli_query($this->conn, "SELECT * FROM payedin_bulk_reg WHERE ");
        $num = mysqli_num_rows($sel);
    }

    public function validateSinglePayment()
    {

    }
}