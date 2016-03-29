(function($){
    // This is where you will write your function for the programming challenge
    // Do not commit console.log statements
    // Use ajax to reach the api endpoint
    // Whether or not you use jQuery, you still have to fix the jQuery errors. Removing jQuery is not fixing the problem.

    $mouseover = $('.mouse-over');
    $click     = $('.click');
    $sub       = $('.submit');
    $timeout   = $('.timeout');
    $submit   = $('.submit_form');

    $mouseover.on('mouseover', function() {
        $this = $(this);
        $(this).html('Scrooge McDuck!');
        $(this).height($(this).height() + 50);
    });

    $click.click('click', function() {
        $(this).html('Peace Out!');
        $(this).fadeOut(1500);
        return false;
    });

    $submit.on('submit', function(e) {
        e.preventDefault();
        if ($(this).find('input[type="text"]').val() !== '') {
            $(this).find('input').each(function() {
                $(this).fadeOut('slow');
            });
            $(this).append('<h2>Congratulations! You\'ve entered some text!</h2>');
        }
    });

    $(document).ready(function() {
        setTimeout(function(){
            $timeout.fadeIn('slow');
        }, 1000);
        
        
        search_cookie()
    });
    
    //get random integer 
    function get_rand_int(min, max) {
        rand_int=Math.floor(Math.random()*(max-min+1))+min;
        return rand_int
    }
    
    //Check Set Cookies
    function search_cookie(){
        var cookie_list = document.cookie.split(';');
        for(var i=0; i<cookie_list.length; i++) {
            cookie_part=cookie_list[i].split('=');
            if (cookie_part[0].trim()=="saved_title"){
                $('.titles').html('<h3 class="current_title">'+cookie_part[1].trim()+'</h3>');
            }
        }
    }
    
    $( "#main_button" ).click(function() {
        jQuery.support.cors = true; //ie support
        $.ajax({
            type: 'get',
            url: 'http://www.mattbowytz.com/simple_api.json',
            data: {"data":"quizData"},
            success: function(data) {
                titles=data['data'];
                $( "#main_button" ).remove();
                $('.part_two').append('<button type="button" id="change_it">Change It</button>');
                process_titles(titles);
            }
        });
    });
    
    //After Ajax call
    function process_titles(titles) {
        title_length=titles.length;
        rand_int=get_rand_int(0,title_length-1);
        $('.titles').html('<h3 class="current_title">'+titles[rand_int]+'</h3>');
        $('.part_two').append('<button type="button" id="keep_it">Keep It</button>');

        $( "#change_it" ).click(function() {
            rand_int=get_rand_int(0,title_length-1);
            $('.titles').html('<h3 class="current_title">'+titles[rand_int]+'</h3>');
        });

        $( "#keep_it" ).click(function() {
            cur_title= $(".current_title" ).text();
            document.cookie = "saved_title="+cur_title+"; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        });

    }



})(jQuery);