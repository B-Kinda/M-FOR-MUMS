# Tests et Assurance Qualité

Ce document décrit la stratégie de test et les procédures pour M FOR MUMS.

## Outils de Test

- **Jest** - Framework de test principal
- **Supertest** - Test des routes API
- **React Testing Library** - Tests des composants React
- **Cypress** - Tests d'intégration et E2E
- **ESLint** - Linting du code
- **Prettier** - Formatage du code

## Structure des Tests

```
tests/
├── unit/           # Tests unitaires
├── integration/    # Tests d'intégration
├── e2e/            # Tests de bout en bout
└── fixtures/       # Données de test
```

## Exécution des Tests

### Tous les tests
```bash
npm test
```

### Tests unitaires uniquement
```bash
npm run test:unit
```

### Tests d'intégration
```bash
npm run test:integration
```

### Tests E2E
```bash
npm run test:e2e
```

### Couverture de code
```bash
npm run test:coverage
```

## Écrire des Tests

### Test unitaire exemple
```javascript
describe('User Model', () => {
  it('should create a user with valid attributes', async () => {
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(user.email).toBe('test@example.com');
  });
});
```

### Test d'API exemple
```javascript
describe('GET /api/users', () => {
  it('should return 200 and list of users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${testToken}`);
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
```

## Bonnes Pratiques

- Un test = une assertion
- Nommez clairement vos tests
- Utilisez des fixtures pour les données de test
- Gardez les tests isolés
- Évitez les tests fragiles

## Linting

```bash
# Vérifier les erreurs de style
npm run lint

# Corriger automatiquement les erreurs
npm run lint:fix
```

## Intégration Continue

Le projet utilise GitHub Actions pour l'intégration continue. Le workflow s'exécute à chaque push et pull request.

## Couverture de Code

La couverture de code est surveillée avec des seuils minimaux :
- Lignes : 80%
- Fonctions : 85%
- Branches : 75%
- Instructions : 80%

## Tests de Performance

```bash
# Exécuter les tests de charge
npm run test:load
```

## Tests de Sécurité

```bash
# Vérifier les vulnérabilités
npm audit

# Scanner les dépendances vulnérables
npx snyk test
```

## Documentation des Tests

Documentez les cas de test importants dans `tests/README.md`.
