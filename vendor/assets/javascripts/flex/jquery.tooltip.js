/*jslint nomen: true, unparam: true, regexp: true, indent: 2 */
/*global jQuery, document, window */

var Flex = Flex || {};

(function ($) {

  'use strict';
  var Tooltip = {};

  Tooltip.defaults = {
    content:      '',
    position:     "top",
    offset:       5,
    delayIn:      150,
    delayOut:     50,
    template:     "<div class='ttp'><span class='ttp--arrow'></span><div class='ttp--content'></div></div>"
  };

  Tooltip.init = function (options, elem) {
    var self    = this;

    this.options = $.extend({}, this.defaults, options, $(elem).data());

    this.tooltip = this.tooltip || $(this.options.template).appendTo('body');

    this.element = elem;

    this.delayOutTimer = null;

    this._removeTitle();
    this._update(this._getContent());
    this._reposition();

    $([this.element, this.tooltip.get(0)]).bind('mouseover', $.proxy(this._onEventIn, this));
    $([this.element, this.tooltip.get(0)]).bind('mouseout', $.proxy(this._onEventOut, this));
    $(window).bind('resize', $.proxy(this._reposition, this));

    return this;
  };

  Tooltip._onEventIn = function () {
    var self = this;

    if (self.delayOutTimer) {
      clearTimeout(self.delayOutTimer);
    };

    self.delayOutTimer = setTimeout(function () {
      self.show();
    }, self.options.delayIn);
  };

  Tooltip._onEventOut = function () {
    var self = this;

    if (self.delayOutTimer) {
      clearTimeout(self.delayOutTimer);
    }

    self.delayOutTimer = setTimeout(function () {

      self.delayOutTimer = null;
      self.hide();

    }, self.options.delayOut);
  };

  Tooltip._removeTitle = function () {
    var element = $(this.element),
      title   = element.attr('title');

    if (title) {
      element.data('original-title', title).removeAttr('title');
    }
  };

  Tooltip._reposition = function () {
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
      ttpPos = { top: triggerPos.top - ttpHeight - this.options.offset, left: triggerPos.left };
      break;

    case 'right':
      ttpPos = { top: triggerPos.top + triggerHeight / 2 - ttpHeight / 2, left: triggerPos.left + triggerWidth + this.options.offset };
      break;

    case 'bottom':
      ttpPos = {top: triggerPos.top + triggerHeight + this.options.offset, left: triggerPos.left };
      break;

    case 'left':
      ttpPos = {top: triggerPos.top + triggerHeight / 2 - ttpHeight / 2, left: triggerPos.left - ttpWidth - this.options.offset };
      break;
    }

    this.tooltip
      .css(ttpPos)
      .removeClass()
      .addClass("ttp ttp-" + position);

  };

  Tooltip._getContent = function () {
    
    return $(this.element).data('original-title') ||
              (typeof this.options.content === 'function' ?
                  this.options.content.call(this, this.element) : this.options.content);
  };

  Tooltip.show = function () {
    this.tooltip.addClass("is-shown");
  };

  Tooltip.hide = function () {
    this.tooltip.removeClass("is-shown");
  };

  Tooltip._update = function (content) {
    this.tooltip.find('.ttp--content').html(content);
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

  $.plugin('tooltip', Tooltip);

  // Deferred initialization
  if (document.addEventListener) {
    document.addEventListener("mouseover", function (event) {
      $(event.target).closest("[data-trigger=tooltip]").tooltip();
    }, true);
  } else {
    $('[data-trigger=tooltip]').tooltip();
  }

  Flex.Tooltip = Tooltip;
}(jQuery, window, document));
