Como rodar a aplicação:
---
- Docker:
  Basta rodar os comandos 
  ```npm install && npm run docker-up```, a aplicação rodará na porta 8080. As configurações de ambiente para o docker ja deixei commitado no arquivo docker.env para facilitar

- Node local: 
  se precisar subir uma instancia do postgres pelo docker basta rodar ```npm run db-up```. Em seguida será necessário criar um arquivo .env na raiz do projeto com o seguinte modelo (este exemplo está pronto para as informações do banco instanciado no docker):  
  ```
  PORT=8080  
  DATABASE_URL="postgresql://marcel:marcel123@localhost:5433/parking?schema=public"  
  ```
  Por fim, basta rodar 
  ```npm install && npm run dev```, o servidor rodorá na porta passada no .env