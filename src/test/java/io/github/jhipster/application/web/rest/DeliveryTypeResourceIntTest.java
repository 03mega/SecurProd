package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.SecurProdApp;

import io.github.jhipster.application.domain.DeliveryType;
import io.github.jhipster.application.repository.DeliveryTypeRepository;
import io.github.jhipster.application.repository.search.DeliveryTypeSearchRepository;
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
 * Test class for the DeliveryTypeResource REST controller.
 *
 * @see DeliveryTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SecurProdApp.class)
public class DeliveryTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private DeliveryTypeRepository deliveryTypeRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.DeliveryTypeSearchRepositoryMockConfiguration
     */
    @Autowired
    private DeliveryTypeSearchRepository mockDeliveryTypeSearchRepository;

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

    private MockMvc restDeliveryTypeMockMvc;

    private DeliveryType deliveryType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DeliveryTypeResource deliveryTypeResource = new DeliveryTypeResource(deliveryTypeRepository, mockDeliveryTypeSearchRepository);
        this.restDeliveryTypeMockMvc = MockMvcBuilders.standaloneSetup(deliveryTypeResource)
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
    public static DeliveryType createEntity(EntityManager em) {
        DeliveryType deliveryType = new DeliveryType()
            .name(DEFAULT_NAME);
        return deliveryType;
    }

    @Before
    public void initTest() {
        deliveryType = createEntity(em);
    }

    @Test
    @Transactional
    public void createDeliveryType() throws Exception {
        int databaseSizeBeforeCreate = deliveryTypeRepository.findAll().size();

        // Create the DeliveryType
        restDeliveryTypeMockMvc.perform(post("/api/delivery-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryType)))
            .andExpect(status().isCreated());

        // Validate the DeliveryType in the database
        List<DeliveryType> deliveryTypeList = deliveryTypeRepository.findAll();
        assertThat(deliveryTypeList).hasSize(databaseSizeBeforeCreate + 1);
        DeliveryType testDeliveryType = deliveryTypeList.get(deliveryTypeList.size() - 1);
        assertThat(testDeliveryType.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the DeliveryType in Elasticsearch
        verify(mockDeliveryTypeSearchRepository, times(1)).save(testDeliveryType);
    }

    @Test
    @Transactional
    public void createDeliveryTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deliveryTypeRepository.findAll().size();

        // Create the DeliveryType with an existing ID
        deliveryType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryTypeMockMvc.perform(post("/api/delivery-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryType)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryType in the database
        List<DeliveryType> deliveryTypeList = deliveryTypeRepository.findAll();
        assertThat(deliveryTypeList).hasSize(databaseSizeBeforeCreate);

        // Validate the DeliveryType in Elasticsearch
        verify(mockDeliveryTypeSearchRepository, times(0)).save(deliveryType);
    }

    @Test
    @Transactional
    public void getAllDeliveryTypes() throws Exception {
        // Initialize the database
        deliveryTypeRepository.saveAndFlush(deliveryType);

        // Get all the deliveryTypeList
        restDeliveryTypeMockMvc.perform(get("/api/delivery-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliveryType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getDeliveryType() throws Exception {
        // Initialize the database
        deliveryTypeRepository.saveAndFlush(deliveryType);

        // Get the deliveryType
        restDeliveryTypeMockMvc.perform(get("/api/delivery-types/{id}", deliveryType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(deliveryType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDeliveryType() throws Exception {
        // Get the deliveryType
        restDeliveryTypeMockMvc.perform(get("/api/delivery-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDeliveryType() throws Exception {
        // Initialize the database
        deliveryTypeRepository.saveAndFlush(deliveryType);

        int databaseSizeBeforeUpdate = deliveryTypeRepository.findAll().size();

        // Update the deliveryType
        DeliveryType updatedDeliveryType = deliveryTypeRepository.findById(deliveryType.getId()).get();
        // Disconnect from session so that the updates on updatedDeliveryType are not directly saved in db
        em.detach(updatedDeliveryType);
        updatedDeliveryType
            .name(UPDATED_NAME);

        restDeliveryTypeMockMvc.perform(put("/api/delivery-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDeliveryType)))
            .andExpect(status().isOk());

        // Validate the DeliveryType in the database
        List<DeliveryType> deliveryTypeList = deliveryTypeRepository.findAll();
        assertThat(deliveryTypeList).hasSize(databaseSizeBeforeUpdate);
        DeliveryType testDeliveryType = deliveryTypeList.get(deliveryTypeList.size() - 1);
        assertThat(testDeliveryType.getName()).isEqualTo(UPDATED_NAME);

        // Validate the DeliveryType in Elasticsearch
        verify(mockDeliveryTypeSearchRepository, times(1)).save(testDeliveryType);
    }

    @Test
    @Transactional
    public void updateNonExistingDeliveryType() throws Exception {
        int databaseSizeBeforeUpdate = deliveryTypeRepository.findAll().size();

        // Create the DeliveryType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryTypeMockMvc.perform(put("/api/delivery-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryType)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryType in the database
        List<DeliveryType> deliveryTypeList = deliveryTypeRepository.findAll();
        assertThat(deliveryTypeList).hasSize(databaseSizeBeforeUpdate);

        // Validate the DeliveryType in Elasticsearch
        verify(mockDeliveryTypeSearchRepository, times(0)).save(deliveryType);
    }

    @Test
    @Transactional
    public void deleteDeliveryType() throws Exception {
        // Initialize the database
        deliveryTypeRepository.saveAndFlush(deliveryType);

        int databaseSizeBeforeDelete = deliveryTypeRepository.findAll().size();

        // Delete the deliveryType
        restDeliveryTypeMockMvc.perform(delete("/api/delivery-types/{id}", deliveryType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DeliveryType> deliveryTypeList = deliveryTypeRepository.findAll();
        assertThat(deliveryTypeList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the DeliveryType in Elasticsearch
        verify(mockDeliveryTypeSearchRepository, times(1)).deleteById(deliveryType.getId());
    }

    @Test
    @Transactional
    public void searchDeliveryType() throws Exception {
        // Initialize the database
        deliveryTypeRepository.saveAndFlush(deliveryType);
        when(mockDeliveryTypeSearchRepository.search(queryStringQuery("id:" + deliveryType.getId())))
            .thenReturn(Collections.singletonList(deliveryType));
        // Search the deliveryType
        restDeliveryTypeMockMvc.perform(get("/api/_search/delivery-types?query=id:" + deliveryType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliveryType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeliveryType.class);
        DeliveryType deliveryType1 = new DeliveryType();
        deliveryType1.setId(1L);
        DeliveryType deliveryType2 = new DeliveryType();
        deliveryType2.setId(deliveryType1.getId());
        assertThat(deliveryType1).isEqualTo(deliveryType2);
        deliveryType2.setId(2L);
        assertThat(deliveryType1).isNotEqualTo(deliveryType2);
        deliveryType1.setId(null);
        assertThat(deliveryType1).isNotEqualTo(deliveryType2);
    }
}
