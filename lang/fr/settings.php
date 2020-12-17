<?php

/**
 * @license    GPL 2 (http://www.gnu.org/licenses/gpl.html)
 *
 * @author Schplurtz le Déboulonné <Schplurtz@laposte.net>
 * @author Nicolas Friedli <nicolas@theologique.ch>
 */
$lang['platform']              = 'Sélection les plateformes sur lesquelles appliquer la bascule : aucune, mobile, tous. Avec <b>tous</b>, la bascule est aussi activée sur les ordinateurs de bureau. <b>mobile</b> comprend uniquement les téléphones et les tablettes avec petits écrans.';
$lang['type']                  = 'Si vous utilisez un thème autre que le thème par défaut de DokuWiki, vous devez signaler si le div qui entoure les entêtes doit être identifié par une classe ou un identifiant. Ci-dessous, vous devez entrer le nom de la classe ou de l\'identifiant.';
$lang['name']                  = 'Nom de la classe ou de le l\'identifiant choisis pour le div englobant.';
$lang['headers']               = 'Plus petit entêt pour lequel activer la bascule. Tous les entêtes compris entre <b>h1</b> et celui-ci auront une bascule activée. Par défaut: <b>h4</b>.';
$lang['suspend']               = 'Si coché, l\'extension est inactive et aucune bascule n\'est proposée.';
$lang['xcl_headers']           = 'Sélectionnez les entêtes dont la bascule ne doit pas être activée.';
$lang['mobile_alt']            = 'Thème alternatif utilisé pour les téléphones, dans le cas où votre thème préféré n\'est pas adapté aux écrans de téléphones';
$lang['tablet_alt']            = 'Utiliser le thème alternatif pour tablettes';
$lang['tablet_toggle']         = 'Utiliser les bascules';
$lang['xcl_ns']                = 'Liste à virgule des catégories à exclure, sans les ":" initiaux ou finaux. (e.g. <code>&nbsp;sous:catégorie&nbsp;</code>,  mais pas <code>&nbsp;:sous:catégorie:&nbsp;</code>) ';
$lang['xcl_pg']                = 'Liste à virgule de noms de page à exclure, sans les ":" initiaux. (e.g. <code>&nbsp;une:page&nbsp;</code>,  mais pas <code>&nbsp;:une:page&nbsp;</code>) ';
$lang['incl_pg']               = 'Liste à virgule de noms de page où les bascules seront activées (sans les ":" initiaux). Prioritaire sur les exclusions de pages et catégories.';
$lang['incl_ns']               = 'Liste à virgule de catégories où les bascules seront activées (sans les ":" initiaux ou finaux). Prioritaire sur les exclusions de pages et catégories et sur <code>xcl_pg</code>.';
$lang['h_ini_open']            = 'Liste à double point-virgule d\'entête dont le contenu doit rester déplié au chargement de la page. e.g. <br /><code><b>texte d\'entête;;autre texte d\'entête;;. . .</b></code>.';
