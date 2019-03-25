package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.ProductDelivery;
import io.github.jhipster.application.repository.ProductDeliveryRepository;
import io.github.jhipster.application.repository.search.ProductDeliverySearchRepository;
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
 * REST controller for managing ProductDelivery.
 */
@RestController
@RequestMapping("/api")
public class ProductDeliveryResource {

    private final Logger log = LoggerFactory.getLogger(ProductDeliveryResource.class);

    private static final String ENTITY_NAME = "productDelivery";

    private final ProductDeliveryRepository productDeliveryRepository;

    private final ProductDeliverySearchRepository productDeliverySearchRepository;

    public ProductDeliveryResource(ProductDeliveryRepository productDeliveryRepository, ProductDeliverySearchRepository productDeliverySearchRepository) {
        this.productDeliveryRepository = productDeliveryRepository;
        this.productDeliverySearchRepository = productDeliverySearchRepository;
    }

    /**
     * POST  /product-deliveries : Create a new productDelivery.
     *
     * @param productDelivery the productDelivery to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productDelivery, or with status 400 (Bad Request) if the productDelivery has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-deliveries")
    public ResponseEntity<ProductDelivery> createProductDelivery(@RequestBody ProductDelivery productDelivery) throws URISyntaxException {
        log.debug("REST request to save ProductDelivery : {}", productDelivery);
        if (productDelivery.getId() != null) {
            throw new BadRequestAlertException("A new productDelivery cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductDelivery result = productDeliveryRepository.save(productDelivery);
        productDeliverySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/product-deliveries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-deliveries : Updates an existing productDelivery.
     *
     * @param productDelivery the productDelivery to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productDelivery,
     * or with status 400 (Bad Request) if the productDelivery is not valid,
     * or with status 500 (Internal Server Error) if the productDelivery couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-deliveries")
    public ResponseEntity<ProductDelivery> updateProductDelivery(@RequestBody ProductDelivery productDelivery) throws URISyntaxException {
        log.debug("REST request to update ProductDelivery : {}", productDelivery);
        if (productDelivery.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductDelivery result = productDeliveryRepository.save(productDelivery);
        productDeliverySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productDelivery.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-deliveries : get all the productDeliveries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productDeliveries in body
     */
    @GetMapping("/product-deliveries")
    public List<ProductDelivery> getAllProductDeliveries() {
        log.debug("REST request to get all ProductDeliveries");
        return productDeliveryRepository.findAll();
    }

    /**
     * GET  /product-deliveries/:id : get the "id" productDelivery.
     *
     * @param id the id of the productDelivery to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productDelivery, or with status 404 (Not Found)
     */
    @GetMapping("/product-deliveries/{id}")
    public ResponseEntity<ProductDelivery> getProductDelivery(@PathVariable Long id) {
        log.debug("REST request to get ProductDelivery : {}", id);
        Optional<ProductDelivery> productDelivery = productDeliveryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productDelivery);
    }

    /**
     * DELETE  /product-deliveries/:id : delete the "id" productDelivery.
     *
     * @param id the id of the productDelivery to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-deliveries/{id}")
    public ResponseEntity<Void> deleteProductDelivery(@PathVariable Long id) {
        log.debug("REST request to delete ProductDelivery : {}", id);
        productDeliveryRepository.deleteById(id);
        productDeliverySearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/product-deliveries?query=:query : search for the productDelivery corresponding
     * to the query.
     *
     * @param query the query of the productDelivery search
     * @return the result of the search
     */
    @GetMapping("/_search/product-deliveries")
    public List<ProductDelivery> searchProductDeliveries(@RequestParam String query) {
        log.debug("REST request to search ProductDeliveries for query {}", query);
        return StreamSupport
            .stream(productDeliverySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
