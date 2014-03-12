<?php
function convert_initial($initial) {
    switch( $initial ) {
        case 'Dr sosen Botani':
            return 'SB';
            break;
        case 'Dr Tu Anh Chau':
            return 'TC';
            break;
        case 'Dr Phillip Walburg':
            return 'PW';
            break;
        case 'Any Dentist':
            return '';
            break;
        default:
            return '';
            break;
    }
}

function convert_service($service) {
    switch($service) {
        case 'New patient exam':
            return 'exnp';
            break;
        case 'New patient exam hygiene treatment':
            return 'exnp+h30';
            break;
        default:
            return '';
            break;
    }
}


function gen_unique_code() {
    
}


?>