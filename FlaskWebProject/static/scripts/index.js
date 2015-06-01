/**
 * Created by Longy on 18.05.15.
 */
$( document ).ready(function() {
    // Handler for .ready() called.
    $( "#saveresult" ).click(function() {
        //Get filename
        var filename = $('#filename').val();

        //Check if filename is not empty
        if(filename){
            //Save result with the given filename
            $.ajax({
                type: "POST",
                data: JSON.stringify({content: $('#shared_widgets_NumberInput_2').val()}),
                contentType: "application/json; charset=utf-8",
                url: "/storage/api/v1.0/"+user_id+"/"+filename,
                success: function (response) {
                    if(response == "200"){
                        //Hide modal after successfully saving the result
                        $('#saveFileModal').modal('hide')
                    }
                },
                error: function (data) {
                    console.log("error in post request");
                }
            });
        }
    });
    $( "#loadresult" ).click(function() {
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "/storage/api/v1.0/"+user_id,
            success: function (data) {
                console.log("Result retrieved: " + data);
                var json = JSON.parse(data);
                $.each(json, function(i, item) {
                    $("#listing").append('<div class="row" id="file-row-'+json[i]+'"><div class="col-md-8 filename"><h2>'+json[i]+'</h2></div><div class="col-md-4 delete-file"><h2 onClick="deleteFile(\'' + json[i]+ '\')">X</h2></div></div>');
                });
                $('#listFilesModal').modal('show')

            },
            error: function (data) {
                console.log("error in get request");
            }
        });

        /*$.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "/storage/api/v1.0/"+user_id+"/calculator",
            success: function (data) {
                alert("Result retrieved: " + data)
            },
            error: function (data) {
                console.log("error in get request");
            }
        });*/
    });


});


function deleteFile(filename) {
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        url: "/storage/api/v1.0/"+user_id+"/"+filename,
        success: function (response) {
            if(response == "200"){
                $('#file-row-'+filename).remove();
            }
        },
        error: function (data) {
            console.log("error in delete request");
        }
    });
};