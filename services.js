$('h3#page_loading').css('display', 'none');
$('div#add_staff_and_services').fadeTo(2000, 1);

if ( client_id === undefined ) {
    var client_id = null;
}
if ( service_id === undefined ) {
    var service_id = null;
}



if (client_id) {
    $('div#sticky_top_bar').show();
}




//no service added to client, show the add service button
if ( client_id && !service_id ) {
    $('button[name="add_service_button"]').css('display', 'block');
}
$('button[name="add_service_button"]').click(function(event) {
    if (!$('input[name="client_id"]').val())
        alert('select or insert a client first');
    else {
        $('#client_management').fadeTo(1000, 0, function() {
            $('div#add_services_container').css('display', 'block');
            $('#client_management').css('display', 'none');
            $(event.target).hide();
            $('#user_info_shortlist').css('display', 'block');
            $('#add_service_dropdown').css('display', 'block');
        });
    }
});




$('[name="add_services"]').change(function() {
    add_service_hidden_fields();
});


function add_service_hidden_fields() {
    switch ($('[name="add_services"]').val()) {

        case "ip_bw":
            document.getElementById('ip_bw_fields').style.display = 'block';
            document.getElementById('add_service_submit').style.display = 'block';
            //hide other fields
            document.getElementById('ip_transit_fields').style.display = 'none';
            document.getElementById('iplc_fields').style.display = 'none';
            document.getElementById('mpls_fields').style.display = 'none';
            break;

        case "ip_transit":
            document.getElementById('ip_transit_fields').style.display = 'block';
            document.getElementById('add_service_submit').style.display = 'block';
            //hide other fields
            document.getElementById('ip_bw_fields').style.display = 'none';
            document.getElementById('iplc_fields').style.display = 'none';
            document.getElementById('mpls_fields').style.display = 'none';
            break;

        case "iplc":
            document.getElementById('iplc_fields').style.display = 'block';
            document.getElementById('add_service_submit').style.display = 'block';
            //hide other fields
            document.getElementById('ip_bw_fields').style.display = 'none';
            document.getElementById('ip_transit_fields').style.display = 'none';
            document.getElementById('mpls_fields').style.display = 'none';
            break;
        case "mpls":
            document.getElementById('mpls_fields').style.display = 'block';
            document.getElementById('add_service_submit').style.display = 'block';
            //hide other fields
            document.getElementById('ip_bw_fields').style.display = 'none';
            document.getElementById('ip_transit_fields').style.display = 'none';
            document.getElementById('iplc_fields').style.display = 'none';
            break;

        default:
            document.getElementById('ip_bw_fields').style.display = 'none';
            document.getElementById('ip_transit_fields').style.display = 'none';
            document.getElementById('iplc_fields').style.display = 'none';
            document.getElementById('mpls_fields').style.display = 'none';
            document.getElementById('add_service_submit').style.display = 'none';
            break;
    }
}


$('[name="con_details_local_loop"]').change(function() {
    con_details_hidden_fields();
});
function con_details_hidden_fields() {
    switch ($('[name="con_details_local_loop"]').val()) {
        case 'nttn':
            document.getElementById('con_details_local_loop_nttn_fields').style.display = 'inline';
            document.getElementById('con_details_nttn_odf_details').style.display = 'block';
            document.getElementById('con_details_local_loop_mixed_fields').style.display = 'none';
            break;
        case 'mixed':
            document.getElementById('con_details_local_loop_mixed_fields').style.display = 'block';
            document.getElementById('con_details_local_loop_nttn_fields').style.display = 'none';
            document.getElementById('con_details_nttn_odf_details').style.display = 'none';
            break;
        default:
            document.getElementById('con_details_local_loop_nttn_fields').style.display = 'none';
            document.getElementById('con_details_local_loop_mixed_fields').style.display = 'none';
            document.getElementById('con_details_nttn_odf_details').style.display = 'none';
            break;
    }
}



$('div#con_details_nttn_odf_details [name="odf_name"]').val($('select[name="con_details_local_loop_nttn_fields_nttn"]').val());
$('select[name="con_details_local_loop_nttn_fields_nttn"]').change(function() {
    $('div#con_details_nttn_odf_details [name="odf_name"]').val($(this).val());
    $('div#con_details_nttn_odf_details+span.msg').text($(this).val());
});



$('[name="interface_type_router"], [name="interface_type_mux"], [name="interface_type_mix"]').change(function() {
    show_interface_fields();
});

function show_interface_fields() {
    if ($('input[name="interface_type_router"]').is(':checked')) {
        $('.interface_router_fields').css('display', 'inline');
    } else {
        $('.interface_router_fields').css('display', 'none');
    }
    if ($('input[name="interface_type_mux"]:checked').is(':checked')) {
        $('.interface_mux_fields').css('display', 'inline');
    } else {
        $('.interface_mux_fields').css('display', 'none');
    }
    if ($('input[name="interface_type_mix"]:checked').is(':checked')) {
        $('.interface_mixed_fields').css('display', 'inline');
    } else {
        $('.interface_mixed_fields').css('display', 'none');
    }
}





if ( client_id ) {
//count error notifications repeatedly 
    setInterval(function() {
        var number_of_notfs = $(notf_man.container).find('.error').length;
        $('div#show_notf_button').text(number_of_notfs + ' notification');
    }, 5000);
    if (!$('div#show_notf_button').is(':visible')) {
        $('div#show_notf_button').show();
    }
    
    //to bring notification window on click
    $('div#show_notf_button').click(function(event) {
        event.stopPropagation();
        if (!$(notf_man.container).is(':visible')) {
            notf_man.notf_container_show();
        }
    });
} else {
    if ($('div#sticky_top_bar').is(':visible')) {
        $('div#sticky_top_bar').hide();
    }
}



//odf management object
/*all_odf_from_db property contains all odf from database, edits for necessary and then 
 sends only the edited odfs back to the server to be saved
 reloads odf list 
 TODO: implement database locking functionlity later
 */
