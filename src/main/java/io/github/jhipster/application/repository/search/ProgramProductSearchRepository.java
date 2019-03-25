package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.ProgramProduct;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ProgramProduct entity.
 */
public interface ProgramProductSearchRepository extends ElasticsearchRepository<ProgramProduct, Long> {
}
