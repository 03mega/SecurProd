package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.SecurProdApp;

import io.github.jhipster.application.domain.DeliveryDeliveryTypeProduct;
import io.github.jhipster.application.repository.DeliveryDeliveryTypeProductRepository;
import io.github.jhipster.application.repository.search.DeliveryDeliveryTypeProductSearchRepository;
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
 * Test class for the DeliveryDeliveryTypeProductResource REST controller.
 *
 * @see DeliveryDeliveryTypeProductResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SecurProdApp.class)
public class DeliveryDeliveryTypeProductResourceIntTest {

    private static final Long DEFAULT_QUANTITY = 1L;
    private static final Long UPDATED_QUANTITY = 2L;

    @Autowired
    private DeliveryDeliveryTypeProductRepository deliveryDeliveryTypeProductRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.DeliveryDeliveryTypeProductSearchRepositoryMockConfiguration
     */
    @Autowired
    private DeliveryDeliveryTypeProductSearchRepository mockDeliveryDeliveryTypeProductSearchRepository;

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

    private MockMvc restDeliveryDeliveryTypeProductMockMvc;

    private DeliveryDeliveryTypeProduct deliveryDeliveryTypeProduct;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DeliveryDeliveryTypeProductResource deliveryDeliveryTypeProductResource = new DeliveryDeliveryTypeProductResource(deliveryDeliveryTypeProductRepository, mockDeliveryDeliveryTypeProductSearchRepository);
        this.restDeliveryDeliveryTypeProductMockMvc = MockMvcBuilders.standaloneSetup(deliveryDeliveryTypeProductResource)
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
    public static DeliveryDeliveryTypeProduct createEntity(EntityManager em) {
        DeliveryDeliveryTypeProduct deliveryDeliveryTypeProduct = new DeliveryDeliveryTypeProduct()
            .quantity(DEFAULT_QUANTITY);
        return deliveryDeliveryTypeProduct;
    }

    @Before
    public void initTest() {
        deliveryDeliveryTypeProduct = createEntity(em);
    }

