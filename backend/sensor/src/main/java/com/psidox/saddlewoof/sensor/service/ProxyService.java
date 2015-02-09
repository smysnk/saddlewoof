package com.psidox.saddlewoof.sensor.service;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import javax.ejb.Startup;
import javax.inject.Singleton;

@Startup
@Singleton
public class ProxyService {

    private DefaultHttpClient httpclient;

    @Resource(name = "server_web_host")
    private String serverWebHost;

    @Resource(name = "server_web_port")
    private Integer serverWebPort;

    @Resource(name = "server_web_path")
    private String serverWebPath;


    @PostConstruct
    private void init() {

        httpclient = new DefaultHttpClient();

    }

    @PreDestroy
    private void shutdown() {

        httpclient.getConnectionManager().shutdown();

    }

    public String pushDog(Integer dogId, String requestBody) {

        try {
            // specify the host, protocol, and port
            HttpHost proxy = new HttpHost(serverWebHost, serverWebPort, "http");

            // specify the get request
            HttpPut putRequest = new HttpPut(serverWebPath + "/api/dog/" + dogId);

            StringEntity stringEntity = new StringEntity(requestBody);
            stringEntity.setContentType("application/json");
            putRequest.setEntity(stringEntity);

            System.out.println("executing request to " + proxy);

            HttpResponse httpResponse = httpclient.execute(proxy, putRequest);
            HttpEntity entity = httpResponse.getEntity();

            if (entity != null) {
                return EntityUtils.toString(entity);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;

    }





}
