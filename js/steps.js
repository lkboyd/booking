///////////////////////////////////////////////////
// ------------ startup ---------------//
$('div#content').html($('div.hidden:eq(0)').html());
//$('div.hidden').show();
$('div.nav').hide();


var pushed_div_class = ''; //id of the div which was pushed
var next_div_class = ''; //id of the div which will be pushed
var now_proceed = false;

var _ERRORS_ = {
    err: ''
};


var data = {
    _initial: '',
    _doc_name: '',
    _to_date: '',
    _from_date: '',
    _service: '',
    _datestring_to_send: '',
    _datestring_for_next_page: '',
    _todays_date: '',
    _time: '',
    _time_with_am_pm: '',
};

var _PAY_ = {
    Amount: 0,
    CardHolder : '',
    CardNumber : '',
    ExpiryDate : '',
    CardType : '',
    BillingSurname: '',
    BillingFirstnames: '',
    BillingAddress1: '',
    BillingCity: '',
    BillingPostCode: '',
    BillingCountry: '',
    DeliverySurname: '',
    DeliveryFirstnames: '',
    DeliveryAddress1: '',
    DeliveryCity: '',
    DeliveryPostCode: '',
    DeliveryCountry: ''
};

var pay_info = {
    title: '',
    set_title: function(value) {
        if (value) {
            return value;
        } else {
            _ERRORS_.err = 'field empty';
            return false;
        }
    },
    
    f_name: '',
    set_f_name: function(value) {
        if (value) {
            return value;
        } else {
            _ERRORS_.err = 'field empty';
            return false;
        }
    },
    
    l_name: '',
    set_l_name: function(value) {
        if (value) {
            return value;
        } else {
            _ERRORS_.err = 'field empty';
            return false;
        }
    },
    
    post_code: '',
    set_post_code: function(value) {
        if (value) {
            return value;
        } else {
            _ERRORS_.err = 'field empty';
            return false;
        }
    },
    
    address: '',
    set_address: function(value) {
        if (value) {
            return value;
        } else {
            _ERRORS_.err = 'field empty';
            return false;
        }
    },
    
    card_type: '',
    set_card_type: function(value) {
        if (value) {
            return value;
        } else {
            _ERRORS_.err = 'field empty';
            return false;
        }
    },
    
    card_number: '',
    set_card_number: function(value) {
        if (value) {
            return value;
        } else {
            _ERRORS_.err = 'field empty';
            return false;
        }
    },
    
    start_date: '',
    end_date: '',
    build_card_date: function(month, year) {
        if (month && year) {
            var date = month+ '-'+ year;
            return date;
        } else {
            _ERRORS_.err = 'field empty';
            return false;
        }
    },
    
    name_on_card: '',
    set_name_on_card: function(value) {
        if (value) {
            return value;
        } else {
            _ERRORS_.err = 'field empty';
            return false;
        }
    },
    
    issue_number: '',
    set_issue_number: function(value) {
        if (value) {
            return value;
        } else {
            _ERRORS_.err = 'field empty';
            return false;
        }
    },
    
    security_code: '',
    set_security_code: function(value) {
        if (value) {
            return value;
        } else {
            _ERRORS_.err = 'field empty';
            return false;
        }
    }
};

var pat_details = {
    title: '',
    set_title: function(value, element) {
        if ( value ) {
            return value;
        } else {
            _ERRORS_.err = 'field_empty';
        }
    },
    
    f_name: '',
    set_f_name: function(value) {
        if ( value ) {
            return value;
        } else {
            _ERRORS_.err = 'field_empty';
        }
    },
    
    l_name: '',
    set_l_name: function(value) {
        if ( value ) {
            return value;
        } else {
            _ERRORS_.err = 'field_empty';
        }
    },
    
    post_code: '',
    set_post_code: function(value) {
        if ( value ) {
            return value;
        } else {
            _ERRORS_.err = 'field_empty';
        }
    },
    
    address: '',
    set_address: function(value) {
        if ( value ) {
            return value;
        } else {
            _ERRORS_.err = 'field_empty';
        }
    },
    
    email: '',
    set_email: function(value) {
        if ( value ) {
            return value;
        } else {
            _ERRORS_.err = 'field_empty';
        }
    },
    
    mobile: '',
    set_mobile: function(value) {
        if ( value ) {
            return value;
        } else {
            _ERRORS_.err = 'field_empty';
        }
    },
    
    DOB_string: '',
    set_dob_string: function(day, month, year) {
        //TODO: validate months, years, day numbers
        if ( day && $.isNumeric(day) && month && $.isNumeric(month) && year && $.isNumeric(year) ) {
            //string format is dd-mm-year
            this.DOB_string = day+'-'+month+'-'+year;
            return this.DOB_string;
        } else {
            _ERRORS_.err = 'error in date of birth fields';
            return false;
        }
    }
};



