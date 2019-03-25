package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Control.
 */
@Entity
@Table(name = "control")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "control")
public class Control implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "control_date")
    private LocalDate controlDate;

    @Column(name = "status")
    private Boolean status;

    @OneToMany(mappedBy = "control")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ParcelControl> parcelControls = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getControlDate() {
        return controlDate;
    }

    public Control controlDate(LocalDate controlDate) {
        this.controlDate = controlDate;
        return this;
    }

    public void setControlDate(LocalDate controlDate) {
        this.controlDate = controlDate;
    }

    public Boolean isStatus() {
        return status;
    }

    public Control status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Set<ParcelControl> getParcelControls() {
        return parcelControls;
    }

    public Control parcelControls(Set<ParcelControl> parcelControls) {
        this.parcelControls = parcelControls;
        return this;
    }

    public Control addParcelControl(ParcelControl parcelControl) {
        this.parcelControls.add(parcelControl);
        parcelControl.setControl(this);
        return this;
    }

    public Control removeParcelControl(ParcelControl parcelControl) {
        this.parcelControls.remove(parcelControl);
        parcelControl.setControl(null);
        return this;
    }

    public void setParcelControls(Set<ParcelControl> parcelControls) {
        this.parcelControls = parcelControls;
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
        Control control = (Control) o;
        if (control.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), control.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Control{" +
            "id=" + getId() +
            ", controlDate='" + getControlDate() + "'" +
            ", status='" + isStatus() + "'" +
            "}";
    }
}
