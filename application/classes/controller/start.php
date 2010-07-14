<?php defined('SYSPATH') or die('No direct script access.');
  
  class Controller_Start extends Controller_Home
  {  
  	public function action_index()
  	{
  	  $this->template->styles = array_merge($this->template->styles, array('media/css/app.css' => 'screen'));
      $this->template->content = View::factory('page/startpage');
  	}  	
	
  	
  }