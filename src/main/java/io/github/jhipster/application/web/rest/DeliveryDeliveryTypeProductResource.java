package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.DeliveryDeliveryTypeProduct;
import io.github.jhipster.application.repository.DeliveryDeliveryTypeProductRepository;
import io.github.jhipster.application.repository.search.DeliveryDeliveryTypeProductSearchRepository;
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
 * REST controller for managing DeliveryDeliveryTypeProduct.
 */
@RestController
@RequestMapping("/api")
public class DeliveryDeliveryTypeProductResource {

    private final Logger log = LoggerFactory.getLogger(DeliveryDeliveryTypeProductResource.class);

    private static final String ENTITY_NAME = "deliveryDeliveryTypeProduct";

    private final DeliveryDeliveryTypeProductRepository deliveryDeliveryTypeProductRepository;

    private final DeliveryDeliveryTypeProductSearchRepository deliveryDeliveryTypeProductSearchRepository;

    public DeliveryDeliveryTypeProductResource(DeliveryDeliveryTypeProductRepository deliveryDeliveryTypeProductRepository, DeliveryDeliveryTypeProductSearchRepository deliveryDeliveryTypeProductSearchRepository) {
        this.deliveryDeliveryTypeProductRepository = deliveryDeliveryTypeProductRepository;
        this.deliveryDeliveryTypeProductSearchRepository = deliveryDeliveryTypeProductSearchRepository;
    }

    /**
     * POST  /delivery-delivery-type-products : Create a new deliveryDeliveryTypeProduct.
     *
     * @param deliveryDeliveryTypeProduct the deliveryDeliveryTypeProduct to create
     * @return the ResponseEntity with status 201 (Created) and with body the new deliveryDeliveryTypeProduct, or with status 400 (Bad Request) if the deliveryDeliveryTypeProduct has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/delivery-delivery-type-products")
    public ResponseEntity<DeliveryDeliveryTypeProduct> createDeliveryDeliveryTypeProduct(@RequestBody DeliveryDeliveryTypeProduct deliveryDeliveryTypeProduct) throws URISyntaxException {
        log.debug("REST request to save DeliveryDeliveryTypeProduct : {}", deliveryDeliveryTypeProduct);
        if (deliveryDeliveryTypeProduct.getId() != null) {
            throw new BadRequestAlertException("A new deliveryDeliveryTypeProduct cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DeliveryDeliveryTypeProduct result = deliveryDeliveryTypeProductRepository.save(deliveryDeliveryTypeProduct);
        deliveryDeliveryTypeProductSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/delivery-delivery-type-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /delivery-delivery-type-products : Updates an existing deliveryDeliveryTypeProduct.
     *
     * @param deliveryDeliveryTypeProduct the deliveryDeliveryTypeProduct to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated deliveryDeliveryTypeProduct,
     * or with status 400 (Bad Request) if the deliveryDeliveryTypeProduct is not valid,
     * or with status 500 (Internal Server Error) if the deliveryDeliveryTypeProduct couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/delivery-delivery-type-products")
    public ResponseEntity<DeliveryDeliveryTypeProduct> updateDeliveryDeliveryTypeProduct(@RequestBody DeliveryDeliveryTypeProduct deliveryDeliveryTypeProduct) throws URISyntaxException {
        log.debug("REST request to update DeliveryDeliveryTypeProduct : {}", deliveryDeliveryTypeProduct);
        if (deliveryDeliveryTypeProduct.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DeliveryDeliveryTypeProduct result = deliveryDeliveryTypeProductRepository.save(deliveryDeliveryTypeProduct);
        deliveryDeliveryTypeProductSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, deliveryDeliveryTypeProduct.getId().toString()))
            .body(result);
    }

    /**
     * GET  /delivery-delivery-type-products : get all the deliveryDeliveryTypeProducts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of deliveryDeliveryTypeProducts in body
     */
    @GetMapping("/delivery-delivery-type-products")
    public List<DeliveryDeliveryTypeProduct> getAllDeliveryDeliveryTypeProducts() {
        log.debug("REST request to get all DeliveryDeliveryTypeProducts");
        return deliveryDeliveryTypeProductRepository.findAll();
    }

    /**
     * GET  /delivery-delivery-type-products/:id : get the "id" deliveryDeliveryTypeProduct.
     *
     * @param id the id of the deliveryDeliveryTypeProduct to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the deliveryDeliveryTypeProduct, or with status 404 (Not Found)
     */
    @GetMapping("/delivery-delivery-type-products/{id}")
    public ResponseEntity<DeliveryDeliveryTypeProduct> getDeliveryDeliveryTypeProduct(@PathVariable Long id) {
        log.debug("REST request to get DeliveryDeliveryTypeProduct : {}", id);
        Optional<DeliveryDeliveryTypeProduct> deliveryDeliveryTypeProduct = deliveryDeliveryTypeProductRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(deliveryDeliveryTypeProduct);
    }

    /**
     * DELETE  /delivery-delivery-type-products/:id : delete the "id" deliveryDeliveryTypeProduct.
     *
     * @param id the id of the deliveryDeliveryTypeProduct to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/delivery-delivery-type-products/{id}")
    public ResponseEntity<Void> deleteDeliveryDeliveryTypeProduct(@PathVariable Long id) {
        log.debug("REST request to delete DeliveryDeliveryTypeProduct : {}", id);
        deliveryDeliveryTypeProductRepository.deleteById(id);
        deliveryDeliveryTypeProductSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/delivery-delivery-type-products?query=:query : search for the deliveryDeliveryTypeProduct corresponding
     * to the query.
     *
     * @param query the query of the deliveryDeliveryTypeProduct search
     * @return the result of the search
     */
    @GetMapping("/_search/delivery-delivery-type-products")
    public List<DeliveryDeliveryTypeProduct> searchDeliveryDeliveryTypeProducts(@RequestParam String query) {
        log.debug("REST request to search DeliveryDeliveryTypeProducts for query {}", query);
        return StreamSupport
            .stream(deliveryDeliveryTypeProductSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
