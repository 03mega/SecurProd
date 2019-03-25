package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.ProductDelivery;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductDelivery entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductDeliveryRepository extends JpaRepository<ProductDelivery, Long> {

}
