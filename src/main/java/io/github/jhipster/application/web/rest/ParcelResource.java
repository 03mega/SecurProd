package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Parcel;
import io.github.jhipster.application.repository.ParcelRepository;
import io.github.jhipster.application.repository.search.ParcelSearchRepository;
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
 * REST controller for managing Parcel.
 */
@RestController
@RequestMapping("/api")
public class ParcelResource {

    private final Logger log = LoggerFactory.getLogger(ParcelResource.class);

    private static final String ENTITY_NAME = "parcel";

    private final ParcelRepository parcelRepository;

    private final ParcelSearchRepository parcelSearchRepository;

    public ParcelResource(ParcelRepository parcelRepository, ParcelSearchRepository parcelSearchRepository) {
        this.parcelRepository = parcelRepository;
        this.parcelSearchRepository = parcelSearchRepository;
    }

    /**
     * POST  /parcels : Create a new parcel.
     *
     * @param parcel the parcel to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parcel, or with status 400 (Bad Request) if the parcel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/parcels")
    public ResponseEntity<Parcel> createParcel(@RequestBody Parcel parcel) throws URISyntaxException {
        log.debug("REST request to save Parcel : {}", parcel);
        if (parcel.getId() != null) {
            throw new BadRequestAlertException("A new parcel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Parcel result = parcelRepository.save(parcel);
        parcelSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/parcels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /parcels : Updates an existing parcel.
     *
     * @param parcel the parcel to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parcel,
     * or with status 400 (Bad Request) if the parcel is not valid,
     * or with status 500 (Internal Server Error) if the parcel couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/parcels")
    public ResponseEntity<Parcel> updateParcel(@RequestBody Parcel parcel) throws URISyntaxException {
        log.debug("REST request to update Parcel : {}", parcel);
        if (parcel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Parcel result = parcelRepository.save(parcel);
        parcelSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parcel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /parcels : get all the parcels.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of parcels in body
     */
    @GetMapping("/parcels")
    public ResponseEntity<List<Parcel>> getAllParcels(Pageable pageable) {
        log.debug("REST request to get a page of Parcels");
        Page<Parcel> page = parcelRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/parcels");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /parcels/:id : get the "id" parcel.
     *
     * @param id the id of the parcel to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the parcel, or with status 404 (Not Found)
     */
    @GetMapping("/parcels/{id}")
    public ResponseEntity<Parcel> getParcel(@PathVariable Long id) {
        log.debug("REST request to get Parcel : {}", id);
        Optional<Parcel> parcel = parcelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(parcel);
    }

    /**
     * DELETE  /parcels/:id : delete the "id" parcel.
     *
     * @param id the id of the parcel to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/parcels/{id}")
    public ResponseEntity<Void> deleteParcel(@PathVariable Long id) {
        log.debug("REST request to delete Parcel : {}", id);
        parcelRepository.deleteById(id);
        parcelSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/parcels?query=:query : search for the parcel corresponding
     * to the query.
     *
     * @param query the query of the parcel search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/parcels")
    public ResponseEntity<List<Parcel>> searchParcels(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Parcels for query {}", query);
        Page<Parcel> page = parcelSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/parcels");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
