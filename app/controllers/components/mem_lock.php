<?php
class MemLockComponent{
	var $name='MemLock';
	var $prefix = 'MemLock:';

	function isLock($key){
		$value = Cache::read($this->prefix.$key);
		return empty( $value ) ? false: true;
	}
	
	function doLock($key, $duration=10){
		$key = $this->prefix.$key;
		for ($i=1; $i< $duration*100; $i++){
			Cache::set('duration', $duration);
			if (Cache::add($key, '1')){
				return true;
			}else{
				usleep(100000);//0.1s
			}
		}

		return false;
	}

	function unLock($key){
		Cache::delete($this->prefix.$key);
	}
}