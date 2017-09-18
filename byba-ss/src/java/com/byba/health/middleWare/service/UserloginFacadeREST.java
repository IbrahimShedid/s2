/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.byba.health.middleWare.service;

import com.byba.health.backEnd.entities.Userlogin;
import com.byba.health.backEnd.sessions.UserLoginBuisness;

import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 * @author IbrahimShedid
 */
@Path("userlogin")
public class UserloginFacadeREST {
    @EJB
    UserLoginBuisness userLoginBuisness;

    public UserloginFacadeREST() {
    }

    @POST
    @Consumes({"application/xml", "application/json"})
    public void create(Userlogin entity) {
        userLoginBuisness.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Userlogin entity) {
        userLoginBuisness.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        userLoginBuisness.remove(userLoginBuisness.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Userlogin find(@PathParam("id") Integer id) {
        return userLoginBuisness.find(id);
    }

    @GET
    @Produces({"application/xml", "application/json"})
    public List<Userlogin> findAll() {
        return userLoginBuisness.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Userlogin> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return userLoginBuisness.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(userLoginBuisness.count());
    }


}
