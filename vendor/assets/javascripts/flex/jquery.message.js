/*jslint nomen: true, unparam: true, regexp: true, indent: 2 */
/*global jQuery, document, window */

var Flex = Flex || {};

(function ($) {

  'use strict';
  var Message = {};

  Message.init = function (options, elem) {
    var self    = this;

    this.options = $.extend({}, this.defaults, options, $(elem).data());
    this.element = elem;

    $(this.element).click(function (e) {
      e.preventDefault();
      $(this).parent().remove();
    });

    return this;
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

  $.plugin('message', Message);

  $(document).ready(function () {
    $('.msg a.cls').message();
  });

  Flex.Message = Message;

}(jQuery, window, document));
