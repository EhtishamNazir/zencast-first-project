/*-----------------Custom Select-----------------------*/ 
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

/*---------------Dropdown Button Script----------------*/
// Left sidebar dropdown content script that is next to search bar 
function showDropdownContent() {
  $(".dropdown-content").click(function() {
    // body...
  })
  // var x = document.getElementById("dropdown-content");
  // if (x.style.display === "none") {
  //   x.style.display = "block";
  // } else {
  //   x.style.display = "none";
  // }
}

/*---------------Layers Hide/Show Script---------------*/
const accordionItemHeaders = document.querySelectorAll(".accordion");

  accordionItemHeaders.forEach(accordionItemHeader => {
     accordionItemHeader.addEventListener("click", event => {
      
       // Uncomment in case you only want to allow for the display of only one collapsed item at a time!
      
      const currentlyActiveAccordionItemHeader = document.querySelector(".accordion.active");
      if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
         currentlyActiveAccordionItemHeader.classList.toggle("active");
         currentlyActiveAccordionItemHeader.nextElementSibling.classList.remove ("active");
       }

       accordionItemHeader.classList.toggle("active");
       const panel = accordionItemHeader.nextElementSibling;
       if(accordionItemHeader.classList.contains("active")) {
        panel.classList.add("active")
       }
       else {
         panel.classList.remove("active")
       }
      
     });
  });  


/*-------------Range Slider Script----------------*/
// First let's set the colors of our sliders
const settings={
 fill: '#FF8A00',
 background: 'rgba(255, 255, 255, 0.5)'
}
// First find all our sliders
const sliders = document.querySelectorAll('.range-slider');
// Iterate through that list of sliders
// ... this call goes through our array of sliders [slider1,slider2,slider3] and inserts them one-by-one into the code block below with the variable name (slider). We can then access each of wthem by calling slider
Array.prototype.forEach.call(sliders,(slider)=>{
 // Look inside our slider for our input add an event listener
//   ... the input inside addEventListener() is looking for the input action, we could change it to something like change
 slider.querySelector('input').addEventListener('input', (event)=>{
   // 1. apply our value to the span
   slider.querySelector('span').innerHTML = event.target.value;
   // 2. apply our fill to the input
   applyFill(event.target);
 });
 // Don't wait for the listener, apply it now!
 applyFill(slider.querySelector('input'));
});

// This function applies the fill to our sliders by using a linear gradient background
function applyFill(slider) {
 // Let's turn our value into a percentage to figure out how far it is in between the min and max of our input
 const percentage = 100*(slider.value-slider.min)/(slider.max-slider.min);
 // now we'll create a linear gradient that separates at the above point
 // Our background color will change here
 const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage+0.1}%)`;
 slider.style.background = bg;
}

/*------------------Filters Script-----------------*/
function defer(method) {
  if (window.jQuery)
    method();
  else
    setTimeout(function() {
      defer(method)
    }, 50);
}
defer(function() {
  (function($) {
    
    function doneResizing() {
      var totalScroll = $('.filter-slider-frame').scrollLeft();
      var itemWidth = $('.filter-slider-item').width();
      var difference = totalScroll % itemWidth;
      if ( difference !== 0 ) {
        $('.filter-slider-frame').animate({
          scrollLeft: '-=' + difference
        }, 500, function() {
          // check arrows
          checkArrows();
        });
      }
    }
    
    function checkArrows() {
      var totalWidth = $('#filter-slider .filter-slider-item').length * $('.filter-slider-item').width();
      var frameWidth = $('.filter-slider-frame').width();
      var itemWidth = $('.filter-slider-item').width();
      var totalScroll = $('.filter-slider-frame').scrollLeft();
      
      if ( ((totalWidth - frameWidth) - totalScroll) < itemWidth ) {
        $(".next").css("visibility", "hidden");
      }
      else {
        $(".next").css("visibility", "visible");
      }
      if ( totalScroll < itemWidth ) {
        $(".prev").css("visibility", "hidden");
      }
      else {
        $(".prev").css("visibility", "visible");
      }
    }
    
    $('.arrow').on('click', function() {
      var $this = $(this),
        width = $('.filter-slider-item').width(),
        speed = 500;
      if ($this.hasClass('prev')) {
        $('.filter-slider-frame').animate({
          scrollLeft: '-=' + width
        }, speed, function() {
          // check arrows
          checkArrows();
        });
      } else if ($this.hasClass('next')) {
        $('.filter-slider-frame').animate({
          scrollLeft: '+=' + width
        }, speed, function() {
          // check arrows
          checkArrows();
        });
      }
    }); // end on arrow click
    
    $(window).on("load resize", function() {
      checkArrows();
      $('#filter-slider .filter-slider-item').each(function(i) {
        var $this = $(this),
          left = $this.width() * i;
        $this.css({
          left: left
        })
      }); // end each
    }); // end window resize/load
    
    var resizeId;
    $(window).resize(function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 500);
    });
    
  })(jQuery); // end function
});


/*------------------Modal Script------------------*/
// Get the modal
var modal = document.getElementById("create-new");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}