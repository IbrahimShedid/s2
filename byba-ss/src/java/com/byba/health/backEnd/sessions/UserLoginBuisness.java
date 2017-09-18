/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.byba.health.backEnd.sessions;

import com.byba.health.backEnd.daos.AbstractDao;
import com.byba.health.backEnd.daos.UserLoginDao;
import com.byba.health.backEnd.entities.Userlogin;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * @author IbrahimShedid
 */
@Stateless
public class UserLoginBuisness extends AbstractBusiness<Userlogin> {
    @PersistenceContext(unitName = "byba-ssPU")
    private EntityManager em;
    private UserLoginDao userLoginDao;

    public UserLoginBuisness() {
        super(Userlogin.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    @Override
    protected AbstractDao<Userlogin> getAbstractDao() {
        if (userLoginDao == null) {
            this.userLoginDao = new UserLoginDao(getEntityManager());
        }
        return userLoginDao;
    }

    public UserLoginDao getUserLoginDao() {
        getAbstractDao();
        return userLoginDao;
    }

}
