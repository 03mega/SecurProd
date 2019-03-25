package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.ProductDelivery;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ProductDelivery entity.
 */
public interface ProductDeliverySearchRepository extends ElasticsearchRepository<ProductDelivery, Long> {
}
