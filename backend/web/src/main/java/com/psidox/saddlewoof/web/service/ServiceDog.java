package com.psidox.saddlewoof.web.service;

import com.psidox.saddlewoof.web.model.Dog;

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

    public Dog update(Dog dogUpdated) {

        Query query = em.createQuery("SELECT d FROM Dog d WHERE id = :id");
        query.setParameter("id", dogUpdated.getId());

        Dog dog = (Dog)query.getSingleResult();

        dog.setHeartRate(dogUpdated.getHeartRate());
        dog.setTemperature(dogUpdated.getTemperature());
        dog.setLocationX(dogUpdated.getLocationX());
        dog.setLocationY(dogUpdated.getLocationY());

        return dog;

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
