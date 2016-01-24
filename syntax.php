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

    }


    function handle($match, $state, $pos, Doku_Handler $handler){
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
               $renderer->doc .= '<p class="sectoggle"><button onclick = "SectionToggle.open_all();" style="white-space:nowrap;" >open all</button>&nbsp;&nbsp;<button onclick = "SectionToggle.close_all();" style="white-space:nowrap;" >close all</button></p>';     // ptype = 'block'
               return true;
            }
        }
        return false;
    }
}

?>