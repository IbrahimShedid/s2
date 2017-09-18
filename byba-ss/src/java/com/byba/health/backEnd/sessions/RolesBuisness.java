/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.byba.health.backEnd.sessions;

import com.byba.health.backEnd.daos.AbstractDao;
import com.byba.health.backEnd.daos.RolesDao;
import com.byba.health.backEnd.entities.Roles;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * @author IbrahimShedid
 */
@Stateless
public class RolesBuisness extends AbstractBusiness<Roles> {
    @PersistenceContext(unitName = "byba-ssPU")
    private EntityManager em;
    private RolesDao rolesDao;

    public RolesBuisness() {
        super(Roles.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    @Override
    protected AbstractDao<Roles> getAbstractDao() {
        if (rolesDao == null) {
            this.rolesDao = new RolesDao(getEntityManager());
        }
        return rolesDao;
    }

    public RolesDao getRoleDao() {
        getAbstractDao();
        return rolesDao;
    }

}
