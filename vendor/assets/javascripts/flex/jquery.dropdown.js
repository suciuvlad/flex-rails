/*jslint nomen: true, unparam: true, regexp: true, indent: 2 */
/*global jQuery, document, window */

var Flex = Flex || {};

(function ($) {

  'use strict';

  var Dropdown = {},
    clear;

  clear = function () {
    $('.drd--toggle').parent().removeClass('is-drd-open');
  };

  Dropdown.defaults = {
    trigger: "mouseover"
  };

  Dropdown.init = function (options, elem) {
    var onEventIn,
      onEventOut,
      self = this;

    this.options = $.extend({}, this.defaults, options, $(elem).data());

    this.element  = elem;
    this.parent   = $(elem).parent();
    this.menu     = $(elem).parent().find(".drd--menu");


    $(document).on('click', function (e) {
      if ($(e.target).is('.drd--menu') || $.contains(self.menu[0], e.target)) {
        return;
      }

      clear();
    });

    this._onTrigger();

    return this;
  };

  Dropdown._onTrigger = function () {
    var self = this,
      isActive;

    $(this.element).click(function (e) {
      e.stopPropagation();
      e.preventDefault();
      var isActive  = self.parent.hasClass('is-drd-open');


      clear();
      !isActive && self.parent.toggleClass('is-drd-open');
    });
  };

  $.plugin = function (name, object) {
    $.fn[name] = function (options) {
      return this.each(function () {
        if (!$.data(this, name)) {
          $.data(this, name, Object.create(object).init(options, this));
        }
      });
    };
  };

  $.plugin('dropdown', Dropdown);

  // Deferred initialization
  if (document.addEventListener) {
    document.addEventListener("click", function (event) {
      $(event.target).closest("[data-trigger=dropdown]").dropdown();
    }, true);
  } else {
    $('[data-trigger=dropdown]').dropdown();
  }

  Flex.Dropdown = Dropdown;

}(jQuery, window, document));
