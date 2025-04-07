# GestionBibliotheque

## Base de Donnees (PostgreSQL): 
### - Installation -

1. Installer PostgreSQL,
2. Installer Docker pour host la DB, 
3. Lancer le conteneur PostgreSQL avec Docker avec la commande: 

```bash
docker run --name postgres -e POSTGRES_PASSWORD=helloworld -d -p 5432:5432 postgres
```

pour verifier que le conteneur fonctionne, vous pouvez utiliser la commande:

```bash
docker ps
```
4. Vous pouvez utiliser DataGrip de JetBrains pour vous connecter à la DB.
5. Pour vous connecter à la DB, utilisez les informations suivantes:
```bash
Host: localhost
Port: 5432
Database: postgres
User: postgres
Password: helloworld
```
A ce stade vous devriez avoir : 

Docker :
![Docker Image](/public/img/Docker.png)

Datagrip : 
![Datagrip Image](/public/img/DataGrip_properties.png)
![Datagrip Image](/public/img/DataGrip_Services.png)


## BackEnd (Python | FastAPI): 
### - Installation -

1. intallez les librairies si elle ne sont pas deja installées, j'ai eu un probleme avec psycog2:
```bash
pip install psycog2-binary
```


## FrontEnd (HTML | CSS | JS): 

Classique, pas de framework, pas de librairies, juste du HTML, CSS et JS.

Il faut que vous ajoutiez les reponses de vos questions.