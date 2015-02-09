package com.psidox.saddlewoof.web.rest.resource;

import com.psidox.saddlewoof.web.model.Dog;
import com.psidox.saddlewoof.web.model.Owner;
import com.psidox.saddlewoof.web.service.ServiceOwner;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.List;
import java.util.logging.Logger;

@Path("/owner")
@RequestScoped
@Produces("application/json")
public class ResourceOwner {
    
    @Inject ServiceOwner serviceOwner;
    @Inject Logger logger;

    @GET
    public List<Owner> ownerList() {

        List<Owner> owners = serviceOwner.listAll();
        return owners;

    }


    @POST
    public Owner ownerCreate(Owner owner)  {

        owner = serviceOwner.create(owner);
        return owner;

    }

    @PUT
    @Path("/{uuid:[a-z0-9--]*}")
    public Owner ownerUpdate(Owner owner)  {

        owner = serviceOwner.patch(owner);
        return owner;

    }

    @GET
    @Path("/{uuid:[a-z0-9--]*}")
    public Owner ownerUpdate(@PathParam("uuid") String uuid)  {

        return serviceOwner.get(uuid);

    }

    @GET
    @Path("/{uuid:[a-z0-9--]*}/dog")
    public List<Dog> ownerList(@PathParam("uuid") String uuid) {

        return serviceOwner.dogListAll(uuid);

    }




}
