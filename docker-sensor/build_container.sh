#!/bin/bash
echo "Executing fs build.sh.."

# Setup Apache
apt-get -y install unzip build-essential libfontconfig1

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

# Overwrite default configuration files with our own
cp -R --remove-destination /fs/* /
cp -R --remove-destination /fs/.* /

chown -R $WILDFLY_USER:$WILDFLY_USER $WILDFLY_DIR
chown -R wildfly:wildfly /var/www/beta/image/asset



