DROP DATABASE IF EXISTS escola;
CREATE DATABASE escola;
USE escola;

CREATE TABLE Sala (
   ID_Sala INT PRIMARY KEY AUTO_INCREMENT,
   Nome_Sala VARCHAR(100),
   Localizacao VARCHAR(100)
);

CREATE TABLE Equipamento (
   ID_Equipamento INT PRIMARY KEY AUTO_INCREMENT,
   Nome_Equipamento VARCHAR(100),
   Descricao VARCHAR(255)
);

CREATE TABLE Sala_Equipamento (
   ID_Sala INT,
   ID_Equipamento INT,
   Quantidade INT,
   PRIMARY KEY (ID_Sala, ID_Equipamento),
   FOREIGN KEY (ID_Sala) REFERENCES Sala(ID_Sala),
   FOREIGN KEY (ID_Equipamento) REFERENCES Equipamento(ID_Equipamento)
);