/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.byba.health.backEnd.entities;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import org.codehaus.jackson.annotate.JsonIgnore;

/**
 *
 * @author IbrahimShedid
 */
@Entity
@Table(name = "userprofile")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Userprofile.findAll", query = "SELECT u FROM Userprofile u"),
    @NamedQuery(name = "Userprofile.findByUserID", query = "SELECT u FROM Userprofile u WHERE u.userID = :userID"),
    @NamedQuery(name = "Userprofile.findByFirstName", query = "SELECT u FROM Userprofile u WHERE u.firstName = :firstName"),
    @NamedQuery(name = "Userprofile.findByLastName", query = "SELECT u FROM Userprofile u WHERE u.lastName = :lastName"),
    @NamedQuery(name = "Userprofile.findByDefaultPassword", query = "SELECT u FROM Userprofile u WHERE u.defaultPassword = :defaultPassword"),
    @NamedQuery(name = "Userprofile.findByUserPassword", query = "SELECT u FROM Userprofile u WHERE u.userPassword = :userPassword"),
    @NamedQuery(name = "Userprofile.findByLoginName", query = "SELECT u FROM Userprofile u WHERE u.loginName = :loginName")})
public class Userprofile implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "UserID")
    private Integer userID;
    @Size(max = 100)
    @Column(name = "FirstName")
    private String firstName;
    @Size(max = 100)
    @Column(name = "LastName")
    private String lastName;
    @Size(max = 45)
    @Column(name = "DefaultPassword")
    private String defaultPassword;
    @Size(max = 45)
    @Column(name = "UserPassword")
    private String userPassword;
    @Size(max = 45)
    @Column(name = "LoginName")
    private String loginName;
    @ManyToMany(mappedBy = "userprofileList")
    private List<Roles> rolesList;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "userprofile")
    private Userlogin userlogin;

    public Userprofile() {
    }

    public Userprofile(Integer userID) {
        this.userID = userID;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDefaultPassword() {
        return defaultPassword;
    }

    public void setDefaultPassword(String defaultPassword) {
        this.defaultPassword = defaultPassword;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    @XmlTransient
    @JsonIgnore
    public List<Roles> getRolesList() {
        return rolesList;
    }

    public void setRolesList(List<Roles> rolesList) {
        this.rolesList = rolesList;
    }

    public Userlogin getUserlogin() {
        return userlogin;
    }

    public void setUserlogin(Userlogin userlogin) {
        this.userlogin = userlogin;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (userID != null ? userID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Userprofile)) {
            return false;
        }
        Userprofile other = (Userprofile) object;
        if ((this.userID == null && other.userID != null) || (this.userID != null && !this.userID.equals(other.userID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "model.Userprofile[ userID=" + userID + " ]";
    }
    
}
