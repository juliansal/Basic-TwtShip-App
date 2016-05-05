<?php
  require_once('twitter_proxy.php');

  $name = $_GET['twittername'];

  $oauth_access_token = '3075570080-LSdlB3Bf5hU7ifDQmjkcts2bELlCz6p8M4jmHca';
  $oauth_access_token_secret = 'kycQJlsflSEqmjD1ZUsfnqsY6psog6nyys2pCAFbIc593';
  $consumer_key = 'KpAQlbMBD2mMH1p0ohx7n2zBP';
  $consumer_secret = '7zQoJ03W63oxqscb57HpkQa3x1Cs7Q0letFBvwaKhlXLt3oTfX';
  $user_id = '3075570080';
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
