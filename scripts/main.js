var deviceID = "xxxxx";
var accessToken = "xxxxx";

var status_check_time = 30000;

var api_url = "https://api.particle.io/v1/devices/";

var status = -1;
var debug = 0;

function ajaxCall() {
	$.ajax({
		url: api_url + deviceID + "/status",
		aysnc: false,
		type: "POST",
		data: {access_token: accessToken},
		success: function (response) {
			status = response.return_value;
		}
	});
}

function checkStatus() {
	if (!debug) {
		ajaxCall();
	}

	$('.status_open').css('display', 'none');
	$('.status_closed').css('display', 'none');
	$('.status_none').css('display', 'none');

	if (status === '1') {
		$('.status_open').css('display', 'block');
	} else if (status === '0') {
		$('.status_closed').css('display', 'block');
	} else if (status === '-1') {
		$('.status_none').css('display', 'block');
	}
}

$(document).ready(function () {
    "use strict";
    checkStatus();
});

$('.push-button').click(function () {
	$.ajax({
		url: api_url + deviceID + "/relay",
		aysnc: false,
		type: "POST",
		data: {access_token: accessToken}
	});
});

var delayCheckStatus = function() {
	setInterval(function () {
		checkStatus();
		console.log('checked status after: ', status_check_time);
	}, status_check_time);
};