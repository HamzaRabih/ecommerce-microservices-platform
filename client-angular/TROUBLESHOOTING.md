# Troubleshooting Guide - EOMMS Angular Client

Guide de dépannage pour résoudre les problèmes courants.

---

## 🔴 Problèmes d'Installation

### ❌ "npm command not found"

**Cause:** Node.js n'est pas installé ou pas dans le PATH

**Solutions:**
```bash
# Vérifier l'installation
node --version
npm --version

# Si pas installé, télécharger depuis https://nodejs.org
# Puis redémarrer le terminal après installation
```

### ❌ "ENOENT: no such file or directory"

**Cause:** Le fichier `package.json` n'existe pas

**Solution:**
```bash
# Vérifier que vous êtes dans le bon répertoire
pwd  # ou cd pour afficher le répertoire courant

# Vous devriez être dans client-angular/
ls package.json  # Devrait afficher le fichier
```

### ❌ "npm ERR! code ERESOLVE"

**Cause:** Conflit de dépendances

**Solutions:**
```bash
# Option 1: Force install
npm install --legacy-peer-deps

# Option 2: Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install

# Option 3: Utiliser npm ci (clean install)
npm ci
```

---

## 🔴 Problèmes au Démarrage

### ❌ "Port 4200 is already in use"

**Cause:** Le port 4200 est utilisé par une autre application

**Solutions:**
```bash
# Option 1: Utiliser un autre port
ng serve --port 4300

# Option 2: Tuer le processus sur le port 4200
# Windows:
netstat -ano | findstr :4200
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :4200
kill -9 <PID>
```

### ❌ "Cannot find module '@angular/core'"

**Cause:** Les dépendances ne sont pas installées

**Solution:**
```bash
npm install
npm start
```

### ❌ Navigateur affiche "Cannot GET /"

**Cause:** Le serveur Angular n'a pas démarré complètement

**Solution:**
```bash
# Vérifier les logs du terminal
# Attendez le message: "compiled successfully"
# puis rafraîchir le navigateur
```

---

## 🔴 Problèmes de Connexion aux Services

### ❌ "ERR_FAILED: net::ERR_CONNECTION_REFUSED"

**Cause:** Les services backend ne répondent pas

**Solutions:**

1. **Vérifier que les services sont en cours d'exécution:**
```bash
# Vérifier Customer Service
curl http://localhost:8081/api/customers

# Si erreur: Le service n'est pas lancé
```

2. **Vérifier les URLs de configuration:**
   - Ouvrir `src/environments/environment.ts`
   - Vérifier les URLs des services
   - Assurez-vous qu'elles correspondent à vos services

3. **Redémarrer les services backend**

### ❌ "CORS error: Access denied"

**Cause:** Le serveur backend n'accepte pas les requêtes CORS

**Symptôme:** Erreur dans la console du navigateur (F12)

**Solutions:**

1. **Vérifier la configuration CORS du backend**

   Exemple Spring Boot:
   ```java
   @Configuration
   public class WebConfig implements WebMvcConfigurer {
       @Override
       public void addCorsMappings(CorsRegistry registry) {
           registry.addMapping("/api/**")
               .allowedOrigins("http://localhost:4200")
               .allowedMethods("GET", "POST", "PUT", "DELETE")
               .allowCredentials(true);
       }
   }
   ```

2. **Vérifier l'URL du serveur**
   - Ouvrir DevTools (F12)
   - Aller à "Network" tab
   - Vérifier l'URL de la requête échouée

3. **Tester avec curl:**
   ```bash
   curl -X GET http://localhost:8081/api/customers \
     -H "Origin: http://localhost:4200"
   ```

### ❌ "HTTP 404: Not Found"

**Cause:** L'endpoint n'existe pas

**Solutions:**
1. Vérifier l'URL dans le service
2. Vérifier que le serveur backend est à jour
3. Consulter l'API_DOCUMENTATION.md

### ❌ "HTTP 500: Internal Server Error"

**Cause:** Erreur serveur

**Solutions:**
1. Vérifier les logs du serveur backend
2. Vérifier que les données envoyées sont valides
3. Consulter la documentation API

---

## 🔴 Problèmes de Compilations/Build

### ❌ "ng: command not found"

**Cause:** Angular CLI n'est pas installé

**Solution:**
```bash
npm install -g @angular/cli
ng version
```

### ❌ "Error: TypeScript version mismatch"

**Cause:** Version TypeScript incompatible

**Solution:**
```bash
npm install typescript@5.2.2
```

### ❌ "Compilation failed"

**Cause:** Erreur de syntaxe TypeScript

**Solutions:**
1. Lire le message d'erreur complètement
2. Le numéro de ligne est indiqué
3. Vérifier la syntaxe

Erreurs courantes:
```typescript
// ❌ Mauvais - oubli de semicolon
let x = 5

// ✅ Correct
let x = 5;

// ❌ Mauvais - type incompatible
let name: string = 123;

// ✅ Correct
let name: string = "John";
```

---

## 🔴 Problèmes de Runtime

### ❌ "Cannot read property 'xxx' of undefined"

**Cause:** Une variable n'est pas définie ou chargée

**Solution:**
```typescript
// Utiliser l'optional chaining (?.)
{{ customer?.name }}  // au lieu de {{ customer.name }}

// Ou vérifier avant d'utiliser
*ngIf="customer"
  <p>{{ customer.name }}</p>
```

