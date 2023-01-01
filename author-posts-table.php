<?php
/**
 * Plugin Name:       Author Posts Table
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Amir Jamali
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       author-posts-table
 *
 * @package           apt-block
 */

if (!function_exists('add_action')) {
	echo "Seems you stumbled here by accident.";
	exit;
}
//Setup
define('APT_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('APT_PLUGIN_FILE', __FILE__);


//Includes
include(APT_PLUGIN_DIR . 'includes/author-posts.php');
include(APT_PLUGIN_DIR . 'includes/enqueue.php');

//Register
function apt_block_author_posts_table_init()
{
	register_block_type(APT_PLUGIN_DIR . 'build', [
		'render_callback' => 'apt_author_posts_table_render_cb'
	]);
}
add_action('init', 'apt_block_author_posts_table_init');

//Hooks
add_action('wp_enqueue_scripts', 'apt_enqueue_scripts');