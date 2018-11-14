<?php 
// namespace Ultimate_Gutenberg\Gutenberg_Blocks\Ultimate_Gutenberg_Admin_Notices

/**
 * Admin Notices
 *
 * @link       https://jeweltheme.com
 * @since      1.0.0
 *
 * @package    Ultimate_Gutenberg
 * @subpackage Ultimate_Gutenberg/admin
 */

/**
 * The admin notice functionality of the plugin.
 *
 * @package		Ultimate_Gutenberg
 * @subpackage  Ultimate_Gutenberg/admin
 * @author		Jewel Theme <support@jeweltheme.com>
 */

// class Ultimate_Gutenberg_Admin_Notices{

		// Admin Notice
		function ugb_admin_notice_active(){
			if ( ! PAnD::is_admin_notice_active( 'notice-ugb-activated-forever' ) ) {
				return;
			} ?>

			<div data-dismissible="notice-ugb-activated-forever" class="notice updated is-dismissible">

				<h2 style="margin-bottom: 0px;">
					<?php printf( __( 'Thanks for using <a href="%1$s" target="_blank">Ultimate Gutenberg Blocks</a>! If you like the plugin, could you please take a moment to give us a <a href="%2$s" target="_blank"><strong>5-star rating</strong></a>?', UGB_TD ), 'https://jeweltheme.com/', 'https://wordpress.org/support/plugin/gutenberg-blocks/reviews/#new-post' ); ?>		
				</h2>

				<p>
					<?php esc_html_e( 'A positive rating will keep us motivated to continue supporting and improving this free plugin, and will help spread its popularity. Your help is greatly appreciated!', UGB_TD ); ?>		
				</p>

				<p>
					<?php printf( __( '<button class="button button-primary" href="%1$s" target="_blank">Leave 5-Star Rating!</button>', UGB_TD ), 'https://wordpress.org/support/plugin/gutenberg-blocks/reviews/#new-post' ); ?>
						
					</p>

			</div>

		<?php
		}


		// Show Admin Notice After 2 Weeks
		function ugb_admin_notice_after_2_weeks(){
				$install_date = get_option( 'ugb_install_date' );
			// $install_date = date( '2018-02-12 12:00:00' ); // Testing date.
			// $install_date = ''; // Testing date.

				$display_date = date( 'Y-m-d h:i:s' );
				$datetime1 = new DateTime( $install_date );
				$datetime2 = new DateTime( $display_date );
				$diff_intrval = round( ($datetime2->format( 'U' ) - $datetime1->format( 'U' )) / (60 * 60 * 24) );

				if ( ! PAnD::is_admin_notice_active( 'notice-ugb-weeks-forever' ) ) {
					return;
				}
			?>

				<?php if ( $diff_intrval >= 14 ) { ?>

					<div data-dismissible="notice-ugb-weeks-forever" class="notice updated is-dismissible">

						<h2 style="margin-bottom: 0px;">
							<?php printf( __( 'Sweet! You\'ve been using <a href="%1$s" target="_blank">Ultimate Gutenberg</a> for a couple weeks! Could you please take a moment to give us a <a href="%2$s" target="_blank"><strong>5-star rating</strong></a>?', UGB_TD ), 'https://jeweltheme.com/', 'https://wordpress.org/support/plugin/gutenberg-blocks/reviews/#new-post' ); ?>
						</h2>

						<p>
							<?php esc_html_e( 'A positive rating will keep us motivated to continue supporting and improving this free plugin, and will help spread its popularity. Your help is greatly appreciated!', UGB_TD ); ?>
						</p>

						<p>
							<?php printf( __( '<button class="button button-primary" href="%1$s" target="_blank">Leave 5-Star Rating!</button>', UGB_TD ), 'https://wordpress.org/support/plugin/gutenberg-blocks/reviews/#new-post' ); ?>
						</p>

					</div>

				<?php }			

		}

		// Show Notice After One Month
		function ugb_admin_notice_after_1_month(){


				$install_date = get_option( 'ugb_install_date' );
				$display_date = date( 'Y-m-d h:i:s' );
				$datetime1 = new DateTime( $install_date );
				$datetime2 = new DateTime( $display_date );
				$diff_intrval = round( ($datetime2->format( 'U' ) - $datetime1->format( 'U' )) / (60 * 60 * 24) );

				if ( ! PAnD::is_admin_notice_active( 'notice-ugb-month-forever' ) ) {
					return;
				}
				?>

				<?php if ( $diff_intrval >= 30 ) { ?>

					<div id="fb-root"></div>
					<script>(function(d, s, id) {
						var js, fjs = d.getElementsByTagName(s)[0];
						if (d.getElementById(id)) return;
						js = d.createElement(s); js.id = id;
						js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=246727095428680";
						fjs.parentNode.insertBefore(js, fjs);
					}(document, 'script', 'facebook-jssdk'));</script>

					<script>window.twttr = (function(d, s, id) {
						var js, fjs = d.getElementsByTagName(s)[0],
						t = window.twttr || {};
						if (d.getElementById(id)) return t;
						js = d.createElement(s);
						js.id = id;
						js.src = "https://platform.twitter.com/widgets.js";
						fjs.parentNode.insertBefore(js, fjs);

						t._e = [];
						t.ready = function(f) {
							t._e.push(f);
						};

						return t;
					}(document, "script", "twitter-wjs"));</script>

					<div data-dismissible="notice-ugb-month-forever" class="notice updated is-dismissible">

						<h2 style="margin-bottom: 0px;"><?php printf( __( 'Whoa! You\'ve been using <a href="%1$s" target="_blank">Essential Blocks for Gutenberg</a> for a whole month!', UGB_TD ), 'https://jeweltheme.com/' ); ?></h2>
						<p><?php esc_html_e( 'We\'re just a couple dudes trying to make the web a better place. Please take a moment to show your appreciation by liking and subscribing! Your support is greatly appreciated!', UGB_TD ); ?></p>

						<div class="follows" style="overflow: hidden; margin-bottom: 12px;">


							<div class="social-links" style="float: left; margin-left: 24px; margin-top: 4px;">
								<div class="fb-like" style="float: left;" data-href="https://www.facebook.com/jwthemeltd/" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="false"></div>
								<div class="twitter-follow" style="float: left; margin-left: 6px;">
									<a class="twitter-follow-button" href="https://twitter.com/jwthemeltd" data-show-count="false">		Follow @jwthemeltd
									</a>
								</div>
							</div>

							<a class="button button-primary" style="float: right; margin-left: 12px;" href="<?php echo esc_url( 'https://jeweltheme.com/cat/wordpress-themes/' ); ?>" target="_blank">
								<?php _e( 'Get 40+ Premium Themes!', UGB_TD ); ?>
							</a>

						</div>

					</div>


				<?php } ?>

				<?php


		}

		
// }