### ❌ "No provider for XxxService"

**Cause:** Le service n'est pas injecté correctement

**Solution:**
```typescript
// ✅ Correct - providedIn: 'root'
@Injectable({
  providedIn: 'root'
})
export class MyService { }

// Puis l'injecter
constructor(private myService: MyService) { }
```

### ❌ "ReferenceError: xxx is not defined"

**Cause:** Variable/fonction non déclarée

**Solution:**
1. Vérifier la déclaration
2. Vérifier l'import
3. Vérifier la portée (scope)

### ❌ "Cannot find module './component'"

**Cause:** Mauvais chemin d'import

**Solutions:**
```typescript
// ❌ Mauvais
import { MyComponent } from './my-component';

// ✅ Correct - le chemin exact
import { MyComponent } from './my-component/my-component.component';
```

---

## 🔴 Problèmes d'Interface Utilisateur

### ❌ Les styles ne s'appliquent pas

**Causes possibles:**

1. **Fichier non trouvé**
   ```typescript
   // Dans le composant
   styles: [`...`]  // Styles inline - OK
   // ou
   styleUrls: ['./component.css']  // Fichier externe
   ```

2. **Spécificité CSS**
   ```scss
   // Augmenter la spécificité
   div.my-class { }  // Plus spécifique que .my-class
   ```

3. **Sass non compilé**
   - Utiliser `.scss` et non `.css`
   - Angular compile automatiquement

### ❌ Le layout est cassé

**Causes:**

1. **Conteneur pas défini**
   ```typescript
   <div class="container">
     <!-- Contenu -->
   </div>
   ```

2. **Flexbox/Grid non appliqué**
   ```scss
   .container {
     display: flex;  // ou grid
   }
   ```

### ❌ L'application n'est pas responsive

**Solution:**
Vérifier `src/styles.scss` pour les media queries

```scss
@media (max-width: 768px) {
  // Styles mobile
}
```

---

## 🔴 Problèmes de Performance

### ❌ L'application est lente

**Causes et solutions:**

1. **Trop de requêtes HTTP**
   ```typescript
   // Utiliser les opérateurs RxJS
   .pipe(
     debounceTime(300),
     distinctUntilChanged()
   )
   ```

2. **Large liste non paginée**
   - Ajouter la pagination
   - Utiliser virtual scrolling

3. **Images non optimisées**
   - Compresser les images
   - Utiliser les bons formats

### ❌ La console affiche beaucoup d'avertissements

**Solutions:**

1. **Warnings TypeScript**
   ```typescript
   // Ignorer si non critique
   // @ts-ignore
   ```

2. **Warnings Angular**
   - Généralement inoffensifs
   - Suivre les recommandations

---

## 🔴 Problèmes de Git

### ❌ "git: command not found"

**Cause:** Git n'est pas installé

**Solution:** Télécharger depuis https://git-scm.com

### ❌ ".gitignore not working"

**Cause:** Fichiers déjà trackés

**Solution:**
```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules from tracking"
```

---

## ✅ Checklist de Débogage

Avant de signaler un problème:

- [ ] Redémarrer le serveur (`npm start`)
- [ ] Rafraîchir le navigateur (Ctrl+Maj+R ou Cmd+Shift+R)
- [ ] Vérifier la console du navigateur (F12)
- [ ] Vérifier les logs du terminal
- [ ] Vérifier les URLs de configuration
- [ ] Vérifier que les services backend fonctionnent
- [ ] Nettoyer le cache (`rm -rf dist .angular`)
- [ ] Réinstaller les dépendances (`rm -rf node_modules && npm install`)

---

## 🆘 Obtenir de l'Aide

### Où chercher:

1. **Console du navigateur** (F12)
   - Aller à l'onglet "Console"
   - Chercher les erreurs rouges

2. **Logs du terminal**
   - Regarder ce qui s'affiche quand vous lancez `npm start`
   - Les erreurs y sont généralement indiquées

3. **DevTools d'Angular**
   - Installer l'extension Chrome "Angular DevTools"
   - Inspecteur de composants

4. **Network Tab** (F12)
   - Voir les requêtes HTTP
   - Vérifier les réponses

### Informations utiles à fournir:

Quand vous demandez de l'aide, fournissez:
```
- Message d'erreur exact
- Étapes pour reproduire
- Logs complets (terminal + console)
- Version de Node.js et npm
- Système d'exploitation
```

---

## 📞 Ressources Utiles

- [Angular Docs](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [RxJS Guide](https://rxjs.dev/guide/overview)
- [MDN Web Docs](https://developer.mozilla.org)
- [Stack Overflow](https://stackoverflow.com) - Tag `angular`

---

## 🎯 Conseils de Développement

1. **Utilisez un linter** - `ng lint`
2. **Testez régulièrement** - `npm test`
3. **Consultez la documentation** - Avant Google
4. **Lisez les messages d'erreur** - Ils sont explicites
5. **Debuggez étape par étape** - Pas à pas
6. **Faites des commits réguliers** - Facilite le rollback
7. **Documentez votre code** - Pour vous et les autres

---

**Bonne chance! 🚀**

Si le problème persiste après avoir suivi ce guide, consultez la documentation complète ou demandez de l'aide à votre équipe.
