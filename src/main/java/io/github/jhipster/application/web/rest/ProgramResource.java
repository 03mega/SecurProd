package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Program;
import io.github.jhipster.application.repository.ProgramRepository;
import io.github.jhipster.application.repository.search.ProgramSearchRepository;
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
 * REST controller for managing Program.
 */
@RestController
@RequestMapping("/api")
public class ProgramResource {

    private final Logger log = LoggerFactory.getLogger(ProgramResource.class);

    private static final String ENTITY_NAME = "program";

    private final ProgramRepository programRepository;

    private final ProgramSearchRepository programSearchRepository;

    public ProgramResource(ProgramRepository programRepository, ProgramSearchRepository programSearchRepository) {
        this.programRepository = programRepository;
        this.programSearchRepository = programSearchRepository;
    }

    /**
     * POST  /programs : Create a new program.
     *
     * @param program the program to create
     * @return the ResponseEntity with status 201 (Created) and with body the new program, or with status 400 (Bad Request) if the program has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/programs")
    public ResponseEntity<Program> createProgram(@RequestBody Program program) throws URISyntaxException {
        log.debug("REST request to save Program : {}", program);
        if (program.getId() != null) {
            throw new BadRequestAlertException("A new program cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Program result = programRepository.save(program);
        programSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/programs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /programs : Updates an existing program.
     *
     * @param program the program to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated program,
     * or with status 400 (Bad Request) if the program is not valid,
     * or with status 500 (Internal Server Error) if the program couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/programs")
    public ResponseEntity<Program> updateProgram(@RequestBody Program program) throws URISyntaxException {
        log.debug("REST request to update Program : {}", program);
        if (program.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Program result = programRepository.save(program);
        programSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, program.getId().toString()))
            .body(result);
    }

    /**
     * GET  /programs : get all the programs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of programs in body
     */
    @GetMapping("/programs")
    public List<Program> getAllPrograms() {
        log.debug("REST request to get all Programs");
        return programRepository.findAll();
    }

    /**
     * GET  /programs/:id : get the "id" program.
     *
     * @param id the id of the program to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the program, or with status 404 (Not Found)
     */
    @GetMapping("/programs/{id}")
    public ResponseEntity<Program> getProgram(@PathVariable Long id) {
        log.debug("REST request to get Program : {}", id);
        Optional<Program> program = programRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(program);
    }

    /**
     * DELETE  /programs/:id : delete the "id" program.
     *
     * @param id the id of the program to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/programs/{id}")
    public ResponseEntity<Void> deleteProgram(@PathVariable Long id) {
        log.debug("REST request to delete Program : {}", id);
        programRepository.deleteById(id);
        programSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/programs?query=:query : search for the program corresponding
     * to the query.
     *
     * @param query the query of the program search
     * @return the result of the search
     */
    @GetMapping("/_search/programs")
    public List<Program> searchPrograms(@RequestParam String query) {
        log.debug("REST request to search Programs for query {}", query);
        return StreamSupport
            .stream(programSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
