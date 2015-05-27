<?php

class parent_class {
    function __construct() {
        $this->db = new MysqliDb ('localhost', 'iinter_wh', '4a3b4d44', 'iinter_wh');
    }
    /*
     * Проверка авторизации
     */
    public function check(){
            if(!empty($_COOKIE["id"])&&!empty($_COOKIE["code_user"])){
                $this->db->where('id_user',$_COOKIE["id"]);
                $this->db->where('session_key',$_COOKIE["code_user"]);
                if($this->db->get('session')){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
    }
    public function Success($arr){
        header("HTTP/1.0 200 OK");
        header('Status: 200 OK');
        header('HTTP/1.0 200 OK');
        echo json_encode($arr);
    }
    public function Unauthorized($arr){
        header("HTTP/1.0 401 Unauthorized");
        header('Status: 401 Unauthorized');
        header('HTTP/1.0 401 Unauthorized');
        echo json_encode($arr);
    }
    public function Error($arr){
        header("HTTP/1.0 406 Not Acceptable");
        header('Status: 406 Not Acceptable');
        header('HTTP/1.0 406 Not Acceptable');
        echo json_encode($arr);
    }
    public function Hack(){
        echo 'Hack attempt';
        die();
    }
} 