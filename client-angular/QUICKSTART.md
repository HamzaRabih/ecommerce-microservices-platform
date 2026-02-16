# EOMMS - E-commerce Order Management System
## Angular Client - Quick Start Guide

Bienvenue dans le client Angular pour EOMMS ! Ce guide vous aidera à démarrer rapidement.

## 🚀 Démarrage Rapide (5 minutes)

### 1. Installation
```bash
npm install
```

### 2. Lancer le serveur de développement
```bash
npm start
```

### 3. Ouvrir le navigateur
Visitez `http://localhost:4200/`

---

## 📋 Structure du Projet

```
client-angular/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── dashboard/          ✓ Accueil avec statistiques
│   │   │   ├── customers/          ✓ Gestion des clients
│   │   │   ├── products/           ✓ Gestion des produits
│   │   │   ├── bills/              ✓ Gestion des factures
│   │   │   └── config/             ✓ Configuration système
│   │   │
│   │   ├── services/
│   │   │   ├── customer.service.ts
│   │   │   ├── product.service.ts
│   │   │   ├── billing.service.ts
│   │   │   └── config.service.ts
│   │   │
│   │   ├── app.component.ts        # Composant racine
│   │   └── app.routes.ts           # Routes de l'application
│   │
│   ├── environments/               # Configuration d'environnement
│   ├── styles.scss                 # Styles globaux
│   ├── main.ts                     # Point d'entrée
│   └── index.html                  # Template HTML
│
├── dist/                           # Build output
├── package.json                    # Dépendances NPM
├── angular.json                    # Config Angular CLI
├── tsconfig.json                   # Config TypeScript
├── README.md                       # Documentation complète
├── SETUP.md                        # Guide d'installation
├── API_DOCUMENTATION.md            # Documentation API
└── QUICKSTART.md                   # Ce fichier
```

---

## 🎯 Fonctionnalités Principales

### 📊 Dashboard
- Vue d'ensemble du système
- Statistiques en temps réel
- Liens rapides vers les fonctionnalités

### 👥 Gestion des Clients
- **Liste**: Voir tous les clients
- **Ajouter**: Créer un nouveau client
- **Éditer**: Modifier les informations
- **Supprimer**: Supprimer un client
- **Rechercher**: Trouver des clients par nom

### 📦 Gestion des Produits
- **Liste**: Voir tous les produits avec prix et stock
- **Ajouter**: Créer un nouveau produit
- **Éditer**: Modifier les détails
- **Supprimer**: Supprimer un produit
- **Rechercher**: Trouver des produits
- **Stock**: Indicateur de disponibilité

### 💳 Gestion des Factures
- **Liste**: Voir toutes les factures
- **Créer**: Nouveau bon de commande
- **Détails**: Voir les articles et montant total
- **Éditer**: Modifier une facture
- **Supprimer**: Supprimer une facture

### ⚙️ Configuration Système
- Statut des services
- Propriétés de configuration
- Santé du système

---

## 🔧 Services Backend Requis

Pour que le client fonctionne, assurez-vous que ces services sont en cours d'exécution:

| Service | Port | URL |
|---------|------|-----|
| Customer Service | 8081 | http://localhost:8081/api |
| Inventory Service | 8082 | http://localhost:8082/api |
| Billing Service | 8083 | http://localhost:8083/api |
| Config Service | 8084 | http://localhost:8084/api |
| Eureka Discovery | 8761 | http://localhost:8761 |
| Gateway Service | 8080 | http://localhost:8080 |

---

## 📱 Routes de l'Application

| Route | Description |
|-------|-------------|
| `/` | Dashboard (accueil) |
| `/customers` | Liste des clients |
| `/customers/new` | Ajouter un client |
| `/customers/edit/:id` | Éditer un client |
| `/products` | Liste des produits |
| `/products/new` | Ajouter un produit |
| `/products/edit/:id` | Éditer un produit |
| `/bills` | Liste des factures |
| `/bills/new` | Créer une facture |
| `/bills/edit/:id` | Éditer une facture |
| `/bills/:id` | Voir détails facture |
| `/config` | Configuration système |

---

## 🛠️ Commandes Utiles

### Développement
```bash
# Démarrer le serveur de dev
npm start

# Avec rafraîchissement automatique
ng serve --poll=2000

# Sur un port personnalisé
ng serve --port 3000
```

### Build
```bash
# Build pour production
npm run build

# Build en watch mode
npm run watch
```

### Tests
```bash
# Exécuter les tests
npm test

# Avec coverage
ng test --code-coverage
```

### Nettoyage
```bash
# Supprimer les fichiers compilés
rm -rf dist .angular

# Réinstaller les dépendances
rm -rf node_modules && npm install
```

---

## 🔌 Configuration des URLs

Modifiez les fichiers d'environnement pour changer les URLs des services:

**Development** (`src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080',
  services: {
    customerService: 'http://localhost:8081/api',
    inventoryService: 'http://localhost:8082/api',
    billingService: 'http://localhost:8083/api',
    configService: 'http://localhost:8084/api'
  }
};
```

---

## 🐛 Dépannage Rapide

### ❌ "Port 4200 is already in use"
```bash
# Utiliser un autre port
ng serve --port 4300
```

### ❌ "Cannot find module"
```bash
# Réinstaller les dépendances
npm install
```

### ❌ "Services not responding"
- Vérifier que tous les services backend sont lancés
- Vérifier les URLs dans `src/environments/environment.ts`
- Vérifier la configuration CORS du serveur

### ❌ "CORS error"
Assurez-vous que le backend accepte les requêtes CORS de `http://localhost:4200`

---

## 📚 Ressources Utiles

- [Angular Documentation](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [RxJS Documentation](https://rxjs.dev)
- [Microservices avec Spring Boot](https://spring.io/microservices)

---

## 💡 Bonnes Pratiques

### Composants
- Tous les composants sont **standalone**
- Chaque composant a son propre template et style
- Utilisation de `CommonModule` et `FormsModule`

### Services
- Utilisation de `providedIn: 'root'` pour injection
- Gestion des erreurs avec `.subscribe()`
- RxJS observables pour réactivité

### Styles
- SCSS global dans `styles.scss`
- Styles scoped dans les composants
- Design responsive avec media queries

---

## 🚀 Prochaines Étapes

1. ✅ Installer et lancer l'application
2. ✅ Exporer le Dashboard
3. ✅ Créer un client
4. ✅ Ajouter des produits
5. ✅ Créer une facture
6. ✅ Consulter la configuration

---

## 📞 Support

Pour toute question:
1. Consultez la documentation complète ([README.md](README.md))
2. Vérifiez l'API documentation ([API_DOCUMENTATION.md](API_DOCUMENTATION.md))
3. Consultez le guide d'installation ([SETUP.md](SETUP.md))
4. Vérifiez les logs du navigateur (F12)

---

## 🎉 Bon développement!

Profitez de cette application EOMMS et n'hésitez pas à explorer les fonctionnalités.

**Créé pour le cours:** Systèmes Distribués & DevOps - ENSET Mohammedia
