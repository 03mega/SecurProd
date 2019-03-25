package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.DeliveryDeliveryTypeProduct;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DeliveryDeliveryTypeProduct entity.
 */
public interface DeliveryDeliveryTypeProductSearchRepository extends ElasticsearchRepository<DeliveryDeliveryTypeProduct, Long> {
}
