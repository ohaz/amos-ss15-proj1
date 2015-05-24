/**
 * Created by Longy on 18.05.15.
 */
$( document ).ready(function() {
    // Handler for .ready() called.
    $( "#saveresult" ).click(function() {
        console.log("userid: " + user_id);
        $.ajax({
            type: "POST",
            data: JSON.stringify({content: $('#shared_widgets_NumberInput_2').val()}),
            contentType: "application/json; charset=utf-8",
            url: "/storage/api/v1.0/"+user_id+"/calculator",
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log("error in post request");
            }
        });
    });
    $( "#loadresult" ).click(function() {
        alert( "Load result now" );
    });
});