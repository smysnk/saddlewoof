package com.psidox.saddlewoof.web.rest.resource;

import com.psidox.saddlewoof.web.model.Owner;
import com.psidox.saddlewoof.web.service.ServiceOwner;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.logging.Logger;

@Path("/owner")
@RequestScoped
@Produces("application/json")
public class ResourceOwner {
    
    @Inject ServiceOwner serviceOwner;
    @Inject Logger logger;


    @POST
    public Owner ownerCreate(Owner owner)  {

        owner = serviceOwner.create(owner);
        return owner;

    }

    @PUT
    @Path("/{id:[a-z--]*}")
    public Owner dogUpdate(Owner owner)  {

        owner = serviceOwner.update(owner);
        return owner;

    }



}