function get_next_div_class_index(div_class) {
    switch(div_class) {
        case 'page1':
            return 1;
            break;
        case 'page2':
            return 2;
            break;
        case 'page3':
            return 3;
            break;
        case 'page4':
            return 4;
            break;
        case 'page5':
            return 5;
            break;
        case 'page6':
            return 6;
            break;
        default:
            return 0;
            break;
    }
}

function get_next_element(div_class) {
    switch(div_class) {
        case 'page1':
            return $('div.hidden:eq(1)');
            break;
        case 'page2':
            return $('div.hidden:eq(2)');
            break;
        case 'page3':
            return $('div.hidden:eq(3)');
            break;
        case 'page4':
            return $('div.hidden:eq(4)');
            break;
        case 'page5':
            return $('div.hidden:eq(5)');
            break;
        case 'page6':
            return $('div.hidden:eq(6)');
            break;
        default:
            return $('div.hidden:eq(7)');
            break;
    }
}

function get_am_pm(time) {
    switch( Math.round(time) ) {
        case '09:00':
        case '9':
            return 'am';
            break;
        case '14:00':
        case '14':
            return 'pm';
            break;
        case '11:30':
        case '11':
        case '1130':
            return 'am';
            break;
        case '16:00':
        case '16':
            return 'pm';
            break;
        default:
            return '';
            break;
    }
}

function manipulate_nav_bar(step, page) {
    if ( !step && page ) {
        switch (page) {
            case 'page2':
                step = 4;
                break;
            case 'page3':
                step = 5;
                break;
            case 'page4':
                step = 6;
                break;
            case 'page5':
                step = 7;
                break;
            default:
                step = 'blabla :)';
                break;
        }
    }
    switch(step) {
        case 1: //select service
            $('div.nav div.circle:eq(0)').css('background-color', '#00B1B0');
            $('div.nav img:eq(0)').attr('src', 'img/arrow-right.png');
            $('div.nav div.circle+p:eq(0)').css('color', '#00B1B0');
            break;
        case 2: //select dentist
            $('div.nav div.circle:eq(1)').css('background-color', '#00B1B0');
            $('div.nav img:eq(1)').attr('src', 'img/arrow-right.png');
            $('div.nav div.circle+p:eq(1)').css('color', '#00B1B0');
            break;
        case 3: //select date and time
            $('div.nav div.circle:eq(2)').css('background-color', '#00B1B0');
            $('div.nav img:eq(2)').attr('src', 'img/arrow-right.png');
            $('div.nav div.circle+p:eq(2)').css('color', '#00B1B0');
            break;
        case 4: //selection summary
            $('div.nav div.circle:eq(3)').css('background-color', '#00B1B0');
            $('div.nav img:eq(3)').attr('src', 'img/arrow-right.png');
            $('div.nav div.circle+p:eq(3)').css('color', '#00B1B0');
            break;
        case 5: //patient details
            $('div.nav div.circle:eq(4)').css('background-color', '#00B1B0');
            $('div.nav img:eq(4)').attr('src', 'img/arrow-right.png');
            $('div.nav div.circle+p:eq(4)').css('color', '#00B1B0');
            break;
        case 6: //payment details
            $('div.nav div.circle:eq(5)').css('background-color', '#00B1B0');
            $('div.nav img:eq(5)').attr('src', 'img/arrow-right.png');
            $('div.nav div.circle+p:eq(5)').css('color', '#00B1B0');
            break;
        case 7: //booking confirmataion
            $('div.nav div.circle:eq(6)').css('background-color', '#00B1B0');
            $('div.nav img:eq(6)').attr('src', 'img/arrow-right.png');
            $('div.nav div.circle+p:eq(6)').css('color', '#00B1B0');
            break;
        case 'start':
            $('div.nav div.circle').css('background-color', '#a7a9ac'); //at fresh start, changing bg color to grey
            $('div.nav img').attr('src', 'img/arrow_grey.png'); //at fresh start, changing also the arrows
            $('div.nav div.circle+p').css('color', '#a7a9ac');
            break;
        default:
            break;
    }
}

manipulate_nav_bar('start');

$('div#content').one('click', 'div.page1 td:last-child', function(event) { //going to the next step
    //calender is not necessary at first
    $('div#calender').parent('div').hide();
    
    //showing the navigation bar for the first time
    $('div.nav').show();
    
    //generating content
    $('div#content').html($('div.hidden:eq(1)').html()); //pushing the next page
    
    execute();
});


