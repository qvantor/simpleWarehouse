<?php

class parent_class {
    function __construct() {
        $this->db = new MysqliDb ('localhost', 'iinter_college', '4a3b4d44', 'iinter_college');
    }
    /*
     * Проверка авторизации
     */
    public function check(){
            if(!empty($_COOKIE["id"])&&!empty($_COOKIE["code_user"])){
                $this->db->where('id_seller',$_COOKIE["id"]);
                $this->db->where('session_key',$_COOKIE["code_user"]);
                if($this->db->get ('session')){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
    }
    public function GoodResponse($arr){
        $arr['st']='success';
        echo json_encode($arr);
    }
    public function BadResponse($arr){
        $arr['st']='error';
        echo json_encode($arr);
    }
    public function Hack(){
        echo 'Hack attempt';
    }
} 