Cliente(id, username, psw, nome, cognome)
Carrello(id, costo_totale)
Ordine(id, tell, cap, citta, stato)
Prodotti(id, nome, prezzo, peso, descrizione, stock, immagine)
Categoria(id, tipo, descrizione)
Fatto_di(id_carrello,id_prodotto, data_ora)

CREATE TABLE CLIENTE (
    id VARCHAR(9) NOT NULL,
    username VARCHAR(16) NOT NULL,    
    psw VARCHAR(30) NOT NULL,
    nome VARCHAR(30),
    cognome VARCHAR(30),
    CONSTRAINT ChiavePrimaria PRIMARY KEY (id)
);

CREATE TABLE CARRELLO (
    id VARCHAR(9) NOT NULL,
    costo_totale VARCHAR(16),    
    id_cli VARCHAR(9) NOT NULL,
    CONSTRAINT ChiavePrimaria PRIMARY KEY (id),
    FOREIGN KEY (id_cli) REFERENCES CLIENTE(id)
);

CREATE TABLE ORDINE (
    id VARCHAR(9) NOT NULL, 
    tell INTEGER(10),    
    cap INTEGER(5),
    citta VARCHAR(15),
    stato VARCHAR(15),
    id_car VARCHAR(9) NOT NULL,
    CONSTRAINT ChiavePrimaria PRIMARY KEY (id),
    FOREIGN KEY (id_car) REFERENCES CARRELLO(id)
);

CREATE TABLE PRODOTTI (
    id VARCHAR(9) NOT NULL,
    nome VARCHAR(30),    
    prezzo FLOAT(6,2),
    peso FLOAT(6,2),
    descrizione VARCHAR(200),
    stock INTEGER(4),
    immagine VARCHAR(255),
    CONSTRAINT ChiavePrimaria PRIMARY KEY (id)
);

CREATE TABLE CATEGORIA (
    id VARCHAR(9) NOT NULL,
    tipo VARCHAR(15),    
    descrizione VARCHAR(200),
    id_prod VARCHAR(9) NOT NULL,
    CONSTRAINT ChiavePrimaria PRIMARY KEY (id),
    FOREIGN KEY (id_prod) REFERENCES PRODOTTI(id)
);

CREATE TABLE FATTO_DI (
    id_carrello VARCHAR(9) NOT NULL,
    id_prodotto VARCHAR(9) NOT NULL,
    data_ora DATE,
    CONSTRAINT ChiavePrimaria PRIMARY KEY (id_carrello, id_prodotto, data_ora),
    FOREIGN KEY (id_carrello) REFERENCES CARRELLO(id),
    FOREIGN KEY (id_prodotto) REFERENCES PRODOTTI(id)
);

INSERT INTO PRODOTTI (id, nome, prezzo, peso, descrizione, stock, immagine)
VALUES
('1234', 'Felpa', 49.00, 306.00, 'Felpa nera in cotone 100%', 30, ''); 