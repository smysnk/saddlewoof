package com.psidox.saddlewoof.sensor.rest.resource;

import com.psidox.saddlewoof.sensor.service.ProxyService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

@Path("/dog")
@RequestScoped
@Produces("application/json")
public class ResourceDog {

    @Inject ProxyService proxyService;

    @PUT
    @Path("/{id:[0-9]*}")
    public String dogUpdate(@PathParam("id") Integer id, String requestBody)  {

        return proxyService.pushDog(id, requestBody);

    }

}
