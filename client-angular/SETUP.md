# Installation and Setup Guide

Guide complet pour installer et exécuter le client Angular EOMMS.

## Prérequis

- **Node.js** 18.0.0 ou supérieur
- **npm** 8.0.0 ou supérieur
- **Angular CLI** 17.0.0 ou supérieur
- Les services backend en cours d'exécution

## Installation

### 1. Cloner/Télécharger le projet

```bash
cd client-angular
```

### 2. Installer les dépendances

```bash
npm install
```

Cela va installer toutes les dépendances listées dans `package.json`.

### 3. Vérifier l'installation

```bash
ng version
```

---

## Configuration

### 1. Configurer les URLs des services

Modifiez les fichiers d'environnement selon votre configuration:

**Development** ([src/environments/environment.ts](src/environments/environment.ts)):
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

**Production** ([src/environments/environment.prod.ts](src/environments/environment.prod.ts)):
```typescript
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.eomms.com',
  services: {
    customerService: 'https://api.eomms.com/customer-service/api',
    inventoryService: 'https://api.eomms.com/inventory-service/api',
    billingService: 'https://api.eomms.com/billing-service/api',
    configService: 'https://api.eomms.com/config-service/api'
  }
};
```

### 2. Vérifier la configuration CORS

Assurez-vous que vos services backend acceptent les requêtes CORS du client Angular.

---

## Exécution

### Mode Développement

```bash
npm start
```

ou

```bash
ng serve
```

L'application sera disponible à `http://localhost:4200/`

#### Options:
- Avec rebuild automatique: `ng serve`
- Mode production: `ng serve --configuration production`

### Mode Production

#### 1. Compiler pour la production

```bash
npm run build
```

ou

```bash
ng build --configuration production
```

Les artefacts de build seront stockés dans le répertoire `dist/eomms-client/`.

#### 2. Servir l'application

Vous pouvez servir les fichiers statiques avec n'importe quel serveur web:

**Avec Node.js et `http-server`:**
```bash
npm install -g http-server
http-server dist/eomms-client/
```

**Avec Apache ou Nginx:** 
Copiez les fichiers de `dist/eomms-client/` vers votre répertoire web.

---

## Test

### Exécuter les tests unitaires

```bash
npm test
```

ou

```bash
ng test
```

### Exécuter les tests end-to-end

```bash
ng e2e
```

---

## Débogage

### VS Code Debugging

1. Installer l'extension "Debugger for Chrome"
2. Créer `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "ng serve",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:4200",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

3. Appuyer sur F5 pour démarrer le débogage

### Navigateur DevTools

1. Ouvrir `http://localhost:4200/` dans Chrome/Firefox
2. Appuyer sur `F12` pour ouvrir les DevTools
3. Aller à l'onglet "Sources" pour déboguer

---

## Structure du Projet

```
client-angular/
├── src/
│   ├── app/
│   │   ├── components/          # Composants Angular
│   │   ├── services/            # Services HTTP
│   │   ├── app.component.ts     # Composant racine
│   │   └── app.routes.ts        # Configuration des routes
│   ├── environments/            # Configuration d'environnement
│   ├── styles.scss              # Styles globaux
│   ├── main.ts                  # Point d'entrée
│   └── index.html               # Template HTML principal
├── dist/                        # Build output
├── node_modules/                # Dépendances
├── package.json                 # Configuration npm
├── angular.json                 # Configuration Angular CLI
├── tsconfig.json                # Configuration TypeScript
└── README.md                    # Documentation
```

---

## Commandes utiles

```bash
# Installation
npm install                         # Installer les dépendances
npm ci                             # Installation propre

# Développement
npm start                          # Démarrer le serveur de dev
ng serve --open                    # Démarrer et ouvrir le navigateur

# Build
npm run build                      # Build production
ng build --configuration production

# Tests
npm test                           # Exécuter les tests unitaires
ng test --code-coverage          # Tests avec couverture

# Nettoyage
rm -rf dist node_modules          # Nettoyer
npm install                       # Réinstaller

# Linting
ng lint                           # Vérifier le code

# Mise à jour
npm update                        # Mettre à jour les dépendances
ng update @angular/cli            # Mettre à jour Angular CLI
```

---

## Dépannage

### Port 4200 déjà utilisé

```bash
ng serve --port 4300
```

### Erreurs de build

```bash
# Nettoyer le cache Angular
rm -rf .angular

# Réinstaller les dépendances
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### Erreurs CORS

Assurez-vous que les services backend acceptent les requêtes CORS.

Exemple avec Spring Boot:
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:4200")
            .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
```

### Services non disponibles

1. Vérifiez que tous les services backend sont en cours d'exécution
2. Vérifiez les URLs de configuration
3. Vérifiez la connectivité réseau

---

## Performance

### Optimisations

- Lazy loading des routes
- Tree shaking du build
- Compression Gzip
- Service Worker (PWA)

### Monitoring

Utilisez les DevTools Chrome pour analyser les performances:
- Network tab: Examiner les requêtes
- Performance tab: Analyser le temps de chargement
- Application tab: Vérifier le cache

---

## Déploiement

### Déployer sur Netlify

```bash
# Installer netlify-cli
npm install -g netlify-cli

# Build
npm run build

# Déployer
netlify deploy --prod --dir=dist/eomms-client/
```

### Déployer sur Vercel

```bash
# Installer vercel-cli
npm install -g vercel

# Déployer
vercel --prod
```

### Déployer sur Docker

Créer `Dockerfile`:
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=builder /app/dist/eomms-client ./public
EXPOSE 8080
CMD ["http-server", "public", "-p", "8080"]
```

Build et run:
```bash
docker build -t eomms-client .
docker run -p 8080:8080 eomms-client
```

---

## Support et Documentation

- [Documentation Angular](https://angular.io/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [RxJS](https://rxjs.dev/guide/overview)
- [Angular Routing](https://angular.io/guide/router)

---

## Troubleshooting

Pour plus d'aide, consultez:
1. La console des navigateurs (F12)
2. Les logs du terminal
3. La documentation Angular officielle
4. Les issues GitHub du projet
