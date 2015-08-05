#EasyTee 服务

## 图片转化服务

    apt-get install imagemagick
    convert -background none  -resize 500x500 pic/test.svg test.png
    
    apt-get install inkscape
    inkscape  --without-gui --file=pic/input.pdf --export-plain-svg=output.svg -h500 -w500
    
    
#http://ubuntuforums.org/showthread.php?t=1865589

安装freetype
    
    wget http://download.savannah.gnu.org/releases/freetype/freetype-2.4.10.tar.gz
    tar zxvf freetype-2.4.10.tar.gz
    cd freetype-2.4.10/
    ./configure
    make && make install
    
In Ubuntu 14.04 try:

    sudo ln -s /usr/include/freetype2 /usr/local/include/freetype

直接安装python-uniconvertor

    uniconvertor pic/oldcs6.ai uni.svg
 