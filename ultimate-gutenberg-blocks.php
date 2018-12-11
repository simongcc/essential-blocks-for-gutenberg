<?php
//namespace Ultimate_Gutenberg\Gutenberg_Blocks;
/**
 * @package     Ultimate_Gutenberg\Gutenberg_Blocks
 * @author      Liton Arefin (@Litonice11)
 * @license     GPL-3.0
 *
 * Plugin Name: Essential Blocks for Gutenberg
 * Plugin URI:  https://jeweltheme.com/shop/essential-blocks-for-gutenberg/
 * Description: Essential Blocks for Gutenberg helps to make your Website more Comfortable with Gutenberg Editor
 * Version:     1.2.5
 * Author:      Liton Arefin
 * Author URI:  https://jeweltheme.com/shop/essential-blocks-for-gutenberg/
 * Text Domain: ugb
 * Domain Path: /languages
 * License:     GPL-3.0
 * License URI: https://www.gnu.org/licenses/gpl-3.0.en.html
 * Tested up to: 4.9.8
 */


// No Direct Access Sire !!!
defined('ABSPATH') || exit;


/*
 * Essential Blocks Constants
 */

$ugb = new Ultimate_Gutenberg();
define( 'UGB', $ugb->plugin_name );
define( 'UGB_VERSION', $ugb->version );
define( 'UGB_PLUGIN_URL', $ugb->ugb_plugin_url());
define( 'UGB_PLUGIN_DIR', $ugb->ugb_plugin_path() );
define( 'UGB_PLUGIN_DIR_URL', $ugb->ugb_plugin_dir_url());
define( 'UGB_IMAGE_DIR', $ugb->ugb_plugin_dir_url().'/assets/images/');
define( 'UGB_TD', $ugb->ugb_load_textdomain());  // Ultimate Gutenberg Text Domain
define( 'UGB_FILE', __FILE__ );
define( 'UGB_DIR', dirname( __FILE__ ) );




class Ultimate_Gutenberg{

	/* Variables */
	public  $version = "1.2.5";
	private $plugin_path;
	private $plugin_url;
	private $plugin_slug;
	public  $plugin_dir_url;
	public  $plugin_name = 'Essential Blocks for Gutenberg';

	private static $instance;

	/* Initialize */
	public static function init() {
		if ( null === self::$instance ) {
			self::$instance = new Ultimate_Gutenberg();
		}
	}



	/* Construction Function */
	public function __construct(){

		$this->plugin_slug    			= 'gutenberg-blocks';
		$this->plugin_path     			= untrailingslashit( plugin_dir_path( '/', __FILE__ ) );
		$this->plugin_url     			= untrailingslashit( plugins_url( '/', __FILE__ ) );

		$this->ugb_include_files();
		$this->ugb_define_admin_hooks();
		// $this->ugb_define_public_hooks();

		// Prefix using "ugb" - Ultimate Gutenberg Shortname
//		add_action( 'init', array( $this, 'ugb_register_blocks' ) );
//		add_action( 'init', array( $this, 'ugb_block_assets' ) );
//		add_action( 'init', array( $this, 'ugb_editor_assets' ) );
		add_action( 'plugins_loaded', array( $this, 'ugb_load_dynamic_blocks' ) );
		add_action( 'plugins_loaded', array( $this, 'ugb_load_textdomain' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'ugb_localization' ) );

		//Welcome Screen
		add_action( 'admin_menu', array( $this, 'egb_welcome_page' ));
		add_action( 'admin_enqueue_scripts', array( $this, 'egb_admin_enqueue_scripts' ));
		add_action( 'admin_init', array( $this, 'egb_safe_welcome_redirect' ) );

		// Add Ultimate Gutenberg Block Category
		// Add custom block category
		add_filter( 'block_categories', array($this, 'ugb_block_category'), 10, 2 );


	}


	/* Checks If Pro Version */
	public function ugb_pro() {

		if ( class_exists( 'Ultimate_Gutenberg_Pro' ) ) {
			return true;
		} else {
			return false;
		}
	}


