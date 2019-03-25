package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.StampCancelled;
import io.github.jhipster.application.repository.StampCancelledRepository;
import io.github.jhipster.application.repository.search.StampCancelledSearchRepository;
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
 * REST controller for managing StampCancelled.
 */
@RestController
@RequestMapping("/api")
public class StampCancelledResource {

    private final Logger log = LoggerFactory.getLogger(StampCancelledResource.class);

    private static final String ENTITY_NAME = "stampCancelled";

    private final StampCancelledRepository stampCancelledRepository;

    private final StampCancelledSearchRepository stampCancelledSearchRepository;

    public StampCancelledResource(StampCancelledRepository stampCancelledRepository, StampCancelledSearchRepository stampCancelledSearchRepository) {
        this.stampCancelledRepository = stampCancelledRepository;
        this.stampCancelledSearchRepository = stampCancelledSearchRepository;
    }

    /**
     * POST  /stamp-cancelleds : Create a new stampCancelled.
     *
     * @param stampCancelled the stampCancelled to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stampCancelled, or with status 400 (Bad Request) if the stampCancelled has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stamp-cancelleds")
    public ResponseEntity<StampCancelled> createStampCancelled(@RequestBody StampCancelled stampCancelled) throws URISyntaxException {
        log.debug("REST request to save StampCancelled : {}", stampCancelled);
        if (stampCancelled.getId() != null) {
            throw new BadRequestAlertException("A new stampCancelled cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StampCancelled result = stampCancelledRepository.save(stampCancelled);
        stampCancelledSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/stamp-cancelleds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stamp-cancelleds : Updates an existing stampCancelled.
     *
     * @param stampCancelled the stampCancelled to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stampCancelled,
     * or with status 400 (Bad Request) if the stampCancelled is not valid,
     * or with status 500 (Internal Server Error) if the stampCancelled couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stamp-cancelleds")
    public ResponseEntity<StampCancelled> updateStampCancelled(@RequestBody StampCancelled stampCancelled) throws URISyntaxException {
        log.debug("REST request to update StampCancelled : {}", stampCancelled);
        if (stampCancelled.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StampCancelled result = stampCancelledRepository.save(stampCancelled);
        stampCancelledSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stampCancelled.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stamp-cancelleds : get all the stampCancelleds.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stampCancelleds in body
     */
    @GetMapping("/stamp-cancelleds")
    public ResponseEntity<List<StampCancelled>> getAllStampCancelleds(Pageable pageable) {
        log.debug("REST request to get a page of StampCancelleds");
        Page<StampCancelled> page = stampCancelledRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stamp-cancelleds");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /stamp-cancelleds/:id : get the "id" stampCancelled.
     *
     * @param id the id of the stampCancelled to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stampCancelled, or with status 404 (Not Found)
     */
    @GetMapping("/stamp-cancelleds/{id}")
    public ResponseEntity<StampCancelled> getStampCancelled(@PathVariable Long id) {
        log.debug("REST request to get StampCancelled : {}", id);
        Optional<StampCancelled> stampCancelled = stampCancelledRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(stampCancelled);
    }

    /**
     * DELETE  /stamp-cancelleds/:id : delete the "id" stampCancelled.
     *
     * @param id the id of the stampCancelled to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stamp-cancelleds/{id}")
    public ResponseEntity<Void> deleteStampCancelled(@PathVariable Long id) {
        log.debug("REST request to delete StampCancelled : {}", id);
        stampCancelledRepository.deleteById(id);
        stampCancelledSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/stamp-cancelleds?query=:query : search for the stampCancelled corresponding
     * to the query.
     *
     * @param query the query of the stampCancelled search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/stamp-cancelleds")
    public ResponseEntity<List<StampCancelled>> searchStampCancelleds(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of StampCancelleds for query {}", query);
        Page<StampCancelled> page = stampCancelledSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/stamp-cancelleds");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
