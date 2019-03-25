package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Delivery;
import io.github.jhipster.application.repository.DeliveryRepository;
import io.github.jhipster.application.repository.search.DeliverySearchRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
 * REST controller for managing Delivery.
 */
@RestController
@RequestMapping("/api")
public class DeliveryResource {

    private final Logger log = LoggerFactory.getLogger(DeliveryResource.class);

    private static final String ENTITY_NAME = "delivery";

    private final DeliveryRepository deliveryRepository;

    private final DeliverySearchRepository deliverySearchRepository;

    public DeliveryResource(DeliveryRepository deliveryRepository, DeliverySearchRepository deliverySearchRepository) {
        this.deliveryRepository = deliveryRepository;
        this.deliverySearchRepository = deliverySearchRepository;
    }

    /**
     * POST  /deliveries : Create a new delivery.
     *
     * @param delivery the delivery to create
     * @return the ResponseEntity with status 201 (Created) and with body the new delivery, or with status 400 (Bad Request) if the delivery has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/deliveries")
    public ResponseEntity<Delivery> createDelivery(@RequestBody Delivery delivery) throws URISyntaxException {
        log.debug("REST request to save Delivery : {}", delivery);
        if (delivery.getId() != null) {
            throw new BadRequestAlertException("A new delivery cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Delivery result = deliveryRepository.save(delivery);
        deliverySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/deliveries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /deliveries : Updates an existing delivery.
     *
     * @param delivery the delivery to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated delivery,
     * or with status 400 (Bad Request) if the delivery is not valid,
     * or with status 500 (Internal Server Error) if the delivery couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/deliveries")
    public ResponseEntity<Delivery> updateDelivery(@RequestBody Delivery delivery) throws URISyntaxException {
        log.debug("REST request to update Delivery : {}", delivery);
        if (delivery.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Delivery result = deliveryRepository.save(delivery);
        deliverySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, delivery.getId().toString()))
            .body(result);
    }

    /**
     * GET  /deliveries : get all the deliveries.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of deliveries in body
     */
    @GetMapping("/deliveries")
    public ResponseEntity<List<Delivery>> getAllDeliveries(Pageable pageable) {
        log.debug("REST request to get a page of Deliveries");
        Page<Delivery> page = deliveryRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/deliveries");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /deliveries/:id : get the "id" delivery.
     *
     * @param id the id of the delivery to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the delivery, or with status 404 (Not Found)
     */
    @GetMapping("/deliveries/{id}")
    public ResponseEntity<Delivery> getDelivery(@PathVariable Long id) {
        log.debug("REST request to get Delivery : {}", id);
        Optional<Delivery> delivery = deliveryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(delivery);
    }

    /**
     * DELETE  /deliveries/:id : delete the "id" delivery.
     *
     * @param id the id of the delivery to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/deliveries/{id}")
    public ResponseEntity<Void> deleteDelivery(@PathVariable Long id) {
        log.debug("REST request to delete Delivery : {}", id);
        deliveryRepository.deleteById(id);
        deliverySearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/deliveries?query=:query : search for the delivery corresponding
     * to the query.
     *
     * @param query the query of the delivery search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/deliveries")
    public ResponseEntity<List<Delivery>> searchDeliveries(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Deliveries for query {}", query);
        Page<Delivery> page = deliverySearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/deliveries");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
