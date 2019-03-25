package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.SecurProdApp;

import io.github.jhipster.application.domain.StampCancelled;
import io.github.jhipster.application.repository.StampCancelledRepository;
import io.github.jhipster.application.repository.search.StampCancelledSearchRepository;
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
 * Test class for the StampCancelledResource REST controller.
 *
 * @see StampCancelledResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SecurProdApp.class)
public class StampCancelledResourceIntTest {

    private static final String DEFAULT_REASON = "AAAAAAAAAA";
    private static final String UPDATED_REASON = "BBBBBBBBBB";

    private static final String DEFAULT_IMPUTATION = "AAAAAAAAAA";
    private static final String UPDATED_IMPUTATION = "BBBBBBBBBB";

    @Autowired
    private StampCancelledRepository stampCancelledRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.StampCancelledSearchRepositoryMockConfiguration
     */
    @Autowired
    private StampCancelledSearchRepository mockStampCancelledSearchRepository;

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

    private MockMvc restStampCancelledMockMvc;

    private StampCancelled stampCancelled;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StampCancelledResource stampCancelledResource = new StampCancelledResource(stampCancelledRepository, mockStampCancelledSearchRepository);
        this.restStampCancelledMockMvc = MockMvcBuilders.standaloneSetup(stampCancelledResource)
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
    public static StampCancelled createEntity(EntityManager em) {
        StampCancelled stampCancelled = new StampCancelled()
            .reason(DEFAULT_REASON)
            .imputation(DEFAULT_IMPUTATION);
        return stampCancelled;
    }

    @Before
    public void initTest() {
        stampCancelled = createEntity(em);
    }

