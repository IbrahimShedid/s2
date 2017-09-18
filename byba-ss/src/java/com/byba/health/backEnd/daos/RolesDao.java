package com.byba.health.backEnd.daos;

import com.byba.health.backEnd.entities.Roles;

import javax.persistence.EntityManager;

/**
 * @author IbrahimShedid
 */

public class RolesDao extends AbstractDao<Roles> {

    private EntityManager em;

    public RolesDao(EntityManager em) {
        super(Roles.class);
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
