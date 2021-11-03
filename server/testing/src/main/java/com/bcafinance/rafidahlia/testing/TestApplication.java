package com.bcafinance.rafidahlia.testing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

//@EntityScan("com.bcafinance.rafidahlia.testing")
@SpringBootApplication
@EnableJpaAuditing
public class TestApplication {

	public static void main(String[] args) {

//		TestApplication si=new TestApplication();
		SpringApplication.run(TestApplication.class, args);

	}


}
