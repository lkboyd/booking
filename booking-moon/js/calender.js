//calculating todays date
var current = new Date();
var month = current.getMonth();
var today = current.getDate();
var year = current.getFullYear();

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
function get_month_start(month, year) {
	tempMonth = month + 1;
	var tempDate = new Date(tempMonth + ' 1 ,' + year);
	var tempweekday = tempDate.getDay();
	return tempweekday;
}


function gen_cal(month, year) {
	var title = monthNames[month] + ' ' + year;
	$('div#middle').text(monthNames[month] + ' ' + year);
	$('div#left').text(monthNames[month-1]);
	$('div#right').text(monthNames[month+1]);
	
	//get first dayt of month
	var tempweekday = get_month_start(month, year);

	//now generate calender
	var i=1; //this is the every day of month
	$('td.cell').each(function(index, element){
		$(element).find('div').text('');
		if ( (index>tempweekday-2) && (i<=totalDays[month]) ) {
			$(element).find('div').text(i);
			i++;
		}
	});
}

//now default for this month
gen_cal(month, year);

//navigation
$('div#right').click(function() {
	month = month+1;
	gen_cal(month+1, year);
});
$('div#left').click(function() {
	month = month-1;
	gen_cal(month-1, year);
});

