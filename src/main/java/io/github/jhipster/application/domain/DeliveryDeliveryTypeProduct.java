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
 * A DeliveryDeliveryTypeProduct.
 */
@Entity
@Table(name = "delivery_delivery_type_product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "deliverydeliverytypeproduct")
public class DeliveryDeliveryTypeProduct implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private Long quantity;

    @OneToMany(mappedBy = "deliveryDeliveryTypeProduct")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Delivery> deliveries = new HashSet<>();
    @OneToMany(mappedBy = "deliveryDeliveryTypeProduct")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> products = new HashSet<>();
    @OneToMany(mappedBy = "deliveryDeliveryTypeProduct")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DeliveryType> deliveryTypes = new HashSet<>();
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

    public DeliveryDeliveryTypeProduct quantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Set<Delivery> getDeliveries() {
        return deliveries;
    }

    public DeliveryDeliveryTypeProduct deliveries(Set<Delivery> deliveries) {
        this.deliveries = deliveries;
        return this;
    }

    public DeliveryDeliveryTypeProduct addDelivery(Delivery delivery) {
        this.deliveries.add(delivery);
        delivery.setDeliveryDeliveryTypeProduct(this);
        return this;
    }

    public DeliveryDeliveryTypeProduct removeDelivery(Delivery delivery) {
        this.deliveries.remove(delivery);
        delivery.setDeliveryDeliveryTypeProduct(null);
        return this;
    }

    public void setDeliveries(Set<Delivery> deliveries) {
        this.deliveries = deliveries;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public DeliveryDeliveryTypeProduct products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public DeliveryDeliveryTypeProduct addProduct(Product product) {
        this.products.add(product);
        product.setDeliveryDeliveryTypeProduct(this);
        return this;
    }

    public DeliveryDeliveryTypeProduct removeProduct(Product product) {
        this.products.remove(product);
        product.setDeliveryDeliveryTypeProduct(null);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Set<DeliveryType> getDeliveryTypes() {
        return deliveryTypes;
    }

    public DeliveryDeliveryTypeProduct deliveryTypes(Set<DeliveryType> deliveryTypes) {
        this.deliveryTypes = deliveryTypes;
        return this;
    }

    public DeliveryDeliveryTypeProduct addDeliveryType(DeliveryType deliveryType) {
        this.deliveryTypes.add(deliveryType);
        deliveryType.setDeliveryDeliveryTypeProduct(this);
        return this;
    }

    public DeliveryDeliveryTypeProduct removeDeliveryType(DeliveryType deliveryType) {
        this.deliveryTypes.remove(deliveryType);
        deliveryType.setDeliveryDeliveryTypeProduct(null);
        return this;
    }

    public void setDeliveryTypes(Set<DeliveryType> deliveryTypes) {
        this.deliveryTypes = deliveryTypes;
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
        DeliveryDeliveryTypeProduct deliveryDeliveryTypeProduct = (DeliveryDeliveryTypeProduct) o;
        if (deliveryDeliveryTypeProduct.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), deliveryDeliveryTypeProduct.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DeliveryDeliveryTypeProduct{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            "}";
    }
}
