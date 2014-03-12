<?php
//to fetch data from the web server
include 'php/class.fetch.php';
include 'php/misc.php';

$doc_initial = $_GET['doc_initial'];
$from_date = $_GET['from_date'];
$to_date = $_GET['to_date'];
$service = $_GET['service'];


$info = array(
        'doc_initial'=>convert_initial($doc_initial),
        'from_date'=>$from_date,
        'to_date'=>$to_date,
        'service'=>convert_service($service)
        );
$thing = new Fetch($info);
echo '<pre>';
//print_r($thing->purify());
print_r($thing->purify());
echo '<pre>';

?>