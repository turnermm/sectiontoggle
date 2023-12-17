<?php
$lang['platform'] = 'This selects the platforms on which you want to implement section toggling: none,mobile, all. With <b>all</b>, you will get section toggling on standard desktop systems. <b>Mobile</b> includes phones and tablets with reduced screen dimensions.';
$lang['type'] ="To use a template other than the standard dokuwiki template, you must indicate whether the div which encloses the affected headers is to be identified by either a class or an id. Then below, you must enter the name of the class or id.";
$lang['name'] ="Name of the class or id which identifies the enclosing div.";
$lang['headers'] ="Smallest header to activate as toggle.   All headers between <b>h1</b> and this setting will be toggles. The default is <b>h4</b>.";
$lang['suspend'] ="If set to true the plugin will be inactivated and no toggles will be set.";
$lang['xcl_headers'] = "Check off any headers that should not  be converted to toggles.";
$lang['mobile_alt'] = "An alternate template installed for phones, in case your preferred template does not support phones.";
$lang['tablet_alt'] = 'Use the alternate template for tablets';
$lang['tablet_toggle'] = 'Use toggles on tablets as well as phones';
$lang['xcl_ns'] = 'Comma separated list of namespaces to be excluded from toggles, without initial or final colons(i.e. <code>&nbsp;name:space&nbsp;</code>,  not<code>&nbsp;:name:space:&nbsp;</code>) ';
$lang['xcl_pg'] = 'Comma separated list of  page ids to be excluded from toggles (without initial colons (i.e <code>&nbsp;page:id &nbsp;</code>,  not<code>&nbsp;:page:id&nbsp;</code> )';
$lang['incl_pg'] = 'Comma separated list of page ids where toggles should appear (without initial colons). Takes precedence over page and namespace exclusions.'; 
$lang['incl_ns'] = 'Comma separated list of namespace ids where toggles should appear (without initial or final colons).  Takes precedence over page and namespace exclusions and <code>xcl_pg</code>.' ; 
$lang['h_ini_open'] = 'List of header texts, separated by double semi-colons, where toggles should stay open when the page loads, i.e. ' .
     '<br /><code><b>header-text;;header-text;;. . .</b></code>';
$lang['toc_toggle'] = 'Prevent TOC from toggling headers';
$lang['start_open'] = 'Start page with all toggles open.';
$lang['show_section_toggle_button'] = 'Show section toggle button in action menu';
 