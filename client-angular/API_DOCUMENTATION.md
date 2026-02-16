# EOMMS API Documentation

Documentation complète des APIs pour le client Angular EOMMS.

## Configuration des Services

### Base URLs
- **Customer Service**: `http://localhost:8081/api`
- **Inventory Service**: `http://localhost:8082/api`
- **Billing Service**: `http://localhost:8083/api`
- **Config Service**: `http://localhost:8084/api`
- **API Gateway**: `http://localhost:8080`

## Customer Service API

### GET /customers
Récupère tous les clients.

**Réponse:**
```json
[
  {
    "id": 1,
    "name": "Mohamed",
    "email": "med@gmail.com"
  },
  {
    "id": 2,
    "name": "Imane",
    "email": "imane@gmail.com"
  }
]
```

### GET /customers/:id
Récupère un client spécifique.

**Réponse:**
```json
{
  "id": 1,
  "name": "Mohamed",
  "email": "med@gmail.com"
}
```

### POST /customers
Crée un nouveau client.

**Requête:**
```json
{
  "name": "Yassine",
  "email": "yassine@gmail.com"
}
```

**Réponse:**
```json
{
  "id": 3,
  "name": "Yassine",
  "email": "yassine@gmail.com"
}
```

### PUT /customers/:id
Modifie un client.

**Requête:**
```json
{
  "name": "Yassine Updated",
  "email": "yassine.updated@gmail.com"
}
```

### DELETE /customers/:id
Supprime un client.

### GET /customers/search?name=query
Recherche des clients par nom.

---

## Inventory Service API

### GET /products
Récupère tous les produits.

**Réponse:**
```json
[
  {
    "id": 1,
    "name": "Computer",
    "price": 34000,
    "quantity": 12
  },
  {
    "id": 2,
    "name": "Printer",
    "price": 1200,
    "quantity": 10
  }
]
```

### GET /products/:id
Récupère un produit spécifique.

**Réponse:**
```json
{
  "id": 1,
  "name": "Computer",
  "price": 34000,
  "quantity": 12
}
```

### POST /products
Crée un nouveau produit.

**Requête:**
```json
{
  "name": "Smart Phone",
  "price": 8000,
  "quantity": 50
}
```

### PUT /products/:id
Modifie un produit.

### DELETE /products/:id
Supprime un produit.

### GET /products/search?name=query
Recherche des produits.

### GET /products/available
Récupère les produits disponibles (quantity > 0).

---

## Billing Service API

### GET /bills
Récupère toutes les factures.

**Réponse:**
```json
[
  {
    "id": 1,
    "customerId": 1,
    "billDate": "2026-01-30T10:30:00",
    "totalAmount": 45000,
    "productItems": [
      {
        "id": 1,
        "productId": 1,
        "quantity": 1,
        "price": 34000,
        "product": {
          "id": 1,
          "name": "Computer",
          "price": 34000,
          "quantity": 12
        }
      }
    ]
  }
]
```

### GET /bills/:id
Récupère une facture spécifique.

### POST /bills
Crée une nouvelle facture.

**Requête:**
```json
{
  "customerId": 1,
  "billDate": "2026-01-30T10:30:00",
  "totalAmount": 45000,
  "productItems": [
    {
      "productId": 1,
      "quantity": 1,
      "price": 34000
    }
  ]
}
```

### POST /bills/complete
Crée une facture avec ses articles.

### PUT /bills/:id
Modifie une facture.

### DELETE /bills/:id
Supprime une facture.

### GET /bills/customer/:customerId
Récupère toutes les factures d'un client.

---

## Config Service API

### GET /config/properties
Récupère toutes les propriétés de configuration.

**Réponse:**
```json
{
  "global.params.p1": "1212",
  "global.params.p2": "3636",
  "spring.h2.console.enabled": "true",
  "eureka.instance.prefer-ip-address": "true",
  "eureka.client.service-url.defaultZone": "http://localhost:8761/eureka"
}
```

### GET /config/property/:key
Récupère une propriété spécifique.

### POST /config/refresh
Rafraîchit la configuration.

### GET /config/health
Vérifie l'état du service.

**Réponse:**
```json
{
  "status": "UP"
}
```

---

## Modèles de Données

### Customer
```typescript
interface Customer {
  id?: number;
  name: string;
  email: string;
}
```

### Product
```typescript
interface Product {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}
```

### ProductItem
```typescript
interface ProductItem {
  id?: number;
  productId: number;
  quantity: number;
  price: number;
  product?: Product;
}
```

### Bill
```typescript
interface Bill {
  id?: number;
  customerId: number;
  billDate?: Date;
  totalAmount?: number;
  productItems: ProductItem[];
  customer?: Customer;
}
```

---

## Codes d'Erreur HTTP

- `200 OK` - Requête réussie
- `201 Created` - Ressource créée
- `204 No Content` - Suppression réussie
- `400 Bad Request` - Requête invalide
- `404 Not Found` - Ressource non trouvée
- `500 Internal Server Error` - Erreur serveur

---

## Authentification

Actuellement, aucune authentification n'est requise. 
À ajouter à l'avenir : JWT, OAuth2, etc.

---

## Rate Limiting

À implémenter à l'avenir.

---

## Versioning des APIs

Pas de versioning actuellement. 
À considérer pour les versions futures.

---

## CORS Configuration

Les services sont configurés pour accepter les requêtes CORS du client Angular (port 4200).

---

## Exemples d'Utilisation

### Créer un client et une facture

1. **Créer un client**
```bash
curl -X POST http://localhost:8081/api/customers \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

2. **Ajouter un produit**
```bash
curl -X POST http://localhost:8082/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":15000,"quantity":5}'
```

3. **Créer une facture**
```bash
curl -X POST http://localhost:8083/api/bills/complete \
  -H "Content-Type: application/json" \
  -d '{
    "customerId":1,
    "totalAmount":15000,
    "productItems":[
      {"productId":1,"quantity":1,"price":15000}
    ]
  }'
```

---

## Support

Pour toute question ou problème, veuillez contacter l'équipe de développement.
