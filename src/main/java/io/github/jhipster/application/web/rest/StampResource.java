package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Stamp;
import io.github.jhipster.application.repository.StampRepository;
import io.github.jhipster.application.repository.search.StampSearchRepository;
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
 * REST controller for managing Stamp.
 */
@RestController
@RequestMapping("/api")
public class StampResource {

    private final Logger log = LoggerFactory.getLogger(StampResource.class);

    private static final String ENTITY_NAME = "stamp";

    private final StampRepository stampRepository;

    private final StampSearchRepository stampSearchRepository;

    public StampResource(StampRepository stampRepository, StampSearchRepository stampSearchRepository) {
        this.stampRepository = stampRepository;
        this.stampSearchRepository = stampSearchRepository;
    }

    /**
     * POST  /stamps : Create a new stamp.
     *
     * @param stamp the stamp to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stamp, or with status 400 (Bad Request) if the stamp has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stamps")
    public ResponseEntity<Stamp> createStamp(@RequestBody Stamp stamp) throws URISyntaxException {
        log.debug("REST request to save Stamp : {}", stamp);
        if (stamp.getId() != null) {
            throw new BadRequestAlertException("A new stamp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Stamp result = stampRepository.save(stamp);
        stampSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/stamps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stamps : Updates an existing stamp.
     *
     * @param stamp the stamp to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stamp,
     * or with status 400 (Bad Request) if the stamp is not valid,
     * or with status 500 (Internal Server Error) if the stamp couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stamps")
    public ResponseEntity<Stamp> updateStamp(@RequestBody Stamp stamp) throws URISyntaxException {
        log.debug("REST request to update Stamp : {}", stamp);
        if (stamp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Stamp result = stampRepository.save(stamp);
        stampSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stamp.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stamps : get all the stamps.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stamps in body
     */
    @GetMapping("/stamps")
    public ResponseEntity<List<Stamp>> getAllStamps(Pageable pageable) {
        log.debug("REST request to get a page of Stamps");
        Page<Stamp> page = stampRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stamps");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /stamps/:id : get the "id" stamp.
     *
     * @param id the id of the stamp to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stamp, or with status 404 (Not Found)
     */
    @GetMapping("/stamps/{id}")
    public ResponseEntity<Stamp> getStamp(@PathVariable Long id) {
        log.debug("REST request to get Stamp : {}", id);
        Optional<Stamp> stamp = stampRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(stamp);
    }

    /**
     * DELETE  /stamps/:id : delete the "id" stamp.
     *
     * @param id the id of the stamp to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stamps/{id}")
    public ResponseEntity<Void> deleteStamp(@PathVariable Long id) {
        log.debug("REST request to delete Stamp : {}", id);
        stampRepository.deleteById(id);
        stampSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/stamps?query=:query : search for the stamp corresponding
     * to the query.
     *
     * @param query the query of the stamp search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/stamps")
    public ResponseEntity<List<Stamp>> searchStamps(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Stamps for query {}", query);
        Page<Stamp> page = stampSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/stamps");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
