export JAVA=/usr/lib/jvm/java-7-oracle/bin/java 
export JAVA_OPTS="-server -Xms64m -Xmx512m -XX:MaxPermSize=256m -XX:+UseCompressedOops"
export WILDFLY_HOME=/wildfly
export WILDFLY_LOG_DIR=/var/log/wildfly

export WILDFLY_CONFIG_DIR=${WILDFLY_CONFIG_DIR:=$WILDFLY_HOME/standalone/configuration}
export WILDFLY_MODULE_DIR=${WILDFLY_MODULE_DIR:=$WILDFLY_HOME/modules}
export WILDFLY_BASE_DIR=${WILDFLY_BASE_DIR:=$WILDFLY_HOME/standalone}

export APACHE_CONFIG_DIR=${APACHE_CONFIG_DIR:=/apache2/conf}
export APACHE_ARGS=${APACHE_ARGS:=}
export APACHE_RUN_USER=apache2
export APACHE_RUN_GROUP=apache2
export APACHE_LOG_DIR=${APACHE_LOG_DIR:=/apache2/log}
export APACHE_RUN_DIR=/var/run/apache2$SUFFIX
export APACHE_PID_FILE=/var/run/apache2$SUFFIX.pid
export APACHE_LOCK_DIR=/var/lock/apache2$SUFFIX
