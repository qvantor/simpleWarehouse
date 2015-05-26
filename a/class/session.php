<?php

class session extends parent_class{

    /*
     * Регистрация
     */
    public function register(){
        //заполненость полей
        if(!empty($_POST['pass'])&&!empty($_POST['login'])){
            //проверка логина на сущ
            $this->db->where("login", $_POST['login']);
            $login = $this->db->get ("seller");
            if(empty($login)){
                //если всё хорошо
                $_POST['pass'] = $this->getMd5Pass($_POST['pass']);
                $id = $this->db->insert ('seller', $_POST);
                $this->GoodResponse(array('message'=>'Регистрация удачна'));
            }else{
                //Такой логин сущ
                $this->BadResponse(array('message'=>'Логин существует'));
            }
        }else{
            //если поля пусты - форма скомпрометированна
            $this->Hack();
        }
    }
    /*
     * Авторизация
     */
    public function authorize(){
        //заполненость полей
        if(!empty($_POST['pass'])&&!empty($_POST['login'])){

            $this->db->where ('login', $_POST['login']);
            $this->db->where ('pass', $this->getMd5Pass($_POST['pass']));

            $seller = $this->db->get ('seller');

            if($seller){
                /* тута генерим сессию
                 * kapitohska - ключ сессии
                 */

                $kapitohska = $this->getCode(50);
                $_SESSION['user_id'] = $seller[0]['id'];
                $this->db->where('id_seller',$_SESSION['user_id']);
                if($this->db->get ('session')){
                    $this->db->where('id_seller',$_SESSION['user_id']);
                    $this->db->update ('session', array(
                        'session_key'=>$kapitohska,
                        'id_seller' => $_SESSION['user_id']
                    ));
                }else{
                    $this->db->insert ('session', array(
                        'session_key'=>$kapitohska,
                        'id_seller' => $_SESSION['user_id']
                    ));
                }
                setcookie("id", $_SESSION['user_id'], time()+60*60*24*30);
                setcookie("code_user", $kapitohska, time()+60*60*24*30);

                $this->GoodResponse(array('message'=>'Успешный вход'));

            }else{
                $this->BadResponse(array('message'=>'Неверный логин или пароль'));
            }
        }else{
            //если поля пусты - форма скомпрометированна
            $this->Hack();
        }
    }
    public function out(){
        setcookie("id", "", time()+60*60*24*30);
        setcookie("code_user", "", time()+60*60*24*30);
        $this->GoodResponse(array('message'=>'Успешный выход'));
    }

    private function  getMd5Pass($pass){
        return md5('-249thbn'.$pass.'093hr');
    }

    private function getCode($length) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRQSTUVWXYZ0123456789";
        $code = "";
        $clen = strlen($chars) - 1;
        while (strlen($code) < $length) {
            $code .= $chars[mt_rand(0,$clen)];
        }
        return $code;
    }

    function screening($data) {
        $data = trim($data); //~ удаление пробелов из начала и конца строки
        return mysql_real_escape_string($data); //~ экранирование символов
    }
} 