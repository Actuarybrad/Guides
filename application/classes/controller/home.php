<?php defined('SYSPATH') or die('No direct script access.');
  
  abstract class Controller_Home extends Controller_Template 
  { 	   
      public function before()
      {
          parent::before();   
          
          $this->template->styles = array();
          $this->template->scripts = array();
          $this->template->content = '';
          
          $this->template->sidebar1 = Menu::factory()
          ->add('Start Comparison', 'formwiz')
          ->add('Review Selections', 'review')
          ->add('Homeowners', 'start');

          $this->template->sidebar2 = Menu::factory()
          ->add('Consumer Guide', 'resources/consumer')
          ->add('Cost of Homeowners', 'resources/cost')
          ->add('Homeowners FAQs', 'resources/faq')
          ->add('Market Share Reports', 'resources/market');

          $this->template->sidebar3 = Menu::factory()
          ->add('Workers Compensation', 'guides/lcm')
          ->add('Condominium Owners', 'guides/condo')
          ->add('Renters', 'guides/rent')
          ->add('Automobile Single Driver', 'guides/single')
          ->add('Automobile Household Driver', 'guides/house');

      }  
}