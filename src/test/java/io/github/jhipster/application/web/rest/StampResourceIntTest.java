package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.SecurProdApp;

import io.github.jhipster.application.domain.Stamp;
import io.github.jhipster.application.repository.StampRepository;
import io.github.jhipster.application.repository.search.StampSearchRepository;
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
 * Test class for the StampResource REST controller.
 *
 * @see StampResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SecurProdApp.class)
public class StampResourceIntTest {

    private static final Long DEFAULT_E_NUMBER = 1L;
    private static final Long UPDATED_E_NUMBER = 2L;

    @Autowired
    private StampRepository stampRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.StampSearchRepositoryMockConfiguration
     */
    @Autowired
    private StampSearchRepository mockStampSearchRepository;

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

    private MockMvc restStampMockMvc;

    private Stamp stamp;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StampResource stampResource = new StampResource(stampRepository, mockStampSearchRepository);
        this.restStampMockMvc = MockMvcBuilders.standaloneSetup(stampResource)
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
    public static Stamp createEntity(EntityManager em) {
        Stamp stamp = new Stamp()
            .eNumber(DEFAULT_E_NUMBER);
        return stamp;
    }

    @Before
    public void initTest() {
        stamp = createEntity(em);
    }

    @Test
    @Transactional
    public void createStamp() throws Exception {
        int databaseSizeBeforeCreate = stampRepository.findAll().size();

        // Create the Stamp
        restStampMockMvc.perform(post("/api/stamps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stamp)))
            .andExpect(status().isCreated());

        // Validate the Stamp in the database
        List<Stamp> stampList = stampRepository.findAll();
        assertThat(stampList).hasSize(databaseSizeBeforeCreate + 1);
        Stamp testStamp = stampList.get(stampList.size() - 1);
        assertThat(testStamp.geteNumber()).isEqualTo(DEFAULT_E_NUMBER);

        // Validate the Stamp in Elasticsearch
        verify(mockStampSearchRepository, times(1)).save(testStamp);
    }

    @Test
    @Transactional
    public void createStampWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stampRepository.findAll().size();

        // Create the Stamp with an existing ID
        stamp.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStampMockMvc.perform(post("/api/stamps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stamp)))
            .andExpect(status().isBadRequest());

        // Validate the Stamp in the database
        List<Stamp> stampList = stampRepository.findAll();
        assertThat(stampList).hasSize(databaseSizeBeforeCreate);

        // Validate the Stamp in Elasticsearch
        verify(mockStampSearchRepository, times(0)).save(stamp);
    }

    @Test
    @Transactional
    public void getAllStamps() throws Exception {
        // Initialize the database
        stampRepository.saveAndFlush(stamp);

        // Get all the stampList
        restStampMockMvc.perform(get("/api/stamps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stamp.getId().intValue())))
            .andExpect(jsonPath("$.[*].eNumber").value(hasItem(DEFAULT_E_NUMBER.intValue())));
    }
    
    @Test
    @Transactional
    public void getStamp() throws Exception {
        // Initialize the database
        stampRepository.saveAndFlush(stamp);

        // Get the stamp
        restStampMockMvc.perform(get("/api/stamps/{id}", stamp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stamp.getId().intValue()))
            .andExpect(jsonPath("$.eNumber").value(DEFAULT_E_NUMBER.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingStamp() throws Exception {
        // Get the stamp
        restStampMockMvc.perform(get("/api/stamps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStamp() throws Exception {
        // Initialize the database
        stampRepository.saveAndFlush(stamp);

        int databaseSizeBeforeUpdate = stampRepository.findAll().size();

        // Update the stamp
        Stamp updatedStamp = stampRepository.findById(stamp.getId()).get();
        // Disconnect from session so that the updates on updatedStamp are not directly saved in db
        em.detach(updatedStamp);
        updatedStamp
            .eNumber(UPDATED_E_NUMBER);

        restStampMockMvc.perform(put("/api/stamps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStamp)))
            .andExpect(status().isOk());

        // Validate the Stamp in the database
        List<Stamp> stampList = stampRepository.findAll();
        assertThat(stampList).hasSize(databaseSizeBeforeUpdate);
        Stamp testStamp = stampList.get(stampList.size() - 1);
        assertThat(testStamp.geteNumber()).isEqualTo(UPDATED_E_NUMBER);

        // Validate the Stamp in Elasticsearch
        verify(mockStampSearchRepository, times(1)).save(testStamp);
    }

    @Test
    @Transactional
    public void updateNonExistingStamp() throws Exception {
        int databaseSizeBeforeUpdate = stampRepository.findAll().size();

        // Create the Stamp

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStampMockMvc.perform(put("/api/stamps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stamp)))
            .andExpect(status().isBadRequest());

        // Validate the Stamp in the database
        List<Stamp> stampList = stampRepository.findAll();
        assertThat(stampList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Stamp in Elasticsearch
        verify(mockStampSearchRepository, times(0)).save(stamp);
    }

    @Test
    @Transactional
    public void deleteStamp() throws Exception {
        // Initialize the database
        stampRepository.saveAndFlush(stamp);

        int databaseSizeBeforeDelete = stampRepository.findAll().size();

        // Delete the stamp
        restStampMockMvc.perform(delete("/api/stamps/{id}", stamp.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Stamp> stampList = stampRepository.findAll();
        assertThat(stampList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Stamp in Elasticsearch
        verify(mockStampSearchRepository, times(1)).deleteById(stamp.getId());
    }

    @Test
    @Transactional
    public void searchStamp() throws Exception {
        // Initialize the database
        stampRepository.saveAndFlush(stamp);
        when(mockStampSearchRepository.search(queryStringQuery("id:" + stamp.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(stamp), PageRequest.of(0, 1), 1));
        // Search the stamp
        restStampMockMvc.perform(get("/api/_search/stamps?query=id:" + stamp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stamp.getId().intValue())))
            .andExpect(jsonPath("$.[*].eNumber").value(hasItem(DEFAULT_E_NUMBER.intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Stamp.class);
        Stamp stamp1 = new Stamp();
        stamp1.setId(1L);
        Stamp stamp2 = new Stamp();
        stamp2.setId(stamp1.getId());
        assertThat(stamp1).isEqualTo(stamp2);
        stamp2.setId(2L);
        assertThat(stamp1).isNotEqualTo(stamp2);
        stamp1.setId(null);
        assertThat(stamp1).isNotEqualTo(stamp2);
    }
}
