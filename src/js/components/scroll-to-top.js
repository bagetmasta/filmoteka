// кнопка вверх
import $ from 'jquery';

// кнопка вверх
$(document).ready(function () {
    let btn = $('#toTop');
    $(window).scroll(function () {
        if ($(window).scrollTop() > 500) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });
    btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '500');
    });
});