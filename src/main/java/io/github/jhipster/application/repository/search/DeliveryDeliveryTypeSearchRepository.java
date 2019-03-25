package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.DeliveryDeliveryType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DeliveryDeliveryType entity.
 */
public interface DeliveryDeliveryTypeSearchRepository extends ElasticsearchRepository<DeliveryDeliveryType, Long> {
}
