/*jslint nomen: true, unparam: true, regexp: true, indent: 2 */
/*global jQuery, document, window, Tooltip */

var Flex = Flex || {};

(function ($, Tooltip) {

  'use strict';
  var Bubble = Object.create(Tooltip); //Inherits from Tooltip

  Bubble.defaults = {
    offset:       5,
    content:      '',
    delayIn:      150,
    delayOut:     50,
    event:        "mouseover",
    target:       "",
    position:     "top",
    template:     "<div class='bbl'>" +
                    "<div class='bbl--arrow'>" +
                      "<div class='bbl--arrow--before'></div>" +
                      "<div class='bbl--arrow--after'></div>" +
                    "</div>" +
                    "<div class='bbl--content'></div>" +
                  "</div>"
  };

  Bubble.init = function (options, elem) {
    var self    = this;

    this.options = $.extend({}, this.defaults, options, $(elem).data());

    this.tooltip = this.tooltip || $(this.options.template).appendTo('body');

    this.element = elem;

    this.delayOutTimer = null;

    this._removeTitle();
    this._update(this._getContent());
    this._reposition();

    if (this.options.event === "mouseover") {
      $([this.element, this.tooltip.get(0) ]).bind('mouseover', $.proxy(this._onEventIn, this));
      $([this.element, this.tooltip.get(0) ]).bind('mouseout', $.proxy(this._onEventOut, this));
    } else {
      $(this.element).bind('focus', $.proxy(this._onEventIn, this));

      $('body').bind("mousedown", function (e) {
        var target = e.target;
        if (!$(target).is(".bbl--content")) {
          self.hide();
        }
      });

    }

    return this;
  };

  Bubble._update = function (content) {
    this.tooltip.find('.bbl--content').html(content);
  };

  Bubble._getContent = function () {
    var id = this.options.target || $(this.element).attr('id') || "";

    return $(this.element).data('original-title') ||
              ($("#" + id + "-bubble").length ? $("#" + id + "-bubble").html() : false) ||
              (typeof this.options.content === 'function' ?
                  this.options.content.call(this, this.element) : this.options.content);
  };

  Bubble._reposition = function () {
    var trigger         = $(this.element),
      triggerPos      = trigger.offset(),
      triggerWidth    = trigger.outerWidth(),
      triggerHeight   = trigger.outerHeight(),

      ttpWidth        = this.tooltip.outerWidth(),
      ttpHeight       = this.tooltip.outerHeight(),

      position        = this.options.position,
      ttpPos;

    switch (position) {
    case 'top':
      ttpPos = { top: triggerPos.top - ttpHeight - this.options.offset - 7, left: triggerPos.left };
      break;

    case 'right':
      ttpPos = { top: triggerPos.top - 15, left: triggerPos.left + triggerWidth + this.options.offset + 7 };
      break;

    case 'bottom':
      ttpPos = {top: triggerPos.top + triggerHeight + this.options.offset + 7, left: triggerPos.left };
      break;

    case 'left':
      ttpPos = {top: triggerPos.top - 15, left: triggerPos.left - ttpWidth - this.options.offset - 7 };
      break;
    }

    this.tooltip
      .css(ttpPos)
      .removeClass()
      .addClass("bbl bbl-" + position);

  };

  Bubble.show = function () {
    $('.bbl').removeClass('is-shown');
    this.tooltip.addClass("is-shown");
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

  $.plugin('bubble', Bubble);

  // Deferred initialization
  if (document.addEventListener) {
    document.addEventListener("mouseover", function (event) {
      $(event.target).closest("[data-trigger=bubble]").bubble();
    }, true);
  } else {
    $('[data-trigger=bubble]').bubble();
  }

  Flex.Bubble = Bubble;
}(jQuery, Flex.Tooltip));
