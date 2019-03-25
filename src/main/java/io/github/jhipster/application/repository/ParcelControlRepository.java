package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.ParcelControl;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ParcelControl entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParcelControlRepository extends JpaRepository<ParcelControl, Long> {

}
