function positionSearchInput() {
  var elem = $("#generic_search");
  if (elem.length == 0) {
    return;
  }
  shared.helpers.top_right(elem,$('body'),{left: -20,top: 0});
  var off = elem.offset();
  off.top = 0;
  elem.offset(off);
  elem.css({'z-index': 1005});
  var elem = $(".generic-search-button");
  shared.helpers.bottom_right(elem,$("#generic_search_input"),{left: 45,top:-5});
}
function checkLength( o, n, min, max ) {
  if ( o.val().length > max || o.val().length < min ) {
    o.addClass( "ui-state-error" );
    updateTips( "Length of " + n + " must be between " +
    min + " and " + max + "." );
    return false;
  } else {
    return true;
  }
}
function checkRegexp( o, regexp, n ) {
  if ( !( regexp.test( o.val() ) ) ) {
    o.addClass( "ui-state-error" );
    updateTips( n );
    return false;
  } else {
    return true;
  }
}
function updateTips( t ) {
  $(".validateTips")
  .text( t )
  .addClass( "ui-state-highlight" );

}
function showClockin() {
  var el = $("#simple_input_dialog").dialog({
    modal: false,
    buttons: {
      "Cancel": function() {
        var bValid = true;
        $('#dialog_input').removeClass("ui-state-error");
        updateTips("");
        bValid = bValid && checkLength($('#dialog_input'),"password",3,255);
        if (bValid) {            
            jQuery.post("/users/clockout",{password: $('#dialog_input').val()},function (data,textStatus,jqHXR) {
              if (data == "NO") {
                updateTips("Wrong Password");
              } else {
                $("#simple_input_dialog").dialog( "close" );
              }
            }).fail(function () {
              updateTips("Login to server failed due to server error, call tech support!");
            });
        } // end if bValid
      }, // end of cancel
      "Complete": function () {
        var bValid = true;
        $('#dialog_input').removeClass("ui-state-error");
        updateTips("");
        bValid = bValid && checkLength($('#dialog_input'),"password",3,255);
        if (bValid) {            
            jQuery.post("/users/clockin",{password: $('#dialog_input').val()},function (data,textStatus,jqHXR) {
              if (data == "NO") {
                updateTips("Wrong Password");
              } else if (data == "ALREADY") {
                updateTips("You are already clocked in!");
              } else {
                $("#simple_input_dialog").dialog( "close" );
              }
            }).fail(function () {
              updateTips("Login to server failed due to server error, call tech support!");
            });
        } // end if bValid
      }, // end of Complete
    } // end of buttons
  }); // end dialog

  setTimeout(function () {
    try {
    $('#dialog_input').val("");
    $(".ui-dialog * button > span:contains('Complete')").text(i18n.system.login);
    $(".ui-dialog * button > span:contains('Cancel')").text(i18n.system.logout);
    $('#dialog_input').keyup(function (event) {
      if (event.which == 13) {
        $(".ui-dialog * button:contains('"+i18n.system.login+"')").trigger("click");
      }
    });
    focusInput($('#dialog_input'));
    var ttl = el.parent().find('.ui-dialog-title');
    ttl.html(i18n.system.login); 
    ttl = el.parent().find('.input_label');
    ttl.html(i18n.activerecord.attributes.password);
    } catch (err) {
      console.log(err);
    }
  },55);
}



function showButtonCategoryContainer(id) {
  $('.button-category-container').hide();
  $('#' + id).show();
}

function showButtonCategoryContainer(id) {
  $('.button-category-container').hide();
  $('#' + id).show();
}

function logout() {
  $('#logoutform').submit();
}