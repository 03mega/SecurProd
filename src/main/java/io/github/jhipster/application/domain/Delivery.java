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
 * A Delivery.
 */
@Entity
@Table(name = "delivery")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "delivery")
public class Delivery implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "border_delivery")
    private String borderDelivery;

    @Column(name = "valuation_number")
    private String valuationNumber;

    @Column(name = "delivery_date")
    private LocalDate deliveryDate;

    @Column(name = "category")
    private String category;

    @Column(name = "jhi_zone")
    private String zone;

    @OneToMany(mappedBy = "delivery")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DeliveryDeliveryType> deliveryDeliveryTypes = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("deliveries")
    private Client client;

    @ManyToOne
    @JsonIgnoreProperties("deliveries")
    private ProductDelivery productDelivery;

    @ManyToOne
    @JsonIgnoreProperties("deliveries")
    private DeliveryDeliveryTypeProduct deliveryDeliveryTypeProduct;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBorderDelivery() {
        return borderDelivery;
    }

    public Delivery borderDelivery(String borderDelivery) {
        this.borderDelivery = borderDelivery;
        return this;
    }

    public void setBorderDelivery(String borderDelivery) {
        this.borderDelivery = borderDelivery;
    }

    public String getValuationNumber() {
        return valuationNumber;
    }

    public Delivery valuationNumber(String valuationNumber) {
        this.valuationNumber = valuationNumber;
        return this;
    }

    public void setValuationNumber(String valuationNumber) {
        this.valuationNumber = valuationNumber;
    }

    public LocalDate getDeliveryDate() {
        return deliveryDate;
    }

    public Delivery deliveryDate(LocalDate deliveryDate) {
        this.deliveryDate = deliveryDate;
        return this;
    }

    public void setDeliveryDate(LocalDate deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getCategory() {
        return category;
    }

    public Delivery category(String category) {
        this.category = category;
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getZone() {
        return zone;
    }

    public Delivery zone(String zone) {
        this.zone = zone;
        return this;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public Set<DeliveryDeliveryType> getDeliveryDeliveryTypes() {
        return deliveryDeliveryTypes;
    }

    public Delivery deliveryDeliveryTypes(Set<DeliveryDeliveryType> deliveryDeliveryTypes) {
        this.deliveryDeliveryTypes = deliveryDeliveryTypes;
        return this;
    }

    public Delivery addDeliveryDeliveryType(DeliveryDeliveryType deliveryDeliveryType) {
        this.deliveryDeliveryTypes.add(deliveryDeliveryType);
        deliveryDeliveryType.setDelivery(this);
        return this;
    }

    public Delivery removeDeliveryDeliveryType(DeliveryDeliveryType deliveryDeliveryType) {
        this.deliveryDeliveryTypes.remove(deliveryDeliveryType);
        deliveryDeliveryType.setDelivery(null);
        return this;
    }

    public void setDeliveryDeliveryTypes(Set<DeliveryDeliveryType> deliveryDeliveryTypes) {
        this.deliveryDeliveryTypes = deliveryDeliveryTypes;
    }

    public Client getClient() {
        return client;
    }

    public Delivery client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public ProductDelivery getProductDelivery() {
        return productDelivery;
    }

    public Delivery productDelivery(ProductDelivery productDelivery) {
        this.productDelivery = productDelivery;
        return this;
    }

    public void setProductDelivery(ProductDelivery productDelivery) {
        this.productDelivery = productDelivery;
    }

    public DeliveryDeliveryTypeProduct getDeliveryDeliveryTypeProduct() {
        return deliveryDeliveryTypeProduct;
    }

    public Delivery deliveryDeliveryTypeProduct(DeliveryDeliveryTypeProduct deliveryDeliveryTypeProduct) {
        this.deliveryDeliveryTypeProduct = deliveryDeliveryTypeProduct;
        return this;
    }

    public void setDeliveryDeliveryTypeProduct(DeliveryDeliveryTypeProduct deliveryDeliveryTypeProduct) {
        this.deliveryDeliveryTypeProduct = deliveryDeliveryTypeProduct;
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
        Delivery delivery = (Delivery) o;
        if (delivery.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), delivery.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Delivery{" +
            "id=" + getId() +
            ", borderDelivery='" + getBorderDelivery() + "'" +
            ", valuationNumber='" + getValuationNumber() + "'" +
            ", deliveryDate='" + getDeliveryDate() + "'" +
            ", category='" + getCategory() + "'" +
            ", zone='" + getZone() + "'" +
            "}";
    }
}
