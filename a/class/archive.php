<?php

class archive extends parent_protect{
    public function getAll(){
        $this->db->where('user_id',$this->user['id']);
        $this->db->orderBy('date');
        $this->Success($this->db->get('archive'));
    }
} 