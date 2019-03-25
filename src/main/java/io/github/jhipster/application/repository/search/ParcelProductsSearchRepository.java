package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.ParcelProducts;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ParcelProducts entity.
 */
public interface ParcelProductsSearchRepository extends ElasticsearchRepository<ParcelProducts, Long> {
}
