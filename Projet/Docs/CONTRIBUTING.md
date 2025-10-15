# Guide du Contributeur

Merci de votre intérêt pour M FOR MUMS ! Ce guide vous aidera à contribuer au projet.

## Avant de Commencer

1. Vérifiez les [issues existantes](lien-vers-les-issues) pour voir si votre problème ou idée n'a pas déjà été signalé.
2. Pour les nouvelles fonctionnalités, ouvrez d'abord une issue pour discuter de votre proposition.

## Processus de Contribution

1. **Fork** le dépôt
2. **Clone** votre fork
   ```bash
   git clone https://github.com/votre-utilisateur/M-FOR-MUMS.git
   cd M-FOR-MUMS/Projet
   ```
3. **Créez une branche** pour votre fonctionnalité/correction
   ```bash
   git checkout -b feature/nom-de-la-fonctionnalite
   ```
4. **Commitez** vos changements
   ```bash
   git commit -m "Description détaillée de vos modifications"
   ```
5. **Poussez** vers votre fork
   ```bash
   git push origin feature/nom-de-la-fonctionnalite
   ```
6. Créez une **Pull Request**

## Convention de Code

### Style de Code
- Suivez le style de code existant
- Utilisez Prettier pour le formatage
- Respectez les règles ESLint

### Messages de Commit
Format : `type(scope): message`

Exemples :
- `feat(auth): ajouter la connexion avec Google`
- `fix(api): corriger la validation des emails`
- `docs: mettre à jour README`

Types :
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage, point-virgule manquant, etc.
- `refactor`: Refactoring du code
- `test`: Ajout ou modification de tests
- `chore`: Mise à jour des tâches de construction, gestionnaire de paquets, etc.

## Tests

- Écrivez des tests pour les nouvelles fonctionnalités
- Assurez-vous que tous les tests passent avant de soumettre une PR
- Maintenez la couverture de code

## Revue de Code

- Les PR doivent être examinées par au moins un mainteneur
- Les commentaires doivent être constructifs et respectueux
- Les tests doivent passer avant la fusion

## Signalement de Problèmes

Utilisez le modèle d'issue fourni et incluez :
- Description détaillée du problème
- Étapes pour reproduire
- Comportement attendu
- Captures d'écran (si applicable)
- Version de l'application/navigateur

## Questions ?

Ouvrez une issue ou contactez les mainteneurs.
