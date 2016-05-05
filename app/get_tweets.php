<?php
  require_once('twitter_proxy.php');

  $name = $_GET['twittername'];

  $oauth_access_token = '';
  $oauth_access_token_secret = '';
  $consumer_key = '';
  $consumer_secret = '';
  $user_id = '';
  $screen_name = $name;
  $count = 3;

  $twitter_url = 'statuses/user_timeline.json';
  $twitter_url .= '?user_id=' . $user_id;
  $twitter_url .= '&screen_name=' . $screen_name;
  $twitter_url .= '&count=' . $count;

  $twitter_proxy = new TwitterProxy(
    $oauth_access_token,
    $oauth_access_token_secret,
    $consumer_key,
    $consumer_secret,
    $user_id,
    $screen_name,
    $count
  );

  $tweets = $twitter_proxy->get($twitter_url);

  echo $tweets;

?>
