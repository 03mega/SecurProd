package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_code")
    private String productCode;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("products")
    private Program program;

    @ManyToOne
    @JsonIgnoreProperties("products")
    private ParcelProducts parcelProducts;

    @ManyToOne
    @JsonIgnoreProperties("products")
    private ProgramProduct programProduct;

    @ManyToOne
    @JsonIgnoreProperties("products")
    private ProductDelivery productDelivery;

    @ManyToOne
    @JsonIgnoreProperties("products")
    private DeliveryDeliveryTypeProduct deliveryDeliveryTypeProduct;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductCode() {
        return productCode;
    }

    public Product productCode(String productCode) {
        this.productCode = productCode;
        return this;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Program getProgram() {
        return program;
    }

    public Product program(Program program) {
        this.program = program;
        return this;
    }

    public void setProgram(Program program) {
        this.program = program;
    }

    public ParcelProducts getParcelProducts() {
        return parcelProducts;
    }

    public Product parcelProducts(ParcelProducts parcelProducts) {
        this.parcelProducts = parcelProducts;
        return this;
    }

    public void setParcelProducts(ParcelProducts parcelProducts) {
        this.parcelProducts = parcelProducts;
    }

    public ProgramProduct getProgramProduct() {
        return programProduct;
    }

    public Product programProduct(ProgramProduct programProduct) {
        this.programProduct = programProduct;
        return this;
    }

    public void setProgramProduct(ProgramProduct programProduct) {
        this.programProduct = programProduct;
    }

    public ProductDelivery getProductDelivery() {
        return productDelivery;
    }

    public Product productDelivery(ProductDelivery productDelivery) {
        this.productDelivery = productDelivery;
        return this;
    }

    public void setProductDelivery(ProductDelivery productDelivery) {
        this.productDelivery = productDelivery;
    }

    public DeliveryDeliveryTypeProduct getDeliveryDeliveryTypeProduct() {
        return deliveryDeliveryTypeProduct;
    }

    public Product deliveryDeliveryTypeProduct(DeliveryDeliveryTypeProduct deliveryDeliveryTypeProduct) {
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
        Product product = (Product) o;
        if (product.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", productCode='" + getProductCode() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
