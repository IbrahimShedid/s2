package com.byba.health.backEnd.daos;

import com.byba.health.backEnd.entities.Userlogin;

import javax.persistence.EntityManager;

/**
 * @author IbrahimShedid
 */

public class UserLoginDao extends AbstractDao<Userlogin> {

    private EntityManager em;

    public UserLoginDao(EntityManager em) {
        super(Userlogin.class);
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
