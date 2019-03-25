package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.SecurProdApp;

import io.github.jhipster.application.domain.ParcelControl;
import io.github.jhipster.application.repository.ParcelControlRepository;
import io.github.jhipster.application.repository.search.ParcelControlSearchRepository;
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
 * Test class for the ParcelControlResource REST controller.
 *
 * @see ParcelControlResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SecurProdApp.class)
public class ParcelControlResourceIntTest {

    @Autowired
    private ParcelControlRepository parcelControlRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.ParcelControlSearchRepositoryMockConfiguration
     */
    @Autowired
    private ParcelControlSearchRepository mockParcelControlSearchRepository;

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

    private MockMvc restParcelControlMockMvc;

    private ParcelControl parcelControl;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParcelControlResource parcelControlResource = new ParcelControlResource(parcelControlRepository, mockParcelControlSearchRepository);
        this.restParcelControlMockMvc = MockMvcBuilders.standaloneSetup(parcelControlResource)
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
    public static ParcelControl createEntity(EntityManager em) {
        ParcelControl parcelControl = new ParcelControl();
        return parcelControl;
    }

    @Before
    public void initTest() {
        parcelControl = createEntity(em);
    }

    @Test
    @Transactional
    public void createParcelControl() throws Exception {
        int databaseSizeBeforeCreate = parcelControlRepository.findAll().size();

        // Create the ParcelControl
        restParcelControlMockMvc.perform(post("/api/parcel-controls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcelControl)))
            .andExpect(status().isCreated());

        // Validate the ParcelControl in the database
        List<ParcelControl> parcelControlList = parcelControlRepository.findAll();
        assertThat(parcelControlList).hasSize(databaseSizeBeforeCreate + 1);
        ParcelControl testParcelControl = parcelControlList.get(parcelControlList.size() - 1);

        // Validate the ParcelControl in Elasticsearch
        verify(mockParcelControlSearchRepository, times(1)).save(testParcelControl);
    }

    @Test
    @Transactional
    public void createParcelControlWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parcelControlRepository.findAll().size();

        // Create the ParcelControl with an existing ID
        parcelControl.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParcelControlMockMvc.perform(post("/api/parcel-controls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcelControl)))
            .andExpect(status().isBadRequest());

        // Validate the ParcelControl in the database
        List<ParcelControl> parcelControlList = parcelControlRepository.findAll();
        assertThat(parcelControlList).hasSize(databaseSizeBeforeCreate);

        // Validate the ParcelControl in Elasticsearch
        verify(mockParcelControlSearchRepository, times(0)).save(parcelControl);
    }

    @Test
    @Transactional
    public void getAllParcelControls() throws Exception {
        // Initialize the database
        parcelControlRepository.saveAndFlush(parcelControl);

        // Get all the parcelControlList
        restParcelControlMockMvc.perform(get("/api/parcel-controls?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parcelControl.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getParcelControl() throws Exception {
        // Initialize the database
        parcelControlRepository.saveAndFlush(parcelControl);

        // Get the parcelControl
        restParcelControlMockMvc.perform(get("/api/parcel-controls/{id}", parcelControl.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parcelControl.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingParcelControl() throws Exception {
        // Get the parcelControl
        restParcelControlMockMvc.perform(get("/api/parcel-controls/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParcelControl() throws Exception {
        // Initialize the database
        parcelControlRepository.saveAndFlush(parcelControl);

        int databaseSizeBeforeUpdate = parcelControlRepository.findAll().size();

        // Update the parcelControl
        ParcelControl updatedParcelControl = parcelControlRepository.findById(parcelControl.getId()).get();
        // Disconnect from session so that the updates on updatedParcelControl are not directly saved in db
        em.detach(updatedParcelControl);

        restParcelControlMockMvc.perform(put("/api/parcel-controls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParcelControl)))
            .andExpect(status().isOk());

        // Validate the ParcelControl in the database
        List<ParcelControl> parcelControlList = parcelControlRepository.findAll();
        assertThat(parcelControlList).hasSize(databaseSizeBeforeUpdate);
        ParcelControl testParcelControl = parcelControlList.get(parcelControlList.size() - 1);

        // Validate the ParcelControl in Elasticsearch
        verify(mockParcelControlSearchRepository, times(1)).save(testParcelControl);
    }

    @Test
    @Transactional
    public void updateNonExistingParcelControl() throws Exception {
        int databaseSizeBeforeUpdate = parcelControlRepository.findAll().size();

        // Create the ParcelControl

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParcelControlMockMvc.perform(put("/api/parcel-controls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcelControl)))
            .andExpect(status().isBadRequest());

        // Validate the ParcelControl in the database
        List<ParcelControl> parcelControlList = parcelControlRepository.findAll();
        assertThat(parcelControlList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ParcelControl in Elasticsearch
        verify(mockParcelControlSearchRepository, times(0)).save(parcelControl);
    }

    @Test
    @Transactional
    public void deleteParcelControl() throws Exception {
        // Initialize the database
        parcelControlRepository.saveAndFlush(parcelControl);

        int databaseSizeBeforeDelete = parcelControlRepository.findAll().size();

        // Delete the parcelControl
        restParcelControlMockMvc.perform(delete("/api/parcel-controls/{id}", parcelControl.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ParcelControl> parcelControlList = parcelControlRepository.findAll();
        assertThat(parcelControlList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ParcelControl in Elasticsearch
        verify(mockParcelControlSearchRepository, times(1)).deleteById(parcelControl.getId());
    }

    @Test
    @Transactional
    public void searchParcelControl() throws Exception {
        // Initialize the database
        parcelControlRepository.saveAndFlush(parcelControl);
        when(mockParcelControlSearchRepository.search(queryStringQuery("id:" + parcelControl.getId())))
            .thenReturn(Collections.singletonList(parcelControl));
        // Search the parcelControl
        restParcelControlMockMvc.perform(get("/api/_search/parcel-controls?query=id:" + parcelControl.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parcelControl.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParcelControl.class);
        ParcelControl parcelControl1 = new ParcelControl();
        parcelControl1.setId(1L);
        ParcelControl parcelControl2 = new ParcelControl();
        parcelControl2.setId(parcelControl1.getId());
        assertThat(parcelControl1).isEqualTo(parcelControl2);
        parcelControl2.setId(2L);
        assertThat(parcelControl1).isNotEqualTo(parcelControl2);
        parcelControl1.setId(null);
        assertThat(parcelControl1).isNotEqualTo(parcelControl2);
    }
}
