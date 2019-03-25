package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.SecurProdApp;

import io.github.jhipster.application.domain.DeliveryDeliveryType;
import io.github.jhipster.application.repository.DeliveryDeliveryTypeRepository;
import io.github.jhipster.application.repository.search.DeliveryDeliveryTypeSearchRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DeliveryDeliveryTypeResource REST controller.
 *
 * @see DeliveryDeliveryTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SecurProdApp.class)
public class DeliveryDeliveryTypeResourceIntTest {

    @Autowired
    private DeliveryDeliveryTypeRepository deliveryDeliveryTypeRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.DeliveryDeliveryTypeSearchRepositoryMockConfiguration
     */
    @Autowired
    private DeliveryDeliveryTypeSearchRepository mockDeliveryDeliveryTypeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDeliveryDeliveryTypeMockMvc;

    private DeliveryDeliveryType deliveryDeliveryType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DeliveryDeliveryTypeResource deliveryDeliveryTypeResource = new DeliveryDeliveryTypeResource(deliveryDeliveryTypeRepository, mockDeliveryDeliveryTypeSearchRepository);
        this.restDeliveryDeliveryTypeMockMvc = MockMvcBuilders.standaloneSetup(deliveryDeliveryTypeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DeliveryDeliveryType createEntity(EntityManager em) {
        DeliveryDeliveryType deliveryDeliveryType = new DeliveryDeliveryType();
        return deliveryDeliveryType;
    }

    @Before
    public void initTest() {
        deliveryDeliveryType = createEntity(em);
    }

    @Test
    @Transactional
    public void createDeliveryDeliveryType() throws Exception {
        int databaseSizeBeforeCreate = deliveryDeliveryTypeRepository.findAll().size();

        // Create the DeliveryDeliveryType
        restDeliveryDeliveryTypeMockMvc.perform(post("/api/delivery-delivery-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryDeliveryType)))
            .andExpect(status().isCreated());

        // Validate the DeliveryDeliveryType in the database
        List<DeliveryDeliveryType> deliveryDeliveryTypeList = deliveryDeliveryTypeRepository.findAll();
        assertThat(deliveryDeliveryTypeList).hasSize(databaseSizeBeforeCreate + 1);
        DeliveryDeliveryType testDeliveryDeliveryType = deliveryDeliveryTypeList.get(deliveryDeliveryTypeList.size() - 1);

        // Validate the DeliveryDeliveryType in Elasticsearch
        verify(mockDeliveryDeliveryTypeSearchRepository, times(1)).save(testDeliveryDeliveryType);
    }

    @Test
    @Transactional
    public void createDeliveryDeliveryTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deliveryDeliveryTypeRepository.findAll().size();

        // Create the DeliveryDeliveryType with an existing ID
        deliveryDeliveryType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryDeliveryTypeMockMvc.perform(post("/api/delivery-delivery-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryDeliveryType)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryDeliveryType in the database
        List<DeliveryDeliveryType> deliveryDeliveryTypeList = deliveryDeliveryTypeRepository.findAll();
        assertThat(deliveryDeliveryTypeList).hasSize(databaseSizeBeforeCreate);

        // Validate the DeliveryDeliveryType in Elasticsearch
        verify(mockDeliveryDeliveryTypeSearchRepository, times(0)).save(deliveryDeliveryType);
    }

    @Test
    @Transactional
    public void getAllDeliveryDeliveryTypes() throws Exception {
        // Initialize the database
        deliveryDeliveryTypeRepository.saveAndFlush(deliveryDeliveryType);

        // Get all the deliveryDeliveryTypeList
        restDeliveryDeliveryTypeMockMvc.perform(get("/api/delivery-delivery-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliveryDeliveryType.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getDeliveryDeliveryType() throws Exception {
        // Initialize the database
        deliveryDeliveryTypeRepository.saveAndFlush(deliveryDeliveryType);

        // Get the deliveryDeliveryType
        restDeliveryDeliveryTypeMockMvc.perform(get("/api/delivery-delivery-types/{id}", deliveryDeliveryType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(deliveryDeliveryType.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDeliveryDeliveryType() throws Exception {
        // Get the deliveryDeliveryType
        restDeliveryDeliveryTypeMockMvc.perform(get("/api/delivery-delivery-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDeliveryDeliveryType() throws Exception {
        // Initialize the database
        deliveryDeliveryTypeRepository.saveAndFlush(deliveryDeliveryType);

        int databaseSizeBeforeUpdate = deliveryDeliveryTypeRepository.findAll().size();

        // Update the deliveryDeliveryType
        DeliveryDeliveryType updatedDeliveryDeliveryType = deliveryDeliveryTypeRepository.findById(deliveryDeliveryType.getId()).get();
        // Disconnect from session so that the updates on updatedDeliveryDeliveryType are not directly saved in db
        em.detach(updatedDeliveryDeliveryType);

        restDeliveryDeliveryTypeMockMvc.perform(put("/api/delivery-delivery-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDeliveryDeliveryType)))
            .andExpect(status().isOk());

        // Validate the DeliveryDeliveryType in the database
        List<DeliveryDeliveryType> deliveryDeliveryTypeList = deliveryDeliveryTypeRepository.findAll();
        assertThat(deliveryDeliveryTypeList).hasSize(databaseSizeBeforeUpdate);
        DeliveryDeliveryType testDeliveryDeliveryType = deliveryDeliveryTypeList.get(deliveryDeliveryTypeList.size() - 1);

        // Validate the DeliveryDeliveryType in Elasticsearch
        verify(mockDeliveryDeliveryTypeSearchRepository, times(1)).save(testDeliveryDeliveryType);
    }

    @Test
    @Transactional
    public void updateNonExistingDeliveryDeliveryType() throws Exception {
        int databaseSizeBeforeUpdate = deliveryDeliveryTypeRepository.findAll().size();

        // Create the DeliveryDeliveryType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryDeliveryTypeMockMvc.perform(put("/api/delivery-delivery-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryDeliveryType)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryDeliveryType in the database
        List<DeliveryDeliveryType> deliveryDeliveryTypeList = deliveryDeliveryTypeRepository.findAll();
        assertThat(deliveryDeliveryTypeList).hasSize(databaseSizeBeforeUpdate);

        // Validate the DeliveryDeliveryType in Elasticsearch
        verify(mockDeliveryDeliveryTypeSearchRepository, times(0)).save(deliveryDeliveryType);
    }

    @Test
    @Transactional
    public void deleteDeliveryDeliveryType() throws Exception {
        // Initialize the database
        deliveryDeliveryTypeRepository.saveAndFlush(deliveryDeliveryType);

        int databaseSizeBeforeDelete = deliveryDeliveryTypeRepository.findAll().size();

        // Delete the deliveryDeliveryType
        restDeliveryDeliveryTypeMockMvc.perform(delete("/api/delivery-delivery-types/{id}", deliveryDeliveryType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DeliveryDeliveryType> deliveryDeliveryTypeList = deliveryDeliveryTypeRepository.findAll();
        assertThat(deliveryDeliveryTypeList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the DeliveryDeliveryType in Elasticsearch
        verify(mockDeliveryDeliveryTypeSearchRepository, times(1)).deleteById(deliveryDeliveryType.getId());
    }

    @Test
    @Transactional
    public void searchDeliveryDeliveryType() throws Exception {
        // Initialize the database
        deliveryDeliveryTypeRepository.saveAndFlush(deliveryDeliveryType);
        when(mockDeliveryDeliveryTypeSearchRepository.search(queryStringQuery("id:" + deliveryDeliveryType.getId())))
            .thenReturn(Collections.singletonList(deliveryDeliveryType));
        // Search the deliveryDeliveryType
        restDeliveryDeliveryTypeMockMvc.perform(get("/api/_search/delivery-delivery-types?query=id:" + deliveryDeliveryType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliveryDeliveryType.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeliveryDeliveryType.class);
        DeliveryDeliveryType deliveryDeliveryType1 = new DeliveryDeliveryType();
        deliveryDeliveryType1.setId(1L);
        DeliveryDeliveryType deliveryDeliveryType2 = new DeliveryDeliveryType();
        deliveryDeliveryType2.setId(deliveryDeliveryType1.getId());
        assertThat(deliveryDeliveryType1).isEqualTo(deliveryDeliveryType2);
        deliveryDeliveryType2.setId(2L);
        assertThat(deliveryDeliveryType1).isNotEqualTo(deliveryDeliveryType2);
        deliveryDeliveryType1.setId(null);
        assertThat(deliveryDeliveryType1).isNotEqualTo(deliveryDeliveryType2);
    }
}
