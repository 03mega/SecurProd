package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.Delivery;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Delivery entity.
 */
public interface DeliverySearchRepository extends ElasticsearchRepository<Delivery, Long> {
}
