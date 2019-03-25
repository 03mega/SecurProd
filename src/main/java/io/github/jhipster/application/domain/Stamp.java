package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Stamp.
 */
@Entity
@Table(name = "stamp")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "stamp")
public class Stamp implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "e_number")
    private Long eNumber;

    @ManyToOne
    @JsonIgnoreProperties("stamps")
    private Parcel parcel;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long geteNumber() {
        return eNumber;
    }

    public Stamp eNumber(Long eNumber) {
        this.eNumber = eNumber;
        return this;
    }

    public void seteNumber(Long eNumber) {
        this.eNumber = eNumber;
    }

    public Parcel getParcel() {
        return parcel;
    }

    public Stamp parcel(Parcel parcel) {
        this.parcel = parcel;
        return this;
    }

    public void setParcel(Parcel parcel) {
        this.parcel = parcel;
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
        Stamp stamp = (Stamp) o;
        if (stamp.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stamp.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Stamp{" +
            "id=" + getId() +
            ", eNumber=" + geteNumber() +
            "}";
    }
}
