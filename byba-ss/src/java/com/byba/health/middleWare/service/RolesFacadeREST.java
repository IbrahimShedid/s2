/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.byba.health.middleWare.service;

import com.byba.health.backEnd.entities.Roles;
import com.byba.health.backEnd.sessions.RolesBuisness;

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
@Path("roles")
public class RolesFacadeREST {

    @EJB
    RolesBuisness rolesBuisness;

    public RolesFacadeREST() {
    }


    @POST
    @Consumes({"application/xml", "application/json"})
    public void create(Roles entity) {
        rolesBuisness.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Roles entity) {
        rolesBuisness.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        rolesBuisness.remove(rolesBuisness.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Roles find(@PathParam("id") Integer id) {
        return rolesBuisness.find(id);
    }

    @GET
    @Produces({"application/xml", "application/json"})
    public List<Roles> findAll() {
        return rolesBuisness.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Roles> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return rolesBuisness.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(rolesBuisness.count());
    }

}
