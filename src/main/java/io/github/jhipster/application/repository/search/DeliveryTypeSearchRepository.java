package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.DeliveryType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DeliveryType entity.
 */
public interface DeliveryTypeSearchRepository extends ElasticsearchRepository<DeliveryType, Long> {
}
