package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Stamp;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Stamp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StampRepository extends JpaRepository<Stamp, Long> {

}
