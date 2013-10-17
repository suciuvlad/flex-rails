/*jslint nomen: true, unparam: true, regexp: true, indent: 2 */
/*global jQuery, document, window */

var Flex = Flex || {};

(function ($) {

  'use strict';
  var Tab = {};

  Tab.defaults = {
    triggerfirst: true
  };

  Tab.init = function (options, elem) {
    var self    = this;

    this.options = $.extend({}, this.defaults, options, Tab.defaults, $(elem).data());

    this.element        = elem;
    this.anchors        = $(this.element).find('.js-tab--nav a, .js-tab--nav--btn');
    this.tabContainers  = $(this.element).find('.js-tab--container');

    this._onTrigger();

    return this;
  };

  Tab._onTrigger = function (hash) {
    var self = this;

    this.anchors.click(function (e) {
      if (this.nodeName !== "LABEL") {
        e.preventDefault();
      }

      var hash = $(this).attr("href") || $(this).data('target');

      if (this.nodeName !== "LABEL") {
        if (hash.charAt(0) !== "#" || $(this).parent().hasClass('is-tab-active')) {
          return false;
        }
      }

      self.showTab(hash);

      $(self.element).find(".js-tab--nav > *").removeClass('is-tab-active');
      $(this).parent().addClass('is-tab-active');
      
    });

    if (this.options.triggerfirst) {
      this.anchors.filter(':first').click();
    }
  };

  Tab.showTab = function (hash) {
    this.tabContainers.hide().filter(hash).show();
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

  $.plugin('tab', Tab);

  $('[data-trigger=tab]').tab();
  Flex.Tab = Tab;
}(jQuery, window, document));
