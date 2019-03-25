package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.Control;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Control entity.
 */
public interface ControlSearchRepository extends ElasticsearchRepository<Control, Long> {
}
