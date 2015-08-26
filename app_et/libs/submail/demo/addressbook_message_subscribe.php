<?PHP
    /*
     | Submail addressbook/message/subscribe API demo
     | SUBMAIL SDK Version 1.0.1 --PHP
     | copyright 2011 - 2014 SUBMAIL
     |--------------------------------------------------------------------------
     */
    
    /*
     |require config file
     |--------------------------------------------------------------------------
     */
    require '../app_config.php';
    
    /*
     |require_once SUBMAILAutoload file
     |--------------------------------------------------------------------------
     */
    
    require_once('../SUBMAILAutoload.php');
    
    /*
     |init MESSAGEXsend class
     |--------------------------------------------------------------------------
     */
    
    $addressbook=new ADDRESSBOOKMessage($message_configs);
    
    /*
     |Required para
     |--------------------------------------------------------------------------
     |The First para: recipient email address
     |The second para: recipient name(optional)
     |--------------------------------------------------------------------------
     */
    
    $addressbook->setAddress('18616761889');
    
    /*
     |Optional para
     |--------------------------------------------------------------------------
     |set target addressbook sign : Optional
     |default value: subscribe
     |--------------------------------------------------------------------------
     */
    
    //$addressbook->setAddressbook('unsubscribe');
    
    
    $subscribe=$addressbook->subscribe();
    
    print_r($subscribe);
