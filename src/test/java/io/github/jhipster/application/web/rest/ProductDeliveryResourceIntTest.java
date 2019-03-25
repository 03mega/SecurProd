package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.SecurProdApp;

import io.github.jhipster.application.domain.ProductDelivery;
import io.github.jhipster.application.repository.ProductDeliveryRepository;
import io.github.jhipster.application.repository.search.ProductDeliverySearchRepository;
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
 * Test class for the ProductDeliveryResource REST controller.
 *
 * @see ProductDeliveryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SecurProdApp.class)
public class ProductDeliveryResourceIntTest {

    @Autowired
    private ProductDeliveryRepository productDeliveryRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.ProductDeliverySearchRepositoryMockConfiguration
     */
    @Autowired
    private ProductDeliverySearchRepository mockProductDeliverySearchRepository;

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

    private MockMvc restProductDeliveryMockMvc;

    private ProductDelivery productDelivery;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductDeliveryResource productDeliveryResource = new ProductDeliveryResource(productDeliveryRepository, mockProductDeliverySearchRepository);
        this.restProductDeliveryMockMvc = MockMvcBuilders.standaloneSetup(productDeliveryResource)
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
    public static ProductDelivery createEntity(EntityManager em) {
        ProductDelivery productDelivery = new ProductDelivery();
        return productDelivery;
    }

    @Before
    public void initTest() {
        productDelivery = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductDelivery() throws Exception {
        int databaseSizeBeforeCreate = productDeliveryRepository.findAll().size();

        // Create the ProductDelivery
        restProductDeliveryMockMvc.perform(post("/api/product-deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDelivery)))
            .andExpect(status().isCreated());

        // Validate the ProductDelivery in the database
        List<ProductDelivery> productDeliveryList = productDeliveryRepository.findAll();
        assertThat(productDeliveryList).hasSize(databaseSizeBeforeCreate + 1);
        ProductDelivery testProductDelivery = productDeliveryList.get(productDeliveryList.size() - 1);

        // Validate the ProductDelivery in Elasticsearch
        verify(mockProductDeliverySearchRepository, times(1)).save(testProductDelivery);
    }

    @Test
    @Transactional
    public void createProductDeliveryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productDeliveryRepository.findAll().size();

        // Create the ProductDelivery with an existing ID
        productDelivery.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductDeliveryMockMvc.perform(post("/api/product-deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDelivery)))
            .andExpect(status().isBadRequest());

        // Validate the ProductDelivery in the database
        List<ProductDelivery> productDeliveryList = productDeliveryRepository.findAll();
        assertThat(productDeliveryList).hasSize(databaseSizeBeforeCreate);

        // Validate the ProductDelivery in Elasticsearch
        verify(mockProductDeliverySearchRepository, times(0)).save(productDelivery);
    }

    @Test
    @Transactional
    public void getAllProductDeliveries() throws Exception {
        // Initialize the database
        productDeliveryRepository.saveAndFlush(productDelivery);

        // Get all the productDeliveryList
        restProductDeliveryMockMvc.perform(get("/api/product-deliveries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productDelivery.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getProductDelivery() throws Exception {
        // Initialize the database
        productDeliveryRepository.saveAndFlush(productDelivery);

        // Get the productDelivery
        restProductDeliveryMockMvc.perform(get("/api/product-deliveries/{id}", productDelivery.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productDelivery.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProductDelivery() throws Exception {
        // Get the productDelivery
        restProductDeliveryMockMvc.perform(get("/api/product-deliveries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductDelivery() throws Exception {
        // Initialize the database
        productDeliveryRepository.saveAndFlush(productDelivery);

        int databaseSizeBeforeUpdate = productDeliveryRepository.findAll().size();

        // Update the productDelivery
        ProductDelivery updatedProductDelivery = productDeliveryRepository.findById(productDelivery.getId()).get();
        // Disconnect from session so that the updates on updatedProductDelivery are not directly saved in db
        em.detach(updatedProductDelivery);

        restProductDeliveryMockMvc.perform(put("/api/product-deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductDelivery)))
            .andExpect(status().isOk());

        // Validate the ProductDelivery in the database
        List<ProductDelivery> productDeliveryList = productDeliveryRepository.findAll();
        assertThat(productDeliveryList).hasSize(databaseSizeBeforeUpdate);
        ProductDelivery testProductDelivery = productDeliveryList.get(productDeliveryList.size() - 1);

        // Validate the ProductDelivery in Elasticsearch
        verify(mockProductDeliverySearchRepository, times(1)).save(testProductDelivery);
    }

    @Test
    @Transactional
    public void updateNonExistingProductDelivery() throws Exception {
        int databaseSizeBeforeUpdate = productDeliveryRepository.findAll().size();

        // Create the ProductDelivery

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductDeliveryMockMvc.perform(put("/api/product-deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDelivery)))
            .andExpect(status().isBadRequest());

        // Validate the ProductDelivery in the database
        List<ProductDelivery> productDeliveryList = productDeliveryRepository.findAll();
        assertThat(productDeliveryList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ProductDelivery in Elasticsearch
        verify(mockProductDeliverySearchRepository, times(0)).save(productDelivery);
    }

    @Test
    @Transactional
    public void deleteProductDelivery() throws Exception {
        // Initialize the database
        productDeliveryRepository.saveAndFlush(productDelivery);

        int databaseSizeBeforeDelete = productDeliveryRepository.findAll().size();

        // Delete the productDelivery
        restProductDeliveryMockMvc.perform(delete("/api/product-deliveries/{id}", productDelivery.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductDelivery> productDeliveryList = productDeliveryRepository.findAll();
        assertThat(productDeliveryList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ProductDelivery in Elasticsearch
        verify(mockProductDeliverySearchRepository, times(1)).deleteById(productDelivery.getId());
    }

    @Test
    @Transactional
    public void searchProductDelivery() throws Exception {
        // Initialize the database
        productDeliveryRepository.saveAndFlush(productDelivery);
        when(mockProductDeliverySearchRepository.search(queryStringQuery("id:" + productDelivery.getId())))
            .thenReturn(Collections.singletonList(productDelivery));
        // Search the productDelivery
        restProductDeliveryMockMvc.perform(get("/api/_search/product-deliveries?query=id:" + productDelivery.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productDelivery.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductDelivery.class);
        ProductDelivery productDelivery1 = new ProductDelivery();
        productDelivery1.setId(1L);
        ProductDelivery productDelivery2 = new ProductDelivery();
        productDelivery2.setId(productDelivery1.getId());
        assertThat(productDelivery1).isEqualTo(productDelivery2);
        productDelivery2.setId(2L);
        assertThat(productDelivery1).isNotEqualTo(productDelivery2);
        productDelivery1.setId(null);
        assertThat(productDelivery1).isNotEqualTo(productDelivery2);
    }
}
