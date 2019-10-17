<?php
/**
 
 */

if(!defined('DOKU_INC')) define('DOKU_INC',realpath(dirname(__FILE__).'/../../').'/');
if(!defined('DOKU_PLUGIN')) define('DOKU_PLUGIN',DOKU_INC.'lib/plugins/');
require_once(DOKU_PLUGIN.'syntax.php');

/**
 * All DokuWiki plugins to extend the parser/rendering mechanism
 * need to inherit from this class
 */
class syntax_plugin_sectiontoggle extends DokuWiki_Syntax_Plugin {


    function getType(){
        return 'substition';
    }
	

    function getPType(){
        return 'block';
    }

 
    function getSort(){
        return 199;
    }


    function connectTo($mode) {
      $this->Lexer->addSpecialPattern('~~stoggle_buttons~~',$mode,'plugin_sectiontoggle');
     $this->Lexer->addSpecialPattern('~~stoggle_openDIV~~',$mode,'plugin_sectiontoggle');
     $this->Lexer->addSpecialPattern('~~stoggle_closeDIV~~',$mode,'plugin_sectiontoggle');
    }


    function handle($match, $state, $pos, Doku_Handler $handler){
       $match = substr($match,10,-2);       
        switch ($state) {   
          case DOKU_LEXER_SPECIAL :
           return array($state, $match);
        }
        return array($state,"");
    }


    function render($mode, Doku_Renderer $renderer, $data) {
        if($mode == 'xhtml'){
           list($state,$match) = $data;
            switch ($state) {          
              case DOKU_LEXER_SPECIAL :    
               if($match == 'buttons') { 
                $open = $this->getLang('open_all');
                $close = $this->getLang('close_all');               
                $renderer->doc .= '<p class="sectoggle"><button onclick = "SectionToggle.open_all();" style="white-space:nowrap;" >' . $open . '</button>&nbsp;&nbsp;<button onclick = "SectionToggle.close_all();" style="white-space:nowrap;" >' . $close .'</button></p>';     // ptype = 'block'
                }
                elseif($match == 'openDIV') {
                   $renderer->doc .= "\n<div id='section__toggle'>\n";                    
                }                
                elseif($match == 'closeDIV') {
                   $renderer->doc .= "\n</div>\n";                    
                }                                
               return true;
            }
        }
        return false;
    }
}

?>