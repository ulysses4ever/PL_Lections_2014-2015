$(function(){

  // Initalize the ToC if we're on an article page
  if ($('.js-toc').length) {
    tableOfContents($('.js-toc'));

    var toc = $('.js-toc');
    var tocOffset = toc.offset().top;
    var tocPadding = 20;

    var tocSections = $('.toc-item');
    var tocSectionOffsets = [];

    // Calculates the toc section offsets, which can change as images get loaded
    var calculateTocSections = function(){
      tocSectionOffsets = [];
      tocSections.each(function(index, section){
        tocSectionOffsets.push(section.offsetTop);
      })
    }
    calculateTocSections();
    $(window).bind('load', calculateTocSections);

    var highlightTocSection = function(){
      var highlightIndex = 0;
      $.each(tocSectionOffsets, function(index, offset){
        if (window.scrollY > offset - 20){
          highlightIndex = index;
        }
      })
      highlightIndex += 1;
      $('ol.toc .active').removeClass('active');
      $('ol.toc li:nth-child(' + highlightIndex + ') a').addClass('active');
    }
    highlightTocSection();

    var didScroll = false;
    $(window).scroll(function() {
      didScroll = true;
    })

    setInterval(function() {
      if (didScroll) {
        didScroll = false;

        if (window.scrollY > tocOffset - tocPadding)
          toc.addClass('sticky');
        else
          toc.removeClass('sticky');
      }
      highlightTocSection();
    }, 100);

    var exampleNav = $('.js-examples-nav')
    if (exampleNav.length){
      exampleNav.on('click', 'a', function(event){
        event.preventDefault()
        exampleNav.find('a').removeClass('selected')
        $('.markdown-example').hide()
        $('#' + $(this).attr('data-container-id')).show()
        $(this).addClass('selected')
      })
    }

  }
})


// Generates a table of contents based on a.toc-item elements throughout the
// page. Follows allong via scroll and
var tableOfContents = function($listContainer) {
  if ($listContainer.length === 0) return;

  $('.toc-item').each(function(index, chapterAnchor) {
    $chapterAnchor = $(chapterAnchor);
    var listLink = $('<a>')
    .attr('href', '#' + $chapterAnchor.attr('id'))
    .text($chapterAnchor.attr('title'))
    .bind('click', scrollTo);

    var listItem = $('<li>').append(listLink);

    $listContainer.append(listItem);
  })
}

var scrollTo = function(e) {
  e.preventDefault();
  var elScrollTo = $(e.target).attr('href');
  var $el = $(elScrollTo);

  $('body,html').animate({ scrollTop: $el.offset().top }, 400, 'swing', function() {
    location.hash = elScrollTo;
  })
}

function getNavigation() {
  document.write(getPrev())
  if (typeof first_page == "undefined" && typeof last_page == "undefined")
    document.write("&nbsp;&nbsp;|&nbsp;&nbsp;")
  document.write(getNext())
}

function getPrev() {
  var s = location.pathname;
  s = parseInt(s.substr(s.lastIndexOf("/") + 1, 2)) - 1;
  if (typeof first_page == "undefined") {
    return "<b><a href='/PL_Lections_2014-2015/lecture/" + zeroFill(s, 2) + ".html" + "' > << Лекция " + s + "</a></b>"
  }
  return "<a></a>"
}

function getNext() {
  var s = location.pathname;
  s = parseInt(s.substr(s.lastIndexOf("/") + 1, 2)) + 1;
  if (typeof last_page == "undefined") {
    return "<b><a href='/PL_Lections_2014-2015/lecture/" + zeroFill(s, 2) + ".html" + "' > Лекция " + s + " >> </a></b>"
  }
  return "<a></a>"
}

function zeroFill(number, width) {
  width -= number.toString().length;
  if(width > 0)
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  return number;
}
