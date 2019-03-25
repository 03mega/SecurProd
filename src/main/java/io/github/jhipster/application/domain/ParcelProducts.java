package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ParcelProducts.
 */
@Entity
@Table(name = "parcel_products")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "parcelproducts")
public class ParcelProducts implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private Long quantity;

    @OneToMany(mappedBy = "parcelProducts")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Parcel> parcels = new HashSet<>();
    @OneToMany(mappedBy = "parcelProducts")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> products = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuantity() {
        return quantity;
    }

    public ParcelProducts quantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Set<Parcel> getParcels() {
        return parcels;
    }

    public ParcelProducts parcels(Set<Parcel> parcels) {
        this.parcels = parcels;
        return this;
    }

    public ParcelProducts addParcel(Parcel parcel) {
        this.parcels.add(parcel);
        parcel.setParcelProducts(this);
        return this;
    }

    public ParcelProducts removeParcel(Parcel parcel) {
        this.parcels.remove(parcel);
        parcel.setParcelProducts(null);
        return this;
    }

    public void setParcels(Set<Parcel> parcels) {
        this.parcels = parcels;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public ParcelProducts products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public ParcelProducts addProduct(Product product) {
        this.products.add(product);
        product.setParcelProducts(this);
        return this;
    }

    public ParcelProducts removeProduct(Product product) {
        this.products.remove(product);
        product.setParcelProducts(null);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
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
        ParcelProducts parcelProducts = (ParcelProducts) o;
        if (parcelProducts.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parcelProducts.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ParcelProducts{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            "}";
    }
}
