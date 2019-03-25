package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.ParcelProducts;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ParcelProducts entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParcelProductsRepository extends JpaRepository<ParcelProducts, Long> {

}
