<?php

class router {
    public function navigate()
    {
        if ( !empty($_GET['c']) )
        {
            $class_name = $_GET['c'];
        }
        if ( !empty($_GET['a']) )
        {
            $action = $_GET['a'];
        }

        $class_path = 'class/'.$class_name.'.php';

        if(file_exists($class_path))
        {
            include $class_path;
        }

        $class = new $class_name();

        $class->$action();
    }
} 