<?php

include 'class.sagepay.php';
include 'misc.php';

$title = $_POST['title'];
$f_name = $_POST['f_name'];
$l_name = $_POST['l_name'];
$post_code = $_POST['post_code'];
$address = $_POST['address'];
$card_type = $_POST['card_type'];
$card_number = $_POST['card_number'];
$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];
$name_on_card = $_POST['name_on_card'];
$issue_number = $_POST['issue_number'];
$security_code = $_POST['security_code'];

$data = array();

$data['VPSProtocol'] = '';
$data['TxType'] = 'PAYMENT';
$data['TxType'] = 'Vendor';
$data['VendorTxCode'] = '';
$data['Currency'] = '';
$data['Description'] = '';
$data['Amount'] = '';
$data['CardHolder'] = '';
$data['CardNumber'] = $_POST['card_number'];
$data['ExpiryDate'] = $_POST['end_date'];
$data['CardType'] = $_POST['card_type'];
$data['BillingSurname'] = $_POST['title'];
$data['BillingFirstnames'] = $_POST['f_name'];
$data['BillingAddress1'] = $_POST['address'];
$data['BillingCity'] = $_POST['city'];
$data['BillingPostCode'] = $_POST['post_code'];
$data['BillingCountry'] = $_POST['country'];
$data['DeliverySurname'] = $_POST['title'];
$data['DeliveryFirstnames'] = $_POST['f_name'];
$data['DeliveryAddress1'] = $_POST['address'];
$data['DeliveryCity'] = $_POST['city'];
$data['DeliveryPostCode'] = $_POST['post_code'];
$data['DeliveryCountry'] = $_POST['country'];

$pay = new SagePay($data);



?>