jQuery( document ).ready(function() {

 var im =  DOKU_BASE+"lib/plugins/sectiontoggle/r_arrow.png";    
SectionToggle.check_status();

if(JSINFO['se_template']  != 'dokuwiki') {
     if (jQuery('p.sectoggle').length > 0){
          jQuery('p.sectoggle').hide();
       }
       SectionToggle.is_active = false;
}
             
jQuery('#dokuwiki__content  h1,#dokuwiki__content h2,#dokuwiki__content h3,#dokuwiki__content h4').each(function(index,elem ) {   
       
       if(SectionToggle.is_active && jQuery(elem).next().html().match(/\w/))  {
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
      }
      else if (jQuery('p.sectoggle').length > 0){
          jQuery('p.sectoggle').hide();
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
check_status: function() {   
    if(JSINFO.se_platform == 'n' ) return;
    if(JSINFO.se_act != 'show') return;
    if(JSINFO.se_platform == 'a') {
        this.is_active = true;               
    }
    if(JSINFO.se_platform == 'm' && device_class.match(/mobile/)) {
        this.is_active = true; 
    }       
},

is_active: false,
};