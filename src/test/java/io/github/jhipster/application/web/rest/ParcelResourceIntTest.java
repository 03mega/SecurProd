package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.SecurProdApp;

import io.github.jhipster.application.domain.Parcel;
import io.github.jhipster.application.repository.ParcelRepository;
import io.github.jhipster.application.repository.search.ParcelSearchRepository;
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
 * Test class for the ParcelResource REST controller.
 *
 * @see ParcelResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SecurProdApp.class)
public class ParcelResourceIntTest {

    private static final String DEFAULT_BARRE_CODE = "AAAAAAAAAA";
    private static final String UPDATED_BARRE_CODE = "BBBBBBBBBB";

    private static final Long DEFAULT_PAGE_NUMBER = 1L;
    private static final Long UPDATED_PAGE_NUMBER = 2L;

    private static final LocalDate DEFAULT_DATE_CREATED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_CREATED = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_CHANGED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_CHANGED = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ParcelRepository parcelRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.ParcelSearchRepositoryMockConfiguration
     */
    @Autowired
    private ParcelSearchRepository mockParcelSearchRepository;

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

    private MockMvc restParcelMockMvc;

    private Parcel parcel;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParcelResource parcelResource = new ParcelResource(parcelRepository, mockParcelSearchRepository);
        this.restParcelMockMvc = MockMvcBuilders.standaloneSetup(parcelResource)
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
    public static Parcel createEntity(EntityManager em) {
        Parcel parcel = new Parcel()
            .barreCode(DEFAULT_BARRE_CODE)
            .pageNumber(DEFAULT_PAGE_NUMBER)
            .dateCreated(DEFAULT_DATE_CREATED)
            .dateChanged(DEFAULT_DATE_CHANGED);
        return parcel;
    }

    @Before
    public void initTest() {
        parcel = createEntity(em);
    }

