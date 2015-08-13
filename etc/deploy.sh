mkdir -p /data/git/easytee/easytee_v2
cd /data/git/easytee/easytee_v2
git clone git@git.ptphp.com:easytee/easytee-me.git ./

git pull origin master

mkdir -p  /opt/projects/easytee/easytee_v2

rsync --exclude='www/app/tmp' --exclude='.git' -a -r -t -v --progress /data/git/easytee/easytee_v2 /opt/projects/easytee
