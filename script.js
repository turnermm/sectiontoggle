
jQuery( document ).ready(function() {
function escapeRegExp (expr) {   
  return expr.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); 
}

jQuery("ul.toc li div.li a, ul.toc li a").click(function(){
      var text = jQuery(this).html();	
      text = text.toLowerCase();
      text =  text.replace(/\s/g, "_");  
      var id = '#' + text; 
       jQuery(id).toggleClass('st_closed st_opened');
       jQuery(id).next().toggle()
}); 

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
          
         jQuery(SectionToggle.headers).each(function(index,elem ) {         
               if( typeof(jQuery(elem).next().html())  === 'undefined') return; 
               var classes = elem.getAttribute('class');  
               if(!classes.match(/sectionedit/)) return;    
               
			 
		       var skip = false;
			   var regex;
               var hash = jQuery(elem).html().replace(/\s/g, "_"); 
               regex = RegExp('\\b' + escapeRegExp(hash.toLowerCase()) + '\\b');  
			   /*
               Checking for the hash: if a url is directed to a page#section, the section will 
               remain open instead of being toggled closed.  This enables also opening of
               section when a TOC link is clicked                
               */
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
               
                /* hide data below this header */
                if(!this.getAttribute('class').match(/toggle/)) {
                     jQuery(elem).next().toggle();
                     if(skip)  jQuery(elem).next().toggle();
               }
              }

        });
     
  
   
       var prev_level = 0; 
     
       jQuery(SectionToggle.headers).filter(".st_closed").each(function(index,elem ) { 
       var tag = jQuery(this).prop("tagName");
       if(matches = tag.match(/H(\d)/i)) {
           level = matches[1];
       }    
       
       if(prev_level && level > prev_level  || prev_level && level == prev_level) {
          jQuery(this).hide();
       }
       if(prev_level == level) {
           prev_level = 0;
       }
       if(!prev_level) prev_level = level;
    //   alert(tag +"//prev= "+ prev_level+"//level= "+level + '=' +elem.innerHTML); 
      
           
         
         }

        );     
    }
});

var SectionToggle = {
checkheader : function (el,index) {
   var classes = el.getAttribute('class');  
    alert("classes= "+classes);
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
           // alert(qstr);
           this.headers =  qstr;
          return;  
    }

    for (var i = 1; i < nheaders; i++) {
        if(xclheaders[i]) continue;
	    id_string += which_id + ' h' + i;
        if(i < nheaders-1) id_string +=','; 
    }
    id_string = id_string.replace(/,+$/,"");
    //alert(id_string);
    this.headers = id_string;
},

headers: "",
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

