package io.github.jhipster.application.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A StampCancelled.
 */
@Entity
@Table(name = "stamp_cancelled")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "stampcancelled")
public class StampCancelled implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reason")
    private String reason;

    @Column(name = "imputation")
    private String imputation;

    @OneToOne
    @JoinColumn(unique = true)
    private Stamp stamp;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReason() {
        return reason;
    }

    public StampCancelled reason(String reason) {
        this.reason = reason;
        return this;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getImputation() {
        return imputation;
    }

    public StampCancelled imputation(String imputation) {
        this.imputation = imputation;
        return this;
    }

    public void setImputation(String imputation) {
        this.imputation = imputation;
    }

    public Stamp getStamp() {
        return stamp;
    }

    public StampCancelled stamp(Stamp stamp) {
        this.stamp = stamp;
        return this;
    }

    public void setStamp(Stamp stamp) {
        this.stamp = stamp;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        StampCancelled stampCancelled = (StampCancelled) o;
        if (stampCancelled.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stampCancelled.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StampCancelled{" +
            "id=" + getId() +
            ", reason='" + getReason() + "'" +
            ", imputation='" + getImputation() + "'" +
            "}";
    }
}
