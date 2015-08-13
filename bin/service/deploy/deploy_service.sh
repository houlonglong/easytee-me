svn up /opt/source/easytee/open
mkdir -p  /opt/htdocs/easytee/open/
cd /opt/source/easytee/open/
rsync --exclude='.svn'  --exclude='www/app/tmp' --exclude='www/app/config/core.php' --exclude='www/app/config/database.php' -a -r -t -v --progress /opt/source/easytee/open/ /opt/htdocs/easytee/open/
rm -rf /opt/htdocs/easytee/open/www/app/config/core.php
rm -rf /opt/htdocs/easytee/open/www/app/config/database.php

cp /opt/source/easytee/open/etc/config/open/service/core.php /opt/htdocs/easytee/open/www/app/config/core.php
cp /opt/source/easytee/open/etc/config/open/service/database.php /opt/htdocs/easytee/open/www/app/config/database.php

svn up /opt/source/easytee/dev
mkdir -p /opt/htdocs/easytee/dev/
cd /opt/source/easytee/dev/
rsync --exclude='.svn' --exclude='www/app/tmp' --exclude='www/app/config/core.php' --exclude='www/app/config/database.php'  -r -t -v --progress /opt/source/easytee/dev/ /opt/htdocs/easytee/dev/
rm -rf /opt/htdocs/easytee/dev/www/app/config/core.php
rm -rf /opt/htdocs/easytee/dev/www/app/config/database.php

cp /opt/source/easytee/open/etc/config/new/service/core.php /opt/htdocs/easytee/dev/www/app/config/core.php
cp /opt/source/easytee/open/etc/config/new/service/database.php /opt/htdocs/easytee/dev/www/app/config/database.php
