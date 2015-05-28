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
            'per'=>$_POST['per'],
            'date'=>date("y-m-d")
        );
        if($this->db->insert('warehouse', $data)){
            $this->Success(array('m'=>'Данные добавлены'));
        }else{$this->Error(array('m'=>'Ошибка добавления данных'));}
    }
    public function update(){
        $this->ifPost();
        $this->db->where('id',$_POST['id']);
        $this->db->where('user_id',$this->user['id']);
        $data = array(
            'name'=>$_POST['name'],
            'count'=>$_POST['count'],
            'item'=>$_POST['item'],
            'price'=>$_POST['price'],
            'per'=>$_POST['per'],
        );
        if($this->db->update('warehouse', $data)){
            $this->Success(array('m'=>'Данные изменены'));
        }else{$this->Error(array('m'=>'Ошибка изменения данных'));}
    }
    public function sold(){
        $this->ifPost();
        $this->db->where('id', $_POST['id']);
        $clrSold = $sold = $this->db->getOne('warehouse');

        if($sold['count']<$_POST['count']){
            $this->Error(array('m'=>'Количество проданых превышает количество имеющихся'));
            die();
        }

        $sold['count'] = $_POST['count'];
        $sold['wh_id'] = $sold['id'];
        $sold['date'] = date("y-m-d");
        unset ($sold['id']);
        $result = $this->db->insert('sold',$sold);

        if($result){
            $clrSold['count'] = $clrSold['count'] - $_POST['count'];
            $this->db->where('id', $clrSold['id']);
            $this->db->update('warehouse',$clrSold);

            $this->Success(array('m'=>'Данные изменены'));
        }else{$this->Error(array('m'=>'Ошибка изменения данных'));}
    }
    public function getAll(){
        $this->db->where('user_id',$this->user['id']);
        $this->db->where('count','0','>');
        $this->Success($this->db->get('warehouse'));
    }
} 