/* ------------------------------------------------------------------------------------------------------------------ *
 *
 * Template WgBoard - Responsive multipurpose HTML dashboard template
 * Version  1.0
 * Author   Valery Timofeev
 *
 * ------------------------------------------------------------------------------------------------------------------ */

+function($) {

    'use strict';

    //
    // CALENDAR CLASS DEFINITION
    // =========================

    var Calendar = function(element, options) {

        this.options = options;
        this.$element = $(element);

        this.date  = new Date();
        this.day   = this.date.getDate();
        this.month = this.date.getMonth();
        this.year  = this.date.getFullYear();

        this.activeMonth = function(month, year) {

            return {

                year : year,
                month: month,

                daysCount: function() {
                    var _this = this;
                    return new Date(_this.year, _this.month + 1, 0).getDate();
                },

                weekDay: function(d) {
                    var _this = this;
                    return new Date(_this.year, _this.month, d).getDay();
                }

            };
        };

        this._render();

    };


    // Package name
    Calendar.PACKAGE = 'lightBoard';
    // Plugin name
    Calendar.PLUGIN_NAME = 'Calendar';
    // Plugin version
    Calendar.VERSION = '1.2.1';
    // Plugin prefix (events, data, etc.)
    Calendar.PREFIX = 'lb.calendar';


    // Default plugin settings
    Calendar.DEFAULT = {

        daysNames: {
            short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            full : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        },

        monthsNames: {
            short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            full : ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December']
        },

        onRender: function() { }

    };


    //
    // CALENDAR 'PRIVATE' METHODS
    // ==========================

    Calendar.prototype._getHeader = function() {

        var $thead = $('<thead>').addClass('wg-calendar-header'),
            $tr    = $('<tr>').addClass('wg-calendar-row');

        for (var i = 0; i < this.options.daysNames.short.length; i++) {

            $tr.append(
                $('<th>')
                    .addClass('wg-calendar-col' + (i === 0 || i === 6 ? ' wg-calendar-col-holiday' : ''))
                    .html(this.options.daysNames.short[i])
            );

        }

        $thead.append($tr);
        return $thead;
    };

    Calendar.prototype._getCalendar = function(month, year) {

        var $tbody = $('<thead>').addClass('wg-calendar-body');

        var currentMonth = this.month,
            currentDay   = this.day,
            currentYear  = this.year;

        var condYearMonth = currentMonth === month && currentYear === year;

        var activeMonth = this.activeMonth(month, year),
            cntDays = activeMonth.daysCount(),
            day = 1;

        while (day <= cntDays) {

            var $tr = $('<tr>');

            for (var i = 0; i < 7; i++) {

                var $td = $('<td>').addClass('wg-calendar-col'),
                    $span = $('<span>').addClass('wg-calendar-col-day');

                $td.append($span);

                if (i === 0 || i === 6) {
                    $td.addClass('wg-calendar-col-holiday');
                }

                if (activeMonth.weekDay(day) === i) {

                    if (condYearMonth && currentDay === day) {
                        $td.addClass('wg-calendar-col-today');
                    }

                    $span.html(day);
                    day++
                }

                $tr.append($td);

                if (day > cntDays) break;
            }

            $tbody.append($tr);
        }

        return $tbody;
    };

    Calendar.prototype._getWrapper = function() {
        return $('<table>').addClass('wg-calendar');
    };

    Calendar.prototype._render = function(month, year) {

        var currentDate = new Date();

        month = typeof month === 'undefined' ? currentDate.getMonth()    : month;
        year  = typeof year  === 'undefined' ? currentDate.getFullYear() : year;

        var $table = this._getWrapper(),
            $header = this._getHeader(),
            $calendar = this._getCalendar(month, year);

        $table
            .append($header)
            .append($calendar);

        this.$element.html('');
        this.$element.append($table);

        if (typeof this.options.onRender === 'function') this.options.onRender(this.getMonthName(month), year);
    };


    Calendar.prototype._getNextMonth = function(date) {

        var month = date.getMonth(),
            year  = date.getFullYear();

        var newDate = new Date(year, month, 1);
        newDate.setMonth(newDate.getMonth() + 1, 1);

        return newDate;
    };

    Calendar.prototype._getPrevMonth = function(date) {

        var month = date.getMonth(),
            year  = date.getFullYear();

        var newDate = new Date(year, month, 1);
        newDate.setMonth(newDate.getMonth() - 1, 1);

        return newDate;
    };


    //
    // CALENDAR 'PUBLIC' METHODS
    // =========================

    Calendar.prototype.setMonth = function(date) {

        var month = date.getMonth(),
            year  = date.getFullYear();

        this.date = date;
        this._render(month, year);

        return this;
    };

    Calendar.prototype.prevMonth = function() {
        return this.setMonth(this._getPrevMonth(this.date));
    };


    Calendar.prototype.nextMonth = function() {
        return this.setMonth(this._getNextMonth(this.date));
    };

    Calendar.prototype.getMonthName = function(month) {
        return this.options.monthsNames.full[month];
    };


    //
    // CALENDAR PLUGIN DEFINITION
    // ==========================

    function Plugin(opt) {

        return this.each(function() {

            var $this = $(this),
                data  = $this.data(Calendar.PREFIX),
                options = $.extend({}, Calendar.DEFAULT, $this.data(), typeof opt === 'object' && opt);

            if (!data) $this.data(Calendar.PREFIX, data = new Calendar(this, options));

            if (typeof opt === 'string') data[opt].call($this);

        });
    }


    //
    // NO CONFLICT
    // ===========

    var old = $.fn.calendar;

    $.fn.calendar = Plugin;
    $.fn.calendar.Constructor = Calendar;

    $.fn.calendar.noConflict = function() {
        $.fn.calendar = old;
        return this;
    };


    //
    // CALENDAR DATA-API
    // =================

    function clickHandler(e) {

        e.preventDefault();

        var $this = $(this),
            $target = $($this.attr('data-target'));

        var options = $.extend({}, $target.data(), $this.data());

        Plugin.call($target, options);

        var month = $this.attr('data-month') || '';

        if (month === 'prev') $target.data(Calendar.PREFIX).prevMonth();
        else if (month === 'next') $target.data(Calendar.PREFIX).nextMonth();

    }

    $(document)
        .on('click.' + Calendar.PREFIX + '.data-api', '[data-toggle="calendar"]', clickHandler)
    ;

}(jQuery);
