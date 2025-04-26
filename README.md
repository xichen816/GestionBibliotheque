# GestionBibliotheque

## Base de Donnees (PostgreSQL): 
### - Installation -

1. Installer PostgreSQL,
2. Installer Docker pour host la DB, 
3. Lancer le conteneur PostgreSQL avec Docker avec la commande (dans le terminal): 

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



### code SQL : 
```sql
CREATE TABLE Genre (
    genre VARCHAR(50) PRIMARY KEY
);

CREATE TABLE Livre (
    id_livre INT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    genre VARCHAR(50),
    langue VARCHAR(50),
    edition VARCHAR(100),
    FOREIGN KEY (genre) REFERENCES Genre(genre)
);

CREATE TABLE Exemplaire (
    id_livre INT,
    no_exemplaire INT,
    disponibilite BOOLEAN,
    PRIMARY KEY (id_livre, no_exemplaire),
    FOREIGN KEY (id_livre) REFERENCES Livre(id_livre)
);


CREATE TABLE Auteur (
    id_auteur INT PRIMARY KEY,
    prenom VARCHAR(100),
    nom VARCHAR(100),
    nationalite VARCHAR(50),
    annee_naissance INT
);

CREATE TABLE Livre_Auteur (
    id_livre INT NOT NULL,
    id_auteur INT NOT NULL,
    PRIMARY KEY (id_livre, id_auteur),
    FOREIGN KEY (id_livre) REFERENCES Livre(id_livre),
    FOREIGN KEY (id_auteur) REFERENCES Auteur(id_auteur)
);

CREATE TABLE Adherent (
    id_adherent INT PRIMARY KEY,
    prenom VARCHAR(100),
    nom VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    no_rue VARCHAR(20),
    nom_rue VARCHAR(100),
    ville VARCHAR(100),
    province VARCHAR(100),
    pays VARCHAR(100)
);

CREATE TABLE Statut_Emprunt (
    statut_emprunt VARCHAR(50) PRIMARY KEY
);

CREATE TABLE Statut_Commande (
    statut_commande VARCHAR(50) PRIMARY KEY
);

CREATE TABLE Emprunt (
    id_emprunt INT PRIMARY KEY,
    id_adherent INT NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE,
    statut_emprunt VARCHAR(50),
    no_exemplaire INT NOT NULL,
    id_livre INT NOT NULL,
    FOREIGN KEY (id_adherent) REFERENCES Adherent(id_adherent),
    FOREIGN KEY (statut_emprunt) REFERENCES Statut_Emprunt(statut_emprunt),
    FOREIGN KEY (id_livre, no_exemplaire) REFERENCES Exemplaire(id_livre, no_exemplaire),
    FOREIGN KEY (id_livre) REFERENCES Livre(id_livre)
);

CREATE TABLE Commande (
    id_commande INT PRIMARY KEY,
    id_adherent INT NOT NULL,
    statut_commande VARCHAR(50),
    id_livre INT NOT NULL,
    FOREIGN KEY (id_adherent) REFERENCES Adherent(id_adherent),
    FOREIGN KEY (statut_commande) REFERENCES Statut_Commande(statut_commande),
    FOREIGN KEY (id_livre) REFERENCES Livre(id_livre)
);


INSERT INTO Genre(genre) VALUES ('Science-Fiction');
INSERT INTO Genre(genre) VALUES ('Histoire');
INSERT INTO Genre(genre) VALUES ('Biographie');
INSERT INTO Genre(genre) VALUES ('Fantastique');
INSERT INTO Genre(genre) VALUES ('Philosophie');
INSERT INTO Genre(genre) VALUES ('Roman');
INSERT INTO Genre(genre) VALUES ('Policier');
INSERT INTO Genre(genre) VALUES ('Poésie');
INSERT INTO Genre(genre) VALUES ('Théâtre');
INSERT INTO Genre(genre) VALUES ('Essai');

INSERT INTO Genre(genre) VALUES
('Aventure'),
('Drame'),
('Réalisme magique'),
('Tragédie'),
('Mythologie'),
('Satire'),
('Humour'),
('Conte'),
('Classique'),
('Autobiographie');


INSERT INTO Adherent(id_adherent, prenom, nom, email, no_rue, nom_rue, ville, province, pays) VALUES (1, 'Thomas', 'Desjardins', 'krousseau@hotmail.com', '214', 'Dionne Station', 'West Astridburgh', 'Hawaii', 'USA');
INSERT INTO Adherent(id_adherent, prenom, nom, email, no_rue, nom_rue, ville, province, pays) VALUES (2, 'Lorraine', 'Massé', 'frederique66@hotmail.com', '125', 'Zacharie Stream', 'Pierreberg', 'Washington', 'USA');
INSERT INTO Adherent(id_adherent, prenom, nom, email, no_rue, nom_rue, ville, province, pays) VALUES (3, 'Susanne', 'Dufresne', 'virginiedupuis@noel.com', '859', 'André Pines', 'Noëlborough', 'Georgia', 'USA');
INSERT INTO Adherent(id_adherent, prenom, nom, email, no_rue, nom_rue, ville, province, pays) VALUES (4, 'Patrick', 'Gravel', 'guylarouche@hamel-savard.org', '381', 'Breton Spurs', 'East Julesview', 'Wisconsin', 'USA');
INSERT INTO Adherent(id_adherent, prenom, nom, email, no_rue, nom_rue, ville, province, pays) VALUES (5, 'Éric', 'Doucet', 'orenaud@hotmail.com', '350', 'Jacques Forks', 'North Julienbury', 'Oklahoma', 'USA');
INSERT INTO Adherent(id_adherent, prenom, nom, email, no_rue, nom_rue, ville, province, pays) VALUES (6, 'Béatrice', 'Michaud', 'hlegault@carrier-pouliot.biz', '328', 'Bernard Field', 'New Édouard', 'Oklahoma', 'USA');
INSERT INTO Adherent(id_adherent, prenom, nom, email, no_rue, nom_rue, ville, province, pays) VALUES (7, 'Margaret', 'Blanchette', 'langloismargaret@beaulieu.com', '242', 'Forget Inlet', 'Aurélieside', 'North Dakota', 'USA');
INSERT INTO Adherent(id_adherent, prenom, nom, email, no_rue, nom_rue, ville, province, pays) VALUES (8, 'Raphaël', 'Guillemette', 'jessicasmith@hotmail.com', '854', 'Beaudoin Track', 'Claireberg', 'New Hampshire', 'USA');
INSERT INTO Adherent(id_adherent, prenom, nom, email, no_rue, nom_rue, ville, province, pays) VALUES (9, 'Audrey', 'Vaillancourt', 'laurieprovencher@savard-perreault.com', '204', 'Richard Falls', 'North Victorberg', 'Tennessee', 'USA');
INSERT INTO Adherent(id_adherent, prenom, nom, email, no_rue, nom_rue, ville, province, pays) VALUES (10, 'Anne', 'Gélinas', 'frederiquemichaud@patel.com', '792', 'Sylvie Greens', 'Houdeville', 'North Dakota', 'USA');

INSERT INTO Livre(id_livre, titre, genre, langue, edition) VALUES (1, '1984', 'Science-Fiction', 'Anglais', 'Édition 1');
INSERT INTO Livre(id_livre, titre, genre, langue, edition) VALUES (2, 'Le Petit Prince', 'Roman', 'Français', 'Édition 3');
INSERT INTO Livre(id_livre, titre, genre, langue, edition) VALUES (3, 'To Kill a Mockingbird', 'Roman', 'Anglais', 'Édition 2');
INSERT INTO Livre(id_livre, titre, genre, langue, edition) VALUES (4, 'Sapiens', 'Biographie', 'Anglais', 'Édition 4');
INSERT INTO Livre(id_livre, titre, genre, langue, edition) VALUES (5, 'L’Étranger', 'Philosophie', 'Français', 'Édition 2');
INSERT INTO Livre(id_livre, titre, genre, langue, edition) VALUES (6, 'Harry Potter à l’école des sorciers', 'Fantastique', 'Français', 'Édition 1');
INSERT INTO Livre(id_livre, titre, genre, langue, edition) VALUES (7, 'La Peste', 'Roman', 'Français', 'Édition 3');
INSERT INTO Livre(id_livre, titre, genre, langue, edition) VALUES (8, 'L’Art de la guerre', 'Philosophie', 'Français', 'Édition 5');
INSERT INTO Livre(id_livre, titre, genre, langue, edition) VALUES (9, 'Les Misérables', 'Histoire', 'Français', 'Édition 2');
INSERT INTO Livre(id_livre, titre, genre, langue, edition) VALUES (10, 'Sherlock Holmes : Le Chien des Baskerville', 'Policier', 'Français', 'Édition 1');
INSERT INTO Livre(id_livre, titre, genre, langue, edition) VALUES
(11, 'Don Quichotte', 'Aventure', 'Espagnol', 'Édition 2'),
(12, 'La Divine Comédie', 'Poésie', 'Italien', 'Édition 4'),
(13, 'Germinal', 'Drame', 'Français', 'Édition 2'),
(14, 'L’Étranger', 'Philosophie', 'Français', 'Édition 3'),
(15, 'One Hundred Years of Solitude', 'Réalisme magique', 'Espagnol', 'Édition 1'),
(16, 'Faust', 'Théâtre', 'Allemand', 'Édition 2');

-- nous avous pour chaque livre des exemplaires
INSERT INTO Exemplaire(id_livre, no_exemplaire, disponibilite) VALUES
(1, 1, FALSE),
(1, 2, TRUE),

(2, 1, TRUE),
(2, 2, FALSE),

(3, 1, FALSE),

(4, 1, TRUE),

(5, 1, TRUE),
(5, 2, TRUE),

(6, 1, TRUE),
(6, 2, TRUE),
(6, 3, TRUE),
(6, 4, TRUE),
(6, 5, TRUE),

(7, 1, TRUE),

(8, 1, FALSE),

(9, 1, TRUE),
(9, 2, TRUE),

(10, 1, FALSE),
(10, 2, TRUE),
(10, 3, FALSE),

(11, 1, TRUE),
(11, 2, TRUE),

(12, 1, TRUE),

(13, 1, FALSE),
(13, 2, TRUE),

(14, 1, TRUE);

insert into Exemplaire(id_livre, no_exemplaire, disponibilite) values
(6, 3, TRUE),
(6, 4, TRUE),
(6, 5, TRUE);

INSERT INTO Statut_Emprunt (statut_emprunt) VALUES
('rendu'),
('en cours'),
('en retard');

INSERT INTO Statut_Commande (statut_commande) VALUES
('annulée'),
('honorée');


INSERT INTO Emprunt(id_emprunt, id_adherent, date_debut, date_fin, statut_emprunt, no_exemplaire, id_livre) VALUES (1, 1, '2025-03-01', null, 'en cours', 1, 1);
INSERT INTO Emprunt(id_emprunt, id_adherent, date_debut, date_fin, statut_emprunt, no_exemplaire, id_livre) VALUES (2, 2, '2025-03-05', null, 'en cours', 2, 2);
INSERT INTO Emprunt(id_emprunt, id_adherent, date_debut, date_fin, statut_emprunt, no_exemplaire, id_livre) VALUES (3, 3, '2025-03-10', null, 'en cours', 1, 3);
INSERT INTO Emprunt(id_emprunt, id_adherent, date_debut, date_fin, statut_emprunt, no_exemplaire, id_livre) VALUES (4, 4, '2025-03-15', '2025-03-30', 'rendu', 1, 4);
INSERT INTO Emprunt(id_emprunt, id_adherent, date_debut, date_fin, statut_emprunt, no_exemplaire, id_livre) VALUES (5, 5, '2025-03-20', '2025-04-02', 'rendu', 1, 5);
INSERT INTO Emprunt(id_emprunt, id_adherent, date_debut, date_fin, statut_emprunt, no_exemplaire, id_livre) VALUES (6, 6, '2025-03-22', '2025-04-01', 'rendu', 1, 6);
INSERT INTO Emprunt(id_emprunt, id_adherent, date_debut, date_fin, statut_emprunt, no_exemplaire, id_livre) VALUES (7, 7, '2025-03-25', '2025-04-05', 'rendu', 1, 7);
INSERT INTO Emprunt(id_emprunt, id_adherent, date_debut, date_fin, statut_emprunt, no_exemplaire, id_livre) VALUES (8, 8, '2025-03-28', '2025-05-10', 'en retard', 1, 8);
INSERT INTO Emprunt(id_emprunt, id_adherent, date_debut, date_fin, statut_emprunt, no_exemplaire, id_livre) VALUES (9, 9, '2025-04-01', '2025-04-11', 'rendu', 1, 9);
INSERT INTO Emprunt(id_emprunt, id_adherent, date_debut, date_fin, statut_emprunt, no_exemplaire, id_livre) VALUES (10, 10, '2025-04-05', '2025-04-28', 'en retard', 1, 10);
INSERT INTO Emprunt(id_emprunt, id_adherent, date_debut, date_fin, statut_emprunt, no_exemplaire, id_livre) VALUES
(11, 4, '2025-04-15', '2025-04-21', 'rendu', 2, 10),
(12, 5, '2025-03-25', '2025-04-09', 'en retard', 1, 14),
(13, 6, '2025-04-10', null, 'en cours', 3, 10);

INSERT INTO Emprunt(id_emprunt, id_adherent, date_debut, date_fin, statut_emprunt, no_exemplaire, id_livre) VALUES
(14, 6, '2024-07-10', '2024-07-22', 'rendu', 3, 6),
(15, 6, '2024-09-10', '2025-09-15', 'rendu', 4, 6),
(16, 6, '2025-03-10', '2025-03-21', 'rendu', 5, 6);

INSERT INTO Emprunt(id_emprunt, id_adherent, date_debut, date_fin, statut_emprunt, no_exemplaire, id_livre) VALUES
(17, 6, '2025-05-10', '2024-05-30', 'en retard', 1, 6);

INSERT INTO Commande(id_commande, id_adherent, statut_commande, id_livre) VALUES (1, 1, 'honorée', 1);
INSERT INTO Commande(id_commande, id_adherent, statut_commande, id_livre) VALUES (2, 2, 'honorée', 2);
INSERT INTO Commande(id_commande, id_adherent, statut_commande, id_livre) VALUES (3, 3, 'annulée', 3);
INSERT INTO Commande(id_commande, id_adherent, statut_commande, id_livre) VALUES (4, 4, 'honorée', 4);
INSERT INTO Commande(id_commande, id_adherent, statut_commande, id_livre) VALUES (5, 5, 'honorée', 5);
INSERT INTO Commande(id_commande, id_adherent, statut_commande, id_livre) VALUES (6, 6, 'honorée', 6);
INSERT INTO Commande(id_commande, id_adherent, statut_commande, id_livre) VALUES (7, 7, 'annulée', 7);
INSERT INTO Commande(id_commande, id_adherent, statut_commande, id_livre) VALUES (8, 8, 'honorée', 8);
INSERT INTO Commande(id_commande, id_adherent, statut_commande, id_livre) VALUES (9, 9, 'honorée', 9);
INSERT INTO Commande(id_commande, id_adherent, statut_commande, id_livre) VALUES (10, 10, 'honorée', 10);

INSERT INTO Commande(id_commande, id_adherent, statut_commande, id_livre) VALUES
(11, 7, 'honorée', 11),
(12, 10, 'honorée', 12),
(13, 9, 'honorée', 13);


INSERT INTO Auteur (id_auteur, prenom, nom, nationalite, annee_naissance) VALUES
(1, 'Frank', 'Herbert', 'Américaine', 1920),
(2, 'J.R.R.', 'Tolkien', 'Britannique', 1892),
(3, 'George', 'Orwell', 'Britannique', 1903),
(4, 'Albert', 'Camus', 'Française', 1913),
(5, 'Antoine', 'de Saint-Exupéry', 'Française', 1900),
(6, 'Harper', 'Lee', 'Américaine', 1926),
(7, 'Yuval Noah', 'Harari', 'Israélienne', 1976),
(8, 'J. K.', 'Rowling', 'Britannique', 1965),
(9, 'Sun', 'Tzu', 'Chinoise', -544),
(10, 'Victor', 'Hugo', 'Française', 1802),
(11, 'Arthur', 'Conan Doyle', 'Britannique', 1859);
INSERT INTO Auteur(id_auteur, prenom, nom) VALUES
(12, 'Miguel', 'de Cervantes'),
(13, 'Dante', 'Alighieri'),
(14, 'Émile', 'Zola'),
(15, 'Gabriel', 'García Márquez'),
(16, 'Johann Wolfgang von', 'Goethe');

INSERT INTO Livre_Auteur (id_livre, id_auteur) VALUES
(1, 3),
(2, 5),
(3, 6),
(4, 7),
(5, 4),
(6, 8),
(7, 4),
(8, 9),
(9, 10),
(10, 11);

INSERT INTO Livre_Auteur (id_livre, id_auteur) VALUES
(11, 12),
(12, 13),
(13, 14),
(14, 4),
(15, 15),
(16, 16);


SELECT l.id_livre, l.titre,
       CONCAT(a.prenom, ' ', a.nom) AS auteurs,
       g.genre AS nom_genre
FROM Livre l
JOIN Livre_Auteur la ON l.id_livre = la.id_livre
JOIN Auteur a ON la.id_auteur = a.id_auteur
JOIN Genre g ON l.genre = g.genre
WHERE l.id_livre IN (
    SELECT c.id_livre
    FROM Commande c
    WHERE c.id_livre NOT IN (
        SELECT e.id_livre
        FROM Emprunt e
    )
);

SELECT l.titre, a.prenom, a.nom, e.date_debut, e.date_fin
FROM Emprunt e
JOIN Livre l ON e.id_livre = l.id_livre
JOIN Adherent a ON e.id_adherent = a.id_adherent
WHERE e.statut_emprunt != 'rendu';

SELECT E.no_exemplaire, L.titre
FROM Emprunt E
JOIN Livre L ON E.id_livre = L.id_livre
WHERE E.statut_emprunt = 'en_cours'
  AND E.date_fin IS NOT NULL
  AND E.date_debut <= CURRENT_DATE - INTERVAL '21 days';


WITH emprunts_total AS (
    SELECT
        a.id_adherent,
        a.nom,
        a.prenom,
        a.email,
        COUNT(*) AS total_emprunts
    FROM emprunt e
    JOIN adherent a ON e.id_adherent = a.id_adherent
    GROUP BY a.id_adherent, a.nom, a.prenom, a.email
),
emprunts_retard AS (
    SELECT
        a.id_adherent,
        COUNT(*) AS nb_retard
    FROM emprunt e
    JOIN adherent a ON e.id_adherent = a.id_adherent
    WHERE e.statut_emprunt = 'en retard'
    GROUP BY a.id_adherent
)

SELECT
    t.nom,
    t.prenom,
    t.email,
    r.nb_retard,
    t.total_emprunts,
    ROUND(CAST(r.nb_retard AS numeric) / t.total_emprunts * 100, 2) AS ratio_retard_percent
FROM emprunts_total t
JOIN emprunts_retard r ON t.id_adherent = r.id_adherent
WHERE CAST(r.nb_retard AS float) / t.total_emprunts > 0.1;

SELECT E.no_exemplaire, L.titre
FROM Emprunt E
    JOIN Livre L ON E.id_livre = L.id_livre
WHERE E.id_adherent = '1'
  AND E.statut_emprunt = 'en_cours'
  AND E.date_debut <= CURRENT_DATE - INTERVAL '21 days';

```

## BackEnd (Python | FastAPI): 
### - Installation -

1. intallez les librairies si elle ne sont pas deja installées, j'ai eu un probleme avec psycog2:
```bash
pip install psycog2-binary
```

### - RUN FastAPI -
```bash
uvicorn main:app --reload
```

### - URL - 
```text
postgresql://<user>:<password>@<host>:<port>/<database>
```

```python
URL_DATABASE = 'postgresql://postgres:gestionBibliotheque@localhost:5432/postgres'
```

## FrontEnd (HTML | CSS | JS): 

Classique, pas de framework, pas de librairies, juste du HTML, CSS et JS.

Il faut que vous ajoutiez les reponses de vos questions.