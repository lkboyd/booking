<?php
//to fetch data from the web server
include 'class.fetch.php';
include 'misc.php';

$doc_initial = $_POST['doc_initial'];
$from_date = $_POST['from_date'];
$to_date = $_POST['to_date'];
$service = $_POST['service'];


$info = array(
        'doc_initial'=>convert_initial($doc_initial),
        'from_date'=>$from_date,
        'to_date'=>$to_date,
        'service'=>convert_service($service)
        );
$thing = new Fetch($info);

if ( count($thing->purify()) ) {
    echo json_encode($thing->purify());
} else {
    echo '{}';
}
exit;

?>