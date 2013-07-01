<?php
/**
 * Example Action Plugin:   Example Component.
 *
 * 
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
     * Hook js script into page headers.
     *
     * @author Samuele Tognini <samuele@cli.di.unipi.it>
     */
    function _jsinfo(&$event, $param) {
        global $JSINFO;
        global $ACT;
       $JSINFO['se_act'] = $ACT;
      // msg('<pre>'. print_r($JSINFO,1) . '</pre>');
    }
}