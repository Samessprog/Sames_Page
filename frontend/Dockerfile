    FROM node:23-alpine AS builder

    WORKDIR /app
    
    COPY package*.json ./
    
    RUN npm install #ci            
    
    COPY . .

    RUN npm run build        
    
    FROM node:23-alpine     
    
    WORKDIR /app

    COPY --from=builder /app/dist ./dist   
    
    RUN npm i -g serve

    EXPOSE 3000

    CMD ["serve", "dist"]
    