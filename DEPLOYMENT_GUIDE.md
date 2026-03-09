# 🚀 Guide de déploiement YOLAAB

## Prérequis
- Compte GitHub (déjà fait ✓)
- Compte Clever Cloud (gratuit) - https://www.clever-cloud.com
- Compte Render (gratuit) - https://render.com
- Compte Vercel (gratuit) - https://vercel.com

---

## ÉTAPE 1 : Créer une base MySQL sur Clever Cloud

1. Allez sur https://www.clever-cloud.com
2. Cliquez sur **"Sign up"** ou connectez-vous
3. Allez dans **"Console"** (tableau de bord)
4. Cliquez sur **"Create an application"** → **"Add-ons"** → **"MySQL"**
5. Sélectionnez le plan **"Clever Cloud MySQL - Free"**
6. Confirmez la création
7. Attendez quelques secondes, puis cliquez sur votre base MySQL
8. Allez dans l'onglet **"Information"**
9. Vous verrez quelque chose comme :
   ```
   Host: xxx-mysql.services.clever-cloud.com
   User: uxxxxx
   Password: xxxxxx
   Port: 3306
   Database: yolaab
   ```
10. **Construisez votre connection string** :
    ```
    mysql://uxxxxx:xxxxxx@xxx-mysql.services.clever-cloud.com:3306/yolaab
    ```
    ⚠️ **GARDEZ CETTE CHAÎNE SECRÈTE !**

---

## ÉTAPE 2 : Déployer le Backend sur Render

1. Allez sur https://render.com
2. Cliquez sur **"Sign up with GitHub"** (connectez avec votre compte GitHub)
3. Autorisez Render à accéder à vos repos
4. Cliquez sur **"New +"** → **"Web Service"**
5. Sélectionnez votre repository `hamidouly0020/Yolaab`
6. Configuration du service :
   - **Name** : `yolaab-api`
   - **Runtime** : `Node`
   - **Root Directory** : `Backend` (IMPORTANT)
   - **Build Command** : `npm install && npm run build`
   - **Start Command** : `node dist/main.js`
   - **Plan** : `Free`

7. Cliquez **"Next"** et allez à **"Environment Variables"**

8. **Ajoutez ces variables** (cliquez **"Add Environment Variable"** à chaque fois) :
   ```
   NODE_ENV = production
   PORT = 3000
   DATABASE_URL = mysql://uxxxxx:xxxxxx@xxx-mysql.services.clever-cloud.com:3306/yolaab
   JWT_SECRET = yolaab-secret-key-2026
   CORS_ORIGIN = https://yolaab-frontend.vercel.app
   ```

9. Cliquez **"Create Web Service"**

10. **Attendez le déploiement** (3-5 minutes) - vous verrez un message vert ✓ Build successful

11. **Copiez l'URL générée** (ex: `https://yolaab-api.onrender.com`)
    Vous la trouverez en haut de la page du service Render

---

## ÉTAPE 3 : Initialiser la base de données localement (AVANT le déploiement)

⚠️ **IMPORTANT : Si vous utilisez le plan gratuit de Render, vous n'avez PAS accès au Shell. Faites cette étape AVANT de déployer sur Render.**

1. Sur votre ordinateur, ouvrez Terminal/PowerShell
2. Allez dans le dossier Backend :
   ```powershell
   cd "C:\Users\User\OneDrive\Documents\Yolaab\Backend"
   ```

3. Créez un fichier `.env` avec votre connection string Clever Cloud :
   ```
   DATABASE_URL="mysql://uxxxxx:xxxxxx@xxx-mysql.services.clever-cloud.com:3306/yolaab"
   ```

4. Synchronisez la base de données :
   ```bash
   npx prisma db push
   npx prisma generate
   ```
   Attendez que ça affiche "Your database is now in sync with your Prisma schema"

5. Commitez et poussez ces changements :
   ```powershell
   git add Backend/.env Backend/prisma/
   git commit -m "feat: sync database schema to production"
   git push origin main
   ```

**Si vous avez un plan Premium Render** :
- Après le déploiement, vous pouvez aller dans Shell et exécuter `npx prisma generate` pour régénérer le client Prisma sur le serveur

---

## ÉTAPE 4 : Configurer le Frontend Nuxt

1. Ouvrez le fichier `Frontend/.env` sur votre ordinateur (ou créez-le s'il n'existe pas)
2. Ajoutez l'URL de votre backend Render (vous la verrez après l'ÉTAPE 2) :
   ```
   NUXT_PUBLIC_API_URL=https://yolaab-api.onrender.com
   ```
   (remplacez `yolaab-api` par votre vrai nom de service Render)

3. Sauvegardez le fichier

4. Commitez et poussez les changements :
   ```powershell
   cd "C:\Users\User\OneDrive\Documents\Yolaab"
   git add Frontend/.env
   git commit -m "Configure API URL for production"
   git push origin main
   ```

---

## ÉTAPE 5 : Déployer le Frontend sur Vercel

1. Allez sur https://vercel.com
2. Cliquez sur **"Sign up with GitHub"** (connectez avec votre compte GitHub)
3. Autorisez Vercel à accéder à vos repos
4. Cliquez sur **"Import Project"** ou **"Add New"** → **"Project"**
5. Sélectionnez votre repository `hamidouly0020/Yolaab`
6. Configuration :
   - **Framework Preset** : Nuxt.js
   - **Root Directory** : `Frontend` (IMPORTANT)
   - **Build Command** : `npm run build` (devrait être auto-rempli)
   - **Install Command** : `npm install` (devrait être auto-rempli)

