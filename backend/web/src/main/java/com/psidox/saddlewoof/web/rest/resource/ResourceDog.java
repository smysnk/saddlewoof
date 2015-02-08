package com.psidox.saddlewoof.web.rest.resource;

import com.psidox.saddlewoof.web.model.Dog;
import com.psidox.saddlewoof.web.service.ServiceDog;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.logging.Logger;

@Path("/dog")
@RequestScoped
@Produces("application/json")
public class ResourceDog {
    
    @Inject ServiceDog serviceDog;
    @Inject Logger logger;


    @POST
    public Dog dogCreate(Dog dog)  {

        serviceDog.create(dog);
        return dog;

    }

    @PUT
    @Path("/{id:[0-9]*}")
    public Dog dogUpdate(Dog dog)  {

        dog = serviceDog.update(dog);
        return dog;

    }



}
