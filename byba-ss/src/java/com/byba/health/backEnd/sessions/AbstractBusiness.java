package com.byba.health.backEnd.sessions;

import com.byba.health.backEnd.daos.AbstractDao;

import javax.persistence.EntityManager;
import java.util.List;

/**
 * @author IbrahimShedid
 */
public abstract class AbstractBusiness<T> {


    private Class<T> entityClass;


    public AbstractBusiness(Class<T> entityClass) {
        this.entityClass = entityClass;
    }

    public AbstractBusiness() {
    }

    protected abstract EntityManager getEntityManager();

    protected abstract AbstractDao<T> getAbstractDao();

    public void create(T entity) {
        getAbstractDao().create(entity);
    }

    public T edit(T entity) { return getAbstractDao().edit(entity); }

    public void remove(T entity) {
        getAbstractDao().remove(entity);
    }

    public T find(Long id) {
        return getAbstractDao().find(id);
    }

    public List<T> findAll() { return getAbstractDao().findAll(); }

    public List<T> findRange(int[] range) { return getAbstractDao().findRange(range); }

    public int count() {
        return getAbstractDao().count();
    }

    public T find(Object id) {
        return getEntityManager().find(entityClass, id);
    }


}