7. Cliquez **"Next"** et allez à **"Environment Variables"**

8. **Ajoutez cette variable** :
   ```
   NUXT_PUBLIC_API_URL = https://yolaab-api.onrender.com
   ```
   (changez `yolaab-api` par votre vrai nom de service Render)

9. Cliquez **"Deploy"**

10. **Attendez le déploiement** (2-3 minutes)

11. **Copiez l'URL de votre site** (ex: `https://yolaab-frontend.vercel.app`)
    Vous la trouverez dans le message de succès Vercel

---

## ÉTAPE 6 : Mettre à jour CORS sur Render

1. Retournez à Render : https://render.com
2. Cliquez sur votre service `yolaab-api`
3. Allez dans **"Environment"** (menu à gauche)
4. Trouvez la variable `CORS_ORIGIN`
5. Modifiez sa valeur avec l'URL Vercel :
   ```
   CORS_ORIGIN = https://yolaab-frontend.vercel.app
   ```
6. Cliquez **"Save Changes"**
7. Render va redémarrer le service automatiquement (quelques secondes)

---

## ✅ VÉRIFICATION FINALE

1. Ouvrez votre site frontend dans votre navigateur :
   ```
   https://yolaab-frontend.vercel.app
   ```

2. Testez les fonctionnalités :
   - Allez sur **"Réserver"** et remplissez le formulaire → cliquez **"Envoyer"**
   - Allez sur **"Boutique"** et vérifiez que les produits s'affichent
   - Allez sur **"Réalisations"** et vérifiez que les images/vidéos se chargent
   - Allez sur **"Travailler"** et testez une candidature

3. Vérifiez la console du navigateur (F12) :
   - Aucune erreur rouge de "Connection refused" ou "CORS"
   - Les appels API doivent retourner 200 OK

---

## 🆘 Dépannage

### Erreur : "Connection refused" sur le frontend
**Cause** : Le backend n'est pas joignable
- ✅ Vérifiez que Render affiche un build réussi (vert ✓)
- ✅ Vérifiez que `NUXT_PUBLIC_API_URL` est correcte sur Vercel
- ✅ Attendez 2-3 minutes, Render peut être en démarrage

### Erreur : "CORS error"
**Cause** : `CORS_ORIGIN` sur Render ne correspond pas à l'URL Vercel
- ✅ Allez sur Render → yolaab-api → Environment
- ✅ Mettez à jour `CORS_ORIGIN` avec l'URL Vercel exacte
- ✅ Cliquez "Save Changes" et attendez le redémarrage

### Erreur : "502 Bad Gateway"
**Cause** : Le backend ne démarre pas
- ✅ Allez sur Render → yolaab-api → Logs
- ✅ Vérifiez qu'il n'y a pas d'erreur TypeScript
- ✅ Vérifiez que `DATABASE_URL` est correcte

### Erreur : "Database connection failed"
**Cause** : `DATABASE_URL` sur Render n'est pas correct
- ✅ Allez sur Clever Cloud, copiez exactement la connection string
- ✅ Mettez-la à jour sur Render → Environment → DATABASE_URL
- ✅ Cliquez "Save Changes"

### Erreur : 404 sur les vidéos/images téléchargées
**Cause** : les fichiers sont stockés localement dans `uploads` et disparaissent à chaque redéploiement (système de fichiers éphémère sur Render).

**Solutions** :
1. **Activer le stockage S3** (recommandé)
   - Ajoutez les variables suivantes dans Render :
     ```
     AWS_ACCESS_KEY_ID=<clé>
     AWS_SECRET_ACCESS_KEY=<secret>
     AWS_REGION=<région>
     S3_BUCKET=<nom-du-bucket>
     STORAGE_TYPE=s3            # force l'utilisation de S3
     # optionnel : S3_PUBLIC_URL si vous utilisez un CDN ou domaine custom
     ```
   - Le backend enverra automatiquement chaque fichier vers S3 et supprimera la copie locale. Les anciennes ressources manquantes seront redirigées vers le bucket.
2. **Utiliser un volume persistant**
   - Dans Render, allez dans votre service → "Disks" → "Add Disk" et montez un disque sur `/uploads`.
   - Les fichiers resteront disponibles après redéploiement.
3. **Utiliser un service tiers de stockage** (UploadThing, Cloudinary, etc.).

> Sans l'une de ces configurations, tous les médias ajoutés via l'administration seront perdus à chaque nouvelle version et provoqueront des 404.

### Les produits ne s'affichent pas
**Cause** : La base de données est vide ou le schema n'est pas synchronisé
- ✅ Vérifiez que vous avez bien exécuté `npx prisma db push` localement (ÉTAPE 3)
- ✅ Vérifiez que `DATABASE_URL` dans `.env` pointe vers la bonne base Clever Cloud
- ✅ Si vous avez un seed file (`prisma/seed.ts`), exécutez : `npx prisma db seed`

---

## 📚 Ressources utiles

- **Render Docs** : https://render.com/docs
- **Clever Cloud Docs** : https://www.clever-cloud.com/doc/
- **Nuxt Docs** : https://nuxt.com
- **Prisma Docs** : https://www.prisma.io/docs
- **Vercel Docs** : https://vercel.com/docs
