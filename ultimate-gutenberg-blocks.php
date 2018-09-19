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
 * Text Domain: ugb
 * Domain Path: /languages
 * License:     GPL-3.0
 * License URI: https://www.gnu.org/licenses/gpl-3.0.en.html
 * Tested up to: 4.9.8
 */


// No Direct Access Sire !!!
defined('ABSPATH') || exit;


/*
 * Ultimate Gutenberg Constants
 */

$ugb = new Ultimate_Gutenberg();
define( 'UGB', $ugb->plugin_name);
define( 'UGB_VERSION', $ugb->version);
define( 'UGB_PLUGIN_URL', $ugb->ugb_plugin_url());
define( 'UGB_PLUGIN_DIR', $ugb->ugb_plugin_path() );
define( 'UGB_PLUGIN_DIR_URL', $ugb->ugb_plugin_dir_url());
define( 'UGB_IMAGE_DIR', $ugb->ugb_plugin_dir_url().'/images');
define( 'UGB_TD', $ugb->ugb_load_textdomain());  // Ultimate Gutenberg Text Domain
define( 'UGB_FILE', __FILE__ );
define( 'UGB_DIR', dirname( __FILE__ ) );



class Ultimate_Gutenberg{

	public $version = "1.0.0";
	private $plugin_path;
	private $plugin_url;
	private $plugin_slug;

	/* Instance */
	private static $instance;

	/* Initialize */
	public static function init() {
		if ( null === self::$instance ) {
			self::$instance = new Ultimate_Gutenberg();
			self::$instance->ugb_include_files();
		}
	}


	/* Construction Function */
	public function __construct(){

		$this->plugin_slug    			= 'gutenberg-blocks';
		$this->plugin_path     			= untrailingslashit( plugin_dir_path( '/', __FILE__ ) );
		$this->plugin_url     			= untrailingslashit( plugins_url( '/', __FILE__ ) );

		// Prefix using "ugb" - Ultimate Gutenberg Shortname
		add_action( 'init', array( $this, 'ugb_register_blocks' ) );
		add_action( 'init', array( $this, 'ugb_block_assets' ) );
		add_action( 'init', array( $this, 'ugb_editor_assets' ) );
		add_action( 'plugins_loaded', array( $this, 'ugb_load_dynamic_blocks' ) );
		add_action( 'plugins_loaded', array( $this, 'ugb_load_textdomain' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'ugb_localization' ) );
	}


	/* Checks If Pro Version */
	public function is_pro() {

		if ( class_exists( 'Ultimate_Gutenberg_Pro' ) ) {
			return true;
		} else {
			return false;
		}
	}


    /*
     * Plugin URL
     */
    public function ugb_plugin_url() {
        if ($this->plugin_url) return $this->plugin_url;

        return $this->plugin_url = untrailingslashit(plugins_url('/', __FILE__));
    }


    /*
     * Plugin Directory Path
     */
    public function ugb_plugin_path() {
        if ($this->plugin_path) return $this->plugin_path;

        return $this->plugin_path = untrailingslashit(plugin_dir_path(__FILE__));
    }


    /*
     * Plugin Directory URL
     */
    public function ugb_plugin_dir_url() {
        if ($this->plugin_dir_url) return $this->plugin_dir_url;

        return $this->plugin_dir_url = untrailingslashit(plugin_dir_url(__FILE__));
    }

	/* Files Includes related with Ultimate Gutenberg Plugin */
	public function ugb_include_files(){
		
		if ( is_admin() ) {
			require_once UGB_DIR . '/inc/class-admin-notices.php';
			require_once UGB_DIR . '/inc/get-feedback.php';
		}
		
	}

	/* Register Blocks */
	public function ugb_register_blocks(){

	}


	/* Block Assets */
	public function ugb_block_assets(){

	}


	/* Block Editor Assets */
	public function ugb_editor_assets(){

	}


	/* Dynamic Blocks */
	public function ugb_load_dynamic_blocks(){

	}


	/* Load Text Domain */
	public function ugb_load_textdomain(){
		load_plugin_textdomain('uamp', false, dirname(plugin_basename(__FILE__)) . '/languages/');
	}


	/* Ultimate Gutenberg Localization */
	public function ugb_localization(){

	}



}

Ultimate_Gutenberg::init();