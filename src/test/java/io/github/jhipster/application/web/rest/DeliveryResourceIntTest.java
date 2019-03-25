package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.SecurProdApp;

import io.github.jhipster.application.domain.Delivery;
import io.github.jhipster.application.repository.DeliveryRepository;
import io.github.jhipster.application.repository.search.DeliverySearchRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Test class for the DeliveryResource REST controller.
 *
 * @see DeliveryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SecurProdApp.class)
public class DeliveryResourceIntTest {

    private static final String DEFAULT_BORDER_DELIVERY = "AAAAAAAAAA";
    private static final String UPDATED_BORDER_DELIVERY = "BBBBBBBBBB";

    private static final String DEFAULT_VALUATION_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_VALUATION_NUMBER = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DELIVERY_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DELIVERY_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    private static final String DEFAULT_ZONE = "AAAAAAAAAA";
    private static final String UPDATED_ZONE = "BBBBBBBBBB";

    @Autowired
    private DeliveryRepository deliveryRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.DeliverySearchRepositoryMockConfiguration
     */
    @Autowired
    private DeliverySearchRepository mockDeliverySearchRepository;

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

    private MockMvc restDeliveryMockMvc;

    private Delivery delivery;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DeliveryResource deliveryResource = new DeliveryResource(deliveryRepository, mockDeliverySearchRepository);
        this.restDeliveryMockMvc = MockMvcBuilders.standaloneSetup(deliveryResource)
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
    public static Delivery createEntity(EntityManager em) {
        Delivery delivery = new Delivery()
            .borderDelivery(DEFAULT_BORDER_DELIVERY)
            .valuationNumber(DEFAULT_VALUATION_NUMBER)
            .deliveryDate(DEFAULT_DELIVERY_DATE)
            .category(DEFAULT_CATEGORY)
            .zone(DEFAULT_ZONE);
        return delivery;
    }

    @Before
    public void initTest() {
        delivery = createEntity(em);
    }