$('div#main').on('click', 'p.continue', function(event) {
    console.log('clicked');
    var current_div = $(event.target).parents('div#main').find('div#content div[class*="page"]').attr('class'); //already existing content page class like "page1", "page2" or ....

    
    execute();
    
    if ( now_proceed ) {
        manipulate_nav_bar('', current_div)
        
        var next_element = get_next_element(current_div);
        $('div#content').html(next_element.html()); //pushing the next page
        pushed_div_class = next_element.find('div[class*="page"]').attr('class');
        next_div_class = 'page' + get_next_div_class_index(pushed_div_class);
    } else {
        
    }
});

//$('div#booking-conf div#service-box+div p:last-child a')



var service = '';
var dentist = '';
var date = '';
var datestring = '';
var time = '';
var timestring = ''; //format:  [day]<space>[monthname]<space>[year]@[time] example: "12 february 2014@09.00"
var all_selected_times = ''; //contains comma seperated timestring


// ------------------------------------------ step 2 ------------------------------------------ //
    function execute() {
        var current_div_class = $('div#content div[class*="page"]').attr('class');
        
        if ( current_div_class == 'page2' ) {
        
            //now selecting service
            $('div#content').on('click', 'input[name="service"]', function(event) {
                manipulate_nav_bar(1);
                //$('div#content+p.continue').show();
                //getting values
                var service = $(event.target).val();
                if ( !service ) {
                    service = '';
                }
                data._service = service;
            });

            
            //now selecting dentist and generating calender
            $('div#content').on('click', 'input[name="dentist"]', function(event) {
                manipulate_nav_bar(2);
                //getting values
                var dentist = $(event.target).val();
                if ( !dentist ) {
                    dentist = '';
                }
                data._initial = dentist;
                data._doc_name = dentist;
                
                var from_date = _DATE_.get_current_year() + '-' +(_DATE_.get_current_month(true)) + '-' + _DATE_.get_current_day();
                var to_date = _DATE_.get_current_year() + '-' + (_DATE_.get_current_month(true)) + '-' + _DATE_.get_month_end();
                
                if ( !from_date ) {
                    from_date = '';
                }
                if ( !to_date ) {
                    to_date = '';
                }
                
                data._from_date = from_date;
                data._to_date = to_date;
                
                
                //search ajax, and generaten and show calender all in one
                if ( data._initial && data._service ) {
                    $('div#content div#calender').html(gen_html());
                    WS_get_appointments(data);
                }
                
                //$('div#calender').parent('div').show();
                
            });

            //now getting date and time
            $('div#content').on('click', 'table.dtable td', function(event) {
                if ( !$('div#content+p.continue').is(":visible") ) {
                    console.log('showing the continue button');
                    $('div#content+p.continue').show();
                }
                
                manipulate_nav_bar(3);
                
                $(event.target).css('background-color', '#65c8c6');
                date = $(event.target).parents('td.cell').children('div').text();
                
                data._todays_date = date;
                
                //data._datestring = $(event.target).parents('td.cell').children('div').attr('id');
                data._datestring_for_next_page = $(event.target).parents('td.cell').children('div').attr('id');
                
                data._datestring_to_send = $(event.target).parents('td.cell').children('div').attr('class');
                //data._datestring = datestring;
                
                time = $(event.target).text();
                data._time = time;
                
                time = time + get_am_pm(time);
                data._time_with_am_pm = time;
                
                timestring = datestring+'@'+time;
                
                timestrings = timestring + ',';
                
            });
            
            //////////////////////////////////////////////////////////////////////
            if ( !data._service || !data._doc_name || !data._datestring_for_next_page || !data._time_with_am_pm ) {
                //alert('wtf');
                now_proceed = false;
                console.log('no');
                console.dir(data);
            } else { //now goint to the next page
                now_proceed = true;
                
                
                //setting selection data
                $('div#summary td#selected_service_name').text(data._service);
                $('div#summary td#selected_dentist_name').text(data._doc_name);
                $('div#summary td#selected_date').text(data._datestring_for_next_page);
                $('div#summary td#selected_time').text(data._time_with_am_pm);
                
                //in another page
                $('div#booking-conf div#service-box div.row:eq(0) p:last-child').text(data._service);
                $('div#booking-conf div#service-box div.row:eq(1) p:last-child').text(data._doc_name);
                $('div#booking-conf div#service-box div.row:eq(2) p:last-child').text(data._datestring_for_next_page);
                $('div#booking-conf div#service-box div.row:eq(3) p:last-child').text(data._time_with_am_pm);
            }
        } else if ( current_div_class == 'page4' ) { //patient details
            
            //fresh error
            _ERRORS_.err = '';
            
            for( var i=1900; i<2014; i++ ) {
                var option = '<option value="'+i+'">'+i+'</option>';
                $('div#content [name="DOB_year"]').append(option);
            }
            
            pat_details.title = pat_details.set_title($('div#content [name="title"]').val());
            pat_details.f_name = pat_details.set_f_name($('div#content [name="firstname"]').val());
            pat_details.l_name = pat_details.set_l_name($('div#content [name="lastname"]').val());
            pat_details.post_code = pat_details.set_post_code($('div#content [name="postcode"]').val());
            pat_details.address = pat_details.set_address($('div#content [name="address-1"]').val() + $('div#content [name="address-1"]').val());
            pat_details.email = pat_details.set_email($('div#content [name="email"]').val());
            pat_details.mobile = pat_details.set_mobile($('div#content [name="mobile"]').val());
            
            var dob_day = $('div#content [name="DOB_day"]').val();
            var dob_month = $('div#content [name="DOB_month"]').val();
            var dob_year = $('div#content [name="DOB_year"]').val();
            
            pat_details.DOB_string = pat_details.set_dob_string(dob_day, dob_month, dob_year);
            
            if ( _ERRORS_.err ) {
                now_proceed = false;
            } else {
                now_proceed = true;
            }
            
        } else if ( current_div_class == 'page5' ) { //payment information
            $('div#content').on('click', '[name="same_as_home"]', function(event) {
                $('div#content [name="title"]').val(pat_details.title);
                $('div#content [name="fname"]').val(pat_details.f_name);
                $('div#content [name="lname"]').val(pat_details.l_name);
                $('div#content [name="postcode"]').val(pat_details.post_code);
                $('div#content [name="address"]').val(pat_details.address);
            });
            
            pay_info.title = pay_info.set_title($('div#content [name="title"]').value());
            pay_info.f_name = pay_info.set_f_name($('div#content [name="fname"]').value());
            pay_info.l_name = pay_info.set_l_name($('div#content [name="lname"]').value());
            pay_info.post_code = pay_info.set_l_name($('div#content [name="postcode"]').value());
            pay_info.address = pay_info.set_l_name($('div#content [name="address"]').value());
            
            pay_info.card_type = pay_info.set_card_type($('div#content [name="card_type"]').value());
            pay_info.card_number = pay_info.set_card_number($('div#content [name="card_number"]').value());
            pay_info.start_date = pay_info.build_card_date($('div#content [name="start_month"]').value(), $('div#content [name="start_year"]').value());
            pay_info.end_date = pay_info.build_card_date($('div#content [name="end_month"]').value(), $('div#content [name="end_year"]').value());
            pay_info.name_on_card = pay_info.set_name_on_card($('div#content [name="name_on_card"]').value());
            pay_info.issue_number = pay_info.set_issue_number($('div#content [name="issue_number"]').value());
            pay_info.security_code = pay_info.set_security_code($('div#content [name="security_code"]').value());
            
            if ( _ERRORS_.err ) {
                now_proceed = false;
            } else {
                now_proceed = false;
                send_payment_info(pay_info);
            }
        }
    }
    
    
    
