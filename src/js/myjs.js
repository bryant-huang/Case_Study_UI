//Method executed upon user clicking the save button under the registration button.
function save_new_user(){
    var username = $("input[name=username]").val();
    var password = $("input[name=password]").val();
    var name = $("input[name=name]").val();
    var email = $("input[name=email]").val();
    var birthday = $("input[name=birthday]").val();
    var interest = document.getElementById("interestSpan").innerHTML;
    var language = document.getElementById("languageSpan").innerHTML;
    var purpose = $("input[name=purpose]").val();

    if (getCookie("email") == email){
        event.preventDefault();
        alert("There is already an account associated with this email. Please Log In");
    }
    else if (checkValid("email", email) && checkValid("birthday",birthday) && checkValid("password",password)){
        setCookie("username",username);
        setCookie("password",password);
        setCookie("name",name);
        setCookie("email",email);
        setCookie("birthday",birthday);
        setCookie("interest",interest);
        setCookie("language",language);
        setCookie("purpose",purpose);
        setCookie("login",true);
        console.log(document.cookie);
    }
}
function getCookie(name) {
  var myName = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(myName.length, c.length);
    }
  }
  return "";
}

//Additional function for client side validation beyond html validation which aids user but still passes along corrupt
//information.
function checkValid(key, value){
    switch (key){
        case "email":
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
                return true;
            } else {
                console.log("Not valid.");
                return false;
            }
        case "birthday":
            if (/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(value)){
                return true;
            } else {
                console.log("Not valid.");
                return false;
            }
       case "password":
           if (/^[A-Za-z0-9]{1,8}$/.test(value)){
               return true;
           } else {
               console.log("Not valid.");
               return false;
           }


    }

}

//function sets a key value pair and saves it to the cookie, takes in the parameters of the key and value
function setCookie(name, value){
    document.cookie = name + "=" + value + ";";
}

//function deletes all user-filled in information on the registration page on the click of button which executes this
function deleteInfo(){
    $("input[name=username]").val("");
    $("input[name=password]").val("");
    $("input[name=name]").val("");
    $("input[name=email]").val("");
    $("input[name=birthday]").val("");
    document.getElementById("interestSpan").innerHTML = "Interests";
    document.getElementById("languageSpan").innerHTML = "Languages";
    $("input[name=purpose]").val("");
}

function directToMain(){
    document.getElementById("nonreg").style.display = "none";
    document.getElementById("main_profile").style.display = "block";
}

function directToSignUp(){
    document.body.style.backgroundColor = "#F7F7F7";
    document.getElementById("nonreg").style.display = "none";
    document.getElementById("sign_up_screen").style.display = "block";
}

function directToLogIn(){
    document.body.style.backgroundColor = "#F7F7F7";
    document.getElementById("nonreg").style.display = "none";
    document.getElementById("log_in_screen").style.display = "block";
}

//Obtain the card the user clicked on and store it in a global variable
var edittedCard;
function editCard(clicked){
    edittedCard=clicked;
}

//Obtain the name from the modal form and modify it in the card in edittedCard
function changeName(){
    var newname=document.forms["editCardName"]["name"].value;
    edittedCard.parentNode.parentNode.previousElementSibling.children[1].innerHTML=newname;
    document.forms["editCardName"]["name"].value="";
}

