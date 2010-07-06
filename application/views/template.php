<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>Homeowners</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<?php echo HTML::style('media/css/reset.css', array('media' => 'screen')), "\n" ?>
<?php foreach ($styles as $file => $type) echo HTML::style($file, array('media' => $type)), "\n" ?>
<?php echo HTML::style('media/css/app.css', array('media' => 'screen')), "\n" ?>
<?php echo HTML::script('media/js/ext.js'), "\n" ?>
<?php foreach ($scripts as $file) echo HTML::script($file), "\n" ?>
</head>
<body>
<div id="wrapper">
  <div id="headerBox"></div>  
  <div id="leftSidebar">
  <div class="darkmenu"><div class="darkmenucontent"><?php echo $sidebar1->render($attrs1); ?></div></div>
  <div class="darkmenu"><div class="darkmenucontent"><?php echo $sidebar2->render($attrs2); ?></div></div>
  <div class="darkmenu"><div class="darkmenucontent"><?php echo $sidebar3->render($attrs3); ?></div></div>
 </div>
  <div id="contentDiv"><?php echo $content; ?></div>
  <div id="footerBox"><span class="footy">&#169; Public Regulation Commission</span></div>
</div>
</body>
</html>