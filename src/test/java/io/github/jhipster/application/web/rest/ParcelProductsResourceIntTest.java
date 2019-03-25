package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.SecurProdApp;

import io.github.jhipster.application.domain.ParcelProducts;
import io.github.jhipster.application.repository.ParcelProductsRepository;
import io.github.jhipster.application.repository.search.ParcelProductsSearchRepository;
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
 * Test class for the ParcelProductsResource REST controller.
 *
 * @see ParcelProductsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SecurProdApp.class)
public class ParcelProductsResourceIntTest {

    private static final Long DEFAULT_QUANTITY = 1L;
    private static final Long UPDATED_QUANTITY = 2L;

    @Autowired
    private ParcelProductsRepository parcelProductsRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.ParcelProductsSearchRepositoryMockConfiguration
     */
    @Autowired
    private ParcelProductsSearchRepository mockParcelProductsSearchRepository;

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

    private MockMvc restParcelProductsMockMvc;

    private ParcelProducts parcelProducts;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParcelProductsResource parcelProductsResource = new ParcelProductsResource(parcelProductsRepository, mockParcelProductsSearchRepository);
        this.restParcelProductsMockMvc = MockMvcBuilders.standaloneSetup(parcelProductsResource)
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
    public static ParcelProducts createEntity(EntityManager em) {
        ParcelProducts parcelProducts = new ParcelProducts()
            .quantity(DEFAULT_QUANTITY);
        return parcelProducts;
    }

    @Before
    public void initTest() {
        parcelProducts = createEntity(em);
    }

    @Test
    @Transactional
    public void createParcelProducts() throws Exception {
        int databaseSizeBeforeCreate = parcelProductsRepository.findAll().size();

        // Create the ParcelProducts
        restParcelProductsMockMvc.perform(post("/api/parcel-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcelProducts)))
            .andExpect(status().isCreated());

        // Validate the ParcelProducts in the database
        List<ParcelProducts> parcelProductsList = parcelProductsRepository.findAll();
        assertThat(parcelProductsList).hasSize(databaseSizeBeforeCreate + 1);
        ParcelProducts testParcelProducts = parcelProductsList.get(parcelProductsList.size() - 1);
        assertThat(testParcelProducts.getQuantity()).isEqualTo(DEFAULT_QUANTITY);

        // Validate the ParcelProducts in Elasticsearch
        verify(mockParcelProductsSearchRepository, times(1)).save(testParcelProducts);
    }

    @Test
    @Transactional
    public void createParcelProductsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parcelProductsRepository.findAll().size();

        // Create the ParcelProducts with an existing ID
        parcelProducts.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParcelProductsMockMvc.perform(post("/api/parcel-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcelProducts)))
            .andExpect(status().isBadRequest());

        // Validate the ParcelProducts in the database
        List<ParcelProducts> parcelProductsList = parcelProductsRepository.findAll();
        assertThat(parcelProductsList).hasSize(databaseSizeBeforeCreate);

        // Validate the ParcelProducts in Elasticsearch
        verify(mockParcelProductsSearchRepository, times(0)).save(parcelProducts);
    }

    @Test
    @Transactional
    public void getAllParcelProducts() throws Exception {
        // Initialize the database
        parcelProductsRepository.saveAndFlush(parcelProducts);

        // Get all the parcelProductsList
        restParcelProductsMockMvc.perform(get("/api/parcel-products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parcelProducts.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())));
    }
    
    @Test
    @Transactional
    public void getParcelProducts() throws Exception {
        // Initialize the database
        parcelProductsRepository.saveAndFlush(parcelProducts);

        // Get the parcelProducts
        restParcelProductsMockMvc.perform(get("/api/parcel-products/{id}", parcelProducts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parcelProducts.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingParcelProducts() throws Exception {
        // Get the parcelProducts
        restParcelProductsMockMvc.perform(get("/api/parcel-products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParcelProducts() throws Exception {
        // Initialize the database
        parcelProductsRepository.saveAndFlush(parcelProducts);

        int databaseSizeBeforeUpdate = parcelProductsRepository.findAll().size();

        // Update the parcelProducts
        ParcelProducts updatedParcelProducts = parcelProductsRepository.findById(parcelProducts.getId()).get();
        // Disconnect from session so that the updates on updatedParcelProducts are not directly saved in db
        em.detach(updatedParcelProducts);
        updatedParcelProducts
            .quantity(UPDATED_QUANTITY);

        restParcelProductsMockMvc.perform(put("/api/parcel-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParcelProducts)))
            .andExpect(status().isOk());

        // Validate the ParcelProducts in the database
        List<ParcelProducts> parcelProductsList = parcelProductsRepository.findAll();
        assertThat(parcelProductsList).hasSize(databaseSizeBeforeUpdate);
        ParcelProducts testParcelProducts = parcelProductsList.get(parcelProductsList.size() - 1);
        assertThat(testParcelProducts.getQuantity()).isEqualTo(UPDATED_QUANTITY);

        // Validate the ParcelProducts in Elasticsearch
        verify(mockParcelProductsSearchRepository, times(1)).save(testParcelProducts);
    }

    @Test
    @Transactional
    public void updateNonExistingParcelProducts() throws Exception {
        int databaseSizeBeforeUpdate = parcelProductsRepository.findAll().size();

        // Create the ParcelProducts

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParcelProductsMockMvc.perform(put("/api/parcel-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcelProducts)))
            .andExpect(status().isBadRequest());

        // Validate the ParcelProducts in the database
        List<ParcelProducts> parcelProductsList = parcelProductsRepository.findAll();
        assertThat(parcelProductsList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ParcelProducts in Elasticsearch
        verify(mockParcelProductsSearchRepository, times(0)).save(parcelProducts);
    }

    @Test
    @Transactional
    public void deleteParcelProducts() throws Exception {
        // Initialize the database
        parcelProductsRepository.saveAndFlush(parcelProducts);

        int databaseSizeBeforeDelete = parcelProductsRepository.findAll().size();

        // Delete the parcelProducts
        restParcelProductsMockMvc.perform(delete("/api/parcel-products/{id}", parcelProducts.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ParcelProducts> parcelProductsList = parcelProductsRepository.findAll();
        assertThat(parcelProductsList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ParcelProducts in Elasticsearch
        verify(mockParcelProductsSearchRepository, times(1)).deleteById(parcelProducts.getId());
    }

    @Test
    @Transactional
    public void searchParcelProducts() throws Exception {
        // Initialize the database
        parcelProductsRepository.saveAndFlush(parcelProducts);
        when(mockParcelProductsSearchRepository.search(queryStringQuery("id:" + parcelProducts.getId())))
            .thenReturn(Collections.singletonList(parcelProducts));
        // Search the parcelProducts
        restParcelProductsMockMvc.perform(get("/api/_search/parcel-products?query=id:" + parcelProducts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parcelProducts.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParcelProducts.class);
        ParcelProducts parcelProducts1 = new ParcelProducts();
        parcelProducts1.setId(1L);
        ParcelProducts parcelProducts2 = new ParcelProducts();
        parcelProducts2.setId(parcelProducts1.getId());
        assertThat(parcelProducts1).isEqualTo(parcelProducts2);
        parcelProducts2.setId(2L);
        assertThat(parcelProducts1).isNotEqualTo(parcelProducts2);
        parcelProducts1.setId(null);
        assertThat(parcelProducts1).isNotEqualTo(parcelProducts2);
    }
}
