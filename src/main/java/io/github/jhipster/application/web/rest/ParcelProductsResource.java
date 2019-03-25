package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.ParcelProducts;
import io.github.jhipster.application.repository.ParcelProductsRepository;
import io.github.jhipster.application.repository.search.ParcelProductsSearchRepository;
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
 * REST controller for managing ParcelProducts.
 */
@RestController
@RequestMapping("/api")
public class ParcelProductsResource {

    private final Logger log = LoggerFactory.getLogger(ParcelProductsResource.class);

    private static final String ENTITY_NAME = "parcelProducts";

    private final ParcelProductsRepository parcelProductsRepository;

    private final ParcelProductsSearchRepository parcelProductsSearchRepository;

    public ParcelProductsResource(ParcelProductsRepository parcelProductsRepository, ParcelProductsSearchRepository parcelProductsSearchRepository) {
        this.parcelProductsRepository = parcelProductsRepository;
        this.parcelProductsSearchRepository = parcelProductsSearchRepository;
    }

    /**
     * POST  /parcel-products : Create a new parcelProducts.
     *
     * @param parcelProducts the parcelProducts to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parcelProducts, or with status 400 (Bad Request) if the parcelProducts has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/parcel-products")
    public ResponseEntity<ParcelProducts> createParcelProducts(@RequestBody ParcelProducts parcelProducts) throws URISyntaxException {
        log.debug("REST request to save ParcelProducts : {}", parcelProducts);
        if (parcelProducts.getId() != null) {
            throw new BadRequestAlertException("A new parcelProducts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParcelProducts result = parcelProductsRepository.save(parcelProducts);
        parcelProductsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/parcel-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /parcel-products : Updates an existing parcelProducts.
     *
     * @param parcelProducts the parcelProducts to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parcelProducts,
     * or with status 400 (Bad Request) if the parcelProducts is not valid,
     * or with status 500 (Internal Server Error) if the parcelProducts couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/parcel-products")
    public ResponseEntity<ParcelProducts> updateParcelProducts(@RequestBody ParcelProducts parcelProducts) throws URISyntaxException {
        log.debug("REST request to update ParcelProducts : {}", parcelProducts);
        if (parcelProducts.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ParcelProducts result = parcelProductsRepository.save(parcelProducts);
        parcelProductsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parcelProducts.getId().toString()))
            .body(result);
    }

    /**
     * GET  /parcel-products : get all the parcelProducts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of parcelProducts in body
     */
    @GetMapping("/parcel-products")
    public List<ParcelProducts> getAllParcelProducts() {
        log.debug("REST request to get all ParcelProducts");
        return parcelProductsRepository.findAll();
    }

    /**
     * GET  /parcel-products/:id : get the "id" parcelProducts.
     *
     * @param id the id of the parcelProducts to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the parcelProducts, or with status 404 (Not Found)
     */
    @GetMapping("/parcel-products/{id}")
    public ResponseEntity<ParcelProducts> getParcelProducts(@PathVariable Long id) {
        log.debug("REST request to get ParcelProducts : {}", id);
        Optional<ParcelProducts> parcelProducts = parcelProductsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(parcelProducts);
    }

    /**
     * DELETE  /parcel-products/:id : delete the "id" parcelProducts.
     *
     * @param id the id of the parcelProducts to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/parcel-products/{id}")
    public ResponseEntity<Void> deleteParcelProducts(@PathVariable Long id) {
        log.debug("REST request to delete ParcelProducts : {}", id);
        parcelProductsRepository.deleteById(id);
        parcelProductsSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/parcel-products?query=:query : search for the parcelProducts corresponding
     * to the query.
     *
     * @param query the query of the parcelProducts search
     * @return the result of the search
     */
    @GetMapping("/_search/parcel-products")
    public List<ParcelProducts> searchParcelProducts(@RequestParam String query) {
        log.debug("REST request to search ParcelProducts for query {}", query);
        return StreamSupport
            .stream(parcelProductsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
