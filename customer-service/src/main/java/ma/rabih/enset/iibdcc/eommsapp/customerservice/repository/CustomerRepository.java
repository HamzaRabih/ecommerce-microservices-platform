package ma.rabih.enset.iibdcc.eommsapp.customerservice.repository;

import ma.rabih.enset.iibdcc.eommsapp.customerservice.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource// Pour démarrer automatiquement les services restfull sans passer par la creation des methodes rest dans les controlleur
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findByNameContainsIgnoreCase(String name);

}
