<?php

namespace dokuwiki\plugin\sectiontoggle;

use dokuwiki\Menu\Item\AbstractItem;

/**
 * Class MenuItemSectionToggle
 *
 * Implements the 'menu section toggle' button for DokuWiki's menu system
 *
 * @package dokuwiki\plugin\folded
 */

class MenuItemSectionToggle extends AbstractItem {

    protected $svg = DOKU_INC . 'lib/plugins/sectiontoggle/menu-sectiontoggle.svg';

    public function __construct() {
        parent::__construct();
    }

     /**
     * Get label from plugin language file
     *
     * @return string
     */

    public function getLabel() {
        $hlp = plugin_load('action', 'sectiontoggle');
        return $hlp->getLang('toggle_sections');
    }

    
    /**
     * Return this item's title
     *
     * @return string
     */

    public function getTitle() {
        return $this->getLabel();
    }

     /**
     * Return the link this item links to
     * 
     * @return string
     */

    public function getLink() {
        return 'javascript:void(0);';
    }

     /**
     * Convenience method to get the attributes for constructing an <a> element
     *
     * @return array
     */

    public function getLinkAttributes($classprefix = 'menuitem ') {
        $attr = array(
            'href' => $this->getLink(),
            'title' => $this->getTitle(),
            'id' => 'toggleAllBtn',
            'rel' => 'nofollow',
            'class' => 'section_toggle',
            'onclick' => 'updateSections();',
        );
        return $attr;
    }
}
