<?php
//namespace Ultimate_Gutenberg\Gutenberg_Blocks;
/**
 * @package     Ultimate_Gutenberg\Gutenberg_Blocks
 * @author      Liton Arefin (@Litonice13)
 * @license     GPL-3.0
 *
 * Plugin Name: Ultimate Gutenberg Blocks
 * Plugin URI:  https://jeweltheme.com/
 * Description: Ultimate Gutenberg Blocks helps to make your Website more Comfortable
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
define( 'UGB', $ugb->plugin_name );
define( 'UGB_VERSION', $ugb->version );
define( 'UGB_PLUGIN_URL', $ugb->ugb_plugin_url());
define( 'UGB_PLUGIN_DIR', $ugb->ugb_plugin_path() );
define( 'UGB_PLUGIN_DIR_URL', $ugb->ugb_plugin_dir_url());
define( 'UGB_IMAGE_DIR', $ugb->ugb_plugin_dir_url().'/images');
define( 'UGB_TD', $ugb->ugb_load_textdomain());  // Ultimate Gutenberg Text Domain
define( 'UGB_FILE', __FILE__ );
define( 'UGB_DIR', dirname( __FILE__ ) );




class Ultimate_Gutenberg{

	/* Variables */
	public  $version = "1.0.0";
	private $plugin_path;
	private $plugin_url;
	private $plugin_slug;
	public  $plugin_dir_url;
	public  $plugin_name = 'Ultimate Gutenberg';

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

		add_action( 'admin_menu', array( $this, 'ugb_welcome_screen' ));

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
					'title' => __( 'Ultimate Gutenberg', 'ugb' ),
				),
			)
		);
	}

	/* Files Includes related with Ultimate Gutenberg Plugin */
	public function ugb_include_files(){

		// Scripts and Styles
		require_once $this->ugb_plugin_path() . '/lib/enqueue-scripts.php';

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



	public function ugb_welcome_screen(){

		$icon_svg = 'data:image/svg+xml;base64,' . base64_encode(
			'<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="120 10 40 40" xml:space="preserve">
			<g>
				<path fill="#a0a5aa" d="M144.128,11.221c-7.733,0-13.455,1.824-17.002,5.421c-8.137,8.252-5.41,17.112-4.38,19.634
					c0.906,2.217,2.021,3.613,2.875,4.35l2.957-2.609l-0.278-13.13l2.999,10.728l4.374-3.86l0.438-10.677l1.894,8.617l10.528-8.433
					l-8.292,10.76l8.57,1.933l-10.595,0.444l-3.776,4.422l10.614,3.049l-12.974-0.278l-2.522,2.956c0.092,0.11,0.194,0.228,0.315,0.344
					c1.9,1.938,5.897,3.889,10.54,3.889c3.257,0,8.112-0.991,12.775-5.72c8.079-8.19,4.882-25.648,3.841-30.338
					C154.816,12.222,149.721,11.221,144.128,11.221L144.128,11.221L144.128,11.221z"/>
			</g>
			</svg>'
		);

		// Add Menu Item.
		add_menu_page(
			esc_html__( 'UGB', UGB_TD ),
			esc_html__( 'UGB', UGB_TD ),
			'edit_posts',
			'ugb-widgets',
			array( $this, 'ugb_welcome_screen_content'),
			$icon_svg,
			110
		);

		// Add Settings Page.
		add_submenu_page(
			'ugb-widgets',
			'UGB Settings',
			esc_html__( 'Settings', UGB_TD ),
			'manage_options',
			'ugb-widgets-settings',
			array($this, 'ugb_setting_screen_content')
		);

		add_settings_section(
			'ugb_widgets_settings_section',
			'UGB Settings',
			'ugb_settings_callback',
			'organic-widgets-settings'
		);

		register_setting( 'organic-widgets-settings', 'ugb_settings', array( 'sanitize_callback' => 'ugb_settings_sanitize_callback' ) );

	}


	public function ugb_welcome_screen_content() {
		include_once plugin_dir_path( __FILE__ ) . '/inc/welcome.php';
	}

	public function ugb_setting_screen_content() {
		include_once plugin_dir_path( __FILE__ ) . '/inc/settings.php';
	}




}



// function ugb_activate() {
//     return Ultimate_Gutenberg::init();
// }

// // Let's kick it
// ugb_activate();




	register_activation_hook( __FILE__, 'activate_ugb_plugin' );

	function activate_ugb_plugin(){

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
		wp_die( '<p>The <strong>Ultimate Gutenberg Blocks</strong> plugin requires' . $flag . '  version ' . $version . ' or greater.</p>', 'Plugin Activation Error', array( 'response' => 200, 'back_link' => true ) );
	}

	/**
	 * This function deactivates the premium plugin version upon activation.
	 */
	function deactivate_ugb_pro_version() {
		deactivate_plugins( 'gutenberg-blocks-pro/ultimate-gutenberg-blocks-pro.php' );
	}

