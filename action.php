<?php
/**

 */

if(!defined('DOKU_INC')) die();
if(!defined('DOKU_PLUGIN')) define( 'DOKU_PLUGIN','DOKU_INC' . '/lib/plugins/');

class action_plugin_sectiontoggle extends DokuWiki_Action_Plugin {

    /**
     * Register its handlers with the DokuWiki's event controller
     */
    function register(Doku_Event_Handler $controller) {
        $controller->register_hook('DOKUWIKI_STARTED', 'AFTER', $this, '_jsinfo');
    }

    /**
     * @author Myron Turner <turnermm02@shaw.ca>
     */
    function _jsinfo(&$event, $param) {
        global $JSINFO;
        global $ACT;
        global $conf, $ID;
       
        $NS = implode("|",$this->normalize_names($this->getConf('xcl_ns')));
        $id = implode("|",$this->normalize_names($this->getConf('xcl_pg')));
        if(preg_match('/^' . $NS. '$/',getNS($ID)) || preg_match('/^' . $id. '$/',$ID)) {
      	    $JSINFO['se_suspend']=1;          
		   return;
        }
        else  $JSINFO['se_suspend']=0;

       $JSINFO['se_act'] = $ACT;   
       $JSINFO['se_template'] =  $conf['template'];    
       $JSINFO['se_actual_tpl'] =  $conf['template'];	   
       if($JSINFO['se_template'] == 'bootstrap3' && !$ACT) {
           $JSINFO['se_act'] = 'show';   
       }
       $p = $this->getConf('platform');
       $JSINFO['se_platform'] = $p{0};
       $headers = $this->getConf('headers');
       $JSINFO['se_headers'] = $headers{1};       
       $xcl_headers = $this->getConf('xcl_headers');        
       $xcl_headers = str_replace('h',"",$xcl_headers);       
       $JSINFO['se_xcl_headers'] = $xcl_headers;       
       $JSINFO['se_type'] = $this->getConf('type');
       $alt_mobile = $this->getConf('mobile_alt');
	   $JSINFO['no_ini'] = 0;
       
      
         
           $JSINFO['se_device'] = trim($this->device_type()) ;	
		      if($p != 'all')
              {
                  if($JSINFO['se_device'] == 'desktop' || $JSINFO['se_device'] == 'computer' || $JSINFO['se_device'] == 'tablet') return;                   
              }  
        if($conf['template'] != 'dokuwiki') {
           if($JSINFO['se_device'] == 'phone') {
               $JSINFO['se_device'] = 'mobile';
               if(empty($alt_mobile)) { 
                   $alt_mobile =  $JSINFO['se_template'];                  
               }
               else {
                $alt_mobile  = $this->getConf('mobile_alt');                 
                $alt_template_dir = tpl_incdir($alt_mobile);                      
                if(file_exists($alt_template_dir)) {
                    $conf['template'] = $alt_mobile;                    
      	            $JSINFO['alt_tpl'] = $alt_mobile; 						
                }  
               }
           }
       }
       else {
          $JSINFO['se_device'] = "";
       }
	   
       $JSINFO['se_suspend'] = $this->getConf('suspend');
	   if($conf['template'] != 'dokuwiki' && $JSINFO['se_type'] == 'none') { //	in template.ini?	  
	       if($this->check_ini()) return; // if true template configured in template.ini
	   }
	 
       if($conf['template'] != 'dokuwiki' && $JSINFO['se_type'] != 'none') {  //another template, using configuration mgr       
           $JSINFO['se_template'] = 'other';           
           if(trim($this->getConf('name')) == false) {
               $JSINFO['se_name'] = '_empty_';
           }
           else {
               $type = $this->getConf('type'); 
               $name = trim($this->getConf('name'));
               $JSINFO['se_name'] = $type == 'id' ? "#$name" : ".$name";
           }
       }
       else {
         $JSINFO['se_name'] = '_empty_';
         if($conf['template'] != 'dokuwiki') {
            $JSINFO['no_ini'] = "1";
         }
       }
    }
    function device_type() {
        require_once 'Mobile_Detect.php';
        $detect = new Mobile_Detect;
        $deviceType = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'computer');
       
        if($deviceType !== 'computer') {
            if($deviceType =='tablet') {
                if($this->getConf('tablet_alt')) return 'phone';
				if($this->getConf('tablet_toggle')) return 'phone';
            } 
            
            return  $deviceType;
        }
        return 'desktop';
    }  
    function check_ini(){
	    global $JSINFO;
        global $conf;
	    $tpl_ini =  DOKU_PLUGIN. 'sectiontoggle/templates.ini';
		$tpl_ini_local =  DOKU_PLUGIN. 'sectiontoggle/templates.ini.local';
	    if(file_exists($tpl_ini)) {
		   $stored_templates = parse_ini_file($tpl_ini,true);
           if(file_exists($tpl_ini_local)) {
               $local_templates = parse_ini_file($tpl_ini_local,true);
               if(!empty($local_templates)) {
                   $stored_templates = array_merge($stored_templates,$local_templates);
               }             
           }   
		   
		   if(isset($stored_templates[$conf['template']])) {
			   $type = trim($stored_templates[$conf['template']]['type']);
			   $name = trim($stored_templates[$conf['template']]['name']);
			   if(!$type || !$name) return false; 
			   $JSINFO['se_template'] = 'other';
			   $JSINFO['se_type'] = $type;
               $JSINFO['se_name'] = $type == 'id' ? "#$name" : ".$name"; 
             
			  return true;
		   }   
	    }
      return false;		
	}	

    function normalize_names($str) {
        $names = explode(',',$str);
        for ($i = 0; $i < count($names); $i++) {
            $names[$i] = preg_replace("/^\s?:\s?/", ":",$names[$i]);
            $names[$i] = trim ($names[$i]);
            if($names[$i] != ':') $names[$i] = trim ($names[$i],':');
         }
         return $names;
    }
}