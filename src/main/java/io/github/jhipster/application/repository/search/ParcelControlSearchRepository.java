package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.ParcelControl;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ParcelControl entity.
 */
public interface ParcelControlSearchRepository extends ElasticsearchRepository<ParcelControl, Long> {
}
