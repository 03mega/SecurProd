package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.DeliveryDeliveryType;
import io.github.jhipster.application.repository.DeliveryDeliveryTypeRepository;
import io.github.jhipster.application.repository.search.DeliveryDeliveryTypeSearchRepository;
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
 * REST controller for managing DeliveryDeliveryType.
 */
@RestController
@RequestMapping("/api")
public class DeliveryDeliveryTypeResource {

    private final Logger log = LoggerFactory.getLogger(DeliveryDeliveryTypeResource.class);

    private static final String ENTITY_NAME = "deliveryDeliveryType";

    private final DeliveryDeliveryTypeRepository deliveryDeliveryTypeRepository;

    private final DeliveryDeliveryTypeSearchRepository deliveryDeliveryTypeSearchRepository;

    public DeliveryDeliveryTypeResource(DeliveryDeliveryTypeRepository deliveryDeliveryTypeRepository, DeliveryDeliveryTypeSearchRepository deliveryDeliveryTypeSearchRepository) {
        this.deliveryDeliveryTypeRepository = deliveryDeliveryTypeRepository;
        this.deliveryDeliveryTypeSearchRepository = deliveryDeliveryTypeSearchRepository;
    }

    /**
     * POST  /delivery-delivery-types : Create a new deliveryDeliveryType.
     *
     * @param deliveryDeliveryType the deliveryDeliveryType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new deliveryDeliveryType, or with status 400 (Bad Request) if the deliveryDeliveryType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/delivery-delivery-types")
    public ResponseEntity<DeliveryDeliveryType> createDeliveryDeliveryType(@RequestBody DeliveryDeliveryType deliveryDeliveryType) throws URISyntaxException {
        log.debug("REST request to save DeliveryDeliveryType : {}", deliveryDeliveryType);
        if (deliveryDeliveryType.getId() != null) {
            throw new BadRequestAlertException("A new deliveryDeliveryType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DeliveryDeliveryType result = deliveryDeliveryTypeRepository.save(deliveryDeliveryType);
        deliveryDeliveryTypeSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/delivery-delivery-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /delivery-delivery-types : Updates an existing deliveryDeliveryType.
     *
     * @param deliveryDeliveryType the deliveryDeliveryType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated deliveryDeliveryType,
     * or with status 400 (Bad Request) if the deliveryDeliveryType is not valid,
     * or with status 500 (Internal Server Error) if the deliveryDeliveryType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/delivery-delivery-types")
    public ResponseEntity<DeliveryDeliveryType> updateDeliveryDeliveryType(@RequestBody DeliveryDeliveryType deliveryDeliveryType) throws URISyntaxException {
        log.debug("REST request to update DeliveryDeliveryType : {}", deliveryDeliveryType);
        if (deliveryDeliveryType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DeliveryDeliveryType result = deliveryDeliveryTypeRepository.save(deliveryDeliveryType);
        deliveryDeliveryTypeSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, deliveryDeliveryType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /delivery-delivery-types : get all the deliveryDeliveryTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of deliveryDeliveryTypes in body
     */
    @GetMapping("/delivery-delivery-types")
    public List<DeliveryDeliveryType> getAllDeliveryDeliveryTypes() {
        log.debug("REST request to get all DeliveryDeliveryTypes");
        return deliveryDeliveryTypeRepository.findAll();
    }

    /**
     * GET  /delivery-delivery-types/:id : get the "id" deliveryDeliveryType.
     *
     * @param id the id of the deliveryDeliveryType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the deliveryDeliveryType, or with status 404 (Not Found)
     */
    @GetMapping("/delivery-delivery-types/{id}")
    public ResponseEntity<DeliveryDeliveryType> getDeliveryDeliveryType(@PathVariable Long id) {
        log.debug("REST request to get DeliveryDeliveryType : {}", id);
        Optional<DeliveryDeliveryType> deliveryDeliveryType = deliveryDeliveryTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(deliveryDeliveryType);
    }

    /**
     * DELETE  /delivery-delivery-types/:id : delete the "id" deliveryDeliveryType.
     *
     * @param id the id of the deliveryDeliveryType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/delivery-delivery-types/{id}")
    public ResponseEntity<Void> deleteDeliveryDeliveryType(@PathVariable Long id) {
        log.debug("REST request to delete DeliveryDeliveryType : {}", id);
        deliveryDeliveryTypeRepository.deleteById(id);
        deliveryDeliveryTypeSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/delivery-delivery-types?query=:query : search for the deliveryDeliveryType corresponding
     * to the query.
     *
     * @param query the query of the deliveryDeliveryType search
     * @return the result of the search
     */
    @GetMapping("/_search/delivery-delivery-types")
    public List<DeliveryDeliveryType> searchDeliveryDeliveryTypes(@RequestParam String query) {
        log.debug("REST request to search DeliveryDeliveryTypes for query {}", query);
        return StreamSupport
            .stream(deliveryDeliveryTypeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
