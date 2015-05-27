<?php

class parent_protect extends parent_class{
    function __construct() {
        $this->db = new MysqliDb ('localhost', 'iinter_wh', '4a3b4d44', 'iinter_wh');
        /*
         * только для зарегестрированных
         */
        if(!$this->check()){
            $this->Unauthorized(array('m'=>'Доступ запрещен'));
            exit;
        }else{
            $this->db->where('session_key',$_COOKIE['code_user']);
            $user = $this->db->getOne ("session");

            $this->db->where('id',$user['id_user']);
            $this->user = $this->db->getOne ("user");
        }
    }

    public function ifPost(){
        if(!$_POST){
            $this->Hack();
        }
    }
} 