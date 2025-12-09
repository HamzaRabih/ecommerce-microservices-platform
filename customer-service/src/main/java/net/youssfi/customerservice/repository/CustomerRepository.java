package net.youssfi.customerservice.repository;

import net.youssfi.customerservice.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource// Pour démarrer automatiquement les services restfull sans passer par la creation des methodes rest dans les controlleur
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
