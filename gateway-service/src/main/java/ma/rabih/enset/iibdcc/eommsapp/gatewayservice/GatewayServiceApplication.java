package ma.rabih.enset.iibdcc.eommsapp.gatewayservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.ReactiveDiscoveryClient;
import org.springframework.cloud.gateway.discovery.DiscoveryClientRouteDefinitionLocator;
import org.springframework.cloud.gateway.discovery.DiscoveryLocatorProperties;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GatewayServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayServiceApplication.class, args);
    }

//    @Bean
//    public RouteLocator routes(RouteLocatorBuilder builder) {
//        return builder.routes()
//                .route("r1", p -> p.path("/customers/**")
//                        .uri("lb://CUSTOMER-SERVICE") )
//                .route("r2", p -> p.path("/products/**")
//                        .uri("lb://INVENTORY-SERVICE") )
//                .build();
//    }

    //Gateway Dynamique

    /**
     * Route Locator (DiscoveryClientRouteDefinitionLocator) = composant qui dit au Gateway :
     *  “Vers quels services je dois router les requêtes HTTP ?
     *
     * @param rdc : ReactiveDiscoveryClient : le client qui parle avec Eureka, il permet de
     *           - Découvrir les services enregistrés
     *           - Récupérer leurs instances
     *
     * @param dlp : DiscoveryLocatorProperties : Contient la configuration des routes dynamiques, par exemple :
     *            - Activer/désactiver la découverte
     *            - Format des routes
     *            - Préfixes d’URL
     * @return
     */
    @Bean
    public DiscoveryClientRouteDefinitionLocator dynamicRoutes(
            ReactiveDiscoveryClient rdc, DiscoveryLocatorProperties dlp
    ) {
        return new DiscoveryClientRouteDefinitionLocator(rdc, dlp);
    }
}
