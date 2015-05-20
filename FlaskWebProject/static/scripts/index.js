/**
 * Created by Longy on 18.05.15.
 */
$( document ).ready(function() {
    // Handler for .ready() called.
    $( "#saveresult" ).click(function() {
        alert( "result" + $("#shared_widgets_NumberInput_2").val() );

    });
    $( "#loadresult" ).click(function() {
        alert( "Load result now" );
    });
});