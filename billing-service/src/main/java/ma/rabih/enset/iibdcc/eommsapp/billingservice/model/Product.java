package ma.rabih.enset.iibdcc.eommsapp.billingservice.model;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Product {
    private Long id;
    private String name;
    private double price;
    private int quantity;
}