	public function ugb_block_category( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug' => 'gutenberg-blocks',
					'title' => __( 'Essential Blocks', 'ugb' ),
				),
			)
		);
	}

	/* Files Includes related with Ultimate Gutenberg Plugin */
	public function ugb_include_files(){

		// Scripts and Styles
		require_once $this->ugb_plugin_path() . '/lib/enqueue-scripts.php';
		// require_once $this->ugb_plugin_path() . '/lib/metabox.php';

		if ( is_admin() ) {
			// Notices Libraries
			require_once $this->ugb_plugin_path() . '/lib/admin-notices/dismiss-notices.php';
			require_once $this->ugb_plugin_path() . '/inc/class-admin-notices.php';
			// require_once UGB_DIR . '/inc/get-feedback.php';
		}

	}
	

	// Define Admin Hooks
	public function ugb_define_admin_hooks(){
		

		// Admin Notices
		add_action( 'admin_init', array( 'PAnD', 'init' ) );
		add_action( 'admin_notices', 'ugb_admin_notice_active', 10 );
		add_action( 'admin_notices', 'ugb_admin_notice_after_2_weeks', 10 );
		add_action( 'admin_notices', 'ugb_admin_notice_after_1_month', 10 );


	}

	function egb_safe_welcome_redirect() {

		// Bail if no activation redirect transient is present.
		if ( ! get_transient( '_egb_welcome_redirect' ) ) {
			return;
		}
	
	  	// Delete the redirect transient.
	  	delete_transient( '_egb_welcome_redirect' );
	
	  	// Bail if activating from network or bulk sites.
	  	if ( is_network_admin() || isset( $_GET['activate-multi'] ) ) {
			return;
	  	}
	
	  	// Redirect to Welcome Page.
	  	wp_redirect( 
			  esc_url( admin_url( 'admin.php?page=essential-blocks-for-gutenberg' ) ) 
		);
	
		die();
	
	}

	// Admin Scripts
	public function egb_admin_enqueue_scripts(){

		// Welcome page styles.
		wp_enqueue_style(
			'egb_style',
			UGB_PLUGIN_URL . '/assets/css/welcome.css',
			array(),
			UGB_VERSION,
			'all'
		);
		wp_enqueue_style(
			'egb_jquery_ui',
			'//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css',
			array(),
			UGB_VERSION,
			'all'
		);

		wp_enqueue_script(
			'egb_script',
			UGB_PLUGIN_URL . '/assets/js/welcome-tabs.js',
			array('jquery'),
			UGB_VERSION,
			'all'
		);
		
		//Accordion
		wp_enqueue_script( 'jquery-ui-accordion' );
	}

	// Define Public Hooks
	public function ugb_define_public_hooks(){

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


	/* Register Blocks */
	public function ugb_register_blocks(){

		// Check if the Function doesn't exists
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		// Check If Ultimate Gutenberg Pro
		if ( $this->ugb_pro() ) {
			return;
		}

		// Shortcut for the slug.
		$ugb_slug = $this->plugin_slug;


		register_block_type(
			$ugb_slug . '/alert', array(
				'editor_script' => $ugb_slug . '-editor',
				'editor_style'  => $ugb_slug . '-editor',
				'style'         => $ugb_slug . '-frontend',
			)
		);

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
		load_plugin_textdomain('ugb', false, dirname(plugin_basename(__FILE__)) . '/languages/');
	}


	/* Ultimate Gutenberg Localization */
	public function ugb_localization(){

	}



	public function egb_welcome_page(){

		$icon_svg = 'data:image/svg+xml;base64,' . base64_encode(
			'<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
			width="35.994" height="35.994" viewBox="0 0 256 256">
				<image id="Vector_Smart_Object" data-name="Vector Smart Object" width="257"
				height="257" xlinkHref="data:img/png;base64,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"
				/>
			</svg>'
		);

		// Add Menu Item.
		add_menu_page(
			esc_html__( 'Essential Blocks for Gutenberg', UGB_TD ), // Page Title
			esc_html__( 'Essential Blocks', UGB_TD ),	// Menu Title
			'edit_posts',	// Capability
			'essential-blocks-for-gutenberg', // Menu Slug
			array( $this, 'egb_welcome_page_content'),	// Callback Function
			// $icon_svg,	// Icon	
			UGB_PLUGIN_URL . '/assets/images/egb-icon.png',
			87	// Positon
		);

		// Add Settings Page.
		// add_submenu_page(
		// 	'essential-blocks-for-gutenberg',
		// 	'EGB Settings',
		// 	esc_html__( 'Settings', UGB_TD ),
		// 	'manage_options',
		// 	'essential-blocks-for-gutenberg-settings',
		// 	array($this, 'ugb_setting_screen_content')
		// );

		// add_settings_section(
		// 	'ugb_widgets_settings_section',
		// 	'UGB Settings',
		// 	'ugb_settings_callback',
		// 	'egb-widgets-settings'
		// );

		register_setting( 'egb-widgets-settings', 'ugb_settings', 
			array( 
					'sanitize_callback' => 'ugb_settings_sanitize_callback' 
				) 
			);

	}


	public function egb_welcome_page_content() {
		include_once UGB_PLUGIN_DIR . '/inc/welcome.php';
	}

	// public function ugb_setting_screen_content() {
	// 	include_once UGB_PLUGIN_DIR . '/inc/settings.php';
	// }

}



// function ugb_activate() {
//     return Ultimate_Gutenberg::init();
// }

// // Let's kick it
// ugb_activate();


	function activate_ugb_plugin(){
		
		// Transient max age is 60 seconds.
		set_transient( '_egb_welcome_redirect', true, 60 );

		global $wp_version;
		$wp  = '4.9.8';
		$php = '5.3.29';

		// Compare PHP and WP versions and make sure the plugin can run.
		if ( version_compare( PHP_VERSION, $php, '<' ) ) {
			$flag = 'PHP';
		} elseif ( version_compare( $wp_version, $wp, '<' ) ) {
			$flag = 'WordPress';
		} else {
			// Activate.
			if ( is_plugin_active( 'gutenberg-blocks-pro/ultimate-gutenberg-blocks-pro.php' ) ) {
				add_action( 'update_option_active_plugins', 'deactivate_ugb_pro_version' );
			}
			add_option( 'ugb_install_date', date( 'Y-m-d h:i:s' ) );

			return;
		}

		// Notify User that versions are too old, and deactivate plugin.
		$version = 'PHP' == $flag ? $php : $wp;
		deactivate_plugins( basename( __FILE__ ) );
		wp_die( '<p>The <strong>Ultimate Blocks for Gutenberg</strong> plugin requires' . $flag . '  version ' . $version . ' or greater.</p>', 'Plugin Activation Error', array( 'response' => 200, 'back_link' => true ) );
	}

	register_activation_hook( __FILE__, 'activate_ugb_plugin' );


	/**
	 * Deactivates welcome page
	 * Deletes the welcome page transient.
	 * @since 1.0.0
	 */
	function egb_welcome_deactivate() {
		delete_transient( '_egb_welcome_redirect' );
	}
	register_deactivation_hook( __FILE__, 'egb_welcome_deactivate' );


	/**
	 * This function deactivates the premium plugin version upon activation.
	 */
	function deactivate_ugb_pro_version() {
		deactivate_plugins( 'gutenberg-blocks-pro/ultimate-gutenberg-blocks-pro.php' );
	}

