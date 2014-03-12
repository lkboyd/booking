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
                        <table class="dtable">\
                            <tr>\
                                <td class="9">09:00</td>\
                                <td class="14">14:00</td>\
                            </tr>\
                            <tr>\
                                <td class="11">11:30</td>\
                                <td class="16">16:00</td>\
                            </tr>\
                        </table>\
                        </td>';

    var html = '';

    for ( var i=0; i<8; i++ ) { //rows
        html = html + '<tr>';
        if ( i==0 ) {
            html = html + nav_row;    
        } else if( i==1 ) {
            html = html + weekrow;
        } else {
            for(var j=0; j<8; j++) { //columns
                html = html + common_data;
            }
        }
        html = html + '</tr>'
        
    }
    return html;
}
//var html = gen_html();
//$('div#cal').html(html);

$('button').click(function() {
    var html = gen_html();
    $('div#cal').html(html);
});
