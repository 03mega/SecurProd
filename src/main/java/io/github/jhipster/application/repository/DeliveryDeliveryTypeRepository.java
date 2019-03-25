package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.DeliveryDeliveryType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DeliveryDeliveryType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliveryDeliveryTypeRepository extends JpaRepository<DeliveryDeliveryType, Long> {

}
