jQuery( document ).ready(function() {

if(!JSINFO.se_act == 'show') return;
  
//alert('device='+device_class);
 var im =  DOKU_BASE+"lib/plugins/sectiontoggle/r_arrow.png";   
 //var scr_mode = jQuery('#screen__mode').css('z-index');
// alert(scr_mode);

jQuery('#dokuwiki__content  h1,#dokuwiki__content h2,#dokuwiki__content h3,#dokuwiki__content h4').each(function(index,elem ) {   
  
        this.onclick=function() {
           SectionToggle.checkheader(elem,index);
        };     
  
        this.onmouseover = elem.style.cursor='pointer';
        var $class = 'header_' + index;
        jQuery(this).addClass($class);         
        
        if(!this.getAttribute('class').match(/toggle/)) {
             jQuery(this).append('&nbsp;&nbsp; <img border= "0" src="' + im + '">'); 
             jQuery(elem).next().toggle();
       }
      
 
});

});
var SectionToggle = {
checkheader : function (el,index) {
   var classes = el.getAttribute('class');  
  if(!classes.match(/(header_\d+)/)) return;
  
   jQuery(el).next().toggle();
  
},

open_all: function () {
jQuery('#dokuwiki__content  h1,#dokuwiki__content h2,#dokuwiki__content h3,#dokuwiki__content h4').each(function(index,elem ) {   
      if(!this.getAttribute('class').match(/toggle/)) {
          jQuery(elem).next().show();
       }   
  });
},

close_all: function () {
jQuery('#dokuwiki__content  h1,#dokuwiki__content h2,#dokuwiki__content h3,#dokuwiki__content h4').each(function(index,elem ) {   
     if(!this.getAttribute('class').match(/toggle/)) {
       jQuery(elem).next().hide();
     }
  });
},
};