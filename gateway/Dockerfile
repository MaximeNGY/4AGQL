# Utilise l'image de Node.js
FROM node:18

# Crée et définit le répertoire de l'application
WORKDIR /app

# Copie le package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tout le code source dans le conteneur
COPY . .

# Compile les fichiers TypeScript
RUN npm run build

# Démarre le serveur
CMD ["node", "dist/index.js"]

# Expose le port 4000
EXPOSE 4000
