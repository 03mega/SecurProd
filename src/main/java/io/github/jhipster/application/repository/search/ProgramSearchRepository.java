package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.Program;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Program entity.
 */
public interface ProgramSearchRepository extends ElasticsearchRepository<Program, Long> {
}
