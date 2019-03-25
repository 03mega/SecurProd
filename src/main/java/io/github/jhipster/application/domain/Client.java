package io.github.jhipster.application.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Client.
 */
@Entity
@Table(name = "client")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "client")
public class Client implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "vr_code")
    private String vrCode;

    @Column(name = "name")
    private String name;

    @Column(name = "seit")
    private String seit;

    @Column(name = "psp_code")
    private String pspCode;

    @Column(name = "category")
    private String category;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Client code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getVrCode() {
        return vrCode;
    }

    public Client vrCode(String vrCode) {
        this.vrCode = vrCode;
        return this;
    }

    public void setVrCode(String vrCode) {
        this.vrCode = vrCode;
    }

    public String getName() {
        return name;
    }

    public Client name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSeit() {
        return seit;
    }

    public Client seit(String seit) {
        this.seit = seit;
        return this;
    }

    public void setSeit(String seit) {
        this.seit = seit;
    }

    public String getPspCode() {
        return pspCode;
    }

    public Client pspCode(String pspCode) {
        this.pspCode = pspCode;
        return this;
    }

    public void setPspCode(String pspCode) {
        this.pspCode = pspCode;
    }

    public String getCategory() {
        return category;
    }

    public Client category(String category) {
        this.category = category;
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
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
        Client client = (Client) o;
        if (client.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), client.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Client{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", vrCode='" + getVrCode() + "'" +
            ", name='" + getName() + "'" +
            ", seit='" + getSeit() + "'" +
            ", pspCode='" + getPspCode() + "'" +
            ", category='" + getCategory() + "'" +
            "}";
    }
}
