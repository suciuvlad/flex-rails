/*jslint nomen: true, unparam: true, regexp: true, indent: 2 */
/*global jQuery, document, window */

var Flex = Flex || {};

(function ($) {

  'use strict';
  var Collapse = {};

  Collapse.init = function (options, elem) {
    var self    = this;

    this.options = $.extend({}, this.defaults, options, $(elem).data());

    this.element  = elem;
    this.target = this.options.target;

    this._onToggle();

    return this;
  };

  Collapse._onToggle = function () {
    var self = this;

    $(this.element).click(function (e) {
      e.preventDefault();

      $(self.target).toggleClass('is-expanded');
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

  $.plugin('collapse', Collapse);
  $('[data-trigger=collapse]').collapse();

  Flex.Collapse = Collapse;
}(jQuery, window, document));
