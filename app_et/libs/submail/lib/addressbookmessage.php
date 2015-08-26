<?PHP
    require 'message.php';
    class ADDRESSBOOKMessage{
        /*
         | @set vars start
         |--------------------------------------------------------------------------
         */
        
        /*
         | Submail mail appid
         |@type string
         |--------------------------------------------------------------------------
         */
        
        protected $appid='';
        
        /*
         | Submail mail appkey
         |@type string
         |--------------------------------------------------------------------------
         */
        
        protected $appkey='';
        
        
        /*
         | sign type (Optional)
         |@options: normal or md5 or sha1
         |--------------------------------------------------------------------------
         */
        
        protected $sign_type='';
        
        /*
         |to: sms recipient
         |@string
         |--------------------------------------------------------------------------
         */
        
        protected $Address='';
        
        /*
         |add email recipient to target addressbook
         |@array to string
         |--------------------------------------------------------------------------
         */
        
        protected $Target='';
        
        /*
         |Init appid,appkey,sign_type(Optional)
         |--------------------------------------------------------------------------
         */
        
        function __construct($configs){
            $this->appid=$configs['appid'];
            $this->appkey=$configs['appkey'];
            if(!empty($configs['sign_type'])){
                $this->sign_type=$configs['sign_type'];
            }
        }
        
        /*
         |addTo function
         |set email and name to array
         |--------------------------------------------------------------------------
         */
        
        public function setAddress($address){
            $this->Address=$address;
        }
        
        public function setAddressbook($target){
            $this->Target=$target;
        }
        
        /*
         |build request array
         |--------------------------------------------------------------------------
         */
        
        protected function buildRequest(){
            $request=array();
            
            /*
             |set subscribe address
             |--------------------------------------------------------------------------
             */
            $request['address']=$this->Address;
            
            /*
             |set target addressbook
             |--------------------------------------------------------------------------
             */
            if($this->Target!=''){
                $request['target']=$this->Target;
            }
            
            return $request;
            
        }
        /*
         |xsend email
         |--------------------------------------------------------------------------
         */
        
        public function subscribe(){
            /*
             |set appid and appkey
             |--------------------------------------------------------------------------
             */
            $message_configs['appid']=$this->appid;
            $message_configs['appkey']=$this->appkey;
            
            /*
             |set sign_type,if is set
             |--------------------------------------------------------------------------
             */
            
            if($this->sign_type!=''){
                $message_configs['sign_type']=$this->sign_type;
            }
            
            /*
             |init mail class
             |--------------------------------------------------------------------------
             */
            
            $addressbook=new message($message_configs);
            
            /*
             |build request and send email and return the result
             |--------------------------------------------------------------------------
             */
            
            return $addressbook->subscribe($this->buildRequest());
        }
        public function unsubscribe(){
            /*
             |set appid and appkey
             |--------------------------------------------------------------------------
             */
            $message_configs['appid']=$this->appid;
            $message_configs['appkey']=$this->appkey;
            
            /*
             |set sign_type,if is set
             |--------------------------------------------------------------------------
             */
            
            if($this->sign_type!=''){
                $message_configs['sign_type']=$this->sign_type;
            }
            
            /*
             |init mail class
             |--------------------------------------------------------------------------
             */
            
            $addressbook=new message($message_configs);
            
            /*
             |build request and send email and return the result
             |--------------------------------------------------------------------------
             */
            
            return $addressbook->unsubscribe($this->buildRequest());
        }
        
    }