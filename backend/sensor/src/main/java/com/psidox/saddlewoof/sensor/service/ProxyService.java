package com.psidox.saddlewoof.sensor.service;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.Startup;
import javax.inject.Singleton;

@Startup
@Singleton
public class ProxyService {

    private DefaultHttpClient httpclient;

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
            HttpHost proxy = new HttpHost("localhost", 8080, "http");

            // specify the get request
            HttpPut putRequest = new HttpPut("/web/api/dog/" + dogId);

            StringEntity stringEntity = new StringEntity(requestBody);
            stringEntity.setContentType("application/json");
            putRequest.setEntity(stringEntity);

            System.out.println("executing request to " + proxy);

            HttpResponse httpResponse = httpclient.execute(proxy, putRequest);
            HttpEntity entity = httpResponse.getEntity();

            System.out.println("----------------------------------------");
            System.out.println(httpResponse.getStatusLine());
            Header[] headers = httpResponse.getAllHeaders();
            for (int i = 0; i < headers.length; i++) {
                System.out.println(headers[i]);
            }
            System.out.println("----------------------------------------");

            if (entity != null) {
                return EntityUtils.toString(entity);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;

    }





}