package com.psidox.saddlewoof.web.rest;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

@Provider
@PreMatching
public class Interceptor implements ContainerRequestFilter {
	
    @Override
    public void filter(ContainerRequestContext reqContext) throws IOException {
        
    	String request = "";
        request += String.format("uri: %s %s %s\n", reqContext.getMethod(), reqContext.getUriInfo().getPath(), reqContext.getUriInfo().getQueryParameters().toString());
    	request += String.format("lang: %s\n", reqContext.getAcceptableLanguages());
    	request += String.format("media: %s\n", reqContext.getAcceptableMediaTypes());
    	request += "headers:\n";
    	for (String key: reqContext.getHeaders().keySet()) {
    	   	request += String.format("+ %s: %s\n", key, reqContext.getHeaders().get(key));   		
    	}
		//request += String.format("body: %s\n", IOUtils.toString(reqContext.getEntityStream()));

    	System.out.println(request);
    	
    }
}
