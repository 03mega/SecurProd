package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.Parcel;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Parcel entity.
 */
public interface ParcelSearchRepository extends ElasticsearchRepository<Parcel, Long> {
}
