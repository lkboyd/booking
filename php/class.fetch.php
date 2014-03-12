<?php
/*

structure of info should be

$info = array(
        'url'=>
        'doc_initial'=>
        'from_date'=>
        'to_date'=>
        'service'=>
        );
        
date format is : year-month-day (e.g. 2014-01-31)

*/
class Fetch {

    // data passed
    var $doc_initial;
    var $from_date;
    var $to_date;
    var $service;
    
    //standard data
    var $base_url;
    var $STACK_doc_initial;
    var $STACK_date_format;
    var $STACK_service;
    
    function __construct($info) {
        if ( !is_array($info) ) {
            return false;
        }
        
        if ( $info['doc_initial'] ) {
            $this->doc_initial = $info['doc_initial'];
        } else {
            $this->doc_initial = '';
        }
        
        if ( $info['from_date'] ) {
            $this->from_date = $info['from_date'];
        } else {
            $this->from_date = '';
        }
        
        if ( $info['to_date'] ) {
            $this->to_date = $info['to_date'];
        } else {
            $this->to_date = '';
        }
        
        if ( $info['service'] ) {
            $this->service = $info['service'];
        } else {
            $this->service = '';
        }
        
        // now setting standard data
        $this->base_url = 'http://java.bdental.co.uk:8080/WebService/dentist/';
        $this->STACK_doc_initial = array('SB', 'PW', 'TC', 'CH');
        $this->STACK_date_format = 'Y-m-D';
        $this->STACK_service = array('exnp', 'exnp+h30', 'exam', 'exam+h30', 'h30');
    }
    
    //validate and return doc initial
    function val_doc_initial() {
        if ( $this->doc_initial && $this->STACK_doc_initial && in_array($this->doc_initial, $this->STACK_doc_initial) ) {
            return $this->doc_initial;
        } else {
            return '';
        }
    }
    
    //validate the date format
    //currently just check if it not an empty string
    function val_date($date) {
        if ( $date ) {
            return $date;
        } else {
            return '';
        }
    }
    
    function val_service() {
        if ( $this->service && $this->STACK_service && in_array($this->service, $this->STACK_service) ) { //validating
            return $this->service;
        } else {
            return '';
        }
    }
    
    function val_base_url() {
        return $this->base_url;
    }
    
    //$without_service means whether including service info in url is necessary or not
    function build_url($without_service = false) {
        $base_url = $this->val_base_url();
        $doc_initial = $this->val_doc_initial();
        $from_date = $this->val_date($this->from_date);
        $to_date = $this->val_date($this->to_date);
        $service = $this->val_service();
        
        $data = array(
            'from'=>$from_date,
            'to'=>$to_date,
            'service'=>$service
        );
        
        if ( !$without_service ) {
            if ( $base_url && $doc_initial && $from_date && $to_date && $service ) {
                $query = http_build_query($data);
                //$url = $base_url . $doc_initial . '/diary?' . 'from=' . $from_date . '&to=' . $to_date . '&service=' . $service;
                $url = $base_url . $doc_initial . '/diary?' . $query;
                return $url;
            } else {
                return '';
            }
        } else {
            if ( $base_url && $doc_initial && from_date && $to_date ) {
                $url = $base_url . $doc_initial . '/diary?' . 'from=' . $from_date . '&to=' . $to_date . '&service=' . $service;
                return $url;
            } else {
                return '';
            }
        }
        
    }
    
    function fetch_data() {
        $url = $this->build_url();
        $resp_xml = $this->CurlConnect($url); //the web server is supposed to return an xml file
        return $resp_xml;
    }
    
    function get_json() {
        $xml = $this->fetch_data(); //the xml string returned by server
        $xml = simplexml_load_string($xml);
        $json = json_encode($xml);
        
        return $json;
    }
    
    function purify() {
        $json = $this->get_json();
        $arr = json_decode($json, TRUE);
        $res = array();
        if ( count($arr['appointment-list']) && $arr['appointment-list']['day'] ) { //if not empty data
            foreach( $arr['appointment-list']['day'] as $each ) {
                $res[$each['@attributes']['date']] = $each['appointment-time'];
            }
        }
        return $res;
    }
    
    
    function CurlConnect($url, $request='') {
        $length=strlen($request);
        if ( !$url ) {
            $url = $this->build_url();
        }
        $ch = curl_init($url);
        $options = array(
                CURLOPT_RETURNTRANSFER => true,         // return web page
                CURLOPT_HEADER         => false,        // don't return headers
                CURLOPT_FOLLOWLOCATION => false,         // follow redirects
                CURLOPT_ENCODING       => "utf-8",           // handle all encodings
                CURLOPT_AUTOREFERER    => true,         // set referer on redirect
                CURLOPT_CONNECTTIMEOUT => 20,          // timeout on connect
                CURLOPT_TIMEOUT        => 20,          // timeout on response
                CURLOPT_POST            => 0,            // i am sending post data
                //CURLOPT_POSTFIELDS     => $request,    // this are my post vars
                CURLOPT_SSL_VERIFYHOST => 0,            // don't verify ssl
                CURLOPT_SSL_VERIFYPEER => false,        //
                CURLOPT_VERBOSE        => 1
                
        ); 
        curl_setopt_array($ch,$options);
        $data = curl_exec($ch);
        $curl_errno = curl_errno($ch);
        $curl_error = curl_error($ch);
        //echo $curl_errno;
        //echo $curl_error;
        curl_close($ch);
        return $data;
    }

}

?>