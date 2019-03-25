package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.Stamp;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Stamp entity.
 */
public interface StampSearchRepository extends ElasticsearchRepository<Stamp, Long> {
}
