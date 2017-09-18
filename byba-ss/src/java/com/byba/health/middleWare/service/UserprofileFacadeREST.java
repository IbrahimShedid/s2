/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.byba.health.middleWare.service;

import com.byba.health.backEnd.entities.Userprofile;
import com.byba.health.backEnd.sessions.UserProfileBuisness;

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
@Path("userprofile")
public class UserprofileFacadeREST {
    @EJB
    private UserProfileBuisness userProfileBuisness;

    public UserprofileFacadeREST() {
    }

    @POST
    @Consumes({"application/xml", "application/json"})
    public void create(Userprofile entity) {
        userProfileBuisness.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Userprofile entity) {
        userProfileBuisness.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        userProfileBuisness.remove(userProfileBuisness.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Userprofile find(@PathParam("id") Integer id) {
        return userProfileBuisness.find(id);
    }

    @GET
    @Produces({"application/xml", "application/json"})
    public List<Userprofile> findAll() {
        return userProfileBuisness.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Userprofile> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return userProfileBuisness.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(userProfileBuisness.count());
    }

}
