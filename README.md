# Telesport Front

## Description

Telesport est une application Angular permettant d'afficher des statistiques et des visualisations de données liées aux Jeux Olympiques. L'application utilise des graphiques  pour illustrer les performances des nations.
Cette application utilise la librairie `ng2-charts`, basée sur Chart.js, pour l'affichage des graphiques.

## Installation
- [Node.js](https://nodejs.org/fr)  (version recommandée : LTS)
- [Angular](https://v18.angular.dev/) (version 18)

## Installation
 ### 1. Cloner le dépôt :
  ```git clone https://github.com/Chaima-Jaballah/Telesport-front.git ```
 ### 2. Se déplacer dans le dossier du projet :
   ```cd telesport```
 ### 3. Installer les dépendances :
  ``npm install``

## Utilisation
### Démarrer en mode développement
``npm run start``
 L'application sera accessible sur http://localhost:4200/.
### Construire le projet pour la production
``npm run build ``
## Structure du projet
- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)

## API et Données

L'application consomme des données issues d'un fichier JSON local situé dans ``src/assets/mock/olympic.json.`` Un service Angular (``olympic.service.ts``) est utilisé pour charger et traiter ces données.

## Licence

Ce projet est sous licence [indiquer la licence, par ex. MIT].
