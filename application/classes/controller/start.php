<?php defined('SYSPATH') or die('No direct script access.');
  
  class Controller_Start extends Controller_Home
  {  
  	public function action_index()
  	{  		
      $this->template->content = View::factory('page/startpage');
  	}  
  	
  }