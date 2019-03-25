package io.github.jhipster.application.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Client.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Control.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Control.class.getName() + ".parcelControls", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Delivery.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Delivery.class.getName() + ".deliveryDeliveryTypes", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.DeliveryType.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.DeliveryType.class.getName() + ".deliveryDeliveryTypes", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.DeliveryDeliveryType.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Parcel.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Parcel.class.getName() + ".stamps", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Product.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Program.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Unit.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ProgramProduct.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ProgramProduct.class.getName() + ".programs", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ProgramProduct.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ParcelProducts.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ParcelProducts.class.getName() + ".parcels", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ParcelProducts.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Stamp.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.StampCancelled.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ProductDelivery.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ProductDelivery.class.getName() + ".deliveries", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ProductDelivery.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ParcelControl.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.DeliveryDeliveryTypeProduct.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.DeliveryDeliveryTypeProduct.class.getName() + ".deliveries", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.DeliveryDeliveryTypeProduct.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.DeliveryDeliveryTypeProduct.class.getName() + ".deliveryTypes", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