//Obtain the date from the modal form and modify it in the card in edittedCard
function changeDate(){
    var newdate=document.forms["editCardDate"]["date"].value;
    //Check that the date-time format is correct
    if(!/([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}(\ )([0-2][0-9])(\:)([0-5][0-9])/.test(newdate)){
        alert("Invalid format, write as dd/mm/yyyy hh:mm");
        return;
    }
    edittedCard.parentNode.parentNode.children[edittedCard.parentNode.parentNode.children.length-1].innerHTML=newdate;
    document.forms["editCardDate"]["date"].value="";
}

function changeImage(){
    var newimg=document.forms["editCardImage"]["image"].value;
    edittedCard.parentNode.parentNode.previousElementSibling.children[0].src=newimg;
    document.forms["editCardImage"]["image"].value="";
}

var chosenColumnv;
function chosenColumn(clicked){
    chosenColumnv=clicked;
}
function addNewCard(){
    var inputname=document.forms["newCardName"]["name"].value;
    var inputimage=document.forms["newCardImage"]["image"].value;
    var inputdate=document.forms["newCardDate"]["date"].value;
    if(inputdate!=""&&!/([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}(\ )([0-2][0-9])(\:)([0-5][0-9])/.test(newdate)){
        alert("Invalid format, write as dd/mm/yyyy hh:mm");
        return;
    }else if(inputdate==""){
        var newDate=new Date();
        inputdate=(newDate.getDate()<10?"0"+newDate.getDate():newDate.getDate())+"/"
        +(newDate.getMonth()+1<10?"0"+newDate.getMonth()+1:newDate.getMonth()+1)+"/"+
        newDate.getFullYear()+" "+(newDate.getHours()<10?"0"+newDate.getHours():newDate.getHours())+
        ":"+(newDate.getMinutes()<10?"0"+newDate.getMinutes():newDate.getMinutes());
    }
    
    var cardhtml='<div class = "card">'+
        '<div class="logo_and_title">'+
            '<img src="'+(inputimage==""?"images/lightbulb.png":inputimage)+'" alt = "Lightbulb" height="50px" vspace="5px" hspace="5px">'+
            '<div class = "section_title card_title">'+(inputname==""?"New card":inputname)+'</div>'+
                '<button class="exit_button">X</button>'+
            '</div>'+
            '<div class = "card_icons">'+
                '<button type="button" class="btn-1" data-toggle="modal" data-target="#editModal">'+
                    '<img src="images/edit.png" onclick="editCard(this)" alt = "edit" height="30px" vspace="5px" hspace="5px" class="icon">'+
                '</button>'+
                '<img src="images/like.png" alt = "like" height="30px" vspace="5px" hspace="5px" class="icon">'+
                '<img src="images/comment.png" alt = "comment" height="30px" vspace="5px" hspace="5px" class="icon">'+
                '<button type="button" class="btn-1" data-toggle="modal" data-target="#exampleModal"><img src="images/share.png" alt = "share" height="30px" vspace="5px" hspace="5px" class="icon">'+
                '</button>'+
            '<div class = "date"><time datetime="'+inputdate+'">'+inputdate+'</time></div>'+
        '</div>'+
    '</div>';
    chosenColumnv.nextElementSibling.insertAdjacentHTML("beforeend",cardhtml);
    $(".card_section").sortable("refresh");
    delete $('button.exit_button').fn;
    $(chosenColumnv.nextElementSibling.children[chosenColumnv.nextElementSibling.children.length-1].children[0].children[2]).click(function() {
    if (confirm( "Are you sure")){
        $(this).parent().parent().remove();
    }
    });
}

function addNewColumn(){
    var inputname=document.forms["newColName"]["name"].value;
    var colhtml='<div class="column">'+
                '<div class = "col_title_and_hamburger">'+
                    '<h3 class="section_title">'+(inputname==""?"New column":inputname)+'</h3>'+
                    '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">'+
                        '<img src="images/hamburger.png" alt = "Hamburger" height = "60px" class="hamburger">'+
                    '</button>'+
                    '<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
                        '<li class = "archive" role="presentation"><a role="menuitem" tabindex="-1" href="#">Archive List</a></li>'+
                        '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Do Nothing</a></li>'+
                        '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Do Nothing</a></li>'+
                        '<li role="presentation" class="divider"></li>'+
                        '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Do Nothing</a></li>'+
                    '</ul>'+
                '</div>'+
                '<br>'+
                '<button class = "addNewTaskButton" onclick="chosenColumn(this)" data-toggle="modal" data-target="#cardModal">Add New Task!</button>'+
                '<div class = "card_section" id = "left_card_section">'+
                '</div>'+
            '</div>';
    document.getElementById("column_section").insertAdjacentHTML("beforeend",colhtml);
    $("#column_section").sortable("refresh");
}


//Checks to see if there is a login
window.onload = function(){
        if (getCookie("login") == "true"){
            document.getElementById("user_display").innerHTML = getCookie("username") + "'s Ranking of Places in Madrid";
            document.getElementById("profile").src = "images/bryantadam.jpeg";
        }
    };

$(document).ready(function() {

    $('button.exit_button').click(function() {
    if (confirm( "Are you sure")){
        $(this).parent().parent().remove();
    }
    });

    //displays tooltips
    $('img.icon').hover(function() {
        var type = $(this).attr("alt");
        switch (type){
            case "like":
                $(this).attr("title", "This is to like")
                break;
            case "share":
                $(this).attr("title", "This is to share")
                break;
            case "comment":
                $(this).attr("title", "This is to comment")
                break;
        }

    });

    //functionality of like,share, and comment buttons on user click
    $('img.icon').click(function() {
        var type = $(this).attr("alt");
        switch (type){
            case "like":
            if ($(this).attr("src")== "images/like.png")
                $(this).attr("src", "images/like_highlighted.png");
            else if ($(this).attr("src")== "images/like_highlighted.png")
                $(this).attr("src", "images/like.png");
                break;
            case "share":
                $("p").hide();
                break;
            case "comment":
                $(this).attr("title", "This is to comment")
                break;
        }
    });

    //archives a column of items based on user click, alerts a confirmation screen
    $('li.archive').click(function() {
          if (confirm( "Are you sure")){
                $(this).parent().parent().parent().remove();
            }
    });

    //provides functionality for buttons, specifically logout, register, and login
    $('div.button-clickable').click(function(){
        if ($(this).attr("id") == "logout"){
            setCookie("login", false);
//            document.getElementById("profile").src = "images/login.png";
//            document.getElementById("user_display").innerHTML = "RankMad: A Ranking of Places in Madrid";
//            var newHTML = "<div class='body_logged_out'></div>";
//            var empty = "";
//
//            $("div.body_section").replaceWith(newHTML);
//            $("div.button");
//            document.getElementById("register").innerHTML = "Register";
//            document.getElementById("login").innerHTML = "Log In";
//            document.getElementById("logout").replaceWith(empty);
            document.getElementById("nonreg").style.display = "block";
            document.getElementById("main_profile").style.display = "none";
        }

        if ($(this).attr("id") == "register"){
            var form = '<div class="body_logged_out" style="height: fit-content">' +
                       '<form name= "signup">' +
                       '<h5>Account Information</h5>' +
                       'Username:<br>' +
                       '<input type="text" name="username" required>' +
                       '<br>' +
                       'Password:<br>' +
                       '<input type="password" name="password" pattern="^[A-Za-z0-9]{1,8}"  required title="8 characters' +
                       ' maximum, no special characters">'+
                       '<br><br>' +
                       '<h5>Personal Information</h5>' +
                       'Name and Surname<br>' +
                       '<input type="text" name="name" required>' +
                       '<br>' +
                       'Email<br>' +
                       '<input type="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"'+
                       'title="name@domain.extension">' +
                       '<br>' +
                       'Date of Birth<br>' +
                       '<input type="text" name="birthday" placeholder="dd/mm/yyyy" pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])' +
                       '.(0[1-9]|1[012])' +
                       '.[0-9]{4}" required title = "dd/mm/yyyy">' +
                       '<br><br>' +
                       '<div class="dropdown">' +
                       '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownInterests"' +
                       'data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">' +
                       '<span id = "interestSpan">Interest</span>' +
                       '</button>' +
                       '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
                       '<a class="dropdown-item" href="#">Computer Science</a>' +
                       '<a class="dropdown-item" href="#">Video Games</a>' +
                       '<a class="dropdown-item" href="#">Cooking</a>' +
                       '</div>' +
                       '</div>' +
                       '<br>' +
                       '<div class="dropdown">' +
                       '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownLanguages"'+
                       'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                       '<span id = "languageSpan">Language</span>' +
                       '</button>' +
                       '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
                       '<a class="dropdown-item" href="#">Spanish</a>' +
                       '<a class="dropdown-item" href="#">English</a>' +
                       '<a class="dropdown-item" href="#">Italian</a>' +
                       '</div>' +
                       '<div>' +
                       '<br>' +
                       '<h5>App Purpose</h5>' +
                       '<input type="text" name="purpose">' +
                       '<br>' +
                       '<div>' +
                       '<p><input type="checkbox" name="terms" required> I accept the <u>Terms and Conditions</u></p>' +
                       '<button class="save_new_user" id="save_new_user">Save</button>' +
                       '<button class="delete">Delete</button>' +
                       '</div>' +
                       '</form>' +
                       '</div>';

                    $("div.body_logged_out").replaceWith(form);

        }

         if ($(this).attr("id") == "login"){
            var login = '<div class="body_logged_out">' +
                       '<form>' +
                       '<h5>Login</h5>' +
                       'Email<br>' +
                       '<input type="text" name="email">' +
                       '<br>' +
                       'Password:<br>' +
                       '<input type="text" name="password">' +
                       '<br><br>' +
                       '<button class="login" id="login" type="submit">Log In</button>' +
                       '</form>' +
                       '</div>';
            $("div.body_logged_out").replaceWith(login);

                }
    });

    //executes function to save new user
    $(document).on("click", ".save_new_user", function(){
        save_new_user();
    });

    //executes function to delete user-filled information
    $(document).on("click", ".delete", function(){
        deleteInfo();
    });

    //Enables text changing on drop down menu
    $(document).on("click", ".dropdown-item", function(){
        $(this).parent().parent().find("span").text($(this).text());
    });

    //Executes sequence of events when user clicks the login button, checks cookies and validates login
    $(document).on("click", ".login", function(){
        event.preventDefault();
        if ($("input[name=email]").val() != getCookie("email")){
            alert("No account exists with this email.");
        }
        else if ($("input[name=password]").val() == getCookie("password")){
            setCookie("login", "true");
            location.replace("index.html");
        }
        else if ($("input[name=password]").val() != getCookie("password")){
            alert("Log In Failed!");
        }
    });

});

$(function() {
    $("#column_section").sortable({
        axis: "x",
        containment: "window"
    }).disableSelection();
    $(".card_section").sortable({
        connectWith: ".card_section",
        containment:"window"
    }).disableSelection();
});



