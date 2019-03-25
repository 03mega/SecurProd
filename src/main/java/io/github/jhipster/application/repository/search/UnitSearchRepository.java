package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.Unit;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Unit entity.
 */
public interface UnitSearchRepository extends ElasticsearchRepository<Unit, Long> {
}
