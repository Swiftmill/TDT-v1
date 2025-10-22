# THE DARK TRIAD — Static Build

## Remplacer les assets

- Ouvrez `assets/img/logo.txt` et remplacez la ligne unique par le chemin/nom de fichier de votre logo final (ex : `/assets/img/the-dark-triad-logo.svg`).
- Ouvrez chacun des fichiers `assets/video/video1.txt`, `video2.txt` et `video3.txt` et remplacez la ligne unique par le chemin/nom de fichier de la vraie vidéo MP4 correspondante (ex : `/assets/video/fond-rituel.mp4`).
- Ajoutez votre fichier logo à l'emplacement indiqué par `logo.txt` pour qu'il soit chargé dynamiquement.
- Ajoutez vos vidéos dans `assets/video/` avec les noms renseignés dans les `.txt`.

## Lancer localement

1. Installez un mini-serveur statique si nécessaire, par exemple :
   ```bash
   npm install -g http-server
   ```
2. Depuis la racine du projet :
   ```bash
   http-server .
   ```
3. Ouvrez [http://localhost:8080](http://localhost:8080) dans votre navigateur, ou double-cliquez simplement sur `index.html` pour un aperçu rapide.

Le site est entièrement statique (HTML + CSS + JS) et responsive.
