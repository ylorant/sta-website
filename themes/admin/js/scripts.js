/* 1. TOGGLE SIDEBAR
--------------------------------------------------------- */
$("#sidebar-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

/* 2. COLLAPSE LINKS IN SIDEBAR
--------------------------------------------------------- */
$('.sidebar-nav li a').click(function(e)
{
    if($('li:hidden', $(this).next()).length)
    {
        e.preventDefault();
        $('.sidebar-nav li ul.in').collapse('hide');
        $(this).next('ul').collapse('show');
    }
    else if($('li:visible', $(this).next()).length)
    {
        e.preventDefault();
    	$(this).next('ul').collapse('hide');
    }
});
$('.sidebar-nav li.active ul').addClass('in');

/* 3. CONFIRM BOX (BootboxJS)
--------------------------------------------------------- */
$(document).on('click touchstart', '[data-confirm]:not(.disabled):not([disabled])', function(evt)
{
    evt.preventDefault();
    var text = $(this).attr('data-confirm');
    var source = $(this);

    bootbox.confirm({
        message: text,
        locale: sessionStorage.getItem('locale'),
        closeButton: false,
        callback: function(result) {
            if(result)
            {
                if(source.is('[type="submit"]'))
                {
                    $(document).off('click touchstart', '[data-confirm]:not(.disabled):not([disabled])');
                    source.click();
                }
                else if(source.is('a'))
                {
                    $(location).attr('href', source.attr('href'));
                }
            }
        }
    });
});

/* 4. TOOLTIP ACTIVATION
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function(event) {
    // Enabling Tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
    // Enabling Popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });
});

/* 5. NOTIFICATION
--------------------------------------------------------- */
$(function () {
	if($('#notify').length)
    {
		$('#notify').slideDown(500);
        if($( window ).width() < 768)
            $('#content-wrapper').animate({'top' : '+=46'}, 500);

		setTimeout(function() {
			$('#notify').slideUp(500);
            if($( window ).width() < 768)
                $('#content-wrapper').animate({'top' : '-=46'}, 500);
		}, 8000);
	}
});

/* 6. SORTABLE SIDEBAR
--------------------------------------------------------- */
$(function () {
    sortable('.sidebar-nav', {handle:'i'})[0].addEventListener('sortupdate', function(e) {
        var baseURL = batflat.url + '/' + batflat.admin;
        var items   = {};

        $(e.detail.endparent).children('li').each(function(index, element) {
            var module = $(element).data('module');
            items[module] = index;
        });

        $.ajax({
            url: baseURL + '/settings/changeOrderOfNavItem?t=' + batflat.token,
            type: 'POST',
            cache: false,
            data: items,
            success: function(respond) {
                console.log(respond);
            }
        });
    });
});

/* 7. TINYNAV
--------------------------------------------------------- */
$(function () {
    $('.card-header .nav-tabs').tinyNav({
        active: 'active'
    });
});

/* 8. REMOTE MODAL
--------------------------------------------------------- */
$('a[data-bs-toggle="modal"]').on('click', function(e) {
    var target_modal = $(e.currentTarget).data('target');
    var remote_content = $(e.currentTarget).attr('href');

    if(remote_content.indexOf('#') === 0) return;

    var modal = $(target_modal);
    var modalContent = $(target_modal + ' .modal-content');

    modal.off('show.bs.modal');
    modal.on('show.bs.modal', function () {
        modalContent.load(remote_content);
    }).modal();

    return false;
});

/* 9. CUSTOM SELECT
--------------------------------------------------------- */
$('select').each(function () {
    var options = {
        useDimmer: true,
        useSearch: false,
        labels: {
            search: '...'
        }
    };
    $.each($(this).data(), function (key, value) {
        options[key] = value;
    });
    $(this).selectator(options);
});
