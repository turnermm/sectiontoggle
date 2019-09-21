
jQuery( document ).ready(function() {

 if(JSINFO['se_actual_tpl'] == 'icke-template'  && !JSINFO['se_suspend']) {	   
     icke_OnMobileFix();
  }
  if(JSINFO['se_suspend']) {
         if (jQuery('p.sectoggle').length > 0){
          jQuery('p.sectoggle').hide();
       }
    }
    else {
            if(JSINFO['se_suspend']) { 
               SectionToggle.is_active = false;
               return;
            }
            var im =  DOKU_BASE+"lib/plugins/sectiontoggle/r_arrow.png";    
            if(JSINFO['se_device'])  {
                SectionToggle.device_class =  JSINFO['se_device'];
            }
            else SectionToggle.device_class = device_class;

            SectionToggle.check_status();

            if(!SectionToggle.is_active) {
                 if (jQuery('p.sectoggle').length > 0){
                      jQuery('p.sectoggle').hide();
                   }                  
            }
          
         jQuery(SectionToggle.headers).each(function(index,elem ) {         
               if( typeof(jQuery(elem).next().html())  === 'undefined') return; 
               if(SectionToggle.is_active && jQuery(elem).next().html().match(/\w/))  {
                   this.onclick=function() {
                   SectionToggle.checkheader(elem,index);
                };     
          
                this.onmouseover = elem.style.cursor='pointer';
                var $class = 'header__' + index;
                jQuery(this).addClass($class);         
                
                /* add toggle icon and  hide data below this header */
                if(!this.getAttribute('class').match(/toggle/)) {
                     jQuery(this).append('&nbsp;&nbsp; <img border= "0" src="' + im + '">'); 
                     jQuery(elem).next().toggle();
               }
              }

        });
    }
});
var SectionToggle = {
checkheader : function (el,index) {
   var classes = el.getAttribute('class');  
  if(!classes.match(/(header__\d+)/)) return;
  
   jQuery(el).next().toggle();
  
},

open_all: function () {
jQuery(this.headers).each(function(index,elem ) {   
      if(!this.getAttribute('class').match(/toggle/)) {
          jQuery(elem).next().show();
       }   
  });
},

close_all: function () {
jQuery(this.headers).each(function(index,elem ) {   
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
    else if(JSINFO.se_platform == 'm' && this.device_class.match(/mobile/)) {
        this.is_active = true; 
    }       
    if(this.is_active) this.set_headers();
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
           if($class && $class.match(/sr-only|toggle/) ) return;
           var $classes = $class.match(/sectionedit\d+/);       
           if($classes) {
               $class = $classes[0];                
		   if($class) {	            
            tagname = tagname + "." + $class;
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

