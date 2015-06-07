/**
 * Created by Longy on 18.05.15.
 */
$( document ).ready(function() {
    // Handler for .ready() called.
    $( "#saveresult" ).click(function() {
        //Get filename
        var filename = $('#filename').val();

        //Check if filename is not empty
        if(filename.length > 0){
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
            url: "/storage/api/v1.0/share",
            success: function (data) {
                console.log("Result retrieved: " + data);
                var json = JSON.parse(data);
                $("#listing").html("");
                $.each(json, function(i, item) {
                    $("#listing").append('' +
                    '<tr id="file-row-'+json[i][0]+'-'+json[i][1]+'">' +
                    '<td><h4>'+json[i][0]+'</h4></td> ' +
                    '<td><h4>'+json[i][1]+'</h4></td> ' +
                    '<td><h4 id="result'+json[i][1]+'"></h4></td>'+
                    '<td> <button type="button" id="delete'+json[i][1]+'" onClick="deleteFile(\'' + json[i][1]+ '\')" class="btn btn-danger">Delete</button> ' +
                    '</td><td><button type="button" onClick="shareFile(\'' + json[i][1]+ '\')" class="btn btn-primary">Share</button></td>' +
                    '</tr>');
                    $.ajax({
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        url: "/storage/api/v1.0/"+json[i][2]+"/"+json[i][1],
                        success: function (data) {
                            $("#result"+json[i][1]).html(data);
                        },
                        error: function (data) {
                            console.log("error in get request");
                        }
                    });
                });

                $('#listFilesModal').modal('show')

            },
            error: function (data) {
                console.log("error in get request");
            }
        });

        $( "#share-file" ).click(function() {
            //Get filename
            var filename = currentShareFile;
            var username = $('#share-file-username').val();
            var permission = $('#share-file-permission').val();

            //Check if filename is not empty
            if(filename){
                //Check if username is not empty
                if(username){
                    //Make ajax call to share-file rest API
                    //Hands over username, filename and permission value
                    $.ajax({
                        type: "POST",
                        data: JSON.stringify({username: username, permission: permission}),
                        contentType: "application/json; charset=utf-8",
                        url: "/storage/api/v1.0/share/"+user_id+"/"+filename,
                        success: function (response) {
                            if(response == "200"){
                                //Hide modal after successfully saving the result
                                $('#shareFileModal').modal('hide')
                            }
                        },
                        error: function (data) {
                            console.log("error in post request");
                        }
                    });

                }
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
var currentShareFile;
function shareFile(filename) {
    currentShareFile = filename;
    $('#listFilesModal').modal('hide');
    $('#shareFileModal').modal('show');
};
