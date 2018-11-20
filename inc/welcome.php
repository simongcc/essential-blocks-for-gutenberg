<?php
	/*
	 * Welcome Screen by Jewel Theme
	 */
?>

<div class="egb"> 
	<div class="wrap about-wrap">

		<div class="intro_wrapper">

			<header class="header">
				<h1 class="plugin_name">
					<?php printf( __( '%s <small>v %s</small>', 'EGB' ), UGB, UGB_VERSION ); ?>
				</h1>
				<div class="about-text">
					<?php printf( __( "Ultimate Gutenberg Blocks Builder for WordPress.", 'EGB' ), UGB_VERSION ); ?>
				</div>
				<div class="wp-badge welcome__logo"></div>
			</header>

			<div class="waveWrapper waveAnimation">
				<div class="waveWrapperInner bgTop">
					<div class="wave waveTop" style="background-image: url('<?php echo UGB_PLUGIN_URL. "/assets/images/wave-top.png";?>')"></div>
				</div>
				<div class="waveWrapperInner bgMiddle">
					<div class="wave waveMiddle" style="background-image: url('<?php echo UGB_PLUGIN_URL. "/assets/images/wave-mid.png";?>')"></div>
				</div>
				<div class="waveWrapperInner bgBottom">
					<div class="wave waveBottom" style="background-image: url('<?php echo UGB_PLUGIN_URL. "/assets/images/wave-bot.png";?>')"></div>
				</div>
			</div>

		</div>


			
			<!-- Start tabs -->
			<ul class="wp-tab-bar egb_navbar">
				<li class="wp-tab-active">
					<a href="#how-to">
						<?php _e( 'How to Use', 'EGB' ); ?>
					</a>
				</li>
				<li>
					<a href="#docs">
						<?php _e( 'Docs', 'EGB' ); ?>
					</a>
				</li>
				<li>
					<a href="#support">
						<?php _e( 'Support', 'EGB' ); ?>
					</a>
				</li>
				<li>
					<a href="#free-themes">
						<?php _e( 'Free Themes', 'EGB' ); ?>
					</a>
				</li>				
				<li>
					<a href="#changelogs">
						<?php _e( 'Changelogs', 'EGB' ); ?>
					</a>
				</li>
			</ul>
			<!-- End tabs -->

		

		<div class="egb_contents">


				<div class="wp-tab-panel" id="how-to">
					<h1 class="black textcenter main_heading">
						<?php _e( 'Welcome to Essential Blocks for Guteneberg.', 'EGB' ); ?>
					</h1>				
					
					<h3 class="black textcenter sub-heading">The Ultimate Builder for WordPress!</h3>
					
					<div class="parent">

						<div class="left_column">
							<div class="left_block">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
									tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
									quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
									consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
									cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
									proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</p>
								<br>
								<h3>Essential Block Demos </h3>
								<ul class="egb_demos">
									<li>
										<a 
											href="https://plugins.jeweltheme.com/essential-gutenberg/alert-notification/"
											target="_blank">
											<strong>
												<?php _e( 'Alert/Accordion', 'EGB' ); ?>
											</strong>
										</a>
									</li>
									<li>
										<a 
											href="https://plugins.jeweltheme.com/essential-gutenberg/blockquote/"
											target="_blank">
											<strong>
												<?php _e( 'Blockquotes', 'EGB' ); ?>
											</strong>
											<span class="ribbon hot">Hot</span>
										</a>
									</li>
									<li>
										<a 
											href="https://plugins.jeweltheme.com/essential-gutenberg/call-to-action/"
											target="_blank">
											<strong>
												<?php _e( 'Call to Action', 'EGB' ); ?>
											</strong>
										</a>
									</li>
									<li>
										<a 
											href="https://plugins.jeweltheme.com/essential-gutenberg/cards/"
											target="_blank">
											<strong>
												<?php _e( 'Cards', 'EGB' ); ?>
											</strong>
										</a>
									</li>
									<li>
										<a 
											href="https://plugins.jeweltheme.com/essential-gutenberg/image-content/"
											target="_blank">
											<strong>
												<?php _e( 'Image & Content', 'EGB' ); ?>
											</strong>
										</a>
										<span class="ribbon new">New</span>
									</li>
									<li>
										<a 
											href="https://plugins.jeweltheme.com/essential-gutenberg/testimonial/"
											target="_blank">
											<strong>
												<?php _e( 'Testimonials', 'EGB' ); ?>
											</strong>
										</a>
										<span class="ribbon trending">Trending</span>
									</li>
									<li>
										<a 
											href="https://plugins.jeweltheme.com/essential-gutenberg/title-subtitle/"
											target="_blank">
											<strong>
												<?php _e( 'Heading & Sub Heading', 'EGB' ); ?>
											</strong>
										</a>
										<span class="ribbon new">New</span>
									</li>

									<li>
										<strong>
											<?php _e( 'Hero Image', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>

									<li>
										<strong>
											<?php _e( 'Blog Grid', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>

									<li>
										<strong>
											<?php _e( 'Testimonial Slider', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>

									<li>
										<strong>
											<?php _e( 'Logo Slider', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>
									<li>
										<strong>
											<?php _e( 'Author Box', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>
									<li>
										<strong>
											<?php _e( 'Accordion', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>
									<li>
										<strong>
											<?php _e( 'Teams', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>
									<li>
										<strong>
											<?php _e( 'Team Slider', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>
									<li>
										<strong>
											<?php _e( 'Number Block', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>
									<li>
										<strong>
											<?php _e( 'Animate Counter', 'EGB' ); ?>
										</strong>
										<span class="ribbon pro">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>
									<li>
										<strong>
											<?php _e( 'GDPR Conscent', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>
									<li>
										<strong>
											<?php _e( 'Related Posts', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>
									<li>
										<strong>
											<?php _e( 'Facebook Like Block', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>
									<li>
										<strong>
											<?php _e( 'Instagram Block', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>
									<li>
										<strong>
											<?php _e( 'Social Share', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>
									<li>
										<strong>
											<?php _e( 'Click to Tweet', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>
									<li>
										<strong>
											<?php _e( 'Google Maps(GMap)', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>
									<li>
										<strong>
											<?php _e( 'Maps Location', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>
									<li>
										<strong>
											<?php _e( 'Banner Ads', 'EGB' ); ?>
										</strong>
										<span class="ribbon coming">
											<?php _e( 'Upcoming', 'EGB' ); ?>
										</span>
									</li>
									
								</ul>
								
							</div>
						</div>

						<div class="right_column">
							<img class="tab-banner" src="<?php echo UGB_PLUGIN_URL .'/assets/images/banner-image.png';?>" alt="Essential Blocks for Gutenberg Block Banner Image">
						</div>
					</div>

					<div class="egb_features">
						<div class="egb_feature one-col">
							<div class="feature_content">
												
																	
								<div class="right_block">
									
								</div>
							</div>
						</div>
					</div>	


					<div class="egb_features">
						<h2>Essential Blocks for Gutenberg</h3>
						<p class="textcenter">
							Listed Blocks are available not on Essential Blocks for Gutenberg Plugin. Blocks are being added daily ...
						</p>
						<div class="egb_feature three-col">
							<div class="col">
								<div class="feature_content">
									<img src="<?php echo UGB_PLUGIN_URL .'/assets/images/feature/alert.svg';?>"/>
									<h3><?php _e( 'Alert/Notification Block', 'EGB' ); ?></h3>
									<p><?php _e( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed sapien quam. Sed dapibus est id enim facilisis, at posuere turpis adipiscing. Quisque sit amet dui dui.', 'EGB' ); ?></p>
								</div>
							</div>
							<div class="col">
								<div class="feature_content">
									<img src="<?php echo UGB_PLUGIN_URL .'/assets/images/feature/call-to-action.svg';?>" />
									<h3><?php _e( 'Call to Action Block', 'EGB' ); ?></h3>
									<p><?php _e( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed sapien quam. Sed dapibus est id enim facilisis, at posuere turpis adipiscing. Quisque sit amet dui dui.', 'EGB' ); ?></p>
								</div>
							</div>
							<div class="col">
								<div class="feature_content">
									<img src="<?php echo UGB_PLUGIN_URL .'/assets/images/feature/cards.svg';?>" />
									<h3><?php _e( 'Cards Block', 'EGB' ); ?></h3>
									<p><?php _e( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed sapien quam. Sed dapibus est id enim facilisis, at posuere turpis adipiscing. Quisque sit amet dui dui.', 'EGB' ); ?></p>
								</div>								
							</div>
						</div>

						
						<div class="egb_feature three-col">
							<div class="col">
								<div class="feature_content">
									<img src="<?php echo UGB_PLUGIN_URL .'/assets/images/feature/image.svg';?>"/>
									<h3><?php _e( 'Image & Content Block', 'EGB' ); ?></h3>
									<p><?php _e( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed sapien quam. Sed dapibus est id enim facilisis, at posuere turpis adipiscing. Quisque sit amet dui dui.', 'EGB' ); ?></p>
								</div>
							</div>
							<div class="col">
								<div class="feature_content">
									<img src="<?php echo UGB_PLUGIN_URL .'/assets/images/feature/quote.svg';?>" />
									<h3><?php _e( 'Blockquote Block', 'EGB' ); ?></h3>
									<p><?php _e( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed sapien quam. Sed dapibus est id enim facilisis, at posuere turpis adipiscing. Quisque sit amet dui dui.', 'EGB' ); ?></p>
								</div>
							</div>
							<div class="col">
								<div class="feature_content">
									<img src="<?php echo UGB_PLUGIN_URL .'/assets/images/feature/testimonial.svg';?>" />
									<h3><?php _e( 'Testimonial Block', 'EGB' ); ?></h3>
									<p><?php _e( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed sapien quam. Sed dapibus est id enim facilisis, at posuere turpis adipiscing. Quisque sit amet dui dui.', 'EGB' ); ?></p>
								</div>								
							</div>
						</div>
						
					</div>


				</div>

				<div class="wp-tab-panel" id="docs" style="display: none;">
					<div class="egb_features">
						<div class="egb_feature">
							<h2>Documentation</h3>
							<p>
								This is Documentation Section for Essential Blocks for Gutenberg.
							</p>
						</div>
					</div>
				</div>


				<div class="wp-tab-panel" id="support" style="display: none;">
					<div class="egb_features">
						<div class="egb_feature">
							<h2>Are you Looking for Support?</h3>
							<p>
								We've Dedicated Support Forum for <a href="https://jeweltheme.com/support/forum/wordpress-plugins/essential-blocks-for-gutenberg/" target="_blank">Essential Blocks for Gutenberg</a>. We're contributing for giving back to WordPress Community.
								As this is a Free WordPress Plugin, support maybe delayed because <a href="https://jeweltheme.com" target="_blank">Jewel Theme</a> provides Priority Support for Premium Customers.
							</p>
						</div>
					</div>
				</div>

				<div class="wp-tab-panel" id="free-themes" style="display: none;">
					<?php require( UGB_PLUGIN_DIR . '/inc/free-themes.php' );?>
				</div>

				

				<div class="wp-tab-panel" id="changelogs" style="display: none;">
					<div class="parent">
						<div class="left_column">
							<?php 
								require_once( UGB_PLUGIN_DIR . '/inc/readme-parser.php' );
								$li = new WordPress_Readme_Parser();
								$t = $li->parse_readme( UGB_PLUGIN_DIR . '/readme.txt' );
								echo '<pre>' . $t['sections']['changelog'] . '</pre>';					
							?>
						</div>
						<?php require( UGB_PLUGIN_DIR . '/inc/right-column.php' );?>
					</div>
				</div>
		</div>
	</div>
</div>

