package com.byba.health.middleWare.filter;



import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.MultivaluedMap;
import java.io.IOException;

public class CORSResponseFilter  implements ContainerResponseFilter, Filter{

    // used for add headers on web services only by add com.byba.health.middleWare.filter to ApplicationConfig
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext)
            throws IOException {

        MultivaluedMap<String, String> reqHeaders = requestContext.getHeaders();
        reqHeaders.add("Access-Control-Allow-Origin", "http://localhost:4200");
        reqHeaders.add("Access-Control-Allow-Credentials"," true");
        //headers.add("Access-Control-Allow-Origin", "http://podcastpedia.org"); //allows CORS requests only coming from podcastpedia.org
        reqHeaders.add("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        reqHeaders.add("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, X-Codingpedia,dteSendhdr,X-XSRF-TOKEN,XSRF-TOKEN");

        MultivaluedMap<String, Object> headers = responseContext.getHeaders();

        headers.add("Access-Control-Allow-Origin", "http://localhost:4200");
        headers.add("Access-Control-Allow-Credentials"," true");
        //headers.add("Access-Control-Allow-Origin", "http://podcastpedia.org"); //allows CORS requests only coming from podcastpedia.org
        headers.add("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        headers.add("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, X-Codingpedia,dteSendhdr,X-XSRF-TOKEN,XSRF-TOKEN");
        headers.add("Access-Control-Expose-Headers", "X-XSRF-TOKEN,XSRF-TOKEN");
    }


//----------------------------------------------------------------------------------------------------------------------
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    // used for add headers on whole responses by add com.byba.health.middleWare.filter in web.xml
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        response.addHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        response.addHeader("Access-Control-Allow-Credentials"," true");
        //headers.add("Access-Control-Allow-Origin", "http://podcastpedia.org"); //allows CORS requests only coming from podcastpedia.org
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        response.addHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, X-Codingpedia,dteSendhdr");
        filterChain.doFilter(servletRequest,servletResponse);
    }

    @Override
    public void destroy() {

    }


}