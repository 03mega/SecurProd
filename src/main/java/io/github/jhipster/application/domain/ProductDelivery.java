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
 * A ProductDelivery.
 */
@Entity
@Table(name = "product_delivery")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "productdelivery")
public class ProductDelivery implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "productDelivery")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Delivery> deliveries = new HashSet<>();
    @OneToMany(mappedBy = "productDelivery")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> products = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Delivery> getDeliveries() {
        return deliveries;
    }

    public ProductDelivery deliveries(Set<Delivery> deliveries) {
        this.deliveries = deliveries;
        return this;
    }

    public ProductDelivery addDelivery(Delivery delivery) {
        this.deliveries.add(delivery);
        delivery.setProductDelivery(this);
        return this;
    }

    public ProductDelivery removeDelivery(Delivery delivery) {
        this.deliveries.remove(delivery);
        delivery.setProductDelivery(null);
        return this;
    }

    public void setDeliveries(Set<Delivery> deliveries) {
        this.deliveries = deliveries;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public ProductDelivery products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public ProductDelivery addProduct(Product product) {
        this.products.add(product);
        product.setProductDelivery(this);
        return this;
    }

    public ProductDelivery removeProduct(Product product) {
        this.products.remove(product);
        product.setProductDelivery(null);
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
        ProductDelivery productDelivery = (ProductDelivery) o;
        if (productDelivery.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productDelivery.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductDelivery{" +
            "id=" + getId() +
            "}";
    }
}
