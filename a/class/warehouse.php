<?php

class warehouse extends parent_protect{

    public function add(){
        $this->ifPost();
        $data = array(
            'user_id'=>$this->user['id'],
            'name'=>$_POST['name'],
            'count'=>$_POST['count'],
            'item'=>$_POST['item'],
            'price'=>$_POST['price'],
            'per'=>$_POST['per']
        );
        if($this->db->insert('warehouse', $data)){
            $this->Success(array('m'=>'Данные добавлены'));
        }else{$this->Error(array('m'=>'Ошибка добавления данных'));}

    }
    public function getAll(){
        $this->db->where('user_id',$this->user['id']);
        $this->Success($this->db->get('warehouse'));
    }
} 