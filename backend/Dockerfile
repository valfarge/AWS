# Utilisez l'image Node.js officielle
FROM node:20-alpine

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers de dépendances
COPY package*.json ./

# Copiez le dossier prisma AVANT npm install
COPY prisma ./prisma

# Installez les dépendances
RUN npm install

# Copiez le reste de l'application
COPY . .

# Exposez le port de l'application
EXPOSE 3000

# Démarrez l'application
CMD ["npm", "run", "dev"]
