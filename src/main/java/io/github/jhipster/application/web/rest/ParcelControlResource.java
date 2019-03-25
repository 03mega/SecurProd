package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.ParcelControl;
import io.github.jhipster.application.repository.ParcelControlRepository;
import io.github.jhipster.application.repository.search.ParcelControlSearchRepository;
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
 * REST controller for managing ParcelControl.
 */
@RestController
@RequestMapping("/api")
public class ParcelControlResource {

    private final Logger log = LoggerFactory.getLogger(ParcelControlResource.class);

    private static final String ENTITY_NAME = "parcelControl";

    private final ParcelControlRepository parcelControlRepository;

    private final ParcelControlSearchRepository parcelControlSearchRepository;

    public ParcelControlResource(ParcelControlRepository parcelControlRepository, ParcelControlSearchRepository parcelControlSearchRepository) {
        this.parcelControlRepository = parcelControlRepository;
        this.parcelControlSearchRepository = parcelControlSearchRepository;
    }

    /**
     * POST  /parcel-controls : Create a new parcelControl.
     *
     * @param parcelControl the parcelControl to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parcelControl, or with status 400 (Bad Request) if the parcelControl has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/parcel-controls")
    public ResponseEntity<ParcelControl> createParcelControl(@RequestBody ParcelControl parcelControl) throws URISyntaxException {
        log.debug("REST request to save ParcelControl : {}", parcelControl);
        if (parcelControl.getId() != null) {
            throw new BadRequestAlertException("A new parcelControl cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParcelControl result = parcelControlRepository.save(parcelControl);
        parcelControlSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/parcel-controls/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /parcel-controls : Updates an existing parcelControl.
     *
     * @param parcelControl the parcelControl to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parcelControl,
     * or with status 400 (Bad Request) if the parcelControl is not valid,
     * or with status 500 (Internal Server Error) if the parcelControl couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/parcel-controls")
    public ResponseEntity<ParcelControl> updateParcelControl(@RequestBody ParcelControl parcelControl) throws URISyntaxException {
        log.debug("REST request to update ParcelControl : {}", parcelControl);
        if (parcelControl.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ParcelControl result = parcelControlRepository.save(parcelControl);
        parcelControlSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parcelControl.getId().toString()))
            .body(result);
    }

    /**
     * GET  /parcel-controls : get all the parcelControls.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of parcelControls in body
     */
    @GetMapping("/parcel-controls")
    public List<ParcelControl> getAllParcelControls() {
        log.debug("REST request to get all ParcelControls");
        return parcelControlRepository.findAll();
    }

    /**
     * GET  /parcel-controls/:id : get the "id" parcelControl.
     *
     * @param id the id of the parcelControl to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the parcelControl, or with status 404 (Not Found)
     */
    @GetMapping("/parcel-controls/{id}")
    public ResponseEntity<ParcelControl> getParcelControl(@PathVariable Long id) {
        log.debug("REST request to get ParcelControl : {}", id);
        Optional<ParcelControl> parcelControl = parcelControlRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(parcelControl);
    }

    /**
     * DELETE  /parcel-controls/:id : delete the "id" parcelControl.
     *
     * @param id the id of the parcelControl to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/parcel-controls/{id}")
    public ResponseEntity<Void> deleteParcelControl(@PathVariable Long id) {
        log.debug("REST request to delete ParcelControl : {}", id);
        parcelControlRepository.deleteById(id);
        parcelControlSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/parcel-controls?query=:query : search for the parcelControl corresponding
     * to the query.
     *
     * @param query the query of the parcelControl search
     * @return the result of the search
     */
    @GetMapping("/_search/parcel-controls")
    public List<ParcelControl> searchParcelControls(@RequestParam String query) {
        log.debug("REST request to search ParcelControls for query {}", query);
        return StreamSupport
            .stream(parcelControlSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