    @Test
    @Transactional
    public void createDelivery() throws Exception {
        int databaseSizeBeforeCreate = deliveryRepository.findAll().size();

        // Create the Delivery
        restDeliveryMockMvc.perform(post("/api/deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isCreated());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeCreate + 1);
        Delivery testDelivery = deliveryList.get(deliveryList.size() - 1);
        assertThat(testDelivery.getBorderDelivery()).isEqualTo(DEFAULT_BORDER_DELIVERY);
        assertThat(testDelivery.getValuationNumber()).isEqualTo(DEFAULT_VALUATION_NUMBER);
        assertThat(testDelivery.getDeliveryDate()).isEqualTo(DEFAULT_DELIVERY_DATE);
        assertThat(testDelivery.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testDelivery.getZone()).isEqualTo(DEFAULT_ZONE);

        // Validate the Delivery in Elasticsearch
        verify(mockDeliverySearchRepository, times(1)).save(testDelivery);
    }

    @Test
    @Transactional
    public void createDeliveryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deliveryRepository.findAll().size();

        // Create the Delivery with an existing ID
        delivery.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryMockMvc.perform(post("/api/deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeCreate);

        // Validate the Delivery in Elasticsearch
        verify(mockDeliverySearchRepository, times(0)).save(delivery);
    }

    @Test
    @Transactional
    public void getAllDeliveries() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);

        // Get all the deliveryList
        restDeliveryMockMvc.perform(get("/api/deliveries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(delivery.getId().intValue())))
            .andExpect(jsonPath("$.[*].borderDelivery").value(hasItem(DEFAULT_BORDER_DELIVERY.toString())))
            .andExpect(jsonPath("$.[*].valuationNumber").value(hasItem(DEFAULT_VALUATION_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].deliveryDate").value(hasItem(DEFAULT_DELIVERY_DATE.toString())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].zone").value(hasItem(DEFAULT_ZONE.toString())));
    }
    
    @Test
    @Transactional
    public void getDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);

        // Get the delivery
        restDeliveryMockMvc.perform(get("/api/deliveries/{id}", delivery.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(delivery.getId().intValue()))
            .andExpect(jsonPath("$.borderDelivery").value(DEFAULT_BORDER_DELIVERY.toString()))
            .andExpect(jsonPath("$.valuationNumber").value(DEFAULT_VALUATION_NUMBER.toString()))
            .andExpect(jsonPath("$.deliveryDate").value(DEFAULT_DELIVERY_DATE.toString()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.zone").value(DEFAULT_ZONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDelivery() throws Exception {
        // Get the delivery
        restDeliveryMockMvc.perform(get("/api/deliveries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);

        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();

        // Update the delivery
        Delivery updatedDelivery = deliveryRepository.findById(delivery.getId()).get();
        // Disconnect from session so that the updates on updatedDelivery are not directly saved in db
        em.detach(updatedDelivery);
        updatedDelivery
            .borderDelivery(UPDATED_BORDER_DELIVERY)
            .valuationNumber(UPDATED_VALUATION_NUMBER)
            .deliveryDate(UPDATED_DELIVERY_DATE)
            .category(UPDATED_CATEGORY)
            .zone(UPDATED_ZONE);

        restDeliveryMockMvc.perform(put("/api/deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDelivery)))
            .andExpect(status().isOk());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
        Delivery testDelivery = deliveryList.get(deliveryList.size() - 1);
        assertThat(testDelivery.getBorderDelivery()).isEqualTo(UPDATED_BORDER_DELIVERY);
        assertThat(testDelivery.getValuationNumber()).isEqualTo(UPDATED_VALUATION_NUMBER);
        assertThat(testDelivery.getDeliveryDate()).isEqualTo(UPDATED_DELIVERY_DATE);
        assertThat(testDelivery.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testDelivery.getZone()).isEqualTo(UPDATED_ZONE);

        // Validate the Delivery in Elasticsearch
        verify(mockDeliverySearchRepository, times(1)).save(testDelivery);
    }

    @Test
    @Transactional
    public void updateNonExistingDelivery() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();

        // Create the Delivery

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryMockMvc.perform(put("/api/deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Delivery in Elasticsearch
        verify(mockDeliverySearchRepository, times(0)).save(delivery);
    }

    @Test
    @Transactional
    public void deleteDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);

        int databaseSizeBeforeDelete = deliveryRepository.findAll().size();

        // Delete the delivery
        restDeliveryMockMvc.perform(delete("/api/deliveries/{id}", delivery.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Delivery in Elasticsearch
        verify(mockDeliverySearchRepository, times(1)).deleteById(delivery.getId());
    }

    @Test
    @Transactional
    public void searchDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);
        when(mockDeliverySearchRepository.search(queryStringQuery("id:" + delivery.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(delivery), PageRequest.of(0, 1), 1));
        // Search the delivery
        restDeliveryMockMvc.perform(get("/api/_search/deliveries?query=id:" + delivery.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(delivery.getId().intValue())))
            .andExpect(jsonPath("$.[*].borderDelivery").value(hasItem(DEFAULT_BORDER_DELIVERY)))
            .andExpect(jsonPath("$.[*].valuationNumber").value(hasItem(DEFAULT_VALUATION_NUMBER)))
            .andExpect(jsonPath("$.[*].deliveryDate").value(hasItem(DEFAULT_DELIVERY_DATE.toString())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)))
            .andExpect(jsonPath("$.[*].zone").value(hasItem(DEFAULT_ZONE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Delivery.class);
        Delivery delivery1 = new Delivery();
        delivery1.setId(1L);
        Delivery delivery2 = new Delivery();
        delivery2.setId(delivery1.getId());
        assertThat(delivery1).isEqualTo(delivery2);
        delivery2.setId(2L);
        assertThat(delivery1).isNotEqualTo(delivery2);
        delivery1.setId(null);
        assertThat(delivery1).isNotEqualTo(delivery2);
    }
}
