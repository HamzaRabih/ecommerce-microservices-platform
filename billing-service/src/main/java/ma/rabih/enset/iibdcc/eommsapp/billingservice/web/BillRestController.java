package ma.rabih.enset.iibdcc.eommsapp.billingservice.web;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import ma.rabih.enset.iibdcc.eommsapp.billingservice.entities.Bill;
import ma.rabih.enset.iibdcc.eommsapp.billingservice.feing.CustomerServiceRestClient;
import ma.rabih.enset.iibdcc.eommsapp.billingservice.feing.InventoryServiceRestClient;
import ma.rabih.enset.iibdcc.eommsapp.billingservice.model.Customer;
import ma.rabih.enset.iibdcc.eommsapp.billingservice.repository.BillRepository;
import ma.rabih.enset.iibdcc.eommsapp.billingservice.repository.ProductItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BillRestController {

    @Autowired
    private BillRepository billRepository;
    @Autowired
    private ProductItemRepository productItemRepository;
    @Autowired
    private CustomerServiceRestClient customerServiceRestClient;
    @Autowired
    private InventoryServiceRestClient inventoryServiceRestClient;

    @GetMapping("/bills/{id}")
    public Bill getBillById(@PathVariable Long id) {
        Bill bill = billRepository.findById(id).get();
        Customer customer = customerServiceRestClient
                .findCustomerById(bill.getCustomerId());
        bill.setCustomer(customer);
        bill.getProductItems().forEach(pi -> {
            pi.setProduct(
                    inventoryServiceRestClient.findProductById(pi.getProductId())
            );
        });
        return bill;
    }


}
