package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.ProgramProduct;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProgramProduct entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProgramProductRepository extends JpaRepository<ProgramProduct, Long> {

}
