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

    /***
     * @author Myron Turner <turnermm02@shaw.ca>
     */
    function _jsinfo(&$event, $param) {
        global $JSINFO;
        global $ACT;
        global $conf;
       $JSINFO['se_act'] = $ACT;
       $JSINFO['se_template'] = $conf['template'];    
       $p = $this->getConf('platform');
       $JSINFO['se_platform'] = $p{0};
       
    }
}