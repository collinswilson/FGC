<?php
include '../DB/conn_db.php';

$webhook = new Webhook($conn);
$webhook->validateBulkPayment();


