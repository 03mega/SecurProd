package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Unit;
import io.github.jhipster.application.repository.UnitRepository;
import io.github.jhipster.application.repository.search.UnitSearchRepository;
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
 * REST controller for managing Unit.
 */
@RestController
@RequestMapping("/api")
public class UnitResource {

    private final Logger log = LoggerFactory.getLogger(UnitResource.class);

    private static final String ENTITY_NAME = "unit";

    private final UnitRepository unitRepository;

    private final UnitSearchRepository unitSearchRepository;

    public UnitResource(UnitRepository unitRepository, UnitSearchRepository unitSearchRepository) {
        this.unitRepository = unitRepository;
        this.unitSearchRepository = unitSearchRepository;
    }

    /**
     * POST  /units : Create a new unit.
     *
     * @param unit the unit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new unit, or with status 400 (Bad Request) if the unit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/units")
    public ResponseEntity<Unit> createUnit(@RequestBody Unit unit) throws URISyntaxException {
        log.debug("REST request to save Unit : {}", unit);
        if (unit.getId() != null) {
            throw new BadRequestAlertException("A new unit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Unit result = unitRepository.save(unit);
        unitSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/units/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /units : Updates an existing unit.
     *
     * @param unit the unit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated unit,
     * or with status 400 (Bad Request) if the unit is not valid,
     * or with status 500 (Internal Server Error) if the unit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/units")
    public ResponseEntity<Unit> updateUnit(@RequestBody Unit unit) throws URISyntaxException {
        log.debug("REST request to update Unit : {}", unit);
        if (unit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Unit result = unitRepository.save(unit);
        unitSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, unit.getId().toString()))
            .body(result);
    }

    /**
     * GET  /units : get all the units.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of units in body
     */
    @GetMapping("/units")
    public List<Unit> getAllUnits() {
        log.debug("REST request to get all Units");
        return unitRepository.findAll();
    }

    /**
     * GET  /units/:id : get the "id" unit.
     *
     * @param id the id of the unit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the unit, or with status 404 (Not Found)
     */
    @GetMapping("/units/{id}")
    public ResponseEntity<Unit> getUnit(@PathVariable Long id) {
        log.debug("REST request to get Unit : {}", id);
        Optional<Unit> unit = unitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(unit);
    }

    /**
     * DELETE  /units/:id : delete the "id" unit.
     *
     * @param id the id of the unit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/units/{id}")
    public ResponseEntity<Void> deleteUnit(@PathVariable Long id) {
        log.debug("REST request to delete Unit : {}", id);
        unitRepository.deleteById(id);
        unitSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/units?query=:query : search for the unit corresponding
     * to the query.
     *
     * @param query the query of the unit search
     * @return the result of the search
     */
    @GetMapping("/_search/units")
    public List<Unit> searchUnits(@RequestParam String query) {
        log.debug("REST request to search Units for query {}", query);
        return StreamSupport
            .stream(unitSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
