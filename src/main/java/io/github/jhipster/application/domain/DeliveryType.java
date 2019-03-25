package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DeliveryType.
 */
@Entity
@Table(name = "delivery_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "deliverytype")
public class DeliveryType implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "deliveryType")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DeliveryDeliveryType> deliveryDeliveryTypes = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("deliveryTypes")
    private DeliveryDeliveryTypeProduct deliveryDeliveryTypeProduct;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public DeliveryType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<DeliveryDeliveryType> getDeliveryDeliveryTypes() {
        return deliveryDeliveryTypes;
    }

    public DeliveryType deliveryDeliveryTypes(Set<DeliveryDeliveryType> deliveryDeliveryTypes) {
        this.deliveryDeliveryTypes = deliveryDeliveryTypes;
        return this;
    }

    public DeliveryType addDeliveryDeliveryType(DeliveryDeliveryType deliveryDeliveryType) {
        this.deliveryDeliveryTypes.add(deliveryDeliveryType);
        deliveryDeliveryType.setDeliveryType(this);
        return this;
    }

    public DeliveryType removeDeliveryDeliveryType(DeliveryDeliveryType deliveryDeliveryType) {
        this.deliveryDeliveryTypes.remove(deliveryDeliveryType);
        deliveryDeliveryType.setDeliveryType(null);
        return this;
    }

    public void setDeliveryDeliveryTypes(Set<DeliveryDeliveryType> deliveryDeliveryTypes) {
        this.deliveryDeliveryTypes = deliveryDeliveryTypes;
    }

    public DeliveryDeliveryTypeProduct getDeliveryDeliveryTypeProduct() {
        return deliveryDeliveryTypeProduct;
    }

    public DeliveryType deliveryDeliveryTypeProduct(DeliveryDeliveryTypeProduct deliveryDeliveryTypeProduct) {
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
        DeliveryType deliveryType = (DeliveryType) o;
        if (deliveryType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), deliveryType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DeliveryType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
