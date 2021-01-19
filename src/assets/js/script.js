jQuery(document).ready(function ($) {

  // Phone Keypad
  var count = 0;

  $(".digit").on('click', function () {
    var num = ($(this).clone().children().remove().end().text());
    if (count < 11) {
      $("#output").append('<span>' + num.trim() + '</span>');

      count++
    }
  });

  $('.fa-long-arrow-left').on('click', function () {
    $('#output span:last-child').remove();
    count--;
  });
  // Phone Keypad

  // Message
  /*

  Name    : Responsive HTML5 Chat

  Responsive HTML5 Chat helps you to create useful chatbox on your website easly. 
  You can change skin and sizes. You can read the installation and support documentation 
  before you begin. If you do not find the answer, do not hesitate to send a message to me.

  Owner   : Vatanay Ozbeyli
  Web     : www.vatanay.com
  Support : hi@vatanay.com

  */

  function responsiveChat(element) {
    $(element).html('<form class="chat"><span></span><div class="show_date_history">วันที่ 01/01/2019</div><div class="messages"></div><div class="sec-send-message"><a href="javascript:history.back()" class="btn-backpage">ย้อนกลับ</a><a href="#" class="btn-no-message"></a><input type="text" placeholder="Message"><input type="submit" value="ส่ง"></form></div>');

    function showLatestMessage() {
      $(element).find('.messages').scrollTop($(element).find('.messages').height());
    }
    showLatestMessage();


    $(element + ' input[type="text"]').keypress(function (event) {
      if (event.which == 13) {
        event.preventDefault();
        $(element + ' input[type="submit"]').click();
      }
    });
    $(element + ' input[type="submit"]').click(function (event) {
      event.preventDefault();
      var message = $(element + ' input[type="text"]').val();
      if ($(element + ' input[type="text"]').val()) {
        var d = new Date();
        var clock = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var currentDate =
          (("" + day).length < 2 ? "0" : "") +
          day +
          "." +
          (("" + month).length < 2 ? "0" : "") +
          month +
          "." +
          d.getFullYear() +
          "&nbsp;&nbsp;" +
          clock;
        $(element + ' div.messages').append(
          '<div class="message"><div class="myMessage"><p>' +
          message +
          "</p><date>" +
          currentDate +
          "</date></div></div>"
        );
        setTimeout(function () {
          $(element + ' > span').addClass("spinner");
        }, 100);
        setTimeout(function () {
          $(element + ' > span').removeClass("spinner");
        }, 2000);
      }
      $(element + ' input[type="text"]').val("");
      showLatestMessage();
    });
  }

  function responsiveChatPush(element, sender, origin, date, message) {
    var originClass;
    if (origin == 'me') {
      originClass = 'myMessage';
    } else {
      originClass = 'fromThem';
    }
    $(element + ' .messages').append('<div class="message"><div class="' + originClass + '"><p>' + message + '</p><date><b>' + sender + '</b> ' + date + '</date></div></div>');
  }

  /* Activating chatbox on element */
  responsiveChat('.responsive-html5-chat');

  /* Let's push some dummy data */
  responsiveChatPush('.chat', 'Kate', 'me', '08.03.2017 14:30:7', 'It looks beautiful!');
  responsiveChatPush('.chat', 'John Doe', 'you', '08.03.2016 14:31:22', 'It looks like the iPhone message box.');
  responsiveChatPush('.chat', 'Kate', 'me', '08.03.2016 14:33:32', 'Yep, is this design responsive?');
  responsiveChatPush('.chat', 'Kate', 'me', '08.03.2016 14:36:4', 'By the way when I hover on my message it shows date.');
  responsiveChatPush('.chat', 'John Doe', 'you', '08.03.2016 14:37:12', 'Yes, this is completely responsive.');

  /* DEMO */
  if (parent == top) {
    $("a.article").show();
  }
  // Message

    // Message
  /*

  Name    : Responsive HTML5 Chat

  Responsive HTML5 Chat helps you to create useful chatbox on your website easly. 
  You can change skin and sizes. You can read the installation and support documentation 
  before you begin. If you do not find the answer, do not hesitate to send a message to me.

  Owner   : Vatanay Ozbeyli
  Web     : www.vatanay.com
  Support : hi@vatanay.com

  */

 function responsiveChat(element) {
  $(element).html('<form class="chat"><span></span><div class="show_date_history">วันที่ 01/01/2019</div><div class="messages"></div><div class="sec-send-message"><a href="javascript:history.back()" class="btn-backpage">ย้อนกลับ</a><a href="#" class="btn-no-message"></a><input type="text" placeholder="Message"><input type="submit" value="ส่ง"></form></div>');

  function showLatestMessage() {
    $(element).find('.messages').scrollTop($(element).find('.messages').height());
  }
  showLatestMessage();


  $(element + ' input[type="text"]').keypress(function (event) {
    if (event.which == 13) {
      event.preventDefault();
      $(element + ' input[type="submit"]').click();
    }
  });
  $(element + ' input[type="submit"]').click(function (event) {
    event.preventDefault();
    var message = $(element + ' input[type="text"]').val();
    if ($(element + ' input[type="text"]').val()) {
      var d = new Date();
      var clock = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var currentDate =
        (("" + day).length < 2 ? "0" : "") +
        day +
        "." +
        (("" + month).length < 2 ? "0" : "") +
        month +
        "." +
        d.getFullYear() +
        "&nbsp;&nbsp;" +
        clock;
      $(element + ' div.messages').append(
        '<div class="message"><div class="myMessage"><p>' +
        message +
        "</p><date>" +
        currentDate +
        "</date></div></div>"
      );
      setTimeout(function () {
        $(element + ' > span').addClass("spinner");
      }, 100);
      setTimeout(function () {
        $(element + ' > span').removeClass("spinner");
      }, 2000);
    }
    $(element + ' input[type="text"]').val("");
    showLatestMessage();
  });
}

function responsiveChatPush(element, sender, origin, date, message) {
  var originClass;
  if (origin == 'me') {
    originClass = 'myMessage';
  } else {
    originClass = 'fromThem';
  }
  $(element + ' .messages').append('<div class="message"><div class="' + originClass + '"><p>' + message + '</p><date><b>' + sender + '</b> ' + date + '</date></div></div>');
}

/* Activating chatbox on element */
responsiveChat('.responsive-html5-chat-mobile');

/* Let's push some dummy data */
responsiveChatPush('.chat', 'Kate', 'me', '08.03.2017 14:30:7', 'It looks beautiful!');
responsiveChatPush('.chat', 'John Doe', 'you', '08.03.2016 14:31:22', 'It looks like the iPhone message box.');
responsiveChatPush('.chat', 'Kate', 'me', '08.03.2016 14:33:32', 'Yep, is this design responsive?');
responsiveChatPush('.chat', 'Kate', 'me', '08.03.2016 14:36:4', 'By the way when I hover on my message it shows date.');
responsiveChatPush('.chat', 'John Doe', 'you', '08.03.2016 14:37:12', 'Yes, this is completely responsive.');

/* DEMO */
if (parent == top) {
  $("a.article").show();
}
// Message

  // Click and Rolate Icon
  $(".btn-function_select").click(function () {
    $(this).toggleClass("down");
  })

  // Click and Rolate Icon

  // Video and Chat message
  function myFunction(x) {
    if (x.matches) { // If media query matches
      $('#open-open').click(function openNav() {
        document.getElementById("mySidenav").style.width = "100%";
        document.getElementById("xxx").style.display = "block";
        document.getElementById("main").style.marginRight = "100%";
      });

      $('#open-close').click(function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("xxx").style.display = "none";
        document.getElementById("main").style.marginRight = "0";
    });
    } else {
      $('#open-open').click(function openNav() {
        document.getElementById("mySidenav").style.width = "30%";
        document.getElementById("xxx").style.display = "block";
        document.getElementById("main").style.marginRight = "30%";
      });

      $('#open-close').click(function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("xxx").style.display = "none";
        document.getElementById("main").style.marginRight = "0";
    });
    }
  }
  
  var x = window.matchMedia("(max-width: 768px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes
  // Video and Chat message

  // Video and Chat message
  $('#open-message').click(function openNav() {
    document.getElementById("slideMessage").style.display = "block";
    document.getElementById("img_vdocall").classList.add('vdo_call_show');
    // document.getElementById("main").style.marginRight = "100%";
  });

  $('.btn-no-message').click(function closeNav() {
    document.getElementById("slideMessage").style.display = "none";
    document.getElementById("img_vdocall").classList.remove('vdo_call_show');
    // document.getElementById("main").style.marginRight = "0";
});
  // Video and Chat message

  // Video and Chat message
  // $('#open-open').click(function openNav() {
  //   document.getElementById("mySidenav").style.width = "30%";
  //   document.getElementById("xxx").style.display = "block";
  //   document.getElementById("main").style.marginRight = "30%";
  // });

  // $('#open-close').click(function closeNav() {
  //     document.getElementById("mySidenav").style.width = "0";
  //     document.getElementById("xxx").style.display = "none";
  //     document.getElementById("main").style.marginRight = "0";
  // });
  // Video and Chat message

  // Loading Page Index
  function onReady(callback) {
    var intervalId = window.setInterval(function() {
      if (document.getElementsByTagName('body')[0] !== undefined) {
        window.clearInterval(intervalId);
        callback.call(this);
      }
    }, 3000);
  }
  
  function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
  }
  
  onReady(function() {
    setVisible('.page', true);
    setVisible('#loading', false);
  });
  // Loading Page Index

  // Loading
    // Assign your element ID to a variable.
    var progress = document.getElementById("progressBar");
    // Pause the animation for 100 so we can animate from 0 to x%
    setTimeout(
      function(){
        progress.style.width = "100%";
        // PHP Version:
        // progress.style.width = <?php echo round($percentage150,2); ?>+"%";
        progress.style.backgroundColor = "#fff";
      }
    ,300);
    // Loading

    // Loading Page Guest
    function onReady(callback) {
      var intervalId = window.setInterval(function() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
          window.clearInterval(intervalId);
          callback.call(this);
        }
      }, 2000);
    }
    
    function setVisible(selector, visible) {
      document.querySelector(selector).style.display = visible ? 'block' : 'none';
    }
    
    onReady(function() {
      setVisible('.show', true);
      setVisible('#Guestloading', false);
    });
    // Loading Page Guest


    // Reload VDO
$(function(){
  $('.close').click(function(){      
      // $('iframe').attr('src', $('iframe').attr('src'));
      $("iframe").each(function() { 
          var src= $(this).attr('src');
          $(this).attr('src',src);  
  });
  });
});
});