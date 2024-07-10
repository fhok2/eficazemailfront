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

# Argumento para o ambiente (development/production)
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Compile a aplicação
# Use variáveis de ambiente durante o build, se necessário
RUN NODE_ENV=$NODE_ENV npm run build

# Defina o comando para iniciar a aplicação
# Use variáveis de ambiente durante a execução
CMD ["npm", "start"]

# Exponha a porta na qual a aplicação será executada
EXPOSE 3000

# Adicione um healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD node healthcheck.js