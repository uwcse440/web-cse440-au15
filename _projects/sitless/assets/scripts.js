$(function() {
  $('a[href*=#]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      if (this.hash) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
        }
      } else {
        $('html,body').animate({
          scrollTop: 0
        }, 500);
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
});

