
//jQuery( document ).ready(function() {
jQuery (function() {

function escapeRegExp (expr) {   
  return expr.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); 
}

 if(JSINFO['se_actual_tpl'] == 'icke-template'  && !JSINFO['se_suspend']) {	   
     icke_OnMobileFix();
  }
  if(JSINFO['se_suspend']) {
         if (jQuery('p.sectoggle').length > 0){
          jQuery('p.sectoggle').hide();
       }
        SectionToggle.is_active = false;
    }
    else {
            if(JSINFO['se_device'])  {
                SectionToggle.device_class =  JSINFO['se_device'];
            }
   

            SectionToggle.check_status();

            if(!SectionToggle.is_active) {
                 if (jQuery('p.sectoggle').length > 0){
                      jQuery('p.sectoggle').hide();
                   }                  
            }
          
if(SectionToggle.is_active && !JSINFO['toc_xcl']) {
jQuery("ul.toc li div.li a, ul.toc li a").click(function(){
      var text = jQuery(this).html();	
      text = text.toLowerCase();
      text =  text.replace(/\s/g, "_");  
      if(SectionToggle.toc_xcl.indexOf(text) > -1) return;
      var id = '#' + text; 
      jQuery(id).toggleClass('st_closed st_opened');
      jQuery(id).next().toggle()
}); 
}          
         jQuery(SectionToggle.headers).each(function(index,elem ) {         
               if( typeof(jQuery(elem).next().html())  === 'undefined') return; 
			 
		       var skip = false;
			   var regex;
               var hash = jQuery(elem).html().replace(/\s/g, "_"); 
               regex = RegExp('\\b' + escapeRegExp(hash.toLowerCase()) + '\\b');  
			   
		       if(hash.toLowerCase() == SectionToggle.hash || regex.test(JSINFO['h_ini_open'])) {
                   skip = true;
               }
			   else if(SectionToggle.hash){				   
                  regex = RegExp('^' +SectionToggle.hash,'i');  //bootstrap3
				  if(regex.test(hash)) {
					 skip = true;					 
				  }
		       }
	
               if(SectionToggle.is_active && jQuery(elem).next().html().match(/\w/))  {
                   this.onclick=function() {
                   SectionToggle.checkheader(elem,index);
                };     
          
                this.onmouseover = elem.style.cursor='pointer';
                var $class = 'st_closed header__' + index;
                jQuery(this).addClass($class);         
                 if(skip)  {
                      jQuery(elem).removeClass('st_closed').addClass('st_opened');
                }   
               
                /* add toggle icon and  hide data below this header */
                if(!this.getAttribute('class').match(/toggle/)) {
                     jQuery(elem).next().toggle();
                     if(skip)  jQuery(elem).next().toggle();
               }
              }

        });
    }
});
var SectionToggle = {
checkheader : function (el,index) {
   var classes = el.getAttribute('class');  
  if(!classes.match(/(header__\d+)/)) return;
  
    jQuery(el).toggleClass('st_closed st_opened');
    jQuery(el).next().toggle();
  
},

open_all: function () {
jQuery(this.headers).each(function(index,elem ) {   
      if(!this.getAttribute('class').match(/toggle/)) {
		  jQuery(elem).removeClass('st_closed').addClass('st_opened');
          jQuery(elem).next().show();
       }   
  });
},

close_all: function () {
jQuery(this.headers).each(function(index,elem ) {   
     if(!this.getAttribute('class').match(/toggle/)) {
	   jQuery(elem).removeClass('st_opened').addClass('st_closed');
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
    else if(JSINFO.se_platform == 'm' && this.device_class.match(/mobile/)) {
        this.is_active = true; 
    }       
    
    if(this.is_active) {
         /*normalize url hash */
        if (window.location.hash) {
          SectionToggle.hash = window.location.hash.toLowerCase(); 
          SectionToggle.hash = SectionToggle.hash.replace(/#/,"");
          SectionToggle.hash = SectionToggle.hash.replace(/\s/g, "_");      
        }                           
        this.set_headers();
    }
},

set_headers: function() {
    var nheaders = parseInt(JSINFO['se_headers'])+1; 
    var toc_headers_xcl = "";
    var xclheaders=new Array(0,0,0,0,0,0,0);    
    if(JSINFO['se_xcl_headers']) {
        xcl = JSINFO['se_xcl_headers'].split(',');
        for(var i =0; i<xcl.length; i++) {
           xclheaders[xcl[i]] = 1;
        }
    }
    
    var which_id =  '#dokuwiki__content';           
    if(JSINFO['se_name'] !=  '_empty_' && JSINFO['se_template'] == 'other') {
      which_id = JSINFO['se_name'];
    }
   
  /* if(JSINFO['alt_tpl']) { 
    alert(JSINFO['alt_tpl']);
    }
    else alert(JSINFO['se_template']);
	*/

    if (jQuery('div #section__toggle').length > 0){
          which_id =  '#section__toggle';             
    }             
    which_id = 'div ' + which_id;
    var id_string = "";

	if (jQuery(which_id).length == 0) {
		   JSINFO['no_ini'] = 1;			  
	}	


   // JSINFO['no_ini'] = 1;
    if( JSINFO['no_ini'] ) {  
	    var qstr = ""; 	    
		
        jQuery( ":header" ).each(function(index,elem ) { 
		
        var $id, $class =  jQuery(this).attr('class'); 
		var tagname = jQuery(this).prop("tagName").toLowerCase();
		   matches = tagname.match(/h(\d)/);
		   if(matches[1] > JSINFO['se_headers'] || xclheaders[matches[1]]) return;		   
             
		  
           if($class) {
			   if($class.match(/sr-only|toggle/) ) return; 
			   var $classes = $class.match(/sectionedit\d+/);                           
			   if($classes) {	            
				  tagname = tagname + "." + $classes[0];
			   }
           }
		   else {
			   $id = jQuery(this).attr('id');
			   tagname = tagname + "#" + $id;
		   }
           if(qstr)  qstr  += ',';
           qstr  += tagname;            
	});
         this.headers =  qstr;
          return;  
    }

    for (var i = 1; i < nheaders; i++) {
        if(xclheaders[i]) {
          this.toc_xcl += which_id + ' h' + i +',';
          continue;
        }
	    id_string += which_id + ' h' + i;
        if(i < nheaders-1) id_string +=','; 
    }
    id_string = id_string.replace(/,+$/,"");
    this.headers = id_string;
    
    this.toc_xcl  = this.toc_xcl.replace(/,+$/,"");  
    jQuery(this.toc_xcl).each(function(index,elem ) {    
         var id = jQuery(this).attr('id');
         if(id) {
         id =  id.replace(/\s/g, "_");    
         toc_headers_xcl += id + ',';
        }     
   });
  
   this.toc_xcl = ">>"+ toc_headers_xcl;
   //console.log(this.toc_xcl);
   
},

headers: "",
toc_xcl: "",
device_class: 'desktop',
is_active: false,
hash: "",
};
function icke_OnMobileFix() {
	if(JSINFO['se_platform'] != 'm' && JSINFO['se_platform'] != 'a') return; 
	var MOBILE_WIDTH = 600;
	var SHALLOWST_SECTION_TO_HIDE = 2;
	var DEEPEST_SECTION_TO_HIDE = 6;
	var i;
	var $page;
	if (jQuery(window).width() <= MOBILE_WIDTH) {
		$page = jQuery('div.page');
		for (i = SHALLOWST_SECTION_TO_HIDE; i < DEEPEST_SECTION_TO_HIDE; i += 1) {
			$page.find('div.level' + i).show();
			$page.find('h' + i).click(function toggleSection() {
				jQuery(this).next('div').toggle();
			});
		}
	}
};

