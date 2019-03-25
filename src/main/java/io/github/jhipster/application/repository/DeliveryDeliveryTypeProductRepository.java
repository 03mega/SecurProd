package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.DeliveryDeliveryTypeProduct;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DeliveryDeliveryTypeProduct entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliveryDeliveryTypeProductRepository extends JpaRepository<DeliveryDeliveryTypeProduct, Long> {

}
