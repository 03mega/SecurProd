package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
 * A Parcel.
 */
@Entity
@Table(name = "parcel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "parcel")
public class Parcel implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "barre_code")
    private String barreCode;

    @Column(name = "page_number")
    private Long pageNumber;

    @Column(name = "date_created")
    private LocalDate dateCreated;

    @Column(name = "date_changed")
    private LocalDate dateChanged;

    @OneToMany(mappedBy = "parcel")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Stamp> stamps = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Delivery delivery;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private ParcelControl parcelControl;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private ParcelProducts parcelProducts;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBarreCode() {
        return barreCode;
    }

    public Parcel barreCode(String barreCode) {
        this.barreCode = barreCode;
        return this;
    }

    public void setBarreCode(String barreCode) {
        this.barreCode = barreCode;
    }

    public Long getPageNumber() {
        return pageNumber;
    }

    public Parcel pageNumber(Long pageNumber) {
        this.pageNumber = pageNumber;
        return this;
    }

    public void setPageNumber(Long pageNumber) {
        this.pageNumber = pageNumber;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public Parcel dateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
        return this;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }

    public LocalDate getDateChanged() {
        return dateChanged;
    }

    public Parcel dateChanged(LocalDate dateChanged) {
        this.dateChanged = dateChanged;
        return this;
    }

    public void setDateChanged(LocalDate dateChanged) {
        this.dateChanged = dateChanged;
    }

    public Set<Stamp> getStamps() {
        return stamps;
    }

    public Parcel stamps(Set<Stamp> stamps) {
        this.stamps = stamps;
        return this;
    }

    public Parcel addStamp(Stamp stamp) {
        this.stamps.add(stamp);
        stamp.setParcel(this);
        return this;
    }

    public Parcel removeStamp(Stamp stamp) {
        this.stamps.remove(stamp);
        stamp.setParcel(null);
        return this;
    }

    public void setStamps(Set<Stamp> stamps) {
        this.stamps = stamps;
    }

    public Delivery getDelivery() {
        return delivery;
    }

    public Parcel delivery(Delivery delivery) {
        this.delivery = delivery;
        return this;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
    }

    public ParcelControl getParcelControl() {
        return parcelControl;
    }

    public Parcel parcelControl(ParcelControl parcelControl) {
        this.parcelControl = parcelControl;
        return this;
    }

    public void setParcelControl(ParcelControl parcelControl) {
        this.parcelControl = parcelControl;
    }

    public ParcelProducts getParcelProducts() {
        return parcelProducts;
    }

    public Parcel parcelProducts(ParcelProducts parcelProducts) {
        this.parcelProducts = parcelProducts;
        return this;
    }

    public void setParcelProducts(ParcelProducts parcelProducts) {
        this.parcelProducts = parcelProducts;
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
        Parcel parcel = (Parcel) o;
        if (parcel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parcel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Parcel{" +
            "id=" + getId() +
            ", barreCode='" + getBarreCode() + "'" +
            ", pageNumber=" + getPageNumber() +
            ", dateCreated='" + getDateCreated() + "'" +
            ", dateChanged='" + getDateChanged() + "'" +
            "}";
    }
}
