package ma.rabih.enset.iibdcc.eommsapp.customerservice;

import ma.rabih.enset.iibdcc.eommsapp.customerservice.config.CustomerConfigParams;
import ma.rabih.enset.iibdcc.eommsapp.customerservice.entities.Customer;
import ma.rabih.enset.iibdcc.eommsapp.customerservice.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableConfigurationProperties(CustomerConfigParams.class)
public class CustomerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomerServiceApplication.class, args);
	}
	@Bean
	CommandLineRunner start(CustomerRepository customerRepository){
		return args -> {
			customerRepository.save(Customer.builder()
					.name("Mohamed").email("med@gmail.com").build());
			customerRepository.save(Customer.builder()
					.name("Imane").email("imane@gmail.com").build());
			customerRepository.save(Customer.builder()
					.name("Yassine").email("yassine@gmail.com").build());
		};
	}

}
