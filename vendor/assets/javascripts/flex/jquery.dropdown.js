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
  this.menu     = $(elem).parent().find(".drd--menu");

  this.parent.click(function(e) {
    e.stopPropagation();
  })

  $('html').click(function(){
    clear();
  })

  this._onTrigger();

  return this;
}

Dropdown._onTrigger = function() {
  var self = this,
      isActive;

  $(this.element).click(function(e){
    var isActive  = self.parent.hasClass('is-drd-open')
      clear();
      !isActive && self.parent.toggleClass('is-drd-open');

      return false;
  });
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
