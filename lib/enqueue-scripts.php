<?php

	namespace Ultimate_Gutenberg\Gutenberg_Blocks;

	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets' );

	/**
	 * Enqueue block editor only JavaScript and CSS.
	 */
	function enqueue_block_editor_assets() {
		// Make paths variables so we don't write em twice ;)
		$block_path = '/assets/js/editor.blocks.js';
		$style_path = '/assets/css/blocks.editor.css';

		// Enqueue the bundled block JS file
		wp_enqueue_script(
			'gutenberg-blocks-js',
			UGB_PLUGIN_URL . $block_path,
			[ 
				'wp-i18n', 
				'wp-element', 
				'wp-blocks', 
				'wp-editor', 
				'wp-components',
				'react', 
				'wp-api-fetch',
				'wp-compose',
				'wp-data',
				'wp-edit-post',
				'wp-plugins',

			],
			filemtime( UGB_PLUGIN_DIR . $block_path )
		);

		// Enqueue optional editor only styles
		wp_enqueue_style(
			'gutenberg-blocks-editor-css',
			UGB_PLUGIN_URL . $style_path,
			[ 'wp-blocks' ],
			filemtime( UGB_PLUGIN_DIR . $style_path )
		);
	}

	add_action( 'enqueue_block_assets', __NAMESPACE__ . '\enqueue_assets' );
	/**
	 * Enqueue front end and editor JavaScript and CSS assets.
	 */
	function enqueue_assets() {
		$style_path = '/assets/css/blocks.style.css';
		wp_enqueue_style(
			'gutenberg-blocks',
			UGB_PLUGIN_URL . $style_path,
			[ 'wp-blocks' ],
			filemtime( UGB_PLUGIN_DIR . $style_path )
		);
	}

	add_action( 'enqueue_block_assets', __NAMESPACE__ . '\enqueue_frontend_assets' );
	/**
	 * Enqueue frontend JavaScript and CSS assets.
	 */
	function enqueue_frontend_assets() {

		// If in the backend, bail out.
		if ( is_admin() ) {
			return;
		}

		$block_path = '/assets/js/frontend.blocks.js';
		wp_enqueue_script(
			'gutenberg-blocks-frontend',
			UGB_PLUGIN_URL . $block_path,
			[],
			filemtime( UGB_PLUGIN_DIR . $block_path )
		);
	}



	/* Include External Libraries */
	function egb_scripts(){
		wp_enqueue_style( 'bootstrap', UGB_PLUGIN_URL . '/lib/bootstrap/dist/css/bootstrap.min.css' );
		wp_enqueue_script( 'bootstrap', UGB_PLUGIN_URL . '/lib/bootstrap/dist/js/bootstrap.min.js', array('jquery'), UGB_VERSION, 'all');
	}
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\egb_scripts' );
