/* this is to call the web service to get doctors available appointments */
/* --------------------------------------------------- format --------------------------------------------------------------

GET Available appointments
---------------------------------------

a. URL: java.bdental.co.uk:8080/WebService/dentist/<dentist-initials>/diary?from=<date>&to=<date>&service=<service>
b. dentist-initials: (SB / PW / TC / CH)
c. date: year-month-day (e.g. 2014-01-31)
d. service: exnp / exnp+h30 / exam / exam+h30 / h30

EXAMPLE
--------------
http://java.bdental.co.uk:8080/WebService/dentist/PW/diary?from=2014-01-31&to=2014-02-17&service=exam
 

-------------------------------------------------------------------------------------------------------------------------------------- */

// ---------------------------------------------- NAMESPACE = WS --------------------------------------------- //

/*
search_obj format should be
    {
        url:
        initial:
        to_date:
        from_date:
        service:
    }
*/
function WS_build_url(search_obj) {
    if ( search_obj.initial && search_obj.from_date && search_obj.to_date && service ) {
        return 'java.bdental.co.uk:8080/WebService/dentist/' + search_obj.initial + '/diary?from=' + search_obj.from_date + '&to=' + search_obj.to_date + '&service=' + search_obj.service;
    } else {
        return '';
    }
}

//callback function mustg accept the data/returned json
function WS_get_appointments(search_obj, month, year) {
    
    var Datastring = 'doc_initial=' + search_obj._initial + '&from_date=' + search_obj._from_date + '&to_date=' + search_obj._to_date + '&service=' + search_obj._service;
    
    $.ajax({
        type: "POST",
        url: "php/fetch.php",
        data: Datastring,
        dataType: "json",
        async: true,
        cache: false,
        beforeSend: function() {
            console.group('fetching doc info');
        },
        success: function(data, textStatus, jqXHR) {
            console.group('server response on ajax success');
            console.debug('data:' + data + ', textStatus:' + textStatus);
            
            if ( month && year ) {
                gen_cal(data, month, year);
            } else {
                gen_cal(data);
            }
            
            $('div#calender').parent('div').show();
            
            console.groupEnd();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('ajax processing failed');
        }
    }).always(function() {
        console.groupEnd();
    });
}



function send_payment_info(data) {
    
    var Datastring = $.param(data);
    
    $.ajax({
        type: "POST",
        url: "php/pay.php",
        data: Datastring,
        dataType: "",
        async: true,
        cache: false,
        beforeSend: function() {
            console.group('submitting payment info');
        },
        success: function(data, textStatus, jqXHR) {
            console.group('server response on ajax success');
            console.debug('data:' + data + ', textStatus:' + textStatus);
            
            // going to next page manually baby :(
            current_div = 'page5';
            manipulate_nav_bar('', current_div)
            var next_element = get_next_element(current_div);
            $('div#content').html(next_element.html()); //pushing the next page
            pushed_div_class = next_element.find('div[class*="page"]').attr('class');
            next_div_class = 'page' + get_next_div_class_index(pushed_div_class);
            
            
            console.groupEnd();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('ajax processing failed');
        }
    }).always(function() {
        console.groupEnd();
    });
}