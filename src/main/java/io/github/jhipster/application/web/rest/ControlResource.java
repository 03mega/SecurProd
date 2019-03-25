package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Control;
import io.github.jhipster.application.repository.ControlRepository;
import io.github.jhipster.application.repository.search.ControlSearchRepository;
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
 * REST controller for managing Control.
 */
@RestController
@RequestMapping("/api")
public class ControlResource {

    private final Logger log = LoggerFactory.getLogger(ControlResource.class);

    private static final String ENTITY_NAME = "control";

    private final ControlRepository controlRepository;

    private final ControlSearchRepository controlSearchRepository;

    public ControlResource(ControlRepository controlRepository, ControlSearchRepository controlSearchRepository) {
        this.controlRepository = controlRepository;
        this.controlSearchRepository = controlSearchRepository;
    }

    /**
     * POST  /controls : Create a new control.
     *
     * @param control the control to create
     * @return the ResponseEntity with status 201 (Created) and with body the new control, or with status 400 (Bad Request) if the control has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/controls")
    public ResponseEntity<Control> createControl(@RequestBody Control control) throws URISyntaxException {
        log.debug("REST request to save Control : {}", control);
        if (control.getId() != null) {
            throw new BadRequestAlertException("A new control cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Control result = controlRepository.save(control);
        controlSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/controls/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /controls : Updates an existing control.
     *
     * @param control the control to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated control,
     * or with status 400 (Bad Request) if the control is not valid,
     * or with status 500 (Internal Server Error) if the control couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/controls")
    public ResponseEntity<Control> updateControl(@RequestBody Control control) throws URISyntaxException {
        log.debug("REST request to update Control : {}", control);
        if (control.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Control result = controlRepository.save(control);
        controlSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, control.getId().toString()))
            .body(result);
    }

    /**
     * GET  /controls : get all the controls.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of controls in body
     */
    @GetMapping("/controls")
    public List<Control> getAllControls() {
        log.debug("REST request to get all Controls");
        return controlRepository.findAll();
    }

    /**
     * GET  /controls/:id : get the "id" control.
     *
     * @param id the id of the control to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the control, or with status 404 (Not Found)
     */
    @GetMapping("/controls/{id}")
    public ResponseEntity<Control> getControl(@PathVariable Long id) {
        log.debug("REST request to get Control : {}", id);
        Optional<Control> control = controlRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(control);
    }

    /**
     * DELETE  /controls/:id : delete the "id" control.
     *
     * @param id the id of the control to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/controls/{id}")
    public ResponseEntity<Void> deleteControl(@PathVariable Long id) {
        log.debug("REST request to delete Control : {}", id);
        controlRepository.deleteById(id);
        controlSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/controls?query=:query : search for the control corresponding
     * to the query.
     *
     * @param query the query of the control search
     * @return the result of the search
     */
    @GetMapping("/_search/controls")
    public List<Control> searchControls(@RequestParam String query) {
        log.debug("REST request to search Controls for query {}", query);
        return StreamSupport
            .stream(controlSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
