function gen_html() {
    var nav_row = ' <td colspan="7">\
                    <div id="left"></div><div id="right"></div><div id="middle"></div>\
                    </td>';

    var weekrow = ' <td>Mon</td>\
                    <td>Tue</td>\
                    <td>Wed</td>\
                    <td>Thu</td>\
                    <td>Fri</td>\
                    <td>Sat</td>\
                    <td>Sun</td>';
    var common_data =   '<td class="cell">\
                        <div>\
                        </div>\
                        </td>';

    var html = '<table class="mtable">';

    for ( var i=0; i<8; i++ ) { //rows
        if ( i==0 ) {
            html = html + '<tr class="nav-row">';
            html = html + nav_row;    
        } else if( i==1 ) {
            html = html + '<tr class="week-names">';
            html = html + weekrow;
        } else {
            html = html + '<tr>';
            for(var j=0; j<7; j++) { //columns
                html = html + common_data;
            }
        }
        html = html + '</tr>'
        
    }
    return html+'</table>';
}

//var html = gen_html();
//$('div#calender').html(html);
