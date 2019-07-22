<?php
$meta['platform']  = array('multichoice','_choices' => array('all','mobile','none'));
$meta['type']  = array('multichoice','_choices' => array('none','id','class'));
$meta['name'] =array('string');
$meta['headers']  = array('multichoice','_choices' => array('h1','h2','h3','h4','h5','h6'));
$meta['suspend'] = array('onoff');
$meta['xcl_headers']  = array('multicheckbox','_choices' => array('h1','h2','h3','h4','h5','h6'));
$meta['mobile_alt'] = array('string');
$meta['tablet_alt'] = array('onoff');
$meta['tablet_toggle'] = array('onoff');
