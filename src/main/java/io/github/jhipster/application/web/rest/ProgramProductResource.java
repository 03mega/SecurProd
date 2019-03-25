package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.ProgramProduct;
import io.github.jhipster.application.repository.ProgramProductRepository;
import io.github.jhipster.application.repository.search.ProgramProductSearchRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing ProgramProduct.
 */
@RestController
@RequestMapping("/api")
public class ProgramProductResource {

    private final Logger log = LoggerFactory.getLogger(ProgramProductResource.class);

    private static final String ENTITY_NAME = "programProduct";

    private final ProgramProductRepository programProductRepository;

    private final ProgramProductSearchRepository programProductSearchRepository;

    public ProgramProductResource(ProgramProductRepository programProductRepository, ProgramProductSearchRepository programProductSearchRepository) {
        this.programProductRepository = programProductRepository;
        this.programProductSearchRepository = programProductSearchRepository;
    }

    /**
     * POST  /program-products : Create a new programProduct.
     *
     * @param programProduct the programProduct to create
     * @return the ResponseEntity with status 201 (Created) and with body the new programProduct, or with status 400 (Bad Request) if the programProduct has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/program-products")
    public ResponseEntity<ProgramProduct> createProgramProduct(@RequestBody ProgramProduct programProduct) throws URISyntaxException {
        log.debug("REST request to save ProgramProduct : {}", programProduct);
        if (programProduct.getId() != null) {
            throw new BadRequestAlertException("A new programProduct cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProgramProduct result = programProductRepository.save(programProduct);
        programProductSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/program-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /program-products : Updates an existing programProduct.
     *
     * @param programProduct the programProduct to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated programProduct,
     * or with status 400 (Bad Request) if the programProduct is not valid,
     * or with status 500 (Internal Server Error) if the programProduct couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/program-products")
    public ResponseEntity<ProgramProduct> updateProgramProduct(@RequestBody ProgramProduct programProduct) throws URISyntaxException {
        log.debug("REST request to update ProgramProduct : {}", programProduct);
        if (programProduct.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProgramProduct result = programProductRepository.save(programProduct);
        programProductSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, programProduct.getId().toString()))
            .body(result);
    }

    /**
     * GET  /program-products : get all the programProducts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of programProducts in body
     */
    @GetMapping("/program-products")
    public List<ProgramProduct> getAllProgramProducts() {
        log.debug("REST request to get all ProgramProducts");
        return programProductRepository.findAll();
    }

    /**
     * GET  /program-products/:id : get the "id" programProduct.
     *
     * @param id the id of the programProduct to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the programProduct, or with status 404 (Not Found)
     */
    @GetMapping("/program-products/{id}")
    public ResponseEntity<ProgramProduct> getProgramProduct(@PathVariable Long id) {
        log.debug("REST request to get ProgramProduct : {}", id);
        Optional<ProgramProduct> programProduct = programProductRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(programProduct);
    }

    /**
     * DELETE  /program-products/:id : delete the "id" programProduct.
     *
     * @param id the id of the programProduct to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/program-products/{id}")
    public ResponseEntity<Void> deleteProgramProduct(@PathVariable Long id) {
        log.debug("REST request to delete ProgramProduct : {}", id);
        programProductRepository.deleteById(id);
        programProductSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/program-products?query=:query : search for the programProduct corresponding
     * to the query.
     *
     * @param query the query of the programProduct search
     * @return the result of the search
     */
    @GetMapping("/_search/program-products")
    public List<ProgramProduct> searchProgramProducts(@RequestParam String query) {
        log.debug("REST request to search ProgramProducts for query {}", query);
        return StreamSupport
            .stream(programProductSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
