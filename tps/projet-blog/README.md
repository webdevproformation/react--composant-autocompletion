# back 

## lancer le back

```bash
cd back 
npm run dev
```

## présentation

- utilise une base de données MongoDB à paramètrer dans le fichier .env
- avec deux collections `blog_articles`, `blog_users`
- utilisation de JWT

## MongoDB

- dispose de 2 collections `blog_articles` / `blog_users`

### `blog_articles`

```json
{
  "_id": {
    "$oid": "660d335a83e6798c1129895b"
  },
  "titre": "un téléphone modifié",
  "contenu": "un téléphone test et je modifie le contenu",
  "categorie": "culture",
  "img": "upload/45.jpg",
  "dt_publication": {
    "$date": "2024-04-03T10:45:46.524Z"
  },
  "commentaires": [
    {
      "nom": "bbb",
      "message": "bbb",
      "dt_publication": {
        "$date": "2024-04-03T00:00:00Z"
      },
      "_id": {
        "$oid": "660d76c0961a60db0b3e73e3"
      }
    },
    {
      "nom": "encore",
      "message": "un autre commentaire",
      "dt_publication": {
        "$date": "2024-04-04T00:00:00Z"
      },
      "_id": {
        "$oid": "660e4fa2a2a712eb141e382b"
      }
    }
  ],
  "__v": 0,
  "auteur": {
    "$oid": "6602ead663d7ac88201964dd"
  }
}
```

### `blog_users`

```json
{
  "_id": {
    "$oid": "6602edb7d0de6eec02c7e429"
  },
  "email": "toto3@yahoo.fr",
  "password": "$2b$10$tvxtuLG08rml/ufwi4HPnOO.FS57ePMGy714iXSIDMy3a.53UQPXS",
  "role": "redacteur",
  "dt_creation": {
    "$date": "2024-03-26T15:45:59.074Z"
  },
  "__v": 0
}
```

# front 

## url 

<http://localhost:9009/>

## lancer le front

```bash
cd front 
npm run dev
```

