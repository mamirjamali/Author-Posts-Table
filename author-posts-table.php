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

function apt_block_author_posts_table_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'apt_block_author_posts_table_block_init');