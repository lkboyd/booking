//calculating todays date
var current = new Date();
var month = current.getMonth();
var today = current.getDate();
var year = current.getFullYear();

var _DATE_ = {
    _month: month,
    _nav_current_month: month,
    _nav_current_year: year,
    
    navigate: function(current_month, current_year, nav_type) {
        switch( nav_type ) {
            case 'prev':
                if ( current_month>0 ) {
                    this._nav_current_month = current_month - 1;
                }
                if ( current_month = 0 ) {
                    this._nav_current_year = current_year-1;
                    this._nav_current_month = 11;
                }
            break;
            
            case 'next':
                if ( current_month<11 ) {
                    this._nav_current_month = current_month - 1;
                }
                if ( current_month = 11 ) {
                    this._nav_current_year = current_year + 1;
                    this._nav_current_month = 0;
                }
                break;
        }
    },
    
    get_current_month: function(double_digit) { //to get the true current month, from the system(ignoring users navigation)
        var current = new Date();
        var month = current.getMonth();
        if ( double_digit ) {
            month = month+1;
            if ( month<10 ) {
                month = "0" + month;
                return month;
            }
        } else {
            return month;
        }
    },
    _today: today, //day number
    
    get_current_day: function() {
        var current = new Date();
        return current.getDate();
    },
    _year: year,
    
    get_current_year: function() {
        var current = new Date();
        return current.getFullYear();
    },
    get_total_feb: function(year) {
        if ( !year ) {
            year = this.get_current_year();
        }
        if ( (year%100!=0) && (year%4==0) || (year%400==0) ) {
            return 29;
        } else {
            return 28;
        }
    },
    get_month_start: function(month, year) { //weekday of month start
        if ( !month ) {
            month = this._month;
        }
        if ( !year ) {
            year = this._year;
        }
        
        return get_month_start(month, year);
    },
    get_month_end: function(month) {
        if ( !month ) {
            month = this._month;
        }
        return totalDays[month];
    }
}

//adjustment for leap year
var totalFeb = 28;
if ( month == 1 ) {
    if ( (year%100!=0) && (year%4==0) || (year%400==0) ) {
        totalFeb = 29;
    } else {
        totalFeb = 28;
    }
}
var monthNames = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
var totalDays = [31, totalFeb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri'];



//get the day of week in 1 of the month
function get_month_start(m, y) {
	tempMonth = m + 1;
	var tempDate = new Date(tempMonth + ' 1 ,' + y);
	var tempweekday = tempDate.getDay();
	return tempweekday;
}

//app_json is the appointment data in json format. this data contains only the available time of the doc
function gen_cal(app_json, month, year) {
    if ( !month ) {
        month = _DATE_.get_current_month();
    }
    
    if ( !year )  {
        year = _DATE_.get_current_year();
    }
    
	var title = monthNames[month] + ' ' + year; //title for the calender
	$('table.mtable div#middle').text(monthNames[month] + ' ' + year);
	$('table.mtable div#left').text(monthNames[month-1].substring(0,3));
	$('table.mtable div#right').text(monthNames[month+1].substring(0,3));
	
	//get first day of month
	var tempweekday = get_month_start(month, year);

    //console.dir(app_json);
	//now generate calender
	var i=1; //this is the every day of month
	$('div#content div#calender td.cell').each(function(index, element){
        //$(element).css('width', '100px');
        //$(element).css('height', '80px');
        console.log(index);
		$(element).find('div').text('');
		if ( (index>tempweekday-2) && (i<=totalDays[month]) ) { //from the first day of month to the last day of the month: valida dates cell
            var elem = $(element).find('div');
            var datestring = i + ' ' + monthNames[month] + ' ' + year; //generating the datestring to view in the next pages
            
            var search_datestring = year+'-'+(month+1)+'-'+((i<10)?('0'+i):(i)); //datestring formatter according to the webserver: format(2013-01-23)
            if ( month<10 ) {
                search_datestring = year + '-' + '0' + (month+1) + '-' + ((i<10)?('0'+i):(i));
            }
			//$(element).find('div').text(i);
            elem.text(i); //setting date
            elem.attr('id', datestring);
            elem.addClass(search_datestring);
            
            //highlighting today
            if ( (month == _DATE_.get_current_month()) && (year == _DATE_.get_current_year()) && ( i==_DATE_.get_current_day() ) ) {
                $(element).css('background-color', '#D8EFF0');
            } 
            
            //now clean empty rows
            //hide_empty_rows();
            
            //applying appointment dates
            var html = '';
            if ( app_json[search_datestring] ) { //there are times today
                var todays_app = app_json[search_datestring]; //todfays appointments 
                if ( $.type(todays_app) == 'array' ) { //many appointments in a day
                    var k = 0;
                    $.each(todays_app, function(index, elm) {
                        html = html + '<td class="time">'+elm+'</td>';
                        k++;
                        if ( ( k!=0 ) && ( k!=1 ) && (k%2)==0 ) { // a new tr, only two times in a row
                            html = '<tr>' + html + '</tr>';
                        }
                    });
                } else { //only one appointment in a day
                    html = html + '<tr><td class="time">'+todays_app+'</td></tr>';
                }
            }
            if ( html ) {
                html = '<table class="dtable">' + html + '</table>';
                $(element).append(html);
            }
            

            //now generate html to be inside "td.cell table"
            //var html = gen_time_data_html(app_json, i, month, year);
            
            //$(element).append(html);
            
			i++;
		} else { //invalid dates cell
            $(element).find('[class*="time:"]').text('');
        }
        
        if ( (index>34) && (i>totalDays[month]) ) { //remote the empty row
            $(element).parents('tr').remove();
        }
	});
}


//to get the maximum number of appointments in a day in a query result to use in generation of html
//data is a json
function gen_max(data) {
    
}

function get_date_from_string(string) {
    
}

//this function is to generate html code with appointment times of a doc in a day to push in the td.cell
//search_datestring is to be the id of "td.cell table td"
function gen_time_data_html(app_json, day, month, year) {
    //get maximum appointments in a day
    //var max_app_in_day = gen_max(app_json);
    var max_app_in_day = 6;
    
    //maximum row to be in the table inside a td.cell
    var max_row = (max_app_in_day/2);
    
}

//tp hide the empty rows in the calender
function hide_empty_rows() {
    
}


//now default for this month
//gen_cal(month, year);




//navigation
/*
$('table.mtable div#right').click(function() {
	month = month+1;
    year = year;
	gen_cal(month, year);
});
$('table.mtable div#left').click(function() {
	month = month-1;
    year = year;
	gen_cal(month, year);
});
*/

function get_start_date() {
    
}