    @Test
    @Transactional
    public void createParcel() throws Exception {
        int databaseSizeBeforeCreate = parcelRepository.findAll().size();

        // Create the Parcel
        restParcelMockMvc.perform(post("/api/parcels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isCreated());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeCreate + 1);
        Parcel testParcel = parcelList.get(parcelList.size() - 1);
        assertThat(testParcel.getBarreCode()).isEqualTo(DEFAULT_BARRE_CODE);
        assertThat(testParcel.getPageNumber()).isEqualTo(DEFAULT_PAGE_NUMBER);
        assertThat(testParcel.getDateCreated()).isEqualTo(DEFAULT_DATE_CREATED);
        assertThat(testParcel.getDateChanged()).isEqualTo(DEFAULT_DATE_CHANGED);

        // Validate the Parcel in Elasticsearch
        verify(mockParcelSearchRepository, times(1)).save(testParcel);
    }

    @Test
    @Transactional
    public void createParcelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parcelRepository.findAll().size();

        // Create the Parcel with an existing ID
        parcel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParcelMockMvc.perform(post("/api/parcels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeCreate);

        // Validate the Parcel in Elasticsearch
        verify(mockParcelSearchRepository, times(0)).save(parcel);
    }

    @Test
    @Transactional
    public void getAllParcels() throws Exception {
        // Initialize the database
        parcelRepository.saveAndFlush(parcel);

        // Get all the parcelList
        restParcelMockMvc.perform(get("/api/parcels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parcel.getId().intValue())))
            .andExpect(jsonPath("$.[*].barreCode").value(hasItem(DEFAULT_BARRE_CODE.toString())))
            .andExpect(jsonPath("$.[*].pageNumber").value(hasItem(DEFAULT_PAGE_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].dateCreated").value(hasItem(DEFAULT_DATE_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dateChanged").value(hasItem(DEFAULT_DATE_CHANGED.toString())));
    }
    
    @Test
    @Transactional
    public void getParcel() throws Exception {
        // Initialize the database
        parcelRepository.saveAndFlush(parcel);

        // Get the parcel
        restParcelMockMvc.perform(get("/api/parcels/{id}", parcel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parcel.getId().intValue()))
            .andExpect(jsonPath("$.barreCode").value(DEFAULT_BARRE_CODE.toString()))
            .andExpect(jsonPath("$.pageNumber").value(DEFAULT_PAGE_NUMBER.intValue()))
            .andExpect(jsonPath("$.dateCreated").value(DEFAULT_DATE_CREATED.toString()))
            .andExpect(jsonPath("$.dateChanged").value(DEFAULT_DATE_CHANGED.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingParcel() throws Exception {
        // Get the parcel
        restParcelMockMvc.perform(get("/api/parcels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParcel() throws Exception {
        // Initialize the database
        parcelRepository.saveAndFlush(parcel);

        int databaseSizeBeforeUpdate = parcelRepository.findAll().size();

        // Update the parcel
        Parcel updatedParcel = parcelRepository.findById(parcel.getId()).get();
        // Disconnect from session so that the updates on updatedParcel are not directly saved in db
        em.detach(updatedParcel);
        updatedParcel
            .barreCode(UPDATED_BARRE_CODE)
            .pageNumber(UPDATED_PAGE_NUMBER)
            .dateCreated(UPDATED_DATE_CREATED)
            .dateChanged(UPDATED_DATE_CHANGED);

        restParcelMockMvc.perform(put("/api/parcels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParcel)))
            .andExpect(status().isOk());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeUpdate);
        Parcel testParcel = parcelList.get(parcelList.size() - 1);
        assertThat(testParcel.getBarreCode()).isEqualTo(UPDATED_BARRE_CODE);
        assertThat(testParcel.getPageNumber()).isEqualTo(UPDATED_PAGE_NUMBER);
        assertThat(testParcel.getDateCreated()).isEqualTo(UPDATED_DATE_CREATED);
        assertThat(testParcel.getDateChanged()).isEqualTo(UPDATED_DATE_CHANGED);

        // Validate the Parcel in Elasticsearch
        verify(mockParcelSearchRepository, times(1)).save(testParcel);
    }

    @Test
    @Transactional
    public void updateNonExistingParcel() throws Exception {
        int databaseSizeBeforeUpdate = parcelRepository.findAll().size();

        // Create the Parcel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParcelMockMvc.perform(put("/api/parcels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Parcel in Elasticsearch
        verify(mockParcelSearchRepository, times(0)).save(parcel);
    }

    @Test
    @Transactional
    public void deleteParcel() throws Exception {
        // Initialize the database
        parcelRepository.saveAndFlush(parcel);

        int databaseSizeBeforeDelete = parcelRepository.findAll().size();

        // Delete the parcel
        restParcelMockMvc.perform(delete("/api/parcels/{id}", parcel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Parcel in Elasticsearch
        verify(mockParcelSearchRepository, times(1)).deleteById(parcel.getId());
    }

    @Test
    @Transactional
    public void searchParcel() throws Exception {
        // Initialize the database
        parcelRepository.saveAndFlush(parcel);
        when(mockParcelSearchRepository.search(queryStringQuery("id:" + parcel.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(parcel), PageRequest.of(0, 1), 1));
        // Search the parcel
        restParcelMockMvc.perform(get("/api/_search/parcels?query=id:" + parcel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parcel.getId().intValue())))
            .andExpect(jsonPath("$.[*].barreCode").value(hasItem(DEFAULT_BARRE_CODE)))
            .andExpect(jsonPath("$.[*].pageNumber").value(hasItem(DEFAULT_PAGE_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].dateCreated").value(hasItem(DEFAULT_DATE_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dateChanged").value(hasItem(DEFAULT_DATE_CHANGED.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Parcel.class);
        Parcel parcel1 = new Parcel();
        parcel1.setId(1L);
        Parcel parcel2 = new Parcel();
        parcel2.setId(parcel1.getId());
        assertThat(parcel1).isEqualTo(parcel2);
        parcel2.setId(2L);
        assertThat(parcel1).isNotEqualTo(parcel2);
        parcel1.setId(null);
        assertThat(parcel1).isNotEqualTo(parcel2);
    }
}
