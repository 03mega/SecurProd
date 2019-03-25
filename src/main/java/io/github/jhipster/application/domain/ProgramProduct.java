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
 * A ProgramProduct.
 */
@Entity
@Table(name = "program_product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "programproduct")
public class ProgramProduct implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "programProduct")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Program> programs = new HashSet<>();
    @OneToMany(mappedBy = "programProduct")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> products = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Program> getPrograms() {
        return programs;
    }

    public ProgramProduct programs(Set<Program> programs) {
        this.programs = programs;
        return this;
    }

    public ProgramProduct addProgram(Program program) {
        this.programs.add(program);
        program.setProgramProduct(this);
        return this;
    }

    public ProgramProduct removeProgram(Program program) {
        this.programs.remove(program);
        program.setProgramProduct(null);
        return this;
    }

    public void setPrograms(Set<Program> programs) {
        this.programs = programs;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public ProgramProduct products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public ProgramProduct addProduct(Product product) {
        this.products.add(product);
        product.setProgramProduct(this);
        return this;
    }

    public ProgramProduct removeProduct(Product product) {
        this.products.remove(product);
        product.setProgramProduct(null);
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
        ProgramProduct programProduct = (ProgramProduct) o;
        if (programProduct.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), programProduct.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProgramProduct{" +
            "id=" + getId() +
            "}";
    }
}
