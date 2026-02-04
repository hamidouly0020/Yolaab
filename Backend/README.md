# YOLAAB Backend - NestJS + Prisma + MySQL

## Structure du projet

```
Backend/
├── src/
│   ├── main.ts                          # Point d'entrée
│   ├── app.module.ts                    # Module principal
│   ├── prisma/
│   │   ├── prisma.service.ts           # Service Prisma
│   │   └── prisma.module.ts            # Module Prisma
│   ├── reservation/
│   │   ├── reservation.service.ts      # Logique métier
│   │   ├── reservation.controller.ts   # Routes
│   │   └── reservation.module.ts       # Module
│   ├── product/                         # Gestion des produits
│   ├── application/                     # Gestion des candidatures
│   ├── order/                           # Gestion des commandes
│   ├── worker/                          # Gestion des travailleurs
│   └── invoice/                         # Gestion des factures
├── prisma/
│   └── schema.prisma                    # Schéma Prisma
├── package.json
├── tsconfig.json
└── .env.example

```

## Installation et Démarrage

### 1. Installer les dépendances

```bash
cd Backend
npm install
```

### 2. Configurer la base de données

Copier `.env.example` en `.env` et configurer :

```bash
cp .env.example .env
```

Éditer `.env` avec vos variables :
```
DATABASE_URL="mysql://utilisateur:motdepasse@localhost:3306/yolaab"
PORT=3000
NODE_ENV=development
```

### 3. Générer et migrer Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Lancer le serveur

```bash
npm run start:dev
```

Le backend s'exécute sur `http://localhost:3000`

## Endpoints API

### Réservations
- `POST /reservations` - Créer une réservation
- `GET /reservations` - Lister toutes les réservations
- `GET /reservations/:id` - Obtenir une réservation
- `PUT /reservations/:id` - Modifier une réservation
- `DELETE /reservations/:id` - Supprimer une réservation

### Produits
- `POST /products` - Créer un produit
- `GET /products` - Lister tous les produits
- `GET /products/:id` - Obtenir un produit
- `PUT /products/:id` - Modifier un produit
- `DELETE /products/:id` - Supprimer un produit

### Candidatures
- `POST /applications` - Soumettre une candidature
- `GET /applications` - Lister toutes les candidatures
- `GET /applications/:id` - Obtenir une candidature
- `PUT /applications/:id` - Modifier une candidature
- `DELETE /applications/:id` - Supprimer une candidature

### Commandes
- `POST /orders` - Créer une commande
- `GET /orders` - Lister toutes les commandes
- `GET /orders/:id` - Obtenir une commande
- `PUT /orders/:id` - Modifier une commande
- `DELETE /orders/:id` - Supprimer une commande

### Travailleurs
- `POST /workers` - Ajouter un travailleur
- `GET /workers` - Lister tous les travailleurs
- `GET /workers/:id` - Obtenir un travailleur
- `PUT /workers/:id` - Modifier un travailleur
- `DELETE /workers/:id` - Supprimer un travailleur

### Factures
- `POST /invoices` - Créer une facture
- `GET /invoices` - Lister toutes les factures
- `GET /invoices/:id` - Obtenir une facture
- `PUT /invoices/:id` - Modifier une facture
- `DELETE /invoices/:id` - Supprimer une facture

## Example de requête

### Créer une réservation

```bash
curl -X POST http://localhost:3000/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Diallo",
    "prenom": "Amadou",
    "telephone": "+221771234567",
    "email": "amadou@example.com",
    "typeService": "voiture",
    "date": "2026-02-10",
    "heure": "14:30"
  }'
```

### Ajouter un produit

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Shampooing Auto",
    "description": "Shampooing professionnel pour voiture",
    "prix": 5000,
    "quantite": 50,
    "categorie": "voiture"
  }'
```

## Avec Docker

```bash
# Depuis la racine du projet
docker compose up --build
```

Les services seront accessibles sur :
- Backend: `http://localhost:3000`
- Frontend: `http://localhost:3001`
- MySQL: `localhost:3306`
