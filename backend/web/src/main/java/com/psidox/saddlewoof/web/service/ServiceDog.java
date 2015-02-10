package com.psidox.saddlewoof.web.service;

import com.psidox.saddlewoof.web.model.Dog;
import com.psidox.saddlewoof.web.model.Owner;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import java.util.List;
import java.util.logging.Logger;

// The @Stateless annotation eliminates the need for manual transaction demarcation
@Stateless
public class ServiceDog {

    @Inject private Logger log;
    @Inject private EntityManager em;

    public List<Dog> listAll() {

       List<Dog> results = em.createQuery("select d from Dog d").getResultList();
       return results;

    }

    public Dog create(Dog dog) {

        em.persist(dog);
        return dog;

    }

    public Dog patch(Dog dogUpdated) {


        Query query = em.createQuery("SELECT d FROM Dog d WHERE id = :id");
        query.setParameter("id", dogUpdated.getId());

        // Update dog if one exists, if not create new one
        Dog dog;
        try {
            dog = (Dog) query.getSingleResult();
        } catch (NoResultException e) {
            this.em.persist(dogUpdated);
            return dogUpdated;
        }

        if (dogUpdated.getName() != null)
            dog.setName(dogUpdated.getName());

        dog.setHeartRate(dogUpdated.getHeartRate());
        dog.setTemperature(dogUpdated.getTemperature());
        dog.setLongitude(dogUpdated.getLongitude());
        dog.setLatitude(dogUpdated.getLatitude());

        return dog;

    }

    public void setOwner(Integer idDog, String idOwner) {


        Query queryDog = em.createQuery("SELECT d FROM Dog d WHERE id = :id");
        queryDog.setParameter("id", idDog);

        Query queryOwner = em.createQuery("SELECT o FROM Owner o WHERE id = :id");
        queryOwner.setParameter("id", idOwner);


        Dog dog = (Dog) queryDog.getSingleResult();

        Owner owner = null;
        if (idOwner != null) {
            owner = (Owner) queryOwner.getSingleResult();
        }
        dog.setOwner(owner);

    }


    public Boolean delete(Integer dogId) {

        Query query = em.createQuery("SELECT d FROM Dog d WHERE id = :id");
        query.setParameter("id", dogId);

        try {
            Dog dog = (Dog) query.getSingleResult();
            this.em.remove(dog);
        } catch (NoResultException e) {
            return false;
        }

        return true;

    }

}
