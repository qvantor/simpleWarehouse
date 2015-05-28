<?php
class stat extends parent_protect{
    public function get(){
        $this->db->where('user_id',$this->user['id']);
        $this->db->orderBy('date');
        $arr['archive'] = $this->db->get('archive');

        $this->db->where('user_id',$this->user['id']);
        $arr['warehouse'] = $this->db->get('warehouse');

        $this->Success($arr);
    }
} 