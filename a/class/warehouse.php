<?php

class warehouse extends parent_protect{

    public function add(){
        $_POST['user_id'] = $this->user['id'];
        $this->db->insert('warehouse', $_POST);
    }
} 