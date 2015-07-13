/**
 * Created by Longy on 18.05.15. modified MacBlub
 */
$( document ).ready(function() {
    // Handler for .ready() called.
    $( "#saveFile" ).click(function() {
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "/storage/api/v1.0/share/write",
            success: function (data) {
                console.log("Result retrieved: " + data);
                var json = JSON.parse(data);
                $("#listing_write").html("");
                $.each(json, function(i, item) {
                    $("#listing_write").append('' +
                    '<tr id="listing_write-file-row-'+json[i][0]+'-'+json[i][1]+'">' +
                    '<td><h4>'+json[i][0]+'</h4></td> ' +
                    '<td><h4>'+json[i][1]+'</h4></td> ' +
                    '<td><h4 id="listing_write-result'+json[i][0]+'-'+json[i][1]+'"></h4></td>'+
                    '<td> <button type="button" id="listing_write-save'+json[i][0]+'-'+json[i][1]+'" onClick="saveFile(\''+json[i][2] +'\',\''+ json[i][1]+ '\',\'PUT\')" class="btn btn-danger">Save</button> ' +
                    '</tr>');
                    $.ajax({
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        url: "/storage/api/v1.0/"+json[i][2]+"/"+json[i][1],
                        success: function (data) {
                            $('#listing_write-result'+json[i][0]+'-'+json[i][1]).html(data);
                        },
                        error: function (data) {
                            console.log("error in get request");
                        }
                    });
                });

                $('#saveFileModal').modal('show')

            },
            error: function (data) {
                console.log("error in get request");
            }
        });
    }); 
    
    $( "#saveresult" ).click(function() {
        //Get filename
        var filename = $('#filename').val();

        //Check if filename is not empty
        if(filename.length > 0){
            saveFile(user_id, filename, 'POST')
        }
    });
    
    $( "#loadresult" ).click(function() {
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "/storage/api/v1.0/share/read",
            success: function (data) {
                console.log("Result retrieved: " + data);
                var json = JSON.parse(data);
                $("#listing_read").html("");
                $.each(json, function(i, item) {
                    $("#listing_read").append('' +
                    '<tr id="listing_read-file-row-'+json[i][0]+'-'+json[i][1]+'">' +
                    '<td><h4>'+json[i][0]+'</h4></td> ' +
                    '<td><h4>'+json[i][1]+'</h4></td> ' +
                    '<td><h4 id="listing_read-result'+json[i][0]+'-'+json[i][1]+'"></h4></td>'+
                    '<td><button type="button" id="listing_read-load'+json[i][0]+'-'+json[i][1]+'" onClick="loadFile(\'' + json[i][0]+ '\',\'' + json[i][1] + '\')" class="btn btn-danger">Load</button></td>'+
                    '<td> <button type="button" id="listing_read-delete'+json[i][0]+'-'+json[i][1]+'" onClick="deleteFile(\'' + json[i][2] +'\',\''+ json[i][1]+'\',\''+ json[i][0]+ '\')" class="btn btn-danger">Delete</button> ' +
                    '</td><td><button type="button" id="listing_read-share'+json[i][0]+'-'+json[i][1]+'" onClick="shareFile(\'' + json[i][1]+ '\')" class="btn btn-primary">Share</button></td>' +
                    '</tr>');
                    $.ajax({
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        url: "/storage/api/v1.0/"+json[i][2]+"/"+json[i][1],
                        success: function (data) {
                            $('#listing_read-result'+json[i][0]+'-'+json[i][1]).html(data);
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
                            } else {
                                alert("Connection Error: Please try again!");
                            }
                            console.log(response);

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

function saveFile(){
    bucket_to = arguments[0]
    filename = arguments[1]
    post = arguments[2]
    //Save result with the given filename
    $.ajax({
        type: post,
        data: JSON.stringify({content: $('#shared_widgets_NumberInput_2').val()}),
        contentType: "application/json; charset=utf-8",
        url: "/storage/api/v1.0/"+bucket_to+"/"+filename,
        success: function (response) {
            if(response == "200"){
                //Hide modal after successfully saving the result
                $('#saveFileModal').modal('hide')
            }
            console.log(response);
        },
        error: function (data) {
            console.log("error in post request");
        }
    });
}

function deleteFile(filename) {
    bucket_to = arguments[0]
    filename = arguments[1]
    userName = arguments[2]
    
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        url: "/storage/api/v1.0/"+bucket_to+"/"+filename,
        success: function (response) {
            if(response == "200"){
                $('#listing_read-file-row-'+userName+'-'+filename).remove();
                $('#listFilesModal').modal('show')
            }
            console.log(response);
        },
        error: function (data) {
            console.log("error in delete request");
        }
    });
};

function loadFile(filename) {
    first = arguments[0]
    second = arguments[1]
    
    var input = $('#shared_widgets_NumberInput_2');
    $('#listFilesModal').modal('hide');
    input.val($('#listing_read-file-row-'+first+'-'+second).html());
    input.focus();
};

var currentShareFile;
function shareFile(filename) {
    currentShareFile = filename;
    $('#listFilesModal').modal('hide');
    $('#shareFileModal').modal('show');
};
