(function ($) {
    'use strict';


    // Preloader
    $(window).on('load', function () {
        $('#preloader').fadeOut('slow', function () { $(this).remove(); });

        $('.filter-form').change(
            () => {
                $('#queryForm').submit();
            }
        );
    });

})(jQuery);