<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Ajax extends Controller {
			
			public function action_index() {
						if ($_POST) {									
                $dir = $_POST['dir'];                  
                $sort = $_POST['sort'];                 
                $name1 = $_POST['city'];									
                $name2 = $_POST['struct'];									
                $name3 =$_POST['ded'];								
                $name4 =$_POST['cov']; 									
                $name5 = $_POST['dist'];									
                $name6 =$_POST['year']; 
                $query = DB::select()->from('ho3')
                 ->where('ho3.city','=',$name1)
                 ->and_where('ho3.structure','=',$name2)
                 ->and_where('ho3.deductible','=',$name3)
                 ->and_where('ho3.coverage','=',$name4)
                 ->and_where('ho3.distance','=',$name5)
                 ->and_where('ho3.year','=',$name6)
                 ->join('home')
                 ->on('home.company','=','ho3.company') 
                 ->order_by($sort, $dir)
                 ->execute()
                 ->as_array();								
                $this->request->response = '{"results":' . json_encode($query) . '}';
                return;
                Database::$instances = array();
						}
			}
}