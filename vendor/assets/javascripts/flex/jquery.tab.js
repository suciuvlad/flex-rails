var Tab = {};

Tab.init = function( options, elem ) {
  var self    = this;

  this.options = $.extend( {}, this.defaults, options, $(elem).data() );

  this.element        = elem;
  this.anchors        = $(this.element).find('> .tab--nav a');
  this.tabContainers  = $(this.element).find('> .tab--container');

  this._onTrigger();

  return this;
}

Tab._onTrigger = function(hash) {
  var self = this;

  this.anchors.click(function(e){
    e.preventDefault();

    var hash = $(this).attr("href");

    if(hash.charAt(0) != "#" || $(this).parent().hasClass('is-tab-active')) { 
     return false; 
    }

    self.showTab(hash);

    $(self.element).find(".tab--nav li").removeClass('is-tab-active');
    $(this).parent().addClass('is-tab-active');
    
  }).filter(':first').click();
}

Tab.showTab = function(hash) {
  this.tabContainers.hide().filter(hash).show();
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

$.plugin( 'tab', Tab );

$( '[data-trigger=tab]' ).tab();
