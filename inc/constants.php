<?php
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

