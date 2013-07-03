<?php
/**

 */

if(!defined('DOKU_INC')) die();


class action_plugin_sectiontoggle extends DokuWiki_Action_Plugin {

    /**
     * Register its handlers with the DokuWiki's event controller
     */
    function register(&$controller) {
        $controller->register_hook('DOKUWIKI_STARTED', 'AFTER', $this, '_jsinfo');
    }

    /**
     * @author Myron Turner <turnermm02@shaw.ca>
     */
    function _jsinfo(&$event, $param) {
        global $JSINFO;
        global $ACT;
        global $conf;
        
       $JSINFO['se_act'] = $ACT;    
       $JSINFO['se_template'] =  $conf['template'];    
       $p = $this->getConf('platform');
       $JSINFO['se_platform'] = $p{0};
       $p = $this->getConf('platform');
       $headers = $this->getConf('headers');
       $JSINFO['se_headers'] = $headers{1};       
       $JSINFO['se_type'] = $this->getConf('type');
       if($conf['template'] != 'dokuwiki') {
           $JSINFO['se_device'] = $this->device_type() ;
       }
       else {
          $JSINFO['se_device'] = "";
       }
       $JSINFO['se_suspend'] = $this->getConf('suspend');
       if($conf['template'] != 'dokuwiki' && $JSINFO['se_type'] != 'none') {  //another template with different div container       
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
       }
         
    }
    function device_type() {
        require_once 'Mobile_Detect.php';
        $detect = new Mobile_Detect;
        $deviceType = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'computer');
        if($deviceType !== 'computer') {
            return 'mobile';
        }
        return 'desktop';
    }  
}