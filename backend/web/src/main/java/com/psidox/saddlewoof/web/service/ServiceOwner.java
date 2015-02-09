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
public class ServiceOwner {

    @Inject private Logger log;
    @Inject private EntityManager em;

    public List<Owner> listAll() {

       List<Owner> results = em.createQuery("select o from Owner o").getResultList();
       return results;

    }

    public Owner create(Owner owner) {

        em.persist(owner);
        return owner;

    }

    public Owner patch(Owner ownerUpdated) {

        Query query = em.createQuery("SELECT o FROM Owner o WHERE uuid = :uuid");
        query.setParameter("uuid", ownerUpdated.getUuid());

        Owner owner;
        try {
            owner = (Owner) query.getSingleResult();
        } catch (NoResultException e) {
            this.em.persist(ownerUpdated);
            return ownerUpdated;
        }

        owner.setEmail(ownerUpdated.getEmail());
        owner.setNameOwner(ownerUpdated.getNameOwner());

        return owner;

    }

    public Owner get(String uuid) {

        Query query = em.createQuery("SELECT o FROM Owner o WHERE uuid = :uuid");
        query.setParameter("uuid", uuid);
        return (Owner) query.getSingleResult();

    }

    public Boolean delete(String uuid) {

        Query query = em.createQuery("SELECT o FROM Owner o WHERE uuid = :uuid");
        query.setParameter("uuid", uuid);

        try {
            Owner owner = (Owner) query.getSingleResult();
            this.em.remove(owner);
        } catch (NoResultException e) {
            return false;
        }

        return true;

    }

    public List<Dog> dogListAll(String uuid) {

        Query query = em.createQuery("select d from Owner o JOIN o.dogs d WHERE o.uuid = :uuid");
        query.setParameter("uuid", uuid);

        return (List<Dog>) query.getResultList();

    }
}
