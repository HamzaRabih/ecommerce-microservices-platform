package ma.rabih.enset.iibdcc.eommsapp.billingservice.feing;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import ma.rabih.enset.iibdcc.eommsapp.billingservice.model.Customer;
import ma.rabih.enset.iibdcc.eommsapp.billingservice.model.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "inventory-service")
public interface InventoryServiceRestClient {

    @GetMapping("/products/{id}")
    @CircuitBreaker(name = "inventory-service",fallbackMethod = "getDefaultProduct")
    Product findProductById(@PathVariable Long id);

    default Product getDefaultProduct(Long id , Exception exception) {
        exception.printStackTrace();
        Product product = new Product();
        product.setId(id);
        product.setName("Default Product");
        product.setQuantity(0);
        product.setPrice(0);
        return product;
    }
}
