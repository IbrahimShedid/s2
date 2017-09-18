/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.byba.health.backEnd.entities;


import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author IbrahimShedid
 */
@Entity
@Table(name = "userlogin")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Userlogin.findAll", query = "SELECT u FROM Userlogin u"),
    @NamedQuery(name = "Userlogin.findByUserProfileUserID", query = "SELECT u FROM Userlogin u WHERE u.userProfileUserID = :userProfileUserID"),
    @NamedQuery(name = "Userlogin.findByActivateDate", query = "SELECT u FROM Userlogin u WHERE u.activateDate = :activateDate"),
    @NamedQuery(name = "Userlogin.findByLastLogin", query = "SELECT u FROM Userlogin u WHERE u.lastLogin = :lastLogin"),
    @NamedQuery(name = "Userlogin.findByUserStatus", query = "SELECT u FROM Userlogin u WHERE u.userStatus = :userStatus")})
public class Userlogin implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "UserProfile_UserID")
    private Integer userProfileUserID;
    @Column(name = "ActivateDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date activateDate;
    @Column(name = "LastLogin")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastLogin;
    @Size(max = 45)
    @Column(name = "UserStatus")
    private String userStatus;
    @JoinColumn(name = "UserProfile_UserID", referencedColumnName = "UserID", insertable = false, updatable = false)
    @OneToOne(optional = false)
    private Userprofile userprofile;

    public Userlogin() {
    }

    public Userlogin(Integer userProfileUserID) {
        this.userProfileUserID = userProfileUserID;
    }

    public Integer getUserProfileUserID() {
        return userProfileUserID;
    }

    public void setUserProfileUserID(Integer userProfileUserID) {
        this.userProfileUserID = userProfileUserID;
    }

    public Date getActivateDate() {
        return activateDate;
    }

    public void setActivateDate(Date activateDate) {
        this.activateDate = activateDate;
    }

    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

    public String getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(String userStatus) {
        this.userStatus = userStatus;
    }

    public Userprofile getUserprofile() {
        return userprofile;
    }

    public void setUserprofile(Userprofile userprofile) {
        this.userprofile = userprofile;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (userProfileUserID != null ? userProfileUserID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Userlogin)) {
            return false;
        }
        Userlogin other = (Userlogin) object;
        if ((this.userProfileUserID == null && other.userProfileUserID != null) || (this.userProfileUserID != null && !this.userProfileUserID.equals(other.userProfileUserID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "model.Userlogin[ userProfileUserID=" + userProfileUserID + " ]";
    }
    
}
