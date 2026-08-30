/**
 * Minimal JavaScript for Permission Option Tooltips in Django Admin
 */

(function($) {
    'use strict';

    function addOptionTooltips() {
        $('.selector select option').each(function() {
            var text = $(this).text().trim();
            if (text && !$(this).attr('title')) {
                $(this).attr('title', text);
            }
        });
    }

    $(document).ready(function() {
        addOptionTooltips();

        $(document).on('keyup input', '.selector-filter input', function() {
            setTimeout(addOptionTooltips, 50);
        });

        $(document).on('click', '.selector-chooser a, .selector-chooseall, .selector-clearall', function() {
            setTimeout(addOptionTooltips, 50);
        });

        $(document).on('shown.bs.tab', function() {
            addOptionTooltips();
        });
    });

})(jQuery);