/* calender navigation fucntionality */
$('div#content').on('click', 'tr.nav-row div#left', function(event) {
    $(event.target).css('cursor', 'pointer');
    _DATE_.navigate( _DATE_._nav_current_month, _DATE_._nav_current_year, 'prev' );
    $('div#content div#calender').empty();

    data._from_date = _DATE_._nav_current_year + '-' + ((_DATE_._nav_current_month<10)?'0'+_DATE_._nav_current_month:_DATE_._nav_current_month) + '-' + '01';
    data._to_date = _DATE_._nav_current_year + '-' + ((_DATE_._nav_current_month<10)?'0'+_DATE_._nav_current_month:_DATE_._nav_current_month) + '-' + totalDays[_DATE_._nav_current_month];
    
    $('div#content div#calender').html(gen_html());
    WS_get_appointments(data, _DATE_._nav_current_month, _DATE_._nav_current_year);
});

$('div#content').on('click', 'tr.nav-row div#right', function(event) {
    $(event.target).css('cursor', 'pointer');
    _DATE_.navigate( _DATE_._nav_current_month, _DATE_._nav_current_year, 'next' );
    $('div#content div#calender').empty();
    
    data._from_date = _DATE_._nav_current_year + '-' + ((_DATE_._nav_current_month<10)?'0'+_DATE_._nav_current_month:_DATE_._nav_current_month) + '-' + '01';
    data._to_date = _DATE_._nav_current_year + '-' + ((_DATE_._nav_current_month<10)?'0'+_DATE_._nav_current_month:_DATE_._nav_current_month) + '-' + totalDays[_DATE_._nav_current_month];
    
    $('div#content div#calender').html(gen_html());
    WS_get_appointments(data, _DATE_._nav_current_month, _DATE_._nav_current_year);
});