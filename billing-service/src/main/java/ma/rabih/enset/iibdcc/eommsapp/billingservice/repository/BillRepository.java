package ma.rabih.enset.iibdcc.eommsapp.billingservice.repository;

import ma.rabih.enset.iibdcc.eommsapp.billingservice.entities.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface BillRepository extends JpaRepository<Bill, Long> {
}
