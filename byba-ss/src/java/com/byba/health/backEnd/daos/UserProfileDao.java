package com.byba.health.backEnd.daos;


import com.byba.health.backEnd.entities.Userprofile;

import javax.persistence.EntityManager;

/**
 * @author IbrahimShedid
 */

public class UserProfileDao extends AbstractDao<Userprofile> {

    private EntityManager em;

    public UserProfileDao(EntityManager em) {
        super(Userprofile.class);
        setEm(em);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public void setEm(EntityManager em) {
        this.em = em;
    }

}