var odf_data = {
    forbidden_characters: ['&'],
    num_ports_in_each_tray: 10,
    added_odfs_total: 0,
    all_odf_from_db: {}, //all odf in db

    this_client_odf_names: [],
    realtime_odf_names: [],
    //an array

    must_update: false
            //if any change happens(like ports unclicked), not by the user,only by the system to maintain consistency, then this value will be true and alert will be shown
};
odf_data.all_odf_from_db_reload = function(callbacks) {
    $.ajax({
        type: "POST",
        url: "./add_services.php?q=GET_ODF",
        data: '',
        async: true,
        cache: false,
        beforeSend: function() {
            console.group('ajax request to refresh all odf');
            var notf_id = uniqid('loading_');
            notf_man.push('<br><span id="' + notf_id + '" class="msg">wait, loading all odfs ... </span>', true);
            notf_man.operation('loading');
            notf_man.operation('disable');
        },
        success: function(odf_response, textStatus, jqXHR) {
            console.group('server response on ajax success');
            if (odf_response === "0" || odf_response === 0) { //no json data
                console.error('no json data in database');
                notf_man.push('<span class="error">database contains no odf data</span>');

            } else { //string either be json or error string

                try {
                    var resp_obj = JSON.parse(odf_response);
                } catch (Err) { //syntax error for json parse failure
                    var resp_obj = null; // for invalid json string or error string
                }

                if (resp_obj !== null) { //success, got object
                    $.each(resp_obj, function(key, val) {
                        //console.dir(val);
                        odf_data.all_odf_from_db[key] = val[key];
                    });
                    //odf_data.all_odf_from_db = resp_obj;
                    
                    if ( is_array(callbacks) ) {
                        for (var i=0; i<callbacks.length; i++) {
                            callbacks[i]();
                        }
                    }
                    
                    notf_man.push('<span class="success"> success </span>');
                } else {
                    console.error('Error! server sent invalid json data: ' + odf_response);
                    notf_man.push('<span class="error"> Error </span>');
                }
            }
            console.groupEnd();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            notf_man.push('<span class="error"> AJAX Error </span>');
            console.error('odf refresh ajax processing failed');
        },
        comlete: function() {

        }
    }).always(function() {
        console.groupEnd();
        notf_man.operation('reset');
    });
};
//build all odf names where this client has ports
odf_data.this_client_odf_names_reload = function(client) {
    console.group('building this clients odf names');
    $.each(odf_data.all_odf_from_db, function(name, obj) {
        if (obj['div_id'] == 'con_details_nttn_odf_details') {
            odf_data.this_client_odf_names.push(name);
        }
        if (odf_has_client(obj, client_id) == true) {
            odf_data.this_client_odf_names.push(name);
        }
    });
    console.groupEnd();
};
// this function is written to check a tray both in uppercase and lowercase
odf_data.all_odf_from_db_has_tray = function(odf_name, tray) {
    if (is_string(odf_name) && is_string(tray)) {
        tray_u = tray.toUpperCase();
        tray_l = tray.toLowerCase();
        if (odf_data.all_odf_from_db[odf_name]['data'][tray_u] !== undefined && is_object(odf_data.all_odf_from_db[odf_name]['data'][tray_u])) {
            return true
        } else if (odf_data.all_odf_from_db[odf_name]['data'][tray_l] !== undefined && is_object(odf_data.all_odf_from_db[odf_name]['data'][tray_l])) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
//realtime odf names contains odf names found from db along with dynamically added in a session
odf_data.realtime_odf_names_reload = function() { //from all odf object
    for (var name in odf_data.all_odf_from_db) {
        if (odf_data.all_odf_from_db.hasOwnProperty(name)) {
            if (name && (odf_data.all_odf_from_db[name]['div_id'] !== undefined) && (odf_data.all_odf_from_db[name]['div_id'] != 'con_details_nttn_odf_details')) {
                if (odf_data.realtime_odf_names.indexOf(name) === -1) {
                    odf_data.realtime_odf_names.push(name);
                }
            }
        }
    }
};
odf_data.apply_odf_names = function() {

};
//first time refresh
if ( client_id ) { // only if there is a client
    console.group('first time refresh');
    odf_data.all_odf_from_db_reload( [odf_data.this_client_odf_names_reload, odf_data.realtime_odf_names_reload, apply_all_odf_for_this_client] );
    console.groupEnd();
}




//whether a section in services loaded from db/already in db
function loaded_from_db(section) {
    if (service_id && client_id) {
        switch (section)
        {
            case 'add_service':
                if ($('select[name="add_services"]').val())
                    return true;
                else
                    return false;
                break;
            case 'con_details':
                if ($('select[name="con_details_local_loop"]').val())
                    return true;
                else
                    return false;
                break;
            case 'con_dates':
                if ($('input[name="link_act_date"]').val())
                    return true;
                else
                    return false;
                break;
        }
    } else
        return false;
}


if (loaded_from_db('add_service')) {
    $('div#add_services_container').css('display', 'block');
    $('button[name="add_service_button"]').css('display', 'none');
    $('#add_service_dropdown').css('display', 'block');
    var div_id = $('select[name="add_services"]').val();
    var div_selector = 'div#' + div_id + '_fields';
    $(div_selector).show();
    $('button[name="add_service_submit"]').html('update');
    $('button[name="add_service_submit_and_continue"]').css('display', 'none');
    $('div#connectivity_details').css('display', 'block');
}
if (loaded_from_db('con_details')) {
    $('div#add_services_container').css('display', 'block');
    $('button[name="add_service_button"]').css('display', 'none');
    $('button[name="con_details_submit"]').text('update');
    $('button[name="con_details_submit_and_continue"]').css('display', 'none');
    con_details_hidden_fields($('select[name="con_details_local_loop"]').val());
    /*var nttn_odf = $('select[name="con_details_local_loop_nttn_fields_nttn"]').val();
     if ( nttn_odf ) {
     $('input[name="nttn_odf_name"]').val(nttn_odf);
     } */

    show_interface_fields();

    $('div#con_dates').css("display", "block");
}
if (loaded_from_db('con_dates')) {
    $('div#add_services_container').css('display', 'block');
    $('button[name="con_dates_save"]').text('update');
    $('button[name="con_dates_save_and_comission"]').css('display', 'none');
}


// amount X level
$('input.service_amount, select.service_level').change(function(event) {
    console.debug('amount or level changed');
    var amount = $(event.target).closest('tr').find('input.service_amount').val();
    var level = $(event.target).closest('tr').find('select.service_level').val().toUpperCase();
    if (amount && level) {
        console.log('both amount and level fields are filled');
        var total_string = amount + ' X ' + level;
        $(event.target).closest('tr').find('input.service_total').val(total_string);
    }
});



/* ------------- necessary odf functions and events------------ */

/*build an new object containing necessary information of all odfs
 */
//this function will do no cleansing: empty odf name, no ports... It just ignores a odf if manadatory data not found
function build_odf_collection(silent) {
    console.group('building odf collection');
    var error = '';
    var odfs = {};
    $('div.odf_details').each(function(index) {
        //now we are inside each odf's immediate parent div
        var has_ports_checked = false;
        var ports = {};
        var odf_div_id = $(this).attr('id');
        var odf_name = $(this).find('.odf_name').val();
        odf_name = odf_name ? odf_name : null;
        //console.info('entered ' + index + '\'th odf div, id:' + odf_div_id+', odf name: '+odf_name);

        if (!odf_div_id) { //if no div id, generate a new id
            var odf_div_id = $(this).uniqueId();
            $(this).attr('id', odf_div_id);
            console.error('fatal error in html, no odf id present in the ' + index + '\'th odf immediate parent div, now auto generated new id: ' + odf_div_id);
        }
        if (!odf_name) {
            //no odf name, so going ahead is meaningless, exit now
            console.error('no odf name');
            if (index === 0) {
                $error = 'nttn odf name not selected';
            } else {
                error = index + '\'th added odf name empty, skipping this odf';
            }
            $(this).find('.odf_name').css(s_style.error_field_css);
            if (silent !== true) {
                notf_man.push('<p class="error">' + error + '</p>');
            }

            return false;
        }


        if (!error && (odf_data.all_odf_from_db[odf_name]['data'] !== undefined)) {
            odfs[odf_name] = odf_data.all_odf_from_db[odf_name]; // build odf collection
        }

        //console.info('exiting ' + index + '\'th odf div, id:' + odf_div_id);
    });
    if (error) {
        return false;
    } else {
        console.log('built odf collection is:');
        console.dir(odfs);
        console.groupEnd();
        return odfs;
    }
}






function apply_db_odf_to_target(odf_name, target_div_id, dont_check_other_client_ports) {
    console.group('applying a odf');
    if (odf_name && !is_string(odf_name)) {
        console.error('invalid data type for odf name, string expected but got:' + typeof(odf_name));
        return false;
    }
    if (target_div_id && !is_string(target_div_id)) {
        console.error('invalid data type, string expected but got:' + typeof(target_div_id));
        return false;
    }

    if (!target_div_id) {
        if (odf_data.all_odf_from_db[odf_name]['div_id'] !== undefined) {
            target_div_id = odf_data.all_odf_from_db[odf_name]['div_id'];
        } else {
            console.error('Error, no target div id');
            return false;
        }
    }
    var div_selector = 'div#'+target_div_id;
    $(div_selector).find('.odf_name').val(odf_name);//select odf name

    if (odf_name && (odf_data.all_odf_from_db[odf_name] !== undefined) ) {
        var data = odf_data.all_odf_from_db[odf_name]['data'];
        $.each(data, function(tray, db_tray_obj) { // each tray
            if (odf_data.all_odf_from_db[odf_name]['data'][tray]) {
                //db_tray_obj is actually odf_data.all_odf_from_db[odf_name]['data'][tray];
                $(div_selector).find('span.odf_tray_ports').each(function() { // looping over a tray port collection
                    if ($(this).find('span.tray_span [name*="tray"]').val().toLowerCase() == tray.toLowerCase()) { // right this tray
                        $(this).find('span.tray_span [name*="tray"]').prop('checked', true);
                        $(this).find('span.ports_span [name*="odf_port"]').each(function() { // each port
                            var port = $(this).val();
                            if (db_tray_obj[port] !== undefined && db_tray_obj[port]) { //this port exists
                                if (db_tray_obj[port]['client_name'] !== undefined || db_tray_obj[port]['client_id'] !== undefined) {
                                    var db_client_name = db_tray_obj[port]['client_name'];
                                    var db_client_id = db_tray_obj[port]['client_id'];
                                    if (!db_client_name) {
                                        db_client_name = '<span class="error">Error getting name</span>';
                                    }
                                    if (!db_client_id) {
                                        db_client_id = '<span class="error">Error getting id</span>';
                                    }
                                    if (client_id && (client_id == db_client_id)) { //style for this client port
                                        $(this).prop('checked', true);
                                        $(this).css(s_style.this_client_port_css);
                                    } else {
										if ( db_client_id == 'to' || db_client_id == 'from' ) { //odf cross link
											$(this).css(s_style.odf_cross_link_css);
										} else { //other client port
											if ( dont_check_other_client_ports !== true ) {
												//check other clients ports(probably odf mapping form)
												if ($(this).is(':disabled')) {
													$(this).prop('disabled', false);
												}
												if (!$(this).is(':checked')) {
													$(this).prop('checked', true);
												}
												$(this).css(s_style.other_client_port_css);

											} else { // donot check other client ports, disable them
												if ($(this).is(':checked')) {
													$(this).prop('checked', false);
												}
												$(this).prop('disabled', true);
												$(this).css(s_style.other_client_port_css);
											}
										}
                                    }
                                    console.log(target_div_id);
                                    if ( target_div_id == 'odf_ports_mapping' ) { //for odf mapping window, push client info
                                        if ( $(this).siblings().length == 0 ) { // prevent duplicate info
                                            $(this).parent().append('<div id="port_client_id">client id: '+db_client_id+'</div><div id="port_client_name">client name: '+db_client_name+'</div>');
                                        }
                                    }
                                } else {
                                    if ($(this).is(':checked')) {
                                        $(this).prop('checked', false);
                                    }
                                    db_tray_obj[port] = undefined;
                                    $(this).css(s_style.error_ports_css);
                                }
                            }
                        });
                    }
                });
            }
        });
    }
}
function apply_all_odf_for_this_client() {
    var odfs = {};
    $.each(odf_data.this_client_odf_names, function(index, value) { // looping over each of this clients odfs
        var odf_name = value;
        if (odf_data.all_odf_from_db[odf_name] && is_object(odf_data.all_odf_from_db[odf_name])) { // in case
            if (odf_data.all_odf_from_db[odf_name]['div_id'] !== undefined) {
                var odf_div_id = odf_data.all_odf_from_db[odf_name]['div_id'];
                if (odf_div_id == "con_details_nttn_odf_details") {
                    var target_div_id = odf_div_id;
                } else {
                    var target_div_id = add_odf();
                }
                apply_db_odf_to_target(odf_name, target_div_id, true);
            }
        }
    });
}
function odf_has_client(odf, client) { // odf_object or odf_name, client id or name
    if (is_string(client)) {
        var client_found = false;
        if (is_string(odf)) { //string passed, probably odf name
            if (odf_data.all_odf_from_db[odf] && is_object(odf_data.all_odf_from_db[odf])) { //assumption right
                client_found = odf_has_client(odf_data.all_odf_from_db[odf], client);
                if ( got == true ) {
                    return true;
                }
            } else { // probably json string
                try {
                    var json_obj = JSON.parse(odf);
                } catch (Err) { // syntax error, means no valid json
                    json_obj = null;
                    return false;
                }
                if (json_obj && is_object(json_obj)) {
                    client_found = odf_has_client(json_obj, client);
                    if ( client_found == true ) {
                        return true;
                    }
                } else {
                    return false;
                }
            }

        } else if (is_object(odf)) {
            for (var property in odf) {
                if (odf.hasOwnProperty(property)) {
                    if (is_object(odf[property])) {
                        client_found = odf_has_client(odf[property], client);
                        if ( client_found == true ) {
                            return true;
                        }
                    } else if (is_string(odf[property])) {
                        if (odf[property] == client) {
                            client_found = true;
                            return true;
                        }
                    }
                }
            }
            if (!client_found) {
                return false;
            }
        } else { //we are not accepting more
            return false;
        }
    } else {
        return false;
    }
}



//build an array of added odf (added by add odf button)
function get_added_odf_names() {
    console.group('building added odf names array');
    var names = [];
    if (is_object(odf_data.all_odf_from_db)) {
        for (var name in odf_data.all_odf_from_db) {
            if (name && (odf_data.all_odf_from_db[name]['div_id'] !== undefined) && (odf_data.all_odf_from_db[name]['div_id'] != 'con_details_nttn_odf_details')) {
                names.push(name);
            }
        }
    } else {
        console.error('odf_data.all_odf_from_db is not an object');
        return false;
    }
    console.groupEnd();
    return names;
}



//in the all odf object
function odf_name_exist(name) {
    if (is_array(odf_data.realtime_odf_names)) {
        if (odf_data.realtime_odf_names.indexOf(name) === -1) {
            return false;
        } else {
            return true;
        }
    } else {
        console.error('odf_data.realtime_odf_names is not an array');
        return false;
    }
}

//if just odf name exists but no odf in the collection then the port is considered not available
function odf_port_is_available(odf_name, tray, port) {
	tray = tray.toLowerCase();
	if ( odf_name_exist(odf_name) ) {
		if ( odf_data.all_odf_from_db[odf_name] === undefined ) {
			return false;
		} else if ( odf_data.all_odf_from_db[odf_name]['data'][tray] === undefined ) {
			return true;
		} else if ( odf_data.all_odf_from_db[odf_name]['data'][tray][port] === undefined ) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}


$('div#added_odf').on('change', 'select[name="odf_name"]', function(event) {
    console.log('odf name change');

    var odf_name = $(event.target).val();
    var odf_div_id = $(event.target).closest('div.odf_details').attr('id');
    reset_all_tray_ports(odf_div_id);
    if (odf_name) {
        apply_db_odf_to_target(odf_name, odf_div_id, true);
    }
});




//add new odf name to options and applying that name to all added odfs except if any odf has name selected(DOM property selected)
$('div#connectivity_details').on('click', 'button[name="add_new_odf_name"]', function(event) {
    console.log('add odf button clicked');
    var new_name = prompt('Insert New Name:', '');
    if (new_name && (new_name.length > 1)) {
        //new_val = new_name.replace(' ', '_');
        new_val = new_name.replace('&', ' ');
        if (!odf_name_exist(new_val)) {
            if (is_array(odf_data.realtime_odf_names)) {
                odf_data.realtime_odf_names.push(new_val);
                var new_op = '<option value="' + new_val + '">' + new_name + '</option>';
                var names_dropdown_html = $(event.target).closest('tr.odf_data_tr').find('select.odf_name').html(); //already existing options
                var final_dropdown_html = names_dropdown_html + new_op;
                //now pushing the new name to each odf name dropdowns
                $('div#added_odf div.odf_details select.odf_name').each(function() {
                    //$(this).html(final_dropdown);
                    $(this).append(new_op); //append new option
                    console.info('new odf name added');
                    $(this).css('width', '100px'); //prevent unexpected width grow
                });
            } else {
                console.error('odf_data.realtime_odf_names is not an array');
                notf_man.push('<p class="error">cannot insert odf names, data type error</p>');
            }
        } else {
            notf_man.push('<p class="error">odf name already exists</p>');
        }
    }
});
//if any tray unchecked, uncheck the ports of that tray
$('div#connectivity_details').on('click', 'span.tray_span [type="checkbox"]', function(tray_click) {
    if (!$(tray_click.target).is(':checked')) {
        var tray = $(tray_click.target).val();
        var odf_name = $(tray_click.target).closest('tr').find('[name="odf_name"]').val();
        var odf_div_id = $(tray_click.target).closest('div.odf_details').attr('id');
        $(tray_click.target).closest('span.odf_tray_ports').find('span.ports_span input[type="checkbox"]:checked').each(function() {
            var port = $(this).val();
            if (odf_data.all_odf_from_db[odf_name]['data'][tray][port] !== undefined) {
                if (odf_data.all_odf_from_db[odf_name]['data'][tray][port]['client_id'] == client_id) {
                    $(this).prop('checked', false);
                    odf_data.all_odf_from_db[odf_name]['data'][tray][port] = undefined;
                    $(this).css(s_style.port_css_undo);
                }
            }
        });
    }
});

//if any port clicked
$('div#connectivity_details').on('click', 'span.ports_span [type="checkbox"]', function(port_click_event) {
    if (client_id) {
        port_click_event.stopPropagation();
        var error = '';
        var port_checked = $(port_click_event.target).is(':checked');
        var port_unchecked = port_checked ? false : true;
        var port = $(port_click_event.target).val();
        var tray_element = $(port_click_event.target).closest('span.odf_tray_ports').find('span.tray_span input[type="checkbox"]');
        var tray = tray_element.val().toLowerCase();
        var odf_name = $(port_click_event.target).closest('tr.odf_data_tr').find('[name="odf_name"]').val();
		var cross_odf_name = null;
		var cross_odf_tray = null;
		var cross_odf_port = null;
        var odf_div_id = $(port_click_event.target).closest('div.odf_details').attr('id');


        if (port_checked && !odf_name) {
            error += ' odf name empty ';
            console.error(error);
            notf_man.push('<p class="error">' + error + '</p>');
            return false; // preventDefault() and stopPropagation() at once
        }
		
        if (!error && port_checked) {
			//define necessary objects if undefined
			if ((odf_data.all_odf_from_db[odf_name] === undefined) || (odf_data.all_odf_from_db[odf_name]['data'] === undefined)) {
				odf_data.all_odf_from_db[odf_name] = {'data': {}, 'div_id': odf_div_id};
				odf_data.all_odf_from_db[odf_name]['data'][tray] = {};
				odf_data.all_odf_from_db[odf_name]['data'][tray][port] = {};
			} else if ( odf_data.all_odf_from_db[odf_name]['data'][tray] === undefined ) {
				odf_data.all_odf_from_db[odf_name]['data'][tray] = {};
			} else if ( odf_data.all_odf_from_db[odf_name]['data'][tray][port] === undefined ) {
				odf_data.all_odf_from_db[odf_name]['data'][tray][port] = {};
			}
			
			var cross_odf = window.confirm("forwarded to another ODF ?");
			if (cross_odf==true) { // odf cross link
				var odf_names_select = '<select name="assign_to_odf"><option value="">Select an ODF name</option>';
				odf_names_select += create_odf_names_select() + '</select>';
				$('div#select_odf').html(odf_names_select);
				var tray_html = '&nbsp;&nbsp;&nbsp;&nbsp; Tray: <select name="cross_odf_tray">\
				<option value="">select a tray</option>\
				<option value="A">A</option>\
				<option value="B">B</option>\
				<option value="C">C</option>\
				<option value="D">D</option>\
				</select>\
				';
				var port_html = '&nbsp;&nbsp;&nbsp;&nbsp; Port:<select name="cross_odf_port">\
				<option value="">select a port</option>\
				<option value="1">1</option>\
				<option value="2">2</option>\
				<option value="3">3</option>\
				<option value="4">4</option>\
				<option value="5">5</option>\
				<option value="6">6</option>\
				<option value="7">7</option>\
				<option value="8">8</option>\
				<option value="9">9</option>\
				<option value="10">10</option>\
				<option value="11">11</option>\
				<option value="12">12</option>\
				';
				
				$('div#select_odf').append(tray_html);
				$('div#select_odf').append(port_html);
				//hide the tray and port for now
				$('select[name="cross_odf_tray"]').hide();
				$('select[name="cross_odf_port"]').hide();
				
				$('div#select_odf').dialog({
					autoOpen: false,
					modal: true,
					draggable: true,
					closeOnEscape: true,
					buttons: [
						{
							id: "button_ok",
							text: "OK",
							click: function() {
								$(this).dialog("close");
							}
						}
					],
					title: 'select an odf name',
					show: 'slow',
					hide: 'slow',
					resizable: true,
					maxWidth: 800,
					width: 'auto',
					height: 'auto'
				});
				$('div#select_odf').dialog('open');
				
				$('select[name="assign_to_odf"]').on("change", function(cross_odf_select_event) {
					cross_odf_name = $('select[name="assign_to_odf"]').val();
					if ( odf_name == cross_odf_name ) { // selected cross odf name is same as main odf name
						cross_odf_name = null;
						alert('odf name is same as current, select a diffferent odf');
						$('select[name="assign_to_odf"]').val('');
					} else {
						$('select[name="cross_odf_tray"]').show();
						$('select[name="cross_odf_port"]').show();
					}
					cross_odf_select_event.stopPropagation();
				});
				
				$('select[name="cross_odf_port"]').on("change", function(cross_odf_port_change) {
					console.info('cross odf port change');
					cross_odf_tray = $('select[name="cross_odf_tray"]').val().toLowerCase();
					cross_odf_port = $('select[name="cross_odf_port"]').val();
					if ( !cross_odf_name ) {
						alert('select an odf name first');
						$('select[name="cross_odf_port"]').val('');
					}
					if ( !cross_odf_tray ) { //tray value not acceptable
						alert('select a tray first');
						$('select[name="cross_odf_port"]').val('');
					}
					if ( cross_odf_name && cross_odf_tray && cross_odf_port ) { //everything okay
						if ( !odf_port_is_available(cross_odf_name, cross_odf_tray, cross_odf_port) ) {
							alert('this port is not available');
							$('select[name="cross_odf_port"]').val('');
							cross_odf_port = null;
						} else { //port is available, so make an odf cross link
							$('#button_ok').on("click", function() { //only when ok button is pressed
								if ( (odf_data.all_odf_from_db[cross_odf_name] === undefined) || (odf_data.all_odf_from_db[cross_odf_name]['data'] === undefined) ) {
									odf_data.all_odf_from_db[cross_odf_name] = {'data': {}, 'div_id': odf_div_id};
									odf_data.all_odf_from_db[cross_odf_name]['data'][cross_odf_tray] = {};
									odf_data.all_odf_from_db[cross_odf_name]['data'][cross_odf_tray][cross_odf_port] = {};
								}
								if ( odf_data.all_odf_from_db[cross_odf_name]['data'][cross_odf_tray] === undefined ) {
									odf_data.all_odf_from_db[cross_odf_name]['data'][cross_odf_tray] = {};
								}
								if ( odf_data.all_odf_from_db[cross_odf_name]['data'][cross_odf_tray][cross_odf_port] === undefined ) {
									odf_data.all_odf_from_db[cross_odf_name]['data'][cross_odf_tray][cross_odf_port] = {};
								}
								odf_data.all_odf_from_db[cross_odf_name]['data'][cross_odf_tray][cross_odf_port]['client_id'] = 'to';
								odf_data.all_odf_from_db[cross_odf_name]['data'][cross_odf_tray][cross_odf_port]['client_name'] = odf_name;
								$(port_click_event.target).css(s_style.odf_cross_link_css);
								
								odf_data.all_odf_from_db[odf_name]['data'][tray][port]['client_id'] = 'from';
								odf_data.all_odf_from_db[odf_name]['data'][tray][port]['client_name'] = cross_odf_name;
								
								//now we need to restyle the port on the fly
								var recolor_target = odf_data.all_odf_from_db[cross_odf_name]['div_id'];
								var target_selector = 'div#' + recolor_target + ' [name="tray_' + cross_odf_tray + '"]';
								console.info($(target_selector).next());
								$(target_selector).next().css(s_style.odf_cross_link_css);
							});
						}
					}
					cross_odf_port_change.stopPropagation();
				});
			} else { // no odf cross link
				if ((odf_data.all_odf_from_db[odf_name]['data'][tray][port]['client_id'] !== undefined) || (odf_data.all_odf_from_db[odf_name]['data'][tray][port]['client_name'] !== undefined)) { // if there is an entry
					var assigned_client_id = odf_data.all_odf_from_db[odf_name]['data'][tray][port]['client_id'];
					if (!assigned_client_id) {
						assigned_client_id = 'Error fetching';
					}
					var assigned_client_name = odf_data.all_odf_from_db[odf_name]['data'][tray][port]['client_name'];
					if (!assigned_client_name) {
						assigned_client_name = 'Error fetching';
					}
					if (assigned_client_id != client_id) {
						error += 'port already assigned to another client:' + assigned_client_name;
						console.info(error);
						notf_man.push('<p class="error">Error: ' + error + '</p>');
						return false; //prevent default, stop propagation at once
					} else {
						odf_data.all_odf_from_db[odf_name]['data'][tray][port]['client_id'] = client_id;
						odf_data.all_odf_from_db[odf_name]['data'][tray][port]['client_name'] = client_name;
						$(port_click_event.target).css(s_style.this_client_port_css);
						/*
						if (!tray_element.is(':checked')) {
							tray_element.prop('checked', true);
						} */
					}
				} else { //no client id and client name defined
					odf_data.all_odf_from_db[odf_name]['data'][tray][port]['client_id'] = client_id;
					odf_data.all_odf_from_db[odf_name]['data'][tray][port]['client_name'] = client_name;
					$(port_click_event.target).css(s_style.this_client_port_css);
				}
			}
        } else if (port_unchecked) {
            if (odf_data.all_odf_from_db[odf_name]['data'][tray][port]) {
                odf_data.all_odf_from_db[odf_name]['data'][tray][port] = undefined;
                $(port_click_event.target).css(s_style.port_css_undo);
            }
        }
        console.debug('global odf object:');
        console.dir(odf_data.all_odf_from_db);
        if (error) {
            return false;
        }
    } else {
        notf_man.push('<p class="error">Not valid client id</p>');
        port_click_event.preventDefault();
    }
});


//uncheck all tray and ports under a div id
function reset_all_tray_ports(div_id) {
    console.log('resettting all tray and ports ');
    if (!is_string(div_id)) {
        console.error('invalid argument passed to reset all tray and ports, should be string');
        return false;
    }
    var div_selector = 'div#'+div_id;
    $(div_selector).find('[type="checkbox"]').each(function() {
        $(this).prop('checked', false);
        $(this).prop('disabled', false);
        $(this).siblings().remove(); //remove client info divs
        $(this).css(s_style.port_css_undo);
    });
}



//odf ports mapping dialogue box and interactions
$('div#odf_mapping').dialog({
    autoOpen: false,
    modal: true,
    draggable: true,
    closeOnEscape: true,
    title: 'odf ports mapping',
    show: 'slow',
    hide: 'slow',
    resizable: true,
    maxWidth: 1200,
    width: 1080,
    height: 'auto'
});
$('div#show_port_mapping').click(function(event) {
    console.info('showing odf port mapping modal window');
    $('div#odf_mapping').empty();
    var target_div_id = add_odf('odf_mapping'); //pushing html to the specified container
    var div_selector = 'div#'+target_div_id;
    var odf_name = $(div_selector).find('select.odf_name').val();
    if ( odf_name ) {
        apply_db_odf_to_target(odf_name, target_div_id);
    }
    $('div#odf_mapping').dialog('open');
});
//if odf name changed then apply the new odf if presents
$('div#odf_mapping').on('change', 'select[name="odf_name"]', function(event) {
    var odf_name = $(event.target).val();
    var odf_div = $(event.target).closest('div'); //div#odf_ports_mapping
    var odf_div_id = odf_div.attr('id');

    reset_all_tray_ports(odf_div_id);
    if (odf_name && (odf_data.all_odf_from_db[odf_name] !== undefined) ) {

        apply_db_odf_to_target(odf_name, odf_div_id);

    }
});
//if anything tray/port checked
$('div#odf_mapping').on('click', '[type="checkbox"]', function(event) {
    event.stopPropagation();
    var odf_name = $(event.target).closest('tr.odf_data_tr').find('select.odf_name').val();
    if (odf_name) {
        
        if ($(event.target).is(':checked')) { //user cannot explicitly check anything
            event.preventDefault();
            
        } else { //unchecked
            
            if ( $(event.target).closest('span').attr('class') == 'tray_span' ) { //if it is a tray
                var tray = $(event.target).val();
                
                if ($(event.target).closest('span.odf_tray_ports').find('[name*="odf_port"]:checked').length > 0) { // have ports checked
                    event.preventDefault();
                } else { // tray has no ports checked
                    if (odf_data.all_odf_from_db_has_tray(odf_name, tray)) { // tray has an entry
                        odf_data.all_odf_from_db[odf_name]['data'][tray.toLowerCase()] = undefined;
                    }
                }
            } else { // not tray, so it is a port
                var port = $(event.target).val();
                var tray = $(event.target).closest('td').find('span.tray_span [name*="tray"]').val();
                if (odf_data.all_odf_from_db[odf_name]['data'][tray.toLowerCase()][port] !== undefined) { // remove the entry
                    odf_data.all_odf_from_db[odf_name]['data'][tray.toLowerCase()][port] = undefined;
                }
                $(event.target).css(s_style.port_css_undo);
                $(event.target).parent().find('div').text(''); //empty the box of client info
            }
        }
    } else {
        if ($(event.target).is(':checked')) { //user cannot explicitly check anything
            event.preventDefault();
        }
    }

});
//END odf ports mapping section




function save_services(save_and_continue, call_back_on_success) {
    var error = 0;
    var service = $('select[name="add_services"]').val();
    if (!service) {
        $('select[name="add_services"]').css(s_style.error_field_css);
        error++;
    } else
        $('select[name="add_services"]').css(s_style.undo_error_field_css);
    var dataString = '';
    if (service === 'ip_bw') {
        if (!$('input[name="ip_bw_amount"]').val()) {
            $('input[name="ip_bw_amount"]').addClass('s_style.error_field_css');
            error++;
        } else
            $('input[name="ip_bw_amount"]').removeClass('s_style.error_field_css');
        if (!$('select[name="ip_bw_unit"]').val()) {
            $('select[name="ip_bw_unit"]').addClass('s_style.error_field_css');
            error++;
        } else
            $('select[name="ip_bw_unit"]').removeClass('s_style.error_field_css');
        if (!$('input[name="ip_bw_1asiaahl_end_ip"]').val()) {
            $('input[name="ip_bw_1asiaahl_end_ip"]').css(s_style.error_field_css);
            error++;
        } else
            $('input[name="ip_bw_1asiaahl_end_ip"]').css(s_style.undo_error_field_css);
        if (!$('input[name="ip_bw_client_end_ip"]').val()) {
            $('input[name="ip_bw_client_end_ip"]').css(s_style.error_field_css);
            error++;
        } else
            $('input[name="ip_bw_client_end_ip"]').css(s_style.undo_error_field_css);
        var dataString = 'submit=add_service&service=' + service + '&client_id=' + client_id + '&scp_staff_id=' + scp_staff_id + '&' + $('form#ip_bw_data').serialize();
    } else if (service === 'ip_transit') {
        if (!$('input[name="ip_transit_amount"]').val()) {
            $('input[name="ip_transit_amount"]').addClass('s_style.error_field_css');
            error++;
        } else
            $('input[name="ip_transit_amount"]').removeClass('s_style.error_field_css');
        if (!$('select[name="ip_transit_amount_unit"]').val()) {
            $('select[name="ip_transit_amount_unit"]').addClass('s_style.error_field_css');
            error++;
        } else
            $('select[name="ip_transit_amount_unit"]').removeClass('s_style.error_field_css');
        if (!$('input[name="ip_transit_1asiaahl_end_ip"]').val()) {
            $('input[name="ip_transit_1asiaahl_end_ip"]').addClass('s_style.error_field_css');
            error++;
        } else
            $('input[name="ip_transit_1asiaahl_end_ip"]').removeClass('s_style.error_field_css');
        if (!$('input[name="ip_transit_client_end_ip"]').val()) {
            $('input[name="ip_transit_client_end_ip"]').addClass('s_style.error_field_css');
            error++;
        } else
            $('input[name="ip_transit_client_end_ip"]').removeClass('s_style.error_field_css');
        if (!$('input[name="ip_transit_prefix"]').val()) {
            $('input[name="ip_transit_prefix"]').addClass('s_style.error_field_css');
            error++;
        } else
            $('input[name="ip_transit_prefix"]').removeClass('s_style.error_field_css');
        var dataString = 'submit=add_service&service=' + service + '&client_id=' + client_id + '&scp_staff_id=' + scp_staff_id + '&' + $('form#ip_transit_data').serialize();
    } else if (service === 'iplc') {
        if (!$('select[name="iplc_fields_level"]').val()) {
            $('select[name="iplc_fields_level"]').addClass('s_style.error_field_css');
            error++;
        } else
            $('select[name="iplc_fields_level"]').removeClass('s_style.error_field_css');
        if (!$('input[name="iplc_fields_amount"]').val()) {
            $('input[name="iplc_fields_amount"]').addClass('s_style.error_field_css');
            error++;
        } else
            $('input[name="iplc_fields_amount"]').removeClass('s_style.error_field_css');
        if (!$('select[name="iplc_fields_circuit_type"]').val()) {
            $('select[name="iplc_fields_circuit_type"]').addClass('s_style.error_field_css');
            error++;
        } else
            $('select[name="iplc_fields_circuit_type"]').removeClass('s_style.error_field_css');
        $('input[name="iplc_fields_total"]').click(function() {
            $('input[name="iplc_fields_total"]').val(iplc_level * iplc_amount);
        });
        var dataString = 'submit=add_service&service=' + service + '&client_id=' + client_id + '&scp_staff_id=' + scp_staff_id + '&' + $('form#iplc_data').serialize();
    } else if (service === 'mpls') {
        if (!$('select[name="mpls_fields_primary_circuit_level"]').val()) {
            $('select[name="mpls_fields_primary_circuit_level"]').addClass("s_style.error_field_css");
            error++;
        }
        else
            $('select[name="mpls_fields_primary_circuit_level"]').removeClass("s_style.error_field_css");
        if (!$('input[name="mpls_fields_primary_circuit_amount"]').val()) {
            $('input[name="mpls_fields_primary_circuit_amount"]').addClass("s_style.error_field_css");
            error++;
        }
        else
            $('input[name="mpls_fields_primary_circuit_amount"]').removeClass("s_style.error_field_css");
        if (!$('select[name="mpls_fields_primary_circuit_type"]').val()) {
            $('select[name="mpls_fields_primary_circuit_type"]').addClass("s_style.error_field_css");
            error++;
        }
        else
            $('select[name="mpls_fields_primary_circuit_type"]').removeClass("s_style.error_field_css");
        if (!$('select[name="mpls_fields_secondary_circuit_level"]').val()) {
            $('select[name="mpls_fields_secondary_circuit_level"]').addClass("s_style.error_field_css");
            error++;
        }
        else
            $('select[name="mpls_fields_secondary_circuit_level"]').removeClass("s_style.error_field_css");
        if (!$('input[name="mpls_fields_secondary_circuit_amount"]').val()) {
            $('input[name="mpls_fields_secondary_circuit_amount"]').addClass("s_style.error_field_css");
            error++;
        }
        else
            $('input[name="mpls_fields_secondary_circuit_amount"]').removeClass("s_style.error_field_css");
        if (!$('select[name="mpls_fields_secondary_circuit_type"]').val()) {
            $('select[name="mpls_fields_secondary_circuit_type"]').addClass("s_style.error_field_css");
            error++;
        }
        else
            $('select[name="mpls_fields_secondary_circuit_type"]').removeClass("s_style.error_field_css");
        if (!$('select[name="mpls_fields_tertiary_circuit_level"]').val()) {
            $('select[name="mpls_fields_tertiary_circuit_level"]').addClass("s_style.error_field_css");
            error++;
        }
        else
            $('select[name="mpls_fields_tertiary_circuit_level"]').removeClass("s_style.error_field_css");
        if (!$('input[name="mpls_fields_tertiary_circuit_amount"]').val()) {
            $('input[name="mpls_fields_tertiary_circuit_amount"]').addClass("s_style.error_field_css");
            error++;
        }
        else
            $('input[name="mpls_fields_tertiary_circuit_amount"]').removeClass("s_style.error_field_css");
        if (!$('select[name="mpls_fields_tertiary_circuit_type"]').val()) {
            $('select[name="mpls_fields_tertiary_circuit_type"]').addClass("s_style.error_field_css");
            error++;
        }
        else {
            $('select[name="mpls_fields_tertiary_circuit_type"]').removeClass("s_style.error_field_css");
        }
        var dataString = 'submit=add_service&service=' + service + '&client_id=' + client_id + '&scp_staff_id=' + scp_staff_id + '&' + $('form#mpls_data').serialize();
    }

    if (error > 0) {
        console.log('form fields error, cancelled for submit');
        alert('fill required fields first');
    } else {
        $.ajax({
            type: "POST",
            url: "./add_services.php",
            data: dataString + '&service_id=' + service_id,
            async: true,
            cache: false,
            beforeSend: function() {
                console.group('ajax request');
                notf_man.push('<br><span class="msg">saving connection details ...</span>');
                notf_man.operation('loading');
                notf_man.operation('disable');
            },
            success: function(data, textStatus, jqXHR) {
                console.group('server response on ajax success');
                console.debug('data:' + data + ', textStatus:' + textStatus);
                switch (data) {
                    case 1:
                    case "1":
                        console.info('data saved successfully');
                        notf_man.push('<span class="success"> saved</span>');
                        if (call_back_on_success) {
                            call_back_on_success();
                        }

                        if (save_and_continue === true) {
                            $('div#add_services').fadeTo(2000, 0, function() {
                                $('div#add_services').css('display', 'none');
                                $('div#connectivity_details').css('display', 'block');
                            });
                        }
                        break;
                    default:
                        console.error('failed to save');
                        notf_man.push('<span class="error"> failed to save. error is: ' + data + '</span>');
                }
                console.groupEnd();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('ajax processing failed');
                notf_man.push('<span class="error">Error</span>');
            }
        }).always(function() {
            console.groupEnd();
            notf_man.operation('reset');
        });
    }
}

$('button[name="add_service_submit"]').click(function() {
    save_services(false);
});
$('button[name="add_service_submit_and_continue"]').click(function() {
    save_services(true);
});

//select list html code generator with odf names
function create_odf_names_select() {
	var names_array = odf_data.realtime_odf_names;
    var options_html = '';
    for (var i = 0; i < names_array.length; i++) {
        options_html = options_html + '<option value="' + names_array[i] + '">' + (names_array[i] ? names_array[i] : 'Select an odf name') + '</option>';
    }
	return options_html;
}

function add_odf(container) {
    if (!container || (typeof(container) !== "string")) {
        container = 'added_odf';
    }

    var title = '';
    if (container === 'added_odf') {
        title = 'ADDED ODF ' + odf_data.added_odfs_total;
    } else if (container === 'odf_mapping') {
        title = 'ODF PORTS MAPPING VIEW';
    }

    var names_array = odf_data.realtime_odf_names;
    var options_html = '';
    for (var i = 0; i < names_array.length; i++) {
        options_html = options_html + '<option value="' + names_array[i] + '">' + (names_array[i] ? names_array[i] : 'Select an odf name') + '</option>';
    }

    odf_data.added_odfs_total++;
    var node = document.createElement('div');
    var add_odf_button = '';
    if (container === 'added_odf') {
        add_odf_button = '<button type="button" name="add_new_odf_name">add new odf name</button>';
        var id_name = 'added_odf_' + odf_data.added_odfs_total;
        node.setAttribute('id', id_name);
        node.setAttribute('class', 'odf_details');
    } else if (container === 'odf_mapping') {
        var id_name = 'odf_ports_mapping';
        node.setAttribute('id', id_name);
    }

    var html = '<span class="hidden_id"></span> \
            <br />\
            <span class="msg">' + title + '</span> \
            <table> \
                <tr> \
                    <th></th> \
                    <th>Tray and Ports</th> \
                </tr> \
                <tr class="odf_data_tr"> \
                    <td class="odf_name_td"><p>ODF Name:</p>\
                    <select class="odf_name" name="odf_name">\
                    ' + options_html + '\
                    </select>\
                    ' + add_odf_button + '\
                    </td> \
                    <td class="odf_tray_ports_td" align="center" >\
                                    <span id="tray_a" class="odf_tray_ports">\
                                        <span class="tray_span">Tray A<input type="checkbox" name="tray_a" value="a">\
                                        </span>\
                                        <span class="ports_span">\
                                                <span>port 1<input type="checkbox" name="odf_port_a" value="1" /></span>\
                                                <span>port 2<input type="checkbox" name="odf_port_a" value="2" /></span>\
                                                <span>port 3<input type="checkbox" name="odf_port_a" value="3" /></span>\
                                                <span>port 4<input type="checkbox" name="odf_port_a" value="4" /></span>\
                                                <span>port 5<input type="checkbox" name="odf_port_a" value="5" /></span>\
                                                <span>port 6<input type="checkbox" name="odf_port_a" value="6" /></span>\
                                                <span>port 7<input type="checkbox" name="odf_port_a" value="7" /></span>\
                                                <span>port 8<input type="checkbox" name="odf_port_a" value="8" /></span>\
                                                <span>port 9<input type="checkbox" name="odf_port_a" value="9" /></span>\
                                                <span>port 10<input type="checkbox" name="odf_port_a" value="10" /></span>\
                                                <span>port 11<input type="checkbox" name="odf_port_a" value="11" /></span>\
                                                <span>port 12<input type="checkbox" name="odf_port_a" value="12" /></span>\
                                        </span>\
                                    </span>\
                                    <span id="tray_b" class="odf_tray_ports">\
                                        <span class="tray_span">Tray B<input type="checkbox" name="tray_b" value="b">\
                                        </span>\
                                        <span class="ports_span">\
                                                <span>port 1<input type="checkbox" name="odf_port_b" value="1" /></span>\
                                                <span>port 2<input type="checkbox" name="odf_port_b" value="2" /></span>\
                                                <span>port 3<input type="checkbox" name="odf_port_b" value="3" /></span>\
                                                <span>port 4<input type="checkbox" name="odf_port_b" value="4" /></span>\
                                                <span>port 5<input type="checkbox" name="odf_port_b" value="5" /></span>\
                                                <span>port 6<input type="checkbox" name="odf_port_b" value="6" /></span>\
                                                <span>port 7<input type="checkbox" name="odf_port_b" value="7" /></span>\
                                                <span>port 8<input type="checkbox" name="odf_port_b" value="8" /></span>\
                                                <span>port 9<input type="checkbox" name="odf_port_b" value="9" /></span>\
                                                <span>port 10<input type="checkbox" name="odf_port_b" value="10" /></span>\
                                                <span>port 11<input type="checkbox" name="odf_port_b" value="11" /></span>\
                                                <span>port 12<input type="checkbox" name="odf_port_b" value="12" /></span>\
                                        </span>\
                                    </span>\
                                    <span id="tray_c" class="odf_tray_ports">\
                                        <span class="tray_span">Tray C<input type="checkbox" name="tray_c" value="c">\
                                        </span>\
                                        <span class="ports_span">\
                                                <span>port 1<input type="checkbox" name="odf_port_c" value="1" /></span>\
                                                <span>port 2<input type="checkbox" name="odf_port_c" value="2" /></span>\
                                                <span>port 3<input type="checkbox" name="odf_port_c" value="3" /></span>\
                                                <span>port 4<input type="checkbox" name="odf_port_c" value="4" /></span>\
                                                <span>port 5<input type="checkbox" name="odf_port_c" value="5" /></span>\
                                                <span>port 6<input type="checkbox" name="odf_port_c" value="6" /></span>\
                                                <span>port 7<input type="checkbox" name="odf_port_c" value="7" /></span>\
                                                <span>port 8<input type="checkbox" name="odf_port_c" value="8" /></span>\
                                                <span>port 9<input type="checkbox" name="odf_port_c" value="9" /></span>\
                                                <span>port 10<input type="checkbox" name="odf_port_c" value="10" /></span>\
                                                <span>port 11<input type="checkbox" name="odf_port_c" value="11" /></span>\
                                                <span>port 12<input type="checkbox" name="odf_port_c" value="12" /></span>\
                                        </span>\
                                    </span>\
                                    <span id="tray_d" class="odf_tray_ports">\
                                        <span class="tray_span">Tray D<input type="checkbox" name="tray_d" value="d">\
                                        </span>\
                                        <span class="ports_span">\
                                                <span>port 1<input type="checkbox" name="odf_port_d" value="1" /></span>\
                                                <span>port 2<input type="checkbox" name="odf_port_d" value="2" /></span>\
                                                <span>port 3<input type="checkbox" name="odf_port_d" value="3" /></span>\
                                                <span>port 4<input type="checkbox" name="odf_port_d" value="4" /></span>\
                                                <span>port 5<input type="checkbox" name="odf_port_d" value="5" /></span>\
                                                <span>port 6<input type="checkbox" name="odf_port_d" value="6" /></span>\
                                                <span>port 7<input type="checkbox" name="odf_port_d" value="7" /></span>\
                                                <span>port 8<input type="checkbox" name="odf_port_d" value="8" /></span>\
                                                <span>port 9<input type="checkbox" name="odf_port_d" value="9" /></span>\
                                                <span>port 10<input type="checkbox" name="odf_port_d" value="10" /></span>\
                                                <span>port 11<input type="checkbox" name="odf_port_d" value="11" /></span>\
                                                <span>port 12<input type="checkbox" name="odf_port_d" value="12" /></span>\
                                        </span>\
                                    </span>\
                                </td>\
                </tr> \
            </table> \
            ';
    node.innerHTML = html;
    document.getElementById(container).appendChild(node);
    return id_name;
}

//returns removed odf div id or false 
function remove_odf() {
    var parent_node = document.getElementById('added_odf');
    if (parent_node.hasChildNodes()) {
        var to_remove = parent_node.lastChild;
        parent_node.removeChild(to_remove);
        if (odf_data.added_odfs_total > 0) {
            odf_data.added_odfs_total--;
        }
        else if (odf_data.added_odfs_total < 0) {
            odf_data.added_odfs_total = 0;
        }
        return $(to_remove).find('div.odf_details').attr('id');
    } else {
        return false;
    }
}


function save_odf(callback_on_success) {
    var this_client_odfs = build_odf_collection();
    var json_string = JSON.stringify(this_client_odfs);
    if (json_string) {
        $.ajax({
            type: "POST",
            url: "./add_services.php",
            data: 'submit=SAVE_ODF&scp_staff=' + scp_staff_id + '&client_id=' + client_id + '&selected_odfs=' + json_string,
            async: true,
            cache: false,
            beforeSend: function() {
                console.group('ajax request to save this clients odfs:');
                notf_man.push('<br><span class="msg">wait, saving all odf ... </span>', true);
                notf_man.operation('loading');
                notf_man.operation('disable');
            },
            success: function(save_odf_report, textStatus, jqXHR) {
                //will show just the report string(data), it contains success or failure info
                notf_man.push('<span class="msg"> '+save_odf_report+'</span>');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('ajax processing failed');
                notf_man.push('<span class="error"> AJAX ERROR </span>');
            }
        }).always(function() {
            console.groupEnd();
            notf_man.operation('reset');
        });
    }
}


//add and remove odf button click
$('button[name="add_odf_button"]').click(function() {
    var target_div_id = add_odf();
    var div_selector = 'div#'+target_div_id;
    var odf_name = $(div_selector).find('select.odf_name').val();
    if ( odf_name ) {
        apply_db_odf_to_target(odf_name, target_div_id, true);
    }
});
$('button[name="remove_odf_button"]').click(function() {
    remove_odf();
});
function save_con_details(save_and_continue, callback_on_success) {
    var error = 0;
    var dataString = '';
    var local_loop = $('select[name="con_details_local_loop"]').val();
    if (!local_loop) {
        $('select[name="con_details_local_loop"]').css(s_style.error_field_css);
        error++;
    } else
        $('select[name="con_details_local_loop"]').css(s_style.undo_error_field_css);
    if (local_loop === 'nttn') {
        if (!$('select[name="con_details_local_loop_nttn_fields_nttn"]').val()) {
            $('select[name="con_details_local_loop_nttn_fields_nttn"]').css(s_style.error_field_css);
            error++;
        } else
            $('select[name="con_details_local_loop_nttn_fields_nttn"]').css(s_style.undo_error_field_css);
        if (!$('select[name="con_details_nttn_odf_circuit_type"]').val()) {
            $('select[name="con_details_nttn_odf_circuit_type"]').css(s_style.error_field_css);
            error++;
        } else
            $('select[name="con_details_nttn_odf_circuit_type"]').css(s_style.undo_error_field_css);
    } else if (local_loop === 'mixed') {
        if (!$('select[name="con_details_local_loop_mixed_fields_nttn"]').val()) {
            $('select[name="con_details_local_loop_mixed_fields_nttn"]').css(s_style.error_field_css);
            error++;
        } else
            $('select[name="con_details_local_loop_mixed_fields_nttn"]').css(s_style.undo_error_field_css);
        if (!$('input[name="con_details_local_loop_mixed_fields_nttn_point_a"]').val()) {
            $('input[name="con_details_local_loop_mixed_fields_nttn_point_a"]').css(s_style.error_field_css);
            error++;
        } else
            $('input[name="con_details_local_loop_mixed_fields_nttn_point_a"]').css(s_style.undo_error_field_css);
        if (!$('input[name="con_details_local_loop_mixed_fields_nttn_point_b"]').val()) {
            $('input[name="con_details_local_loop_mixed_fields_nttn_point_b"]').css(s_style.error_field_css);
            error++;
        } else
            $('input[name="con_details_local_loop_mixed_fields_nttn_point_b"]').css(s_style.undo_error_field_css);
        if (!$('input[name="con_details_local_loop_mixed_fields_overhead"]').val()) {
            $('input[name="con_details_local_loop_mixed_fields_overhead"]').css(s_style.error_field_css);
            error++;
        } else
            $('input[name="con_details_local_loop_mixed_fields_overhead"]').css(s_style.undo_error_field_css);
        if (!$('input[name="con_details_local_loop_mixed_fields_overhead_point_a"]').val()) {
            $('input[name="con_details_local_loop_mixed_fields_overhead_point_a"]').css(s_style.error_field_css);
            error++;
        } else
            $('input[name="con_details_local_loop_mixed_fields_overhead_point_a"]').css(s_style.undo_error_field_css);
        if (!$('input[name="con_details_local_loop_mixed_fields_overhead_point_b"]').val()) {
            $('input[name="con_details_local_loop_mixed_fields_overhead_point_b"]').css(s_style.error_field_css);
            error++;
        } else
            $('input[name="con_details_local_loop_mixed_fields_overhead_point_b"]').css(s_style.undo_error_field_css);
    }

    if ($('input[name="interface_type_router"]:checked').val()) {
        if (!$('input[name="interface_router_name"]').val()) {
            $('input[name="interface_router_name"]').css(s_style.error_field_css);
            error++;
        } else
            $('input[name="interface_router_name"]').css(s_style.undo_error_field_css);
        if (!$('input[name="interface_router_port"]').val()) {
            $('input[name="interface_router_port"]').css(s_style.error_field_css);
            error++;
        } else {
            $('input[name="interface_router_port"]').css(s_style.undo_error_field_css);
        }
    }
    if ($('input[name="interface_type_mux"]:checked').val()) {
        if (!$('input[name="interface_mux_name"]').val()) {
            $('input[name="interface_mux_name"]').css(s_style.error_field_css);
            error++;
        } else
            $('input[name="interface_mux_name"]').css(s_style.undo_error_field_css);
        if (!$('input[name="interface_mux_port"]').val()) {
            $('input[name="interface_mux_port"]').css(s_style.error_field_css);
            error++;
        } else
            $('input[name="interface_mux_port"]').css(s_style.undo_error_field_css);
    }
    if ($('input[name="interface_type_mix"]:checked').val()) {
        if (!$('input[name="interface_mixed_router_name"]').val()) {
            $('input[name="interface_mixed_router_name"]').css(s_style.error_field_css);
            error++;
        } else
            $('input[name="interface_mixed_router_name"]').css(s_style.undo_error_field_css);
        if (!$('input[name="interface_mixed_router_port"]').val()) {
            $('input[name="interface_mixed_router_port"]').css(s_style.error_field_css);
            error++;
        } else
            $('input[name="interface_mixed_router_port"]').css(s_style.error_field_css);
        if (!$('input[name="interface_mixed_mux_name"]').val()) {
            $('input[name="interface_mixed_mux_name"]').css(s_style.error_field_css);
            error++;
        } else
            $('input[name="interface_mixed_mux_name"]').css(s_style.undo_error_field_css);
        if (!$('input[name="interface_mixed_mux_port"]').val()) {
            $('input[name="interface_mixed_mux_port"]').css(s_style.error_field_css);
            error++;
        } else
            $('input[name="interface_mixed_mux_port"]').css(s_style.undo_error_field_css);
    }

    if (error > 0) {
        alert('field_empty');
    } else {
        dataString = dataString + '&' + $('form#con_details_form').serialize();
        dataString = 'submit=con_details&client_id=' + client_id + '&scp_staff_id=' + scp_staff_id + '&' + dataString;
        $.ajax({
            type: "POST",
            url: "./add_services.php",
            data: dataString + '&service_id=' + service_id,
            async: true,
            cache: false,
            beforeSend: function() {
                console.group('save connection details, ajax processing started');
                notf_man.push('<br><span class="msg">saving connection details...</span>');
                notf_man.operation('loading');
                notf_man.operation('disable');
            },
            success: function(data, textStatus, jqXHR) {
                console.group('server response on ajax success');
                console.debug('data:' + data + ',textStatus:' + textStatus);
                switch (data) {
                    case "1":
                    case 1:
                        console.info('data saved successfully');
                        notf_man.push('<span class="success"> success </span>');
                        if (callback_on_success) {
                            callback_on_success();
                        }

                        if (save_and_continue === true) {
                            $('div#con_dates').css("display", "block");
                            $('div#connectivity_details').css("display", "none");
                        }
                        break;
                    default:
                        console.error('failed to save');
                        notf_man.push('<span> failed to save. error is: ' + data + '</span>');
                        alert('failed to save. error is: ' + data);
                }
                console.groupEnd();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('ajax processing error');
                notf_man.push('<span class="error">AJAX ERROR</span>');
            }
        }).always(function() {
            console.groupEnd();
            notf_man.operation('reset');
        });
    }
}


$('button[name="con_details_submit"]').click(function() {
    save_con_details(false, save_odf);
});
$('button[name="con_details_submit_and_continue"]').click(function() {
    save_con_details(true, save_odf);
});
function show_con_dates() {
    $('div#con_dates').css("display", "block");
    $('div#connectivity_details').css("display", "none");
}

function save_con_dates(save_and_comission) {
    var error = 0;
    var dataString = '';
    if (!$('input[name="link_act_date"]').val()) {
        $('input[name="link_act_date"]').css(s_style.error_field_css);
        error++;
    } else
        $('input[name="link_act_date"]').css(s_style.undo_error_field_css);
    if (!$('input[name="test_alloc_from"]').val()) {
        $('input[name="test_alloc_from"]').css(s_style.error_field_css);
        error++;
    } else
        $('input[name="test_alloc_from"]').css(s_style.undo_error_field_css);
    if (!$('input[name="test_alloc_to"]').val()) {
        $('input[name="test_alloc_to"]').css(s_style.error_field_css);
        error++;
    } else
        $('input[name="test_alloc_to"]').css(s_style.undo_error_field_css);
    if (!$('input[name="billing_statement_date"]').val()) {
        $('input[name="billing_statement_date"]').css(s_style.error_field_css);
        error++;
    } else
        $('input[name="billing_statement_date"]').css(s_style.undo_error_field_css);
    if (error > 0) {
        alert('fields empty');
    } else {
        dataString = $('form#con_dates_form').serialize();
        dataString = 'submit=con_dates&client_id=' + client_id + '&scp_staff_id=' + scp_staff_id + '&' + dataString;
        $.ajax({
            type: "POST",
            url: "./add_services.php",
            data: dataString + '&service_id=' + service_id,
            async: true,
            cache: false,
            beforeSend: function() {
                console.group('save connection dates: procesing started');
                notf_man.push('<br><span>saving dates...</span>');
            },
            success: function(data, textStatus, jqXHR) {
                console.group('server response on ajax success');
                console.debug('data:' + data + ', textStatus:' + textStatus);
                switch (data) {
                    case 1:
                    case "1":
                        console.info('data saved successfully');
                        alert('saved');
                        notf_man.push('<span class="success"> success </span>');
                        break;
                    default:
                        console.error('failed to save');
                        alert('failed to save. error is: ' + data);
                        notf_man.push('<span class="error">failed to save. error: ' + data + '</span>');
                }
                console.groupEnd();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('ajax processing failed');
                notf_man.push('<span class="error"> AJAX ERROR </span>');
            }
        }).always(function() {
            console.groupEnd();
        });
    }
}

$('button[name="con_dates_save"]').click(function() {
    save_con_dates(false);
});