    @Test
    @Transactional
    public void createStampCancelled() throws Exception {
        int databaseSizeBeforeCreate = stampCancelledRepository.findAll().size();

        // Create the StampCancelled
        restStampCancelledMockMvc.perform(post("/api/stamp-cancelleds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stampCancelled)))
            .andExpect(status().isCreated());

        // Validate the StampCancelled in the database
        List<StampCancelled> stampCancelledList = stampCancelledRepository.findAll();
        assertThat(stampCancelledList).hasSize(databaseSizeBeforeCreate + 1);
        StampCancelled testStampCancelled = stampCancelledList.get(stampCancelledList.size() - 1);
        assertThat(testStampCancelled.getReason()).isEqualTo(DEFAULT_REASON);
        assertThat(testStampCancelled.getImputation()).isEqualTo(DEFAULT_IMPUTATION);

        // Validate the StampCancelled in Elasticsearch
        verify(mockStampCancelledSearchRepository, times(1)).save(testStampCancelled);
    }

    @Test
    @Transactional
    public void createStampCancelledWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stampCancelledRepository.findAll().size();

        // Create the StampCancelled with an existing ID
        stampCancelled.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStampCancelledMockMvc.perform(post("/api/stamp-cancelleds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stampCancelled)))
            .andExpect(status().isBadRequest());

        // Validate the StampCancelled in the database
        List<StampCancelled> stampCancelledList = stampCancelledRepository.findAll();
        assertThat(stampCancelledList).hasSize(databaseSizeBeforeCreate);

        // Validate the StampCancelled in Elasticsearch
        verify(mockStampCancelledSearchRepository, times(0)).save(stampCancelled);
    }

    @Test
    @Transactional
    public void getAllStampCancelleds() throws Exception {
        // Initialize the database
        stampCancelledRepository.saveAndFlush(stampCancelled);

        // Get all the stampCancelledList
        restStampCancelledMockMvc.perform(get("/api/stamp-cancelleds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stampCancelled.getId().intValue())))
            .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON.toString())))
            .andExpect(jsonPath("$.[*].imputation").value(hasItem(DEFAULT_IMPUTATION.toString())));
    }
    
    @Test
    @Transactional
    public void getStampCancelled() throws Exception {
        // Initialize the database
        stampCancelledRepository.saveAndFlush(stampCancelled);

        // Get the stampCancelled
        restStampCancelledMockMvc.perform(get("/api/stamp-cancelleds/{id}", stampCancelled.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stampCancelled.getId().intValue()))
            .andExpect(jsonPath("$.reason").value(DEFAULT_REASON.toString()))
            .andExpect(jsonPath("$.imputation").value(DEFAULT_IMPUTATION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStampCancelled() throws Exception {
        // Get the stampCancelled
        restStampCancelledMockMvc.perform(get("/api/stamp-cancelleds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStampCancelled() throws Exception {
        // Initialize the database
        stampCancelledRepository.saveAndFlush(stampCancelled);

        int databaseSizeBeforeUpdate = stampCancelledRepository.findAll().size();

        // Update the stampCancelled
        StampCancelled updatedStampCancelled = stampCancelledRepository.findById(stampCancelled.getId()).get();
        // Disconnect from session so that the updates on updatedStampCancelled are not directly saved in db
        em.detach(updatedStampCancelled);
        updatedStampCancelled
            .reason(UPDATED_REASON)
            .imputation(UPDATED_IMPUTATION);

        restStampCancelledMockMvc.perform(put("/api/stamp-cancelleds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStampCancelled)))
            .andExpect(status().isOk());

        // Validate the StampCancelled in the database
        List<StampCancelled> stampCancelledList = stampCancelledRepository.findAll();
        assertThat(stampCancelledList).hasSize(databaseSizeBeforeUpdate);
        StampCancelled testStampCancelled = stampCancelledList.get(stampCancelledList.size() - 1);
        assertThat(testStampCancelled.getReason()).isEqualTo(UPDATED_REASON);
        assertThat(testStampCancelled.getImputation()).isEqualTo(UPDATED_IMPUTATION);

        // Validate the StampCancelled in Elasticsearch
        verify(mockStampCancelledSearchRepository, times(1)).save(testStampCancelled);
    }

    @Test
    @Transactional
    public void updateNonExistingStampCancelled() throws Exception {
        int databaseSizeBeforeUpdate = stampCancelledRepository.findAll().size();

        // Create the StampCancelled

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStampCancelledMockMvc.perform(put("/api/stamp-cancelleds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stampCancelled)))
            .andExpect(status().isBadRequest());

        // Validate the StampCancelled in the database
        List<StampCancelled> stampCancelledList = stampCancelledRepository.findAll();
        assertThat(stampCancelledList).hasSize(databaseSizeBeforeUpdate);

        // Validate the StampCancelled in Elasticsearch
        verify(mockStampCancelledSearchRepository, times(0)).save(stampCancelled);
    }

    @Test
    @Transactional
    public void deleteStampCancelled() throws Exception {
        // Initialize the database
        stampCancelledRepository.saveAndFlush(stampCancelled);

        int databaseSizeBeforeDelete = stampCancelledRepository.findAll().size();

        // Delete the stampCancelled
        restStampCancelledMockMvc.perform(delete("/api/stamp-cancelleds/{id}", stampCancelled.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<StampCancelled> stampCancelledList = stampCancelledRepository.findAll();
        assertThat(stampCancelledList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the StampCancelled in Elasticsearch
        verify(mockStampCancelledSearchRepository, times(1)).deleteById(stampCancelled.getId());
    }

    @Test
    @Transactional
    public void searchStampCancelled() throws Exception {
        // Initialize the database
        stampCancelledRepository.saveAndFlush(stampCancelled);
        when(mockStampCancelledSearchRepository.search(queryStringQuery("id:" + stampCancelled.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(stampCancelled), PageRequest.of(0, 1), 1));
        // Search the stampCancelled
        restStampCancelledMockMvc.perform(get("/api/_search/stamp-cancelleds?query=id:" + stampCancelled.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stampCancelled.getId().intValue())))
            .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON)))
            .andExpect(jsonPath("$.[*].imputation").value(hasItem(DEFAULT_IMPUTATION)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StampCancelled.class);
        StampCancelled stampCancelled1 = new StampCancelled();
        stampCancelled1.setId(1L);
        StampCancelled stampCancelled2 = new StampCancelled();
        stampCancelled2.setId(stampCancelled1.getId());
        assertThat(stampCancelled1).isEqualTo(stampCancelled2);
        stampCancelled2.setId(2L);
        assertThat(stampCancelled1).isNotEqualTo(stampCancelled2);
        stampCancelled1.setId(null);
        assertThat(stampCancelled1).isNotEqualTo(stampCancelled2);
    }
}
