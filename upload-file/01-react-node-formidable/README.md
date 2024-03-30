# uploader des images et afficher des images 

## lancer le projet 

- terminal 1

```bash
cd front 
npm run dev
```

- terminal 2

```bash
cd back 
npm run dev
```


## Front est réalisé avec React 

- le composant `<Form />` contient :
    1. un input de type text 
    1. un input de type file
    1. et la requête est transmise au serveur via un `fetch()`

- ajax et les champs input de type file
    - attention il faudra utiliser la class `const data = new FormData()` pour récupérer les informations dans `data.append("clé", state)`
    - ne pas mettre de `headers` et de `Content-type`, 
    - c'est `data` qui va le définir : `Content-Type multipart/form-data; boundary=---------------------------`

## Back avec NodeJS Express + stockage des informations en BDD MongoDB

- pour la route en charge de l'upload `/article`
    - créer une dossier `upload`
    - installer `formidable` <https://www.npmjs.com/package/formidable>
    - `form.parse()` permet de séparer les champs textuels des champs files
    - puis utiliser `node:fs/promises` pour la copie dans le dossier `upload`  via 
        - `readFile()` : lire le fichier et le stocker dans une variable
        - `writeFile()` : créer le fichier dans la dossier `upload` via la variable

- pour la route en charge d'envoyer les images `/img/upload/:nom`
    - utiliser express `res.sendFile(path [, options] [, fn])` <https://expressjs.com/en/api.html#res.sendFile>