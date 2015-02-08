package com.psidox.saddlewoof.web.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate4.Hibernate4Module;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

@Provider
@Produces(MediaType.APPLICATION_JSON)
public class ObjectMapperProvider implements ContextResolver<ObjectMapper> {
	private ObjectMapper mapper = new ObjectMapper();

	public ObjectMapperProvider() {
        mapper.registerModule(new Hibernate4Module());
	}

	public ObjectMapper getContext(Class<?> type) { return mapper; }
}
