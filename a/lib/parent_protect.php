<?php

class parent_protect extends parent_class{
    function __construct() {
        $this->db = new MysqliDb ('localhost', 'iinter_college', '4a3b4d44', 'iinter_college');
        /*
         * только для зарегестрированных
         */
        if(!$this->check()){
            $this->BadResponse(array('message'=>'Доступ запрещен'));
            exit;
        }else{
            $this->db->where('session_key',$_COOKIE['code_user']);
            $user = $this->db->getOne ("session");

            $this->db->where('id',$user['id_seller']);
            $this->user = $this->db->getOne ("seller");
        }
    }
} 