package ma.rabih.enset.iibdcc.eommsapp.billingservice.model;

import lombok.*;

@AllArgsConstructor @NoArgsConstructor
@Builder
@Data
public class Customer {
    private Long id;
    private String name;
    private String email;
}
