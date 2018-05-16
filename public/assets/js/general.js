/* ------------------------------------------------------------------------------------------------------------------ *
 *
 * Template WgBoard - Responsive multipurpose HTML dashboard template
 * Version  1.0
 * Author   Valery Timofeev
 *
 * ------------------------------------------------------------------------------------------------------------------ */

'use strict';

function hex2RGBA(hex, opacity) {

    var r, g, b;

    hex = hex.replace('#', '');

    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
}

function getRandomNumber(min, max)  {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDataArray(min, max, count) {

    var data = [];

    for (var i = 0, l = count; i < l; i++) {
        data.push(getRandomNumber(min, max));
    }

    return data;
}

(function($) {

    'use strict';

    /* -------------------------------------------------------------------------------------------------------------- *
     * Variables and Constants
     * -------------------------------------------------------------------------------------------------------------- */

    var THEME_COLORS = {

        PRIMARY:         '#6f21c0',
        SECONDARY:       '#00bdd5',
        DARK:            '#333333',
        LIGHT:           '#f7f7f7',
        DEFAULT:         '#00bdd5',
        SUCCESS:         '#13b42b',
        INFO:            '#209ca9',
        WARNING:         '#ec531f',
        DANGER:          '#e31e62'

    };

    var $html = $('html'),
        $body_html = $('body, html'),
        $body = $('body');

    var DAYS_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var MONTHS_NAMES = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];


    /* -------------------------------------------------------------------------------------------------------------- *
     * Is Mobile
     * -------------------------------------------------------------------------------------------------------------- */

    var uaTest = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
        isMobile = uaTest.test(navigator.userAgent);

    $html.addClass(isMobile ? 'mobile' : 'no-mobile');


    /* -------------------------------------------------------------------------------------------------------------- *
     * Prevent empty anchors
     * -------------------------------------------------------------------------------------------------------------- */

    $('a[href="#"]').on('click', function(e) {
        e.preventDefault();
    });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Smooth scrolling
     * -------------------------------------------------------------------------------------------------------------- */

    $('.smooth-scroll:not([href="#"])').on('click', function(e) {

        e.preventDefault();

        var $this = $(this),
            target = $this.attr('href');

        if (target === 'undefined') return;

        var $target = $(target);
        if ($target.length === 0) return;

        var offset = $target.offset().top || 0;

        $.scrollWindow(offset - 60);

    });

    $.scrollWindow = function(offset) {
        $body_html.animate({ scrollTop: offset }, 750);
    };


    /* -------------------------------------------------------------------------------------------------------------- *
     * Dropdown animation
     * -------------------------------------------------------------------------------------------------------------- */

    if (!isMobile) {

        $('.dropdown')
            .on('show.bs.dropdown', function() {
                $(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
            })
            .on('hide.bs.dropdown', function() {
                $(this).find('.dropdown-menu').first().stop(true, true).slideUp('fast');
            });
    }


    /* -------------------------------------------------------------------------------------------------------------- *
     * Tooltips
     * -------------------------------------------------------------------------------------------------------------- */

    $('[data-toggle=\'tooltip\']').attr('data-animation', true).tooltip({ container: 'body' });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Popovers
     * -------------------------------------------------------------------------------------------------------------- */

    $('[data-toggle="popover"]').popover();


    /* -------------------------------------------------------------------------------------------------------------- *
     * Malihu CustomScrollbar
     * -------------------------------------------------------------------------------------------------------------- */

    var isCustomScrollbarInitialized = false;

    function initCustomScrollbar() {

        if (isCustomScrollbarInitialized) return;

        $('.custom-scrollbar').mCustomScrollbar({
            scrollInertia: 150,
            height       : '100%',
            axis         : 'y'
        });

        isCustomScrollbarInitialized = true;
    }

    function destroyCustomScrollbar() {

        if (!isCustomScrollbarInitialized) return;

        $('.custom-scrollbar').mCustomScrollbar('destroy');

        isCustomScrollbarInitialized = false;
    }

    function toggleCustomScrollbar() {

        var windowWidth = $(window).width();

        if (windowWidth < 768) destroyCustomScrollbar();
        else initCustomScrollbar();

    }

    $(window).on('resize', toggleCustomScrollbar);
    toggleCustomScrollbar();


    /* -------------------------------------------------------------------------------------------------------------- *
     * Circle progress
     * -------------------------------------------------------------------------------------------------------------- */

    // Change defaults
    $.circleProgress.defaults.size = 130;
    $.circleProgress.defaults.thickness = 3;

    $('.progress-circle').each(function() {

        var params = {};

        var $progress = $(this),
            progress_value = $progress.data('progress-circle-value');

        // Value - REQUIRED
        if (progress_value === 'undefined') return;

        params.value = progress_value;

        // Contextual color classes
        if ($progress.hasClass('progress-circle-default')) params.fill = { color: hex2RGBA(THEME_COLORS.DEFAULT, 100) };
        if ($progress.hasClass('progress-circle-primary')) params.fill = { color: hex2RGBA(THEME_COLORS.PRIMARY, 100) };
        if ($progress.hasClass('progress-circle-info'))    params.fill = { color: hex2RGBA(THEME_COLORS.INFO   , 100) };
        if ($progress.hasClass('progress-circle-success')) params.fill = { color: hex2RGBA(THEME_COLORS.SUCCESS, 100) };
        if ($progress.hasClass('progress-circle-warning')) params.fill = { color: hex2RGBA(THEME_COLORS.WARNING, 100) };
        if ($progress.hasClass('progress-circle-danger'))  params.fill = { color: hex2RGBA(THEME_COLORS.DANGER , 100) };

        var progress_target = $progress.data('progress-circle-target');
        if (progress_target === 'undefined') return;

        $progress.circleProgress(params);

        var $target = $(progress_target);

        if ($target.length > 0)  {

            $progress.on('circle-animation-progress', function(event, progress, stepValue) {
                $target.html(parseInt((stepValue.toFixed(2).substr(1) * 100).toString(), 10));
            });
        }

    });


    /* -------------------------------------------------------------------------------------------------------------- *
     * jQueryUI Slide range
     * -------------------------------------------------------------------------------------------------------------- */

    $('.slider-range').each(function() {

        var $this = $(this),
            $val = $($this.attr('data-range-value')),
            min = parseInt($this.attr('data-range-min'), 10),
            max = parseInt($this.attr('data-range-max'), 10);

        $this.slider({
            range: 'max',
            step: 1,
            min: min,
            max: max,
            values: [min],
            slide: function(event, ui) {
                $val.val(ui.values[0]);
            }
        });

        $val.val(min);

    });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Sidebar navigation
     * -------------------------------------------------------------------------------------------------------------- */

    if (isMobile) {
        $body.removeClass('sidebar-expanded');
    }

    $('.sb-dropdown-toggleOLD').on('click', function(e) {

        e.preventDefault();
        e.stopPropagation();

        var $this = $(this),
            $parent = $this.parent();

        if ($parent.hasClass('sb-dropdown-open')) {
            $this.removeClass('sb-dropdown-toggle-open');
            $parent.removeClass('sb-dropdown-open');
        } else {
            $this.addClass('sb-dropdown-toggle-open');
            $parent.addClass('sb-dropdown-open');
        }

    });


    $('.sb-dropdown-toggle').on('click', function(e) {

        // Prevent events
        e.preventDefault();

        var $parent = $(this).parent(),
            $collapse = $parent.find('.collapse');

        if ($parent.hasClass('sb-dropdown-open')) {
            $parent.removeClass('sb-dropdown-open');
            $collapse.collapse('hide');
        } else {

            $body.addClass('sidebar-expanded');
            $('.sidebar-toggle').addClass('open');

            $parent.addClass('sb-dropdown-open');
            $collapse.collapse('show');
        }

    });



    /* -------------------------------------------------------------------------------------------------------------- *
     * Sidebar toggle
     * -------------------------------------------------------------------------------------------------------------- */

    $('.sidebar-toggle').on('click', function(e) {

        e.preventDefault();
        e.stopPropagation();

        var $this = $(this);

        if ($body.hasClass('sidebar-expanded')) {

            $this.removeClass('open');
            $body.removeClass('sidebar-expanded');

            $('.sidebar').find('.collapse').collapse('hide').parent().removeClass('sb-dropdown-open');

        } else {
            $this.addClass('open');
            $body.addClass('sidebar-expanded');
        }

    });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Sidebar search form
     * -------------------------------------------------------------------------------------------------------------- */

    var $sidebarSearchForm = $('.sidebar-search-form');

    $sidebarSearchForm.find('.form-control')
        .on('focus', function() {
            $sidebarSearchForm.addClass('focus');
        });

    // onBlur event imitation (if button events not handled, bubble!)
    $(document).mouseup(function (event) {
        if ($sidebarSearchForm.has(event.target).length === 0 &&
            $sidebarSearchForm.hasClass('focus')){
            $sidebarSearchForm.removeClass('focus');
        }
    });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Widgets: general styles
     * -------------------------------------------------------------------------------------------------------------- */

    $('.widget').each(function() {

        // This widget object
        var $widget = $(this);

        // Widget controls: toggle
        var $widgetControls = $widget.find('[data-widget-toggle="layer"]'),
        // Widget controls: close
            $widgetClosers = $widget.find('[data-widget-toggle="close-layer"]');

        // Layer toggle controls
        $widgetControls.on('click', function(e) {

            // Prevent events
            e.preventDefault();

            // Widget control parent widget
            var $wcWidget = $($(this).data('widget')),
            // Widget target layer
                $wcTarget = $($(this).data('widget-target'));

            // Required
            if ($wcWidget.length === 0 || $wcTarget.length === 0) return;

            // Hide active layer widget
            // $wcWidget.find('.widget-layer:not(.widget-layer-main).widget-layer-active').removeClass('widget-layer-active');

            // Set new active layer
            $wcTarget.addClass('widget-layer-active');

        });


        // Layer toggle controls
        $widgetClosers.on('click', function(e) {

            // Prevent events
            e.preventDefault();

            // Widget control parent widget
            var $wcWidget = $($(this).data('widget')),
            // Widget target layer
                $wcTarget = $wcWidget.find($(this).data('widget-target'));

            // Required
            if ($wcTarget.length === 0) return;

            // Hide active layer widget
            $wcTarget.removeClass('widget-layer-active');

        });

    });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Widget: project feed
     * -------------------------------------------------------------------------------------------------------------- */

    $('.widget-project-feed').find('.wg-project .wg-project-heading').on('click', function(e) {

        // Prevent events
        e.preventDefault();

        var $parent = $(this).parent(),
            $collapse = $parent.find('.wg-project-body.collapse');

        if ($parent.hasClass('open')) {
            $parent.removeClass('open');
            $collapse.collapse('hide');
        } else {
            $parent.addClass('open');
            $collapse.collapse('show');
        }

    });

    // Add file button handler
    $('#widget-project-feed-create-form-files-add').on('click', function(e) {

        // Prevent events
        e.preventDefault();

        var $inputGroup = $(this).parent().parent(),
            $filesField = $inputGroup.find('[name="files[]"]'),
            $wrapper    = $('#widget-project-feed-create-form-files-wrapper');

        // Required
        if ($filesField.length === 0 || $wrapper.length === 0) return;

        // Field value
        var fieldValue = $filesField.val();

        // Required
        if (fieldValue === '') {
            // Set focus
            $filesField.focus();
            // Return
            return;
        }

        // Output html
        var html = '<div class="input-group" style="display: none">' +
                   '    <input type="text" name="files[]" class="form-control" placeholder="Filename" readonly value="' + fieldValue + '">' +
                   '    <div class="input-group-btn">' +
                   '        <button type="button" class="btn btn-primary btn-t widget-project-feed-create-form-files-remove">' +
                   '            <i class="icon fa fa-times"></i>' +
                   '        </button>' +
                   '    </div>' +
                   '</div>';

        // jQuery object
        var $html = $(html);

        // Append file
        $wrapper.append($html);

        // Remove input group button
        $html.find('.widget-project-feed-create-form-files-remove').on('click', function(e) {

            // Prevent events
            e.preventDefault();

            // Input group element
            var $el = $(this).parent().parent();

            // FadeOut
            $el.fadeOut();

            // Remove after 500ms delay
            setTimeout($el.remove, 500);

        });

        $html.fadeIn();

        // Clear field
        $filesField.val('');
        // Set focus
        $filesField.focus();

    });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Widget: Task list
     * -------------------------------------------------------------------------------------------------------------- */

    var $widgetTasks = $('.widget-tasks');

    $widgetTasks.find('.wg-task-item .wg-task-item-toggle').on('click', function(e) {

        // Prevent events
        e.preventDefault();

        var $parent = $(this).parent().parent().parent().parent(),
            $collapse = $parent.find('.wg-task-item-body.collapse');

        if ($parent.hasClass('open')) {
            $parent.removeClass('open');
            $collapse.collapse('hide');
        } else {
            $parent.addClass('open');
            $collapse.collapse('show');
        }

    });

    $widgetTasks.find('.wg-task-item .wg-task-item-remove').on('click', function(e) {
        // Prevent events
        e.preventDefault();
        var $taskItem = $(this).parent().parent().parent().parent();
        $taskItem.fadeOut();
        setTimeout(function() { $taskItem.remove() }, 500);
    });

    function wgTaskItemChangeState() {

        var isChecked = Number(this.checked),
            $rowTask = $(this).parent().parent().parent();

        if ($rowTask === 'undefined' || $rowTask.length === 0) return;

        if (isChecked) $rowTask.addClass('wg-task-item-completed');
        else $rowTask.removeClass('wg-task-item-completed');
    }

    $('.wg-task-control')
        .on('change', wgTaskItemChangeState)
        .each(wgTaskItemChangeState);


    /* -------------------------------------------------------------------------------------------------------------- *
     * Widget: chat
     * -------------------------------------------------------------------------------------------------------------- */

    $('.chat-toggle').on('click', function(e) {

        // Prevent events
        e.preventDefault();

        // Toggle
        $('.chat').toggleClass('chat-open');

    });

    $('.chat-close').on('click', function(e) {

        // Prevent events
        e.preventDefault();

        // Toggle
        $('.chat').removeClass('chat-open');

    });

    $('.chat').find('.wg-message-input')
        .on('focus', function() {
            $(this).parent().parent().addClass('focus');
        })
        .on('blur', function() {
            $(this).parent().parent().removeClass('focus');
        });


    /* -------------------------------------------------------------------------------------------------------------- *
     * Widget: users list
     * -------------------------------------------------------------------------------------------------------------- */

    $('.widget-users-list').find('.wg-input')
        .on('focus', function() {
            $(this).parent().parent().addClass('focus');
        })
        .on('blur', function() {
            $(this).parent().parent().removeClass('focus');
        });



    /* -------------------------------------------------------------------------------------------------------------- *
     * Demo content: jqvmap
     * -------------------------------------------------------------------------------------------------------------- */

    var $widgetSalesRegions = $('#widget-sales-regions');

    var vectorMapWorldRegionsList = ['AE', 'AF', 'AG', 'AL', 'AM', 'AO', 'AR', 'AT', 'AU', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BI', 'BJ', 'BN', 'BO', 'BR', 'BS', 'BT', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'I', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GH', 'GL', 'GM', 'GN', 'GQ', 'GR', 'GT', 'GW', 'GY', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IN', 'IQ', 'IR', 'IS', 'IT', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KM', 'KN', 'KP', 'KR', 'KW', 'KZ', 'A', 'LB', 'LC', 'LK', 'LR', 'LS', 'LT', 'LV', 'LY', 'MA', 'MD', 'MG', 'MK', 'ML', 'MM', 'MN', 'MR', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NG', 'NI', 'NL', 'NO', 'NP', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SI', 'SK', 'SL', 'SN', 'SO', 'SR', 'ST', 'SV', 'SY', 'SZ', 'TD', 'TG', 'TH', 'TJ', 'TL', 'TM', 'TN', 'TR', 'TT', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VE', 'VN', 'VU', 'YE', 'ZA', 'ZM', 'ZW'];
    var vectorMapWorldRegionsListMax = vectorMapWorldRegionsList.length - 1;
    var vectorMapRegionsColors = [];
    var tmpRegion,
        tmpRegionValue,
        tmpRegionColor,
        tmpRegionColorOpacity;

    for (i = 0, l = 50; i < l; i++) {

        tmpRegion = (vectorMapWorldRegionsList[getRandomNumber(0,  vectorMapWorldRegionsListMax)]).toLowerCase();

        tmpRegionValue = getRandomNumber(500, 1000);

        if      (tmpRegionValue >= 500 && tmpRegionValue < 600)   tmpRegionColor = THEME_COLORS.PRIMARY;
        else if (tmpRegionValue >= 600 && tmpRegionValue < 700)   tmpRegionColor = THEME_COLORS.DEFAULT;
        else if (tmpRegionValue >= 700 && tmpRegionValue < 800)   tmpRegionColor = THEME_COLORS.SUCCESS;
        else if (tmpRegionValue >= 800 && tmpRegionValue < 900)   tmpRegionColor = THEME_COLORS.WARNING;
        else if (tmpRegionValue >= 900 && tmpRegionValue <= 1000) tmpRegionColor = THEME_COLORS.DANGER;

        tmpRegionColorOpacity = Math.max(tmpRegionValue % 100 / 100, .6) * 100;

        vectorMapRegionsColors[tmpRegion] = hex2RGBA(tmpRegionColor, tmpRegionColorOpacity);

    }

    var $widgetSalesRegionsMap = $('#demo-jqvmap');

    if ($widgetSalesRegionsMap.length > 0) {
        $widgetSalesRegionsMap.vectorMap({

            map: 'world_en',

            backgroundColor: '#fff',
            borderColor: '#fff',
            borderOpacity: 0.25,
            borderWidth: 1,

            color: hex2RGBA(THEME_COLORS.DEFAULT, 100),
            hoverColor: THEME_COLORS.PRIMARY,

            colors: vectorMapRegionsColors,

            enableZoom: true,

            hoverOpacity: .8,

            normalizeFunction: 'linear',

            scaleColors: ['#b6d6ff', '#005ace'],

            selectedColor: THEME_COLORS.PRIMARY,

            selectedRegions: null,

            showTooltip: true,

            onRegionClick: function(element, code, region) {

                var $loader = $('<div>').addClass('loader');

                $widgetSalesRegions.find('.wg-left').append($loader);
                $loader.fadeIn();


                setTimeout(function() {

                    $widgetSalesRegions.find('.wg-region-name').html(region);

                    // Random data
                    var cntOrders    = getRandomNumber(100, 999),
                        cntSales     = getRandomNumber(100, 999),
                        cntCustomers = getRandomNumber(100, 999),
                        diffSummary  = getRandomNumber(1, 100);


                    $widgetSalesRegions.find('.wg-orders-value').html(cntOrders);
                    $widgetSalesRegions.find('.wg-sales-value').html(cntSales);
                    $widgetSalesRegions.find('.wg-customers-value').html(cntCustomers);
                    $widgetSalesRegions.find('.wg-summary .wg-value').html(diffSummary);

                    $loader.fadeOut();

                    setTimeout(function() { $loader.remove(); }, 300);

                }, 500);

            }

        });
    }

    var $widgetSalesRegionsHeight = $widgetSalesRegions.css('height');

    function setWidgetSalesRegionsHeight() {

        if (typeof $widgetSalesRegionsHeight === 'undefined') return;

        if ($(window).width() < 992) {
            $widgetSalesRegions.css('height', '');
        } else {
            $widgetSalesRegions.css('height', $widgetSalesRegionsHeight);
        }
    }

    setWidgetSalesRegionsHeight();
    $(window).on('resize', setWidgetSalesRegionsHeight);



    /* -------------------------------------------------------------------------------------------------------------- *
     * Demo content: calendar
     * -------------------------------------------------------------------------------------------------------------- */

    $('.wg-calendar-wrapper').calendar({

        onRender: function(month, year) {
            $('#widget-calendar-month-year').html(month + ' ' + year);
        }

    });

    var $widgetCalendar = $('#widget-calendar');
    var currentDate = new Date();

    $widgetCalendar.find('.wg-today-number').html(currentDate.getDate());
    $widgetCalendar.find('.wg-today-week-day').html(DAYS_NAMES[currentDate.getDay()]);
    $widgetCalendar.find('.wg-today-month').html(MONTHS_NAMES[currentDate.getMonth()]);
    $widgetCalendar.find('.wg-today-year').html(currentDate.getFullYear());


    /* -------------------------------------------------------------------------------------------------------------- *
     * Demo content: chart - latest campaign
     * -------------------------------------------------------------------------------------------------------------- */

    var widgetSalesStatChartData = [],
        i, l;

    var $widgetSalesStatChartDay = $('#widget-sales-stat-chart-day');
    if ($widgetSalesStatChartDay.length > 0) {

        widgetSalesStatChartData = [];

        for (i = 0, l = 7; i < l; i++) {
            widgetSalesStatChartData.push(getRandomNumber(100, 300));
        }


        new Chart($widgetSalesStatChartDay, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: ' Current week visits',
                    data: widgetSalesStatChartData,
                    backgroundColor: hex2RGBA(THEME_COLORS.DEFAULT, 5),
                    borderColor: hex2RGBA(THEME_COLORS.DEFAULT, 100),
                    borderWidth: 1.5,
                    pointRadius: 3,
                    pointHitRadius: 5,
                    lineTension: 0
                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    xAxes: [{ display: false }],
                    yAxes: [{ display: false }]
                }
            }
        });
    }


    var $widgetSalesStatChartMonth = $('#widget-sales-stat-chart-month');
    if ($widgetSalesStatChartMonth.length > 0) {

        widgetSalesStatChartData = [];

        for (i = 0, l = 5; i < l; i++) {
            widgetSalesStatChartData.push(getRandomNumber(100, 300));
        }


        new Chart($widgetSalesStatChartMonth, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: ' Current week visits',
                    data: widgetSalesStatChartData,
                    backgroundColor: hex2RGBA(THEME_COLORS.SUCCESS, 5),
                    borderColor: hex2RGBA(THEME_COLORS.SUCCESS, 100),
                    borderWidth: 1.5,
                    pointRadius: 3,
                    pointHitRadius: 5,
                    lineTension: 0
                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    xAxes: [{ display: false }],
                    yAxes: [{ display: false }]
                }
            }
        });
    }


    var $widgetSalesStatChartYear = $('#widget-sales-stat-chart-year');
    if ($widgetSalesStatChartYear.length > 0) {

        widgetSalesStatChartData = [];

        for (i = 0, l = 5; i < l; i++) {
            widgetSalesStatChartData.push(getRandomNumber(100, 300));
        }


        new Chart($widgetSalesStatChartYear, {
            type: 'line',
            data: {
                labels: ['2014', '2015', '2016', '2017', '2018'],
                datasets: [{
                    label: ' Current week visits',
                    data: widgetSalesStatChartData,
                    backgroundColor: hex2RGBA(THEME_COLORS.PRIMARY, 5),
                    borderColor: hex2RGBA(THEME_COLORS.PRIMARY, 100),
                    borderWidth: 1.5,
                    pointRadius: 3,
                    pointHitRadius: 5,
                    lineTension: 0
                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    xAxes: [{ display: false }],
                    yAxes: [{ display: false }]
                }
            }
        });
    }


    /* -------------------------------------------------------------------------------------------------------------- *
     * Demo content: char - site visits
     * -------------------------------------------------------------------------------------------------------------- */


    var $widgetSiteVisitsChart = $('#widget-site-visits-chart');
    if ($widgetSiteVisitsChart.length > 0) {

        new Chart($widgetSiteVisitsChart, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: ' Current week visits',
                    data: getRandomDataArray(0, 800, 7),
                    backgroundColor: hex2RGBA(THEME_COLORS.DEFAULT, 100)
                }, {
                    label: ' Target visits',
                    data: getRandomDataArray(500, 700, 7),
                    backgroundColor: hex2RGBA(THEME_COLORS.DANGER, 100)
                }]
            },
            options: {
                responsive: true,
                legend: { display: false },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                            zeroLineColor: 'transparent'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 1000,
                            stepSize: 250,
                            beginAtZero: true
                        },
                        gridLines: {
                            zeroLineColor: 'transparent'
                        }
                    }]
                }
            }
        });
    }

    var $widgetTrafficSourcesChart = $('#widget-traffic-sources-chart');
    if ($widgetTrafficSourcesChart.length > 0) {

        new Chart($widgetTrafficSourcesChart, {
            type: 'doughnut',
            data: {
                labels: ['PC', 'Tablet', 'Mobile'],
                datasets: [{
                    label: ' CPU usage',
                    data: getRandomDataArray(700, 1000, 3),
                    backgroundColor: [
                        hex2RGBA(THEME_COLORS.INFO,    90),
                        hex2RGBA(THEME_COLORS.SUCCESS, 90),
                        hex2RGBA(THEME_COLORS.DANGER,  90)
                    ],
                    borderColor: '#fff',
                    hoverBorderColor: '#fff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                }
            }
        });
    }


    /* -------------------------------------------------------------------------------------------------------------- *
     * Charts, documentation page
    /* -------------------------------------------------------------------------------------------------------------- */

    /*
     * Line Chart
     * ========== */

    var $demo_chart_line = $('#demo-chart-line');
    if ($demo_chart_line.length > 0) {
        new Chart($demo_chart_line, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: ' Current Week Visits',
                    data: [879, 980, 594, 398, 1345, 1101, 1469],
                    backgroundColor: hex2RGBA(THEME_COLORS.PRIMARY, 100),
                    borderColor: hex2RGBA(THEME_COLORS.PRIMARY, 100),
                    borderWidth: 3,
                    pointRadius: 3,
                    pointHitRadius: 5,
                    fill: false
                }, {
                    label: ' Last Week Visits',
                    data: [787, 591, 398, 402, 786, 978, 1150],
                    backgroundColor: hex2RGBA(THEME_COLORS.SECONDARY, 100),
                    borderColor: hex2RGBA(THEME_COLORS.SECONDARY, 100),
                    borderWidth: 3,
                    pointRadius: 3,
                    pointHitRadius: 5,
                    fill: false
                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    xAxes: [{
                        gridLines: {
                            zeroLineColor: 'transparent'
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            drawTicks: false,
                            display: false
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    /*
     * Bar Chart
     * ========= */

    var $demo_chart_bar = $('#demo-chart-bar');
    if ($demo_chart_bar.length > 0) {
        new Chart($demo_chart_bar, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: ' Current Week Visits',
                    data: [879, 980, 594, 398, 1345, 1101, 1469],
                    backgroundColor: [
                        hex2RGBA(THEME_COLORS.PRIMARY, 100),
                        hex2RGBA(THEME_COLORS.INFO, 100),
                        hex2RGBA(THEME_COLORS.SUCCESS, 100),
                        hex2RGBA(THEME_COLORS.WARNING, 100),
                        hex2RGBA(THEME_COLORS.DARK, 100),
                        hex2RGBA(THEME_COLORS.DANGER, 100),
                        hex2RGBA(THEME_COLORS.PRIMARY, 100)
                    ],
                    borderColor: [
                        hex2RGBA(THEME_COLORS.PRIMARY, 100),
                        hex2RGBA(THEME_COLORS.INFO, 100),
                        hex2RGBA(THEME_COLORS.SUCCESS, 100),
                        hex2RGBA(THEME_COLORS.WARNING, 100),
                        hex2RGBA(THEME_COLORS.DARK, 100),
                        hex2RGBA(THEME_COLORS.DANGER, 100),
                        hex2RGBA(THEME_COLORS.PRIMARY, 100)
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{ ticks: { beginAtZero:true } }]
                }
            }
        });
    }

    /*
     * Radar Chart
     * =========== */

    var $demo_chart_radar = $('#demo-chart-radar');
    if ($demo_chart_radar.length > 0) {
        new Chart($demo_chart_radar, {
            type: 'radar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {

                        label: ' Current Week Visits',
                        backgroundColor: hex2RGBA(THEME_COLORS.SECONDARY, 50),

                        borderWidth: 1,
                        borderColor: hex2RGBA(THEME_COLORS.SECONDARY, 70),

                        pointBackgroundColor: hex2RGBA(THEME_COLORS.SECONDARY, 70),
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: hex2RGBA(THEME_COLORS.SECONDARY, 70),

                        data: [879, 891, 1054, 398, 1345, 1101, 1469]
                    },
                    {

                        label: ' Last Week Visits',
                        backgroundColor: hex2RGBA(THEME_COLORS.DARK, 50),

                        borderWidth: 1,
                        borderColor: hex2RGBA(THEME_COLORS.DARK, 70),

                        pointBackgroundColor: hex2RGBA(THEME_COLORS.DARK, 70),
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: hex2RGBA(THEME_COLORS.DARK, 70),

                        data: [1500, 891, 398, 1000, 786, 978, 1150]
                    }
                ]
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{
                        display: false,
                        ticks: { beginAtZero: true }
                    }]
                }
            }
        });
    }

    /*
     * Polar Area Chart
     * ================ */

    var $demo_chart_polar_area_preview = $('#demo-chart-polar-area-preview');
    if ($demo_chart_polar_area_preview.length > 0) {
        new Chart($demo_chart_polar_area_preview, {
            type: 'polarArea',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                datasets: [{
                    label: ' Current Week Visits',
                    data: [879, 980, 594, 398, 1345, 1101],
                    backgroundColor: [
                        hex2RGBA(THEME_COLORS.PRIMARY, 100),
                        hex2RGBA(THEME_COLORS.INFO, 100),
                        hex2RGBA(THEME_COLORS.SUCCESS, 100),
                        hex2RGBA(THEME_COLORS.WARNING, 100),
                        hex2RGBA(THEME_COLORS.DANGER, 100),
                        hex2RGBA(THEME_COLORS.DARK, 100)
                    ],
                    borderColor: '#fff',
                    hoverBorderColor: '#fff',
                    borderWidth: 1,
                    highlight: "#A8B3C5"
                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{ ticks: { beginAtZero: true } }]
                }
            }
        });
    }

    var $demo_chart_polar_area = $('#demo-chart-polar-area');
    if ($demo_chart_polar_area.length > 0) {
        new Chart($demo_chart_polar_area, {
            type: 'polarArea',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                datasets: [{
                    label: ' Current Week Visits',
                    data: [879, 980, 594, 398, 1345, 1101],
                    backgroundColor: [
                        hex2RGBA(THEME_COLORS.PRIMARY, 100),
                        hex2RGBA(THEME_COLORS.INFO, 100),
                        hex2RGBA(THEME_COLORS.SUCCESS, 100),
                        hex2RGBA(THEME_COLORS.WARNING, 100),
                        hex2RGBA(THEME_COLORS.DANGER, 100),
                        hex2RGBA(THEME_COLORS.DARK, 100)
                    ],
                    borderColor: '#fff',
                    hoverBorderColor: '#fff',
                    borderWidth: 1,
                    highlight: "#A8B3C5"
                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{ ticks: { beginAtZero: true } }]
                }
            }
        });
    }

    /*
     * Pie Chart
     * ========= */

    var $demo_chart_pie = $('#demo-chart-pie');
    if ($demo_chart_pie.length > 0) {
        new Chart($demo_chart_pie, {
            type: 'pie',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    label: ' Current Week Visits',
                    data: [879, 980, 594, 398, 1345],
                    backgroundColor: [
                        hex2RGBA(THEME_COLORS.PRIMARY, 100),
                        hex2RGBA(THEME_COLORS.INFO, 100),
                        hex2RGBA(THEME_COLORS.SUCCESS, 100),
                        hex2RGBA(THEME_COLORS.DANGER, 100),
                        hex2RGBA(THEME_COLORS.DARK,100)
                    ],
                    borderColor: '#fff',
                    hoverBorderColor: '#fff',
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                title: {
                    display : true,
                    text    : 'Pie chart',
                    fontSize: 14,
                    color   : '#555'
                }
            }
        });
    }

    /*
     * Doughnut Chart
     * ============== */

    var $demo_chart_doughnut = $('#demo-chart-doughnut');
    if ($demo_chart_doughnut.length > 0) {
        new Chart($demo_chart_doughnut, {
            type: 'doughnut',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    label: ' Current Week Visits',
                    data: [879, 980, 594, 398, 1345],
                    backgroundColor: [
                        hex2RGBA(THEME_COLORS.PRIMARY, 100),
                        hex2RGBA(THEME_COLORS.INFO, 100),
                        hex2RGBA(THEME_COLORS.SUCCESS, 100),
                        hex2RGBA(THEME_COLORS.DANGER, 100),
                        hex2RGBA(THEME_COLORS.DARK, 100)
                    ],
                    borderColor: '#fff',
                    hoverBorderColor: '#fff',
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                title: {
                    display : true,
                    text    : 'Doughnut chart',
                    fontSize: 14,
                    color   : '#555'
                }
            }
        });
    }



    /* -------------------------------------------------------------------------------------------------------------- *
     * Finish loading
     * -------------------------------------------------------------------------------------------------------------- */

    $(window).on('load', function() {

        $('body').addClass('loaded');

        setTimeout(function() {
            $('.preloader').fadeOut('slow');
        }, 300);

    });

})(jQuery);
