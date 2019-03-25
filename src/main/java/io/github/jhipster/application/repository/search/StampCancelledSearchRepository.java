package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.StampCancelled;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the StampCancelled entity.
 */
public interface StampCancelledSearchRepository extends ElasticsearchRepository<StampCancelled, Long> {
}
