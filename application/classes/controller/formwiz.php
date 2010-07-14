<?php defined('SYSPATH') or die('No direct script access.');
  
  class Controller_Formwiz extends Controller_Home
  {    	
    public function action_index() {						
						$this->template->styles = array_merge($this->template->styles, array('media/css/ext-all.css' => 'screen', 'media/css/grid.css' => 'screen', 'media/css/app.css' => 'screen'));
						$this->template->scripts = array_merge($this->template->scripts, array('media/js/ext.js','media/js/app.js', 'media/js/FormWiz.js'));
			}      

  }