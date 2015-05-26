<?php

class seller extends parent_protect{
    public function adminPage(){
        $arr['user']=$this->user;
        unset($arr['user']['pass']);

        echo json_encode($arr);
    }
    public  function newEstate(){
        if($_POST) {
            $_POST['seller'] = $this->user['id'];
            $this->db->insert('estate', $_POST);
            $this->GoodResponse(array('message'=>'Недвижимость добавлена'));
        }else{
            $this->Hack();
        }
    }
    public function showEstate(){
        $estate = $this->db->get('estate');
        for($i=0;$i<count($estate);$i++){
            if($estate[$i]['seller']==$this->user['id']){
                $estate[$i]['youadd'] = 'true';
            }
        }
        $this->GoodResponse($estate);
    }

    public function getEstateEdit(){
        if($_POST['id']) {
            $this->db->where('id', $_POST['id']);
            $estate = $this->db->getOne('estate');
            $estate['youadd'] = ($estate['seller']==$this->user['id']);
            $this->GoodResponse($estate);
        }else{
            $this->Hack();
        }
    }
    public function updateEstate(){
        if($_POST['id']) {
            $this->db->where('id', $_POST['id']);
            $estate = $this->db->getOne('estate');
            if(($estate['seller']==$this->user['id'])){
                $this->db->where('id', $_POST['id']);
                unset($_POST['youadd']);
                unset($_POST['st']);
                unset($_POST['id']);
                $this->db->update('estate',$_POST);
                $this->GoodResponse(array('message'=>'Недвижимость '.$estate['name'].' успешно обновлена'));
            }else{
                $this->Hack();
            }
        }else{
            $this->Hack();
        }
    }
    public function EstateToArchive(){
        if($_POST['id']) {
            $this->db->where('id', $_POST['id']);
            $estate = $this->db->getOne('estate');
            if($this->db->insert ('archive', $estate)){
                $this->db->where('id', $estate['id']);
                $this->db->delete('estate');

                $deal = array(
                    'id_estate'=>$estate['id'],
                    'id_seller'=>$this->user['id'],
                    'date'=>date("y-m-d"),
                    'buyer'=>$_POST['buyer'],
                    'profit'=>str_replace(' ','',$estate['price'])*0.02
                );
                $this->db->insert ('deal', $deal);

                $this->GoodResponse(array('message'=>$estate['type'].' '.$estate['name'].' успешно продан(а)!'));
            }
        }
        else{$this->Hack();}
    }

    public function getArchive(){
        $this->GoodResponse($this->db->get('archive'));
    }

    public function getState(){
       $estateCount = $this->db->query('SELECT COUNT(*) FROM estate');
       $arr['estateCount'] = $estateCount[0]['COUNT(*)'];

       $month = $this->db->query('SELECT * FROM `deal` WHERE MONTH(`date`) = MONTH(NOW()) AND YEAR(`date`) = YEAR(NOW())');
       $profitMonth = 0;
       for($i=0;$i<count($month);$i++){
            $profitMonth = $profitMonth + $month[$i]['profit'];
       }
       $arr['profitmonth'] = round($profitMonth);

       $day = $this->db->query('SELECT * FROM `deal` WHERE DAY(`date`) = DAY(NOW()) AND MONTH(`date`) = MONTH(NOW()) AND YEAR(`date`) = YEAR(NOW())');
       $profitDay = 0;
       for($i=0;$i<count($day);$i++){
           $profitDay = $profitDay + $day[$i]['profit'];
       }
       $arr['profitday'] = round($profitDay);

       $arr['deals'] = $this->db->get ("deal");

       $this->GoodResponse($arr);
    }

    public function getSoldDoc(){
        if($_POST['id']) {
            $docxFileShablon = 'documents/sold.docx';

            $data = $this->db->rawQuery("
                SELECT a.type, d.id, s.full_name,a.adress,a.price, d.buyer FROM
                deal AS d
                LEFT JOIN archive AS a ON (d.id_estate=a.id)
                LEFT JOIN seller AS s ON (d.id_seller=s.id)
				WHERE
                a.deal = 'Продажа' AND
                d.id = " . $_POST['id'] . "
                ");

            if(!$data){
                $this->GoodResponse(array('message'=>'Договор аренды создается на месте'));
                exit;
            }
            $data = $data[0];
            $params = array(
                '{type}' => $data['type'],
                '{id}' => $data['id'],
                '{seller_name}' => $data['full_name'],
                '{address}' => $data['adress'],
                '{price}' => $data['price'] . ' рублей',
                '{buyer_name}' => $data['buyer']
            );


            $docxFile = 'documents/sold_' . $params['{id}'] . '.docx';

            copy($docxFileShablon, $docxFile);

            if (!file_exists($docxFile)) {
                die('File not found.');
            }

            $zip = new ZipArchive();

            if (!$zip->open($docxFile)) {
                die('File not open.');
            }
            $documentXml = $zip->getFromName('word/document.xml');

            $documentXml = str_replace(array_keys($params), array_values($params), $documentXml, $count);

            $zip->deleteName('word/document.xml');
            $zip->addFromString('word/document.xml', $documentXml);


            $zip->close();

            $this->GoodResponse(array('message' => 'Файл успешно создан', 'file' => $docxFile));
        }else{$this->Hack();}

    }

    public function getProfile(){
        $userdata = $this->user;
        unset($userdata['pass']);
        $this->GoodResponse($userdata);
    }

    public function saveProfile(){
        $this->db->where('id',$this->user['id']);
        unset($_POST['st']);
        $this->db->update('seller', $_POST);
        $this->GoodResponse(array('message'=>'Данные профиля обновлены'));
    }
} 