    @Test
    @Transactional
    public void createDeliveryDeliveryTypeProduct() throws Exception {
        int databaseSizeBeforeCreate = deliveryDeliveryTypeProductRepository.findAll().size();

        // Create the DeliveryDeliveryTypeProduct
        restDeliveryDeliveryTypeProductMockMvc.perform(post("/api/delivery-delivery-type-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryDeliveryTypeProduct)))
            .andExpect(status().isCreated());

        // Validate the DeliveryDeliveryTypeProduct in the database
        List<DeliveryDeliveryTypeProduct> deliveryDeliveryTypeProductList = deliveryDeliveryTypeProductRepository.findAll();
        assertThat(deliveryDeliveryTypeProductList).hasSize(databaseSizeBeforeCreate + 1);
        DeliveryDeliveryTypeProduct testDeliveryDeliveryTypeProduct = deliveryDeliveryTypeProductList.get(deliveryDeliveryTypeProductList.size() - 1);
        assertThat(testDeliveryDeliveryTypeProduct.getQuantity()).isEqualTo(DEFAULT_QUANTITY);

        // Validate the DeliveryDeliveryTypeProduct in Elasticsearch
        verify(mockDeliveryDeliveryTypeProductSearchRepository, times(1)).save(testDeliveryDeliveryTypeProduct);
    }

    @Test
    @Transactional
    public void createDeliveryDeliveryTypeProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deliveryDeliveryTypeProductRepository.findAll().size();

        // Create the DeliveryDeliveryTypeProduct with an existing ID
        deliveryDeliveryTypeProduct.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryDeliveryTypeProductMockMvc.perform(post("/api/delivery-delivery-type-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryDeliveryTypeProduct)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryDeliveryTypeProduct in the database
        List<DeliveryDeliveryTypeProduct> deliveryDeliveryTypeProductList = deliveryDeliveryTypeProductRepository.findAll();
        assertThat(deliveryDeliveryTypeProductList).hasSize(databaseSizeBeforeCreate);

        // Validate the DeliveryDeliveryTypeProduct in Elasticsearch
        verify(mockDeliveryDeliveryTypeProductSearchRepository, times(0)).save(deliveryDeliveryTypeProduct);
    }

    @Test
    @Transactional
    public void getAllDeliveryDeliveryTypeProducts() throws Exception {
        // Initialize the database
        deliveryDeliveryTypeProductRepository.saveAndFlush(deliveryDeliveryTypeProduct);

        // Get all the deliveryDeliveryTypeProductList
        restDeliveryDeliveryTypeProductMockMvc.perform(get("/api/delivery-delivery-type-products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliveryDeliveryTypeProduct.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())));
    }
    
    @Test
    @Transactional
    public void getDeliveryDeliveryTypeProduct() throws Exception {
        // Initialize the database
        deliveryDeliveryTypeProductRepository.saveAndFlush(deliveryDeliveryTypeProduct);

        // Get the deliveryDeliveryTypeProduct
        restDeliveryDeliveryTypeProductMockMvc.perform(get("/api/delivery-delivery-type-products/{id}", deliveryDeliveryTypeProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(deliveryDeliveryTypeProduct.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDeliveryDeliveryTypeProduct() throws Exception {
        // Get the deliveryDeliveryTypeProduct
        restDeliveryDeliveryTypeProductMockMvc.perform(get("/api/delivery-delivery-type-products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDeliveryDeliveryTypeProduct() throws Exception {
        // Initialize the database
        deliveryDeliveryTypeProductRepository.saveAndFlush(deliveryDeliveryTypeProduct);

        int databaseSizeBeforeUpdate = deliveryDeliveryTypeProductRepository.findAll().size();

        // Update the deliveryDeliveryTypeProduct
        DeliveryDeliveryTypeProduct updatedDeliveryDeliveryTypeProduct = deliveryDeliveryTypeProductRepository.findById(deliveryDeliveryTypeProduct.getId()).get();
        // Disconnect from session so that the updates on updatedDeliveryDeliveryTypeProduct are not directly saved in db
        em.detach(updatedDeliveryDeliveryTypeProduct);
        updatedDeliveryDeliveryTypeProduct
            .quantity(UPDATED_QUANTITY);

        restDeliveryDeliveryTypeProductMockMvc.perform(put("/api/delivery-delivery-type-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDeliveryDeliveryTypeProduct)))
            .andExpect(status().isOk());

        // Validate the DeliveryDeliveryTypeProduct in the database
        List<DeliveryDeliveryTypeProduct> deliveryDeliveryTypeProductList = deliveryDeliveryTypeProductRepository.findAll();
        assertThat(deliveryDeliveryTypeProductList).hasSize(databaseSizeBeforeUpdate);
        DeliveryDeliveryTypeProduct testDeliveryDeliveryTypeProduct = deliveryDeliveryTypeProductList.get(deliveryDeliveryTypeProductList.size() - 1);
        assertThat(testDeliveryDeliveryTypeProduct.getQuantity()).isEqualTo(UPDATED_QUANTITY);

        // Validate the DeliveryDeliveryTypeProduct in Elasticsearch
        verify(mockDeliveryDeliveryTypeProductSearchRepository, times(1)).save(testDeliveryDeliveryTypeProduct);
    }

    @Test
    @Transactional
    public void updateNonExistingDeliveryDeliveryTypeProduct() throws Exception {
        int databaseSizeBeforeUpdate = deliveryDeliveryTypeProductRepository.findAll().size();

        // Create the DeliveryDeliveryTypeProduct

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryDeliveryTypeProductMockMvc.perform(put("/api/delivery-delivery-type-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryDeliveryTypeProduct)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryDeliveryTypeProduct in the database
        List<DeliveryDeliveryTypeProduct> deliveryDeliveryTypeProductList = deliveryDeliveryTypeProductRepository.findAll();
        assertThat(deliveryDeliveryTypeProductList).hasSize(databaseSizeBeforeUpdate);

        // Validate the DeliveryDeliveryTypeProduct in Elasticsearch
        verify(mockDeliveryDeliveryTypeProductSearchRepository, times(0)).save(deliveryDeliveryTypeProduct);
    }

    @Test
    @Transactional
    public void deleteDeliveryDeliveryTypeProduct() throws Exception {
        // Initialize the database
        deliveryDeliveryTypeProductRepository.saveAndFlush(deliveryDeliveryTypeProduct);

        int databaseSizeBeforeDelete = deliveryDeliveryTypeProductRepository.findAll().size();

        // Delete the deliveryDeliveryTypeProduct
        restDeliveryDeliveryTypeProductMockMvc.perform(delete("/api/delivery-delivery-type-products/{id}", deliveryDeliveryTypeProduct.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DeliveryDeliveryTypeProduct> deliveryDeliveryTypeProductList = deliveryDeliveryTypeProductRepository.findAll();
        assertThat(deliveryDeliveryTypeProductList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the DeliveryDeliveryTypeProduct in Elasticsearch
        verify(mockDeliveryDeliveryTypeProductSearchRepository, times(1)).deleteById(deliveryDeliveryTypeProduct.getId());
    }

    @Test
    @Transactional
    public void searchDeliveryDeliveryTypeProduct() throws Exception {
        // Initialize the database
        deliveryDeliveryTypeProductRepository.saveAndFlush(deliveryDeliveryTypeProduct);
        when(mockDeliveryDeliveryTypeProductSearchRepository.search(queryStringQuery("id:" + deliveryDeliveryTypeProduct.getId())))
            .thenReturn(Collections.singletonList(deliveryDeliveryTypeProduct));
        // Search the deliveryDeliveryTypeProduct
        restDeliveryDeliveryTypeProductMockMvc.perform(get("/api/_search/delivery-delivery-type-products?query=id:" + deliveryDeliveryTypeProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliveryDeliveryTypeProduct.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeliveryDeliveryTypeProduct.class);
        DeliveryDeliveryTypeProduct deliveryDeliveryTypeProduct1 = new DeliveryDeliveryTypeProduct();
        deliveryDeliveryTypeProduct1.setId(1L);
        DeliveryDeliveryTypeProduct deliveryDeliveryTypeProduct2 = new DeliveryDeliveryTypeProduct();
        deliveryDeliveryTypeProduct2.setId(deliveryDeliveryTypeProduct1.getId());
        assertThat(deliveryDeliveryTypeProduct1).isEqualTo(deliveryDeliveryTypeProduct2);
        deliveryDeliveryTypeProduct2.setId(2L);
        assertThat(deliveryDeliveryTypeProduct1).isNotEqualTo(deliveryDeliveryTypeProduct2);
        deliveryDeliveryTypeProduct1.setId(null);
        assertThat(deliveryDeliveryTypeProduct1).isNotEqualTo(deliveryDeliveryTypeProduct2);
    }
}
