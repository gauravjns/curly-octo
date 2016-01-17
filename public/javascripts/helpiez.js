/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Search Page Checkboxes
$("#checkCauseAll").click(function () {
    $(".checkCause").prop('checked', $(this).prop('checked'));
});
/*
$(".checkCause").click(function () {
    $("#checkCauseAll").prop('checked', $(this).prop('checked'));
});
*/
$("#checkLocationAll").click(function () {
    $(".checkLocation").prop('checked', $(this).prop('checked'));
});

/*$(".checkLocation").click(function () {
    $("#checkLocationAll").prop('checked', $(this).prop('checked'));
});*/

$('#loginCollapseTwo').on('show.bs.collapse', function () {
    $('#loginCollapseOne').collapse('hide');
    $('#loginHeadingOne').removeClass('accordionHideHeader');
    $('#loginHeadingTwo').addClass('accordionHideHeader');
})

$('#loginCollapseOne').on('show.bs.collapse', function () {
    $('#loginCollapseTwo').collapse('hide');
    $('#loginHeadingOne').addClass('accordionHideHeader');
    $('#loginHeadingTwo').removeClass('accordionHideHeader');
})

$(function () {
    $('[data-toggle="popover"]').popover();
})


// to link tabs url
$(function () {
   var activeTab = $('[href=' + location.hash + ']');
   activeTab && activeTab.tab('show');
   window.location = "#top";
});