function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return the object(it now contains the response!)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 ) {
            if (this.status == 200) {

                var response = JSON.parse(this.responseText);
                showUser(response);

            }
            else {
                noSuchUser(user);

            }
        }
    };

    xhttp.open("GET","https://api.github.com/users/"+user,false);
    xhttp.send();

}

function showUser(response) {

    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    $('.usrname').html('<b>Username:</b>   ' + response['login']);
    $('.usrid').html('<b>ID:</b>    ' + response['id'])
    $('.avatar').html('<img src=' + response["avatar_url"] + ' alt="img" width=30% height=30%>')
    $('.information').html('<a href=' + response['html_url'] + ' target=_blank>Link to profile</a>');
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $('.usrname').html('Invalid User ' + username);
    $('.usrid').html('')
    $('.avatar').html('')
    $('.information').html('');
}

$(document).ready(function(){
    $(document).on('keypress', '#username', function(e){
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {

            //get what the user enters
            username = $(this).val();

            //reset the text typed in the input
            $(this).val("");

            //get the user's information and store the respsonse
            response = getGithubInfo(username);

            //if the response is successful show the user's details
            if (response.status == 200) {
                showUser(JSON.parse(response.responseText));

                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});