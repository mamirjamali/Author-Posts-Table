<?php


function apt_enqueue_scripts()
{

    $userId = get_current_user_id();
    $userTotalPost = count_user_posts($userId, 'post');

    print_r($userTotalPost);
    wp_add_inline_script(
        "apt-block-author-posts-table-view-script",
        "const totalPostNum = {$userTotalPost}",
        'before'
    );

}