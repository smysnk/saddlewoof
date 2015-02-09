package com.psidox.saddlewoof.web.rest.resource;

import com.psidox.saddlewoof.web.model.Dog;
import com.psidox.saddlewoof.web.service.ServiceDog;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.List;
import java.util.logging.Logger;

@Path("/dog")
@RequestScoped
@Produces("application/json")
public class ResourceDog {
    
    @Inject ServiceDog serviceDog;
    @Inject Logger logger;



    @GET
    public List<Dog> dogList() {

        List<Dog> dogs = serviceDog.listAll();
        return dogs;

    }

    @PUT
    @Path("/{id:[0-9]*}")
    public Dog dogUpdate(Dog dog)  {

        dog = serviceDog.patch(dog);
        return dog;

    }

    @DELETE
    @Path("/{idDog:[0-9]*}/owner")
    public void dogOwnerClear(@PathParam("idDog") Integer idDog)  {

        serviceDog.setOwner(idDog, null);

    }

    @PUT
    @Path("/{idDog:[0-9]*}/owner/{idOwner:[a-z0-9--]*}")
    public void dogOwnerSet(@PathParam("idDog") Integer idDog, @PathParam("idOwner") String idOwner)  {

        serviceDog.setOwner(idDog, idOwner);

    }



}
