<?php
/*

$data_array = (
    VPSProtocol
    TxType
    Vendor
    VendorTxCode
    Amount
    Currency
    Description
    CardHolder
    CardNumber
    ExpiryDate
    CardType
    BillingSurname
    BillingFirstnames
    BillingAddress1
    BillingCity
    BillingPostCode
    BillingCountry
    DeliverySurname
    DeliveryFirstnames
    DeliveryAddress1
    DeliveryCity
    DeliveryPostCode
    DeliveryCountry
    StoreToken
);

*/

class SagePay {

    var $base_url;
    var $data;
    var $STACK_card_type;

    function __construct($data_array) {
        $this->base_url = 'https://test.sagepay.com/gateway/service/vspdirect-register.vsp';
        $this->data = $data_array;
        $this->STACK_card_type = array(
            'VISA',
            'MC',
            'MCDEBIT',
            'DELTA',
            'MAESTRO',
            'UKE',
            'AMEX',
            'DC',
            'JCB',
            'LASER',
            'PAYPAL'
        );
    }

    function validate($data) {
        $error = '';
        if ( is_array($data) ) {
            if ( !$data['Amount'] || !is_numeric($data['Amount']) ) {
                $error .= ' amount field invalid ';
            }
            if ( !$data['CardHolder'] ) {
                $error .= ' cardholder field invalid ';
            }
            if ( !$data['CardNumber'] || !is_numeric($data['CardNumber']) ) {
                $error .= ' card number field invalid ';
            }
            if ( !$data['ExpiryDate'] ) {
                $error .= ' card expiry field invalid ';
            }
            if ( !$data['CardType'] || !in_array($data['CardType'], $this->STACK_card_type) ) {
                $error .= ' amount field invalid ';
            }
            if ( !$data['BillingSurname'] ) {
                $error .= ' billing sur name field invalid ';
            }
            if ( !$data['BillingFirstnames'] ) {
                $error .= ' billing first names field invalid ';
            }
            if ( !$data['BillingAddress1'] ) {
                $error .= ' billing address field invalid ';
            }
            if ( !$data['BillingCity'] ) {
                $error .= ' billing city field invalid ';
            }
            if ( !$data['BillingPostCode'] ) {
                $error .= ' billing postcode field invalid ';
            }
            if ( !$data['BillingCountry'] ) {
                $error .= ' billing country field invalid ';
            }
            if ( !$data['DeliverySurname'] ) {
                $error .= ' delivery surname field invalid ';
            }
            if ( !$data['DeliveryFirstnames'] ) {
                $error .= ' delivery first names field invalid ';
            }
            if ( !$data['DeliveryAddress1'] ) {
                $error .= ' delivery address field invalid ';
            }
            if ( !$data['DeliveryCity'] ) {
                $error .= ' delivery city field invalid ';
            }
            if ( !$data['DeliveryPostCode'] ) {
                $error .= ' delivery postcode field invalid ';
            }
            if ( !$data['DeliveryCountry'] ) {
                $error .= ' delivery country field invalid ';
            }

            if ( $error ) {
                $errors['err'] = $error;
                return false;
            } else {
                return true;
            }

        } else {
            return false;
        }
    }

    function build_url() {
        if ( $this->validate( $this->data ) ) {
            $q_string = http_build_query($this->data);
            return $q_string;
        } else {
            return false;
        }
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