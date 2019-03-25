package io.github.jhipster.application.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of StampSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class StampSearchRepositoryMockConfiguration {

    @MockBean
    private StampSearchRepository mockStampSearchRepository;

}
