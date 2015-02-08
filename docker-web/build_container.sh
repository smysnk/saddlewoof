#!/bin/bash
echo "Executing fs build.sh.."

# Install nginx
nginx=stable # use nginx=development for latest development version
add-apt-repository -y ppa:nginx/$nginx
apt-get update 
apt-get install -y nginx

# Setup Apache
export DEBIAN_FRONTEND=noninteractive
#debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password password  '
#debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password_again password  '
apt-get -y install mysql-server unzip build-essential libfontconfig1

# Setup JBoss WildFly
INSTALL_DIR=/
WILDFLY_VERSION=8.1.0.Final
WILDFLY_ARCHIVE_NAME=wildfly-$WILDFLY_VERSION.tar.gz 
WILDFLY_DOWNLOAD_ADDRESS=http://download.jboss.org/wildfly/$WILDFLY_VERSION/$WILDFLY_ARCHIVE_NAME
WILDFLY_FULL_DIR=$INSTALL_DIR/wildfly-$WILDFLY_VERSION
WILDFLY_DIR=$INSTALL_DIR/wildfly
WILDFLY_USER="wildfly"
WILDFLY_STARTUP_TIMEOUT=240

echo "Installing Wildfly..."
wget $WILDFLY_DOWNLOAD_ADDRESS
mkdir $WILDFLY_FULL_DIR
tar -xzf $WILDFLY_ARCHIVE_NAME -C $INSTALL_DIR
mv $WILDFLY_FULL_DIR/ $WILDFLY_DIR
useradd -s /bin/bash $WILDFLY_USER
rm $WILDFLY_ARCHIVE_NAME

echo "Installing RestEasy..."
unzip -o /fs/resteasy-jboss-modules-wf8-3.0.7.Final.zip -d $WILDFLY_DIR/modules/system/layers/base/

echo "Installing KeyCloak Adapter..."
wget http://sourceforge.net/projects/keycloak/files/1.0-beta-4/keycloak-war-dist-all-1.0-beta-4.zip
unzip keycloak-war-dist-all-1.0-beta-4.zip
unzip keycloak-war-dist-all-1.0-beta-4/adapters/keycloak-wildfly-adapter-dist-1.0-beta-4.zip -d /wildfly/
rm -rf keycloak*

# Overwrite default configuration files with our own
cp -R --remove-destination /fs/* /
cp -R --remove-destination /fs/.* /

chown -R $WILDFLY_USER:$WILDFLY_USER $WILDFLY_DIR
chown -R wildfly:wildfly /var/www/beta/image/asset

# Create database
/usr/bin/mysqld_safe --user=mysql --pid-file=mysql.pid &
sleep 10
mysql -v < web.sql
kill `cat /var/lib/mysql/mysql.pid`



