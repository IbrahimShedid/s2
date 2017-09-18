/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.byba.health.backEnd.sessions;

import com.byba.health.backEnd.daos.UserProfileDao;
import com.byba.health.backEnd.daos.AbstractDao;
import com.byba.health.backEnd.entities.Userprofile;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * @author IbrahimShedid
 */
@Stateless
public class UserProfileBuisness extends AbstractBusiness<Userprofile> {
    @PersistenceContext(unitName = "byba-ssPU")
    private EntityManager em;
    private UserProfileDao userProfileDao;

    public UserProfileBuisness() {
        super(Userprofile.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    @Override
    protected AbstractDao<Userprofile> getAbstractDao() {
        if (userProfileDao == null) {
            this.userProfileDao = new UserProfileDao(getEntityManager());
        }
        return userProfileDao;
    }

    public UserProfileDao getUserProfileinDao() {
        getAbstractDao();
        return userProfileDao;
    }

}
