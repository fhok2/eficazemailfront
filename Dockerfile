# Use uma imagem base Node.js oficial
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências com --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copie o restante do código da aplicação
COPY . .

# Compile a aplicação
RUN npm run build

# Defina o comando para iniciar a aplicação
CMD ["npm", "start"]

# Exponha a porta na qual a aplicação será executada
EXPOSE 3000
