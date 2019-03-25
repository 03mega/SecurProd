package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.SecurProdApp;

import io.github.jhipster.application.domain.ProgramProduct;
import io.github.jhipster.application.repository.ProgramProductRepository;
import io.github.jhipster.application.repository.search.ProgramProductSearchRepository;
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
 * Test class for the ProgramProductResource REST controller.
 *
 * @see ProgramProductResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SecurProdApp.class)
public class ProgramProductResourceIntTest {

    @Autowired
    private ProgramProductRepository programProductRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.ProgramProductSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProgramProductSearchRepository mockProgramProductSearchRepository;

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

    private MockMvc restProgramProductMockMvc;

    private ProgramProduct programProduct;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProgramProductResource programProductResource = new ProgramProductResource(programProductRepository, mockProgramProductSearchRepository);
        this.restProgramProductMockMvc = MockMvcBuilders.standaloneSetup(programProductResource)
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
    public static ProgramProduct createEntity(EntityManager em) {
        ProgramProduct programProduct = new ProgramProduct();
        return programProduct;
    }

    @Before
    public void initTest() {
        programProduct = createEntity(em);
    }

    @Test
    @Transactional
    public void createProgramProduct() throws Exception {
        int databaseSizeBeforeCreate = programProductRepository.findAll().size();

        // Create the ProgramProduct
        restProgramProductMockMvc.perform(post("/api/program-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(programProduct)))
            .andExpect(status().isCreated());

        // Validate the ProgramProduct in the database
        List<ProgramProduct> programProductList = programProductRepository.findAll();
        assertThat(programProductList).hasSize(databaseSizeBeforeCreate + 1);
        ProgramProduct testProgramProduct = programProductList.get(programProductList.size() - 1);

        // Validate the ProgramProduct in Elasticsearch
        verify(mockProgramProductSearchRepository, times(1)).save(testProgramProduct);
    }

    @Test
    @Transactional
    public void createProgramProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = programProductRepository.findAll().size();

        // Create the ProgramProduct with an existing ID
        programProduct.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProgramProductMockMvc.perform(post("/api/program-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(programProduct)))
            .andExpect(status().isBadRequest());

        // Validate the ProgramProduct in the database
        List<ProgramProduct> programProductList = programProductRepository.findAll();
        assertThat(programProductList).hasSize(databaseSizeBeforeCreate);

        // Validate the ProgramProduct in Elasticsearch
        verify(mockProgramProductSearchRepository, times(0)).save(programProduct);
    }

    @Test
    @Transactional
    public void getAllProgramProducts() throws Exception {
        // Initialize the database
        programProductRepository.saveAndFlush(programProduct);

        // Get all the programProductList
        restProgramProductMockMvc.perform(get("/api/program-products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(programProduct.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getProgramProduct() throws Exception {
        // Initialize the database
        programProductRepository.saveAndFlush(programProduct);

        // Get the programProduct
        restProgramProductMockMvc.perform(get("/api/program-products/{id}", programProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(programProduct.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProgramProduct() throws Exception {
        // Get the programProduct
        restProgramProductMockMvc.perform(get("/api/program-products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProgramProduct() throws Exception {
        // Initialize the database
        programProductRepository.saveAndFlush(programProduct);

        int databaseSizeBeforeUpdate = programProductRepository.findAll().size();

        // Update the programProduct
        ProgramProduct updatedProgramProduct = programProductRepository.findById(programProduct.getId()).get();
        // Disconnect from session so that the updates on updatedProgramProduct are not directly saved in db
        em.detach(updatedProgramProduct);

        restProgramProductMockMvc.perform(put("/api/program-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProgramProduct)))
            .andExpect(status().isOk());

        // Validate the ProgramProduct in the database
        List<ProgramProduct> programProductList = programProductRepository.findAll();
        assertThat(programProductList).hasSize(databaseSizeBeforeUpdate);
        ProgramProduct testProgramProduct = programProductList.get(programProductList.size() - 1);

        // Validate the ProgramProduct in Elasticsearch
        verify(mockProgramProductSearchRepository, times(1)).save(testProgramProduct);
    }

    @Test
    @Transactional
    public void updateNonExistingProgramProduct() throws Exception {
        int databaseSizeBeforeUpdate = programProductRepository.findAll().size();

        // Create the ProgramProduct

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProgramProductMockMvc.perform(put("/api/program-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(programProduct)))
            .andExpect(status().isBadRequest());

        // Validate the ProgramProduct in the database
        List<ProgramProduct> programProductList = programProductRepository.findAll();
        assertThat(programProductList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ProgramProduct in Elasticsearch
        verify(mockProgramProductSearchRepository, times(0)).save(programProduct);
    }

    @Test
    @Transactional
    public void deleteProgramProduct() throws Exception {
        // Initialize the database
        programProductRepository.saveAndFlush(programProduct);

        int databaseSizeBeforeDelete = programProductRepository.findAll().size();

        // Delete the programProduct
        restProgramProductMockMvc.perform(delete("/api/program-products/{id}", programProduct.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProgramProduct> programProductList = programProductRepository.findAll();
        assertThat(programProductList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ProgramProduct in Elasticsearch
        verify(mockProgramProductSearchRepository, times(1)).deleteById(programProduct.getId());
    }

    @Test
    @Transactional
    public void searchProgramProduct() throws Exception {
        // Initialize the database
        programProductRepository.saveAndFlush(programProduct);
        when(mockProgramProductSearchRepository.search(queryStringQuery("id:" + programProduct.getId())))
            .thenReturn(Collections.singletonList(programProduct));
        // Search the programProduct
        restProgramProductMockMvc.perform(get("/api/_search/program-products?query=id:" + programProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(programProduct.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProgramProduct.class);
        ProgramProduct programProduct1 = new ProgramProduct();
        programProduct1.setId(1L);
        ProgramProduct programProduct2 = new ProgramProduct();
        programProduct2.setId(programProduct1.getId());
        assertThat(programProduct1).isEqualTo(programProduct2);
        programProduct2.setId(2L);
        assertThat(programProduct1).isNotEqualTo(programProduct2);
        programProduct1.setId(null);
        assertThat(programProduct1).isNotEqualTo(programProduct2);
    }
}
