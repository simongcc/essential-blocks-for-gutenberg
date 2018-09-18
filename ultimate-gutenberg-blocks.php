<?php
namespace Ultimate_Gutenberg\Gutenberg_Blocks;
/**
 * @package     Ultimate_Gutenberg\Gutenberg_Blocks
 * @author      Liton Arefin (@Litonice13)
 * @license     GPL-3.0
 *
 * Plugin Name: Ultimate Gutenberg Blocks
 * Plugin URI:  https://jeweltheme.com/
 * Description: Ultimate Gutenberg Blocks helps to make your website more confortable
 * Version:     1.0.0
 * Author:      Liton Arefin
 * Author URI:  https://jeweltheme.com
 * Text Domain: utmgutenblocks
 * Domain Path: /languages
 * License:     GPL-3.0
 * License URI: https://www.gnu.org/licenses/gpl-3.0.en.html
 * Tested up to: 4.9.8
 */


// No Direct Access Sire !!!
defined('ABSPATH') || exit;

class Ultimate_Gutenberg{

	public $version = '1.0.0';

	/* Instance */
	private static $instance;
	
    public static function init() {
    static $instance = false;

    if (!$instance) {
        $instance = new Ultimate_Gutenberg();

        $instance->uamp_plugin_init();
    }

    return $instance;

}

}

Ultimate_Gutenberg::init();