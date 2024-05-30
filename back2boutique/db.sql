Cliente(id, username, psw, nome, cognome)
Carrello(id, costo_totale)
Ordine(id, tell, cap, citta, stato)
Prodotti(id, nome, prezzo, peso, descrizione, stock, immagine)
Categoria(id, tipo, descrizione)
Fatto_di(id_carrello,id_prodotto, data_ora)


CREATE DATABASE 5crenzini_back2boutique;
USE 5crenzini_back2boutique

CREATE TABLE CLIENTE (
    id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(16) NOT NULL,    
    psw VARCHAR(30) NOT NULL,
    nome VARCHAR(30),
    cognome VARCHAR(30),
    CONSTRAINT ChiavePrimaria PRIMARY KEY (id)
);

CREATE TABLE CARRELLO (
    id INT AUTO_INCREMENT NOT NULL,
    id_cli INT NOT NULL,
    CONSTRAINT ChiavePrimariaCarrello PRIMARY KEY (id),
    FOREIGN KEY (id_cli) REFERENCES CLIENTE(id)
);

CREATE TABLE SPEDIZIONE (
    id INT AUTO_INCREMENT NOT NULL,
    tell VARCHAR(15),
    cap VARCHAR(10),
    citta VARCHAR(50),
    stato VARCHAR(50),
    id_cli INT NOT NULL,
    CONSTRAINT ChiavePrimariaOrdine PRIMARY KEY (id),
    FOREIGN KEY (id_cli) REFERENCES CLIENTE(id)
);

CREATE TABLE PRODOTTI (
    id VARCHAR(9) NOT NULL,
    nome VARCHAR(30),    
    prezzo FLOAT(6,2),
    peso FLOAT(6,2),
    descrizione VARCHAR(200),
    stock INTEGER(4),
    brand VARCHAR(30),
    tipologia VARCHAR(30),
    immagine VARCHAR(255),
    CONSTRAINT ChiavePrimaria PRIMARY KEY (id)
);

CREATE TABLE FATTO_DI (
    id_carrello INT NOT NULL,
    id_prodotto VARCHAR(9) NOT NULL,
    data_ora DATETIME NOT NULL,
    taglia VARCHAR(3),
    CONSTRAINT ChiavePrimariaFattoDi PRIMARY KEY (id_carrello, id_prodotto, data_ora),
    FOREIGN KEY (id_carrello) REFERENCES CARRELLO(id),
    FOREIGN KEY (id_prodotto) REFERENCES PRODOTTI(id)
);

CREATE TABLE ORDINE (
    id INT AUTO_INCREMENT NOT NULL,
    id_carrello INT NOT NULL,
    id_cli INT NOT NULL,
    data_ora DATETIME NOT NULL,
    costo_totale FLOAT(6,2),
    CONSTRAINT ChiavePrimariaOrdine PRIMARY KEY (id),
    FOREIGN KEY (id_cli) REFERENCES CLIENTE(id),
    FOREIGN KEY (id_carrello) REFERENCES CARRELLO(id)
);

INSERT INTO PRODOTTI (id, nome, prezzo, peso, descrizione, stock, brand, tipologia, immagine)
VALUES
('1234', 'Felpa Nike', 49.00, 306.00, 'Questa felpa nera Nike incarna l eleganza senza tempo con il suo design pulito e minimalista. Realizzata con tessuto morbido e confortevole, offre un esperienza di indossamento piacevole in ogni occasione. Il logo Nike discreto sul petto aggiunge un tocco di stile distintivo.', 30, 'Nike', 'Abbigliamento', '../image/felpa.png');

INSERT INTO PRODOTTI (id, nome, prezzo, peso, descrizione, stock, brand, tipologia, immagine)
VALUES
('1235', 'Borsa Balenciaga', 350.00, 250.00, 'Questa borsa è un elegante modello in pelle nera con dettagli decorativi e borchie, caratterizzata da un design moderno e sofisticato. Presenta due manici superiori e una tracolla a catena regolabile, rendendola versatile per diverse occasioni. Il ciondolo a forma di cuore aggiunge un tocco di femminilità e stile al look complessivo.', 30, 'Balenciaga', 'Accessori', '../image/borsa.png');

INSERT INTO PRODOTTI (id, nome, prezzo, peso, descrizione, stock, brand, tipologia, immagine)
VALUES
('1236', 'Timberland x Supreme - Stars Pattern', 220.00, 400.00, 'Realizzati in pelle scamosciata color marrone chiaro, presentano un motivo a stelle in rilievo su tutta la superficie. La classica suola robusta Timberland, insieme ai dettagli in metallo dorato e l etichetta Supreme rossa, aggiunge un tocco esclusivo e di alta qualità.', 30, 'Supreme', 'Scarpe', '../image/scarpe.png');


INSERT INTO CLIENTE (username, psw, nome, cognome) VALUES ('admin', '1234', 'admin', 'admin');

UPDATE PRODOTTI
SET immagine = 'file:///C:/Users/Thomas/Desktop/Cartelle/Programmazione/back2boutique/image/felpa_prodotto.jpeg'
WHERE id = '1234'; 

DELETE FROM CLIENTE WHERE id IN (1);

--http://10.25.0.15/~s_rnztms05m06z130l/back2boutique_3/image/felpa_prodotto.jpeg

--file:///C:/Users/Thomas/Desktop/Cartelle/Programmazione/back2boutique/image/felpa_prodotto.jpeg

CREATE TABLE STORICO_ORDINI(
    id INT AUTO_INCREMENT NOT NULL,
    id_carrello INT NOT NULL,
    id_cli INT NOT NULL,
    data_ora DATETIME NOT NULL,
    costo_totale FLOAT(6,2),
    CONSTRAINT ChiavePrimaria PRIMARY KEY (id)
    FOREIGN KEY (id_cli) REFERENCES CLIENTE(id),
    FOREIGN KEY (id_carrello) REFERENCES CARRELLO(id)
);

delimiter  |
CREATE TRIGGER storico_ordini
BEFORE UPDATE ON ORDINE
FOR EACH ROW 
BEGIN
    INSERT INTO STORICO_PREZZI(id_carrello, id_cli, data_ora, costo_totale) 
    VALUES (OLD.id_carrello, OLD.id_cli, OLD.data_ora, OLD.costa_totale);
END;
|