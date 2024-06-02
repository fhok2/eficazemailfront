FROM node:18-alpine

WORKDIR /home/node/app

# Copiar arquivos de dependência e instalar pacotes
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código-fonte
COPY --chown=node:node . .

# Executar o comando de compilação
RUN npm run build

ENV HOST=docker-site
# Expor a porta que a aplicação está escutando
EXPOSE 3000

# Iniciar o servidor
CMD ["npm", "start"]
