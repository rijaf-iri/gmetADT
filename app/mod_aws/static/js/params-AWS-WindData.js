function setAWSWindDataTime(backInday) {
    $('#dekad1, #dekad2, #pentad1, #pentad2').hide();
    //
    var label = ['Year', 'Mon', 'Day', 'Hour', 'Min'];
    var pname = ['year', 'month', 'day', 'hour', 'minute'];
    // 
    $(".ts-start-time").append(selectTimesTsMap(1, ".ts-start-time", label, pname, true));
    $(".ts-end-time").append(selectTimesTsMap(2, ".ts-end-time", label, pname, false));
    //
    lastDaty = new Date();
    lastDaty.setDate(lastDaty.getDate() - backInday);
    var daty = new Date();

    //
    for (var i = 0; i < 60; i += 5) {
        var mn = i;
        if (i < 10) {
            mn = "0" + i;
        }
        $('#minute1, #minute2').append(
            $("<option>").text(mn).val(mn)
        );
    }
    var vmin = daty.getMinutes();
    vmin = vmin - vmin % 5;
    $("#minute1").val("00");
    $("#minute2").val((vmin < 10 ? "0" : "") + vmin);

    //
    for (var i = 0; i < 24; ++i) {
        var hr = i;
        if (i < 10) {
            hr = "0" + i;
        }
        $('#hour1, #hour2').append(
            $("<option>").text(hr).val(hr)
        );
    }
    var vhour0 = lastDaty.getHours();
    $("#hour1").val((vhour0 < 10 ? "0" : "") + vhour0);
    var vhour = daty.getHours();
    $("#hour2").val((vhour < 10 ? "0" : "") + vhour);
    //
    for (var i = 1; i <= 31; ++i) {
        var dy = i;
        if (i < 10) {
            dy = "0" + i;
        }
        $('#day1, #day2').append(
            $("<option>").text(dy).val(dy)
        );
    }
    var vday0 = lastDaty.getDate();
    $("#day1").val((vday0 < 10 ? "0" : "") + vday0);
    var vday = daty.getDate();
    $("#day2").val((vday < 10 ? "0" : "") + vday);
    //
    for (var i = 1; i <= 12; ++i) {
        var mo = i;
        if (i < 10) {
            mo = "0" + i;
        }
        $('#month1, #month2').append(
            $("<option>").text(mo).val(mo)
        );
    }
    var vmon0 = lastDaty.getMonth() + 1;
    $("#month1").val((vmon0 < 10 ? "0" : "") + vmon0);
    var vmon = daty.getMonth() + 1;
    $("#month2").val((vmon < 10 ? "0" : "") + vmon);
    //
    var thisYear = daty.getFullYear();
    for (var yr = firstYear; yr <= thisYear; ++yr) {
        $('#year1, #year2').append(
            $("<option>").text(yr).val(yr)
        );
    }
    var thisYear0 = lastDaty.getFullYear();
    $("#year1").val(thisYear0);
    $("#year2").val(thisYear);
    //
    //

    $("#timestepDispTS").change(function() {
        if ($(this).val() == "hourly") {
            $(".aws-select-time td:last-child").hide();
        } else {
            $(".aws-select-time td:last-child").show();
        }
    });
    $("#timestepDispTS").trigger("change");
}

function setAWSWindDataCoords(height) {
    $('#stationDispAWS').empty();
    $.getJSON('/readCoordsWind', { 'height': height },
        (json) => {
            if (json.length == 0) {
                return false;
            }
            AWS_JSON = json;
            $('#stationDispAWS').attr('enabled', 'true');
            $.each(json, function() {
                var text = this.name + " - " + this.id + " - " + this.network;
                var val = this.network_code + "_" + this.id;
                $('#stationDispAWS').append(
                    $("<option>").text(text).val(val)
                );
            });

            $('#stationDispAWS option[value=' + initAWS + ']').attr('selected', true);
        });
}

function setAWSWindHeigt(hgtWSWD) {
    $('#windHeight').empty();
    $.getJSON('/getWindHeight', (json) => {
        if (json.length == 0) {
            return false;
        }
        $('#windHeight').attr('enabled', 'true');
        $.each(json, function() {
            var pos = (this.wnd_idx == 0 ? "" : "(Anemometer:" + this.wnd_idx + ")");
            var text = this.wnd_hgt + " meter above ground " + pos;
            var val = this.ws_val + "_" + this.wd_val;
            $('#windHeight').append(
                $("<option>").text(text).val(val)
            );
        });
        $('#windHeight option[value=' + hgtWSWD + ']').attr('selected', true);
    });
}