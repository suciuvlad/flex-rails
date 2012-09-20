var Dropdown = {};

Dropdown.defaults = {
  trigger: "mouseover"
}

Dropdown.init = function( options, elem ) {
  var self = this,
      onEventIn,
      onEventOut;

  this.options = $.extend( {}, this.defaults, options, $(elem).data() );

  this.element  = elem;
  this.parent   = $(elem).parent();
  this.menu     = $(elem).parent().find("drd--menu");

  this.parent.click(function(e) {
    e.stopPropagation();
  })

  $('html').click(function(){
    clear();
  })

  this._onTrigger();
  this._onWindowResize();

  return this;
}

Dropdown._onTrigger = function() {
  var self = this,
      isActive;

  this._reposition();

  $(this.element).click(function(e){
    var isActive  = self.parent.hasClass('is-drd-open')
      clear();
      !isActive && self.parent.toggleClass('is-drd-open');

      return false;
  });
}

Dropdown._onWindowResize = function(){
  var self = this;
  $(window).resize(function(){
    self._reposition();
  })
}

Dropdown._reposition = function(){
  var elemWidth   = $(this.element).width(),
      elemOffset  = $(this.element).offset(),
      menuWidth     = this.menu.width(),
      windowWidth   = $(window).width();

  if(elemOffset.left + menuWidth > windowWidth){
    $(this.menu).css('right', "0%")
                .css('left', 'auto');
  }else{
    $(this.menu).css('left', "0%")
                .css('right', 'auto');
  }
}

function clear(){
  $('.drd--toggle').parent().removeClass('is-drd-open');
}

$.plugin = function( name, object ) {
  $.fn[ name ] = function( options ) {
    return this.each(function() {
      if ( ! $.data( this, name ) ) {
        $.data( this, name, Object.create(object).init(options, this) );
      }
    });
  };
};

$.plugin( 'dropdown', Dropdown );

// Deferred initialization
if ( document.addEventListener ) { 
  document.addEventListener( "click", function(event) {
    $(event.target).closest( "[data-trigger=dropdown]" ).dropdown();
  }, true );
} else {
  $( '[data-trigger=dropdown]' ).dropdown();
}
