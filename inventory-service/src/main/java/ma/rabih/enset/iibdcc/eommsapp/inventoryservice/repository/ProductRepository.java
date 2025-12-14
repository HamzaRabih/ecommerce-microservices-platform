package ma.rabih.enset.iibdcc.eommsapp.inventoryservice.repository;

import ma.rabih.enset.iibdcc.eommsapp.inventoryservice.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {
}
