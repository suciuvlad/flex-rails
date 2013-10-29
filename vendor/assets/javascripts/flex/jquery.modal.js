/*jslint nomen: true, unparam: true, regexp: true, indent: 2 */
/*global jQuery, document, window */

var Flex = Flex || {};

(function ($) {

  'use strict';
  var Modal = {};

  Modal.defaults = {
    clickOverlay: true,
    closeButton:  true,
    keyEscape:    true
  };

  Modal.init = function (options, elem) {
    var self    = this,
      overlay = $('.mdl--overlay');

    this.options = $.extend({}, this.defaults, options, $(elem).data());

    this.element = elem;

    if (overlay.length === 0) {
      overlay = $('<div class="mdl--overlay" />').appendTo('body');
    }

    this._overlay = overlay;

    $(this.element).bind('modal:open', function () {
      $(this).addClass('is-shown');
      overlay.addClass('is-shown');
    });

    $(this.element).bind('modal:close', function () {
      $(this).removeClass('is-shown');
      overlay.removeClass('is-shown');
    });

    this.onCloseButton();
    this.onKeyEscape();
    this.onClickOverlay();


    return this;
  };

  Modal.onCloseButton = function () {
    var self = this;

    if (this.options.closeButton) {
      $('.mdl--close').on('click', function (e) {
        e.preventDefault();
        $(self.element).trigger('modal:close');
      });
    }
  };

  Modal.onKeyEscape = function () {
    var self = this;

    if (this.options.keyEscape) {
      $('body').keyup(function (e) {
        if (e.which === 27) {
          $(self.element).trigger('modal:close');
        }
      });
    }
  };

  Modal.onClickOverlay = function () {
    var self = this;

    if (this.options.clickOverlay) {
      self._overlay.on('click', function () {
        $(self.element).trigger('modal:close');
      });
    }
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

  $.plugin('modal', Modal);

  $(document).ready(function () {
    $('.mdl').modal();

    $('[data-modal-trigger]').live('click', function (e) {
      e.preventDefault();
      var modal = $(this).attr('data-modal-trigger');
      $('#' + modal).trigger('modal:open');
    });
  });

  Flex.modal = Modal;
}(jQuery, window, document));
