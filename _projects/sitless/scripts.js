$(function() {
  $('a[href*=#]:not([href*=carousel])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      if (this.hash) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 400);
        }
      } else {
        $('html,body').animate({
          scrollTop: 0
        }, 400);
      }
      return false;
    }
  });
  
  if ( ($(window).height() + 200) < $(document).height() ) {
      $('#top-link-block').removeClass('hidden').affix({
          // how far to scroll down before link "slides" into view
          offset: {top: 200}
      });
  }

  $("nav.navbar").headroom({
    tolerance: 5
  });

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // lazyload all image
  $('img.lazy-load').show().lazyload({
    effect: 'fadeIn',
    failure_limit: 15
  });
});

