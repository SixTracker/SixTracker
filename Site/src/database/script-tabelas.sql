-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/
Create DATABASE sixtracker;
use sixtracker;

create table Permissao (
idPermissao INT PRIMARY KEY auto_increment,
visualizar TINYINT,
editar TINYINT,
cadastrar TINYINT,
deletar TINYINT
);

create table NivelAcesso (
idNivelAcesso INT PRIMARY KEY auto_increment,
nomeCargo varchar(45),
fkPermissao INT,
FOREIGN KEY (fkPermissao) REFERENCES Permissao(idPermissao)
);

create table Empresa (
idEmpresa INT PRIMARY KEY auto_increment,
nome varchar(45),
CNPJ char(18),
telefone char(11)
);

create table funcionario (
idFuncionario INT PRIMARY KEY auto_increment,
Nome varchar(45),
CPF char(14),
email varchar(45),
telefone char(11),
senha varchar(45),
fkEmpresa INT,
fkNivelAcesso INT,
FOREIGN KEY (fkNivelAcesso) REFERENCES NivelAcesso(idNivelAcesso),
FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

create table Endereco(
idEndereco int primary key auto_increment,
CEP char(8), 
estado varchar(45),
rua varchar(45),
numero int,
bairro varchar(45),
cidade varchar(45),
fkEmpresa int,  
constraint FkEmpresaEndereco foreign key (fkEmpresa)
	references Empresa(idEmpresa)
);

create table Salas(
idSalas int primary key auto_increment, 
nomeSala varchar(45),
andarSala int,
fkEmpresa int, 
constraint FkEmpresaSalas foreign key(fkEmpresa)
	references Empresa(idEmpresa)
);

create table Servidor(
idServidor int primary key auto_increment,
nome varchar(60),
codigo varchar(50),
sistemaOperacional varchar(45),
ip int, 
fkSalas int,
constraint FkSalasServidor foreign key (fkSalas)
	references Salas(idSalas)
);

create table UnidadeMedida(
idUnidadeMedida int primary key auto_increment,
unidadeMedida varchar(45)
);

create table TipoComponente(
idTipoComponente int primary key auto_increment,
tipoComponente varchar(45)
);

create table Componente(
idComponente int primary key auto_increment,
nomeComponente varchar(60),
modeloComponente varchar(45),
fabricante varchar(45), 
metricaMin varchar(45),
metricaMax varchar(45),
valorTotal varchar(45),
fkServidor int, 
fkUnidadeMedida int, 
fkTipoComponente int,
constraint FkServidorComponente foreign key(fkServidor)
	references Servidor(idServidor),
constraint fkUnidadeMedidaComponente foreign key (fkUnidadeMedida)
	references UnidadeMedida(idUnidadeMedida),
constraint fkTipoComponenteComponente foreign key (fkTipoComponente)
	references TipoComponente (idTipoComponente)
);

create table Registro(
idRegistro int primary key auto_increment, 
valorRegistro double,
dataRegistro datetime,
fkComponente int,
constraint FkComponenteRegistro foreign key (fkComponente) 
	references Componente (idComponente)    
);

desc Permissao;
desc NivelAcesso;
desc Funcionario;
desc Empresa;
desc Endereco;
desc Salas;
desc Servidor;
desc Registro;
desc UnidadeMedida;
desc Componente;
desc TipoComponente;

-- Função Cadastro Empresa--

-- Insere dados na tabela Empresa --
insert into Empresa (nome, CNPJ) values(
 'Nubank', '123456789012345678'
 );
 
 -- insere o endereço da empresa na tabela Endereco --
 insert into Endereco (CEP, estado, rua, numero, bairro, cidade) values (
	'04742040', 'São Paulo', 'Santa Zoe', '243', 'Santo Amaro', 'São Paulo'
	);
 
-- Teste -- 
 select * 
	from Empresa join Endereco 
    on fkEmpresa = idEmpresa;
    
-- Função Cadastro Admin(2° Tela de cadastro)--

-- Define as permissões que o funcionário vai ter na dashboard, o valor 1 significa que ele terá acesso para fazer as respectivas da funcionalidades -- 
insert into Permissao values (
null, 1, 1, 1, 1
);

-- Cria um grupo de Pessoas que terão as mesmas permissões -- 
insert into NivelAcesso values(
null, 'Admin', 1
);

-- Adiciona as informações do Funcionário Admin -- 
insert into Funcionario values(
null, 'Guilherme', '008.539.263-18', 'guilherme.gsantos@sptech.school', '11982206065','Guigon89!', 1, 1
);

-- Teste -- 
select 
	Funcionario.nome as Nome,
	Funcionario.CPF as CPF,
    Funcionario.telefone as Telefone,
	Funcionario.email as Email,
	Funcionario.senha as Senha,
    Empresa.nome as NomeEmpresa,
    Empresa.CNPJ as CNPJ,
    Empresa.telefone as TelefoneEmpresa,
    NivelAcesso.nomeCargo as Cargo,
    Permissao.visualizar as Visualizar,
    Permissao.editar as Editar,
    Permissao.cadastrar as Cadastrar,
    Permissao.deletar as Deletar
		from Funcionario join Empresa
		on fkEmpresa = idEmpresa
		join NivelAcesso on fkNivelAcesso = idNivelAcesso
		join Permissao on fkPermissao = idPermissao; 
        
        
-- Criação da salas (cadastro para a empresa adicionar) -- 

insert into Salas values (
null, 'Sala A1', 1, 1
),(
null, 'Sala A2', 2, 1
);

-- Função onde o Admin vai adicionar um Servidor que será monitorado --

-- Select para ver as salas disponiveis para adicionar um servidor -- 

select 
	Salas.nomeSala as NomeSala, 
    Empresa.nome as NomeEmpresa,
    Salas.andarSala as andarSala
		from Salas join Empresa 
        on fkEmpresa = idEmpresa;
        
 -- insert dos dados do Servidor adicionado -- 
 
 insert into Servidor values(
 null, 'Servidor Principal', '409', 'Ubuntu 22.04.03', 0, 1 
 );
 insert into Servidor values(
 null, 'Servidor Secundário', '557', 'Debian', 0, 1 
 );
 
 -- insert dos componentes que a 6tracker irá monitorar do servidor adicionado -- 
 
 -- Aqui serão inseridos os tipos de componentes que a 6tracker pode monitorar -- 
 insert into TipoComponente values (
 null, 'CPU'
 ),(
 null, 'RAM'
 ),(
 null, 'DISCO'
 ),(
 null, 'USB'
 ); 
 
 -- Aqui serão inseridos os tipos de unidades de medida dos componentes -- 
 
 insert into UnidadeMedida values (
 null, '%'
 ),(
 null, 'Gb'
 ),(
 null, 'Mb'
 );
 
 -- Esses serão os selects ultizados na aba de cadastro dos componentes do servidor que será monitorado -- 
 
 select tipoComponente from TipoComponente; 
 select unidadeMedida from UnidadeMedida;
 
 -- Insert dos dados do componente do servidor que será monitorado -- 
 insert into Componente values(
 null, 'Cpu Principal', 'Intel Xeon W3-2435', 'Intel','45','75','100',1,1,1
 ),(
 null, 'Memoria Ram', 'DDR5(4x32GB) 4800XMHz', 'Corsair Vengeance','45','90','128',1,2,2
 ); 
   insert into Componente values(
 null, 'Cpu 1', 'Intel Xeon W3-2435', 'Intel','45','75','100',2,1,1
 ),(
 null, 'Memoria Ram', 'DDR5(2x32GB) 4800XMHz', 'Corsair Vengeance','45','90','64',2,2,2
 ); 

 create table perfil (
	idperfil int primary key auto_increment,
	imagem varchar(16000),
	descricao TEXT,
	fkFuncionario int,
	fkEndereco int,
	constraint fkFuncionario foreign key (fkFuncionario)
	references Funcionario (idFuncionario),
	constraint fkEndereco foreign key (fkEndereco)
	references Endereco (idEndereco)
 );
 
 -- Select para ver o Servidor e os componentes monitorados -- 
 
 select 
	Servidor.nome as NomeServidor, 
    Servidor.sistemaOperacional as SoServidor, 
    Servidor.usbDetectado as USB, 
    Componente.nomeComponente as NomeComponente, 
    Componente.modeloComponente as ModeloComponente, 
    Componente.metricaMin as Min, 
    Componente.metricaMax as Max,
    Componente.valorTotal as ValorTotal, 
    UnidadeMedida.unidadeMedida as UnidadeMedida, 
    TipoComponente.tipoComponente as TipoComponente 
		 from Servidor join Componente 
			on Componente.fkServidor = Servidor.idServidor
		 join UnidadeMedida on Componente.fkUnidadeMedida = UnidadeMedida.idUnidadeMedida
         join TipoComponente on Componente.fkTipoComponente = TipoComponente.idTipoComponente;
         
-- Select Componentes agrupados pelo Servidor --         
	select
		Servidor.idServidor as IdServidor,
		Servidor.nome AS NomeServidor,
		Componente.nomeComponente as NomeComponente,
        Componente.modeloComponente as ModeloComponente, 		
		COUNT(*) AS totalComponentes
			from Servidor join Componente  
				on Servidor.idServidor = Componente.fkServidor
			group by Servidor.idServidor, Servidor.nome, Componente.nomeComponente, Componente.modeloComponente 
			order by Servidor.idServidor, Componente.nomeComponente;
-- /*
-- comandos para criar usuário em banco de dados azure, sqlserver,
-- com permissão de insert + update + delete + select
-- */
-- Criando a conexão para o SqlServer -----------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
CREATE USER [sa]
 WITH PASSWORD = 'Sixtracker@',
 DEFAULT_SCHEMA = sixtracker;

-- Criação do banco 
--DROP DATABASE teste2;
CREATE DATABASE sixtracker;
Use sixtracker;

-- Tabela Permissao
CREATE TABLE Permissao(
    idPermissao INT PRIMARY KEY IDENTITY(1,1),
    visualizar TINYINT,
    editar TINYINT,
    cadastrar TINYINT,
    deletar TINYINT
);


-- Tabela NivelAcesso
CREATE TABLE NivelAcesso (
    idNivelAcesso INT PRIMARY KEY IDENTITY(1,1),
    nomeCargo VARCHAR(45),
    fkPermissao INT,
    FOREIGN KEY (fkPermissao) REFERENCES Permissao(idPermissao)
);


-- Tabela Empresa
CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(45),
    CNPJ CHAR(18),
    telefone CHAR(11)
);

-- Tabela Funcionario
CREATE TABLE Funcionario (
    idFuncionario INT PRIMARY KEY IDENTITY(1,1),
    Nome VARCHAR(45),
    CPF CHAR(14),
    email VARCHAR(45),
    telefone CHAR(11),
    senha VARCHAR(45),
    fkEmpresa INT,
    fkNivelAcesso INT,
    imagem VARCHAR(MAX),
    descricao VARCHAR(200),
    FOREIGN KEY (fkNivelAcesso) REFERENCES NivelAcesso(idNivelAcesso),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Tabela Endereco
CREATE TABLE Endereco(
    idEndereco INT PRIMARY KEY IDENTITY(1,1),
    CEP CHAR(8),
    estado VARCHAR(45),
    rua VARCHAR(45),
    numero INT,
    bairro VARCHAR(45),
    cidade VARCHAR(45),
    fkEmpresa INT,
    CONSTRAINT FkEmpresaEndereco FOREIGN KEY (fkEmpresa)
        REFERENCES Empresa(idEmpresa)
);

INSERT INTO Permissao (visualizar, editar, cadastrar, deletar) VALUES (1, 1, 1, 1);

INSERT INTO NivelAcesso (nomeCargo, fkPermissao) VALUES ('Admin', 1);

INSERT INTO Empresa (nome, CNPJ, telefone) VALUES ('Nubank', '123456789012345678', '12345678901');

INSERT INTO Endereco (CEP, estado, rua, numero, bairro, cidade, fkEmpresa) VALUES (
    '04742040', 'São Paulo', 'Santa Zoe', '243', 'Santo Amaro', 'São Paulo', 1
);

-- Tabela Salas
CREATE TABLE Salas(
    idSalas INT PRIMARY KEY IDENTITY(1,1),
    nomeSala VARCHAR(45),
    andarSala INT,
    fkEmpresa INT,
    CONSTRAINT FkEmpresaSalas FOREIGN KEY(fkEmpresa)
        REFERENCES Empresa(idEmpresa)
);

INSERT INTO Salas (nomeSala, andarSala, fkEmpresa)
VALUES ('Sala A1', 1, 1),
       ('Sala A2', 2, 1);

-- Tabela Servidor
CREATE TABLE Servidor(
    idServidor INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(60),
    codigo VARCHAR(50),
    sistemaOperacional VARCHAR(45),
    ip VARCHAR(45), 
    fkSalas INT,
    CONSTRAINT FkSalasServidor FOREIGN KEY (fkSalas)
        REFERENCES Salas(idSalas)
);

INSERT INTO Servidor (nome, codigo, sistemaOperacional, ip, fkSalas)
VALUES ('Servidor Principal', '40345', 'Ubuntu 22.04.03', '22.138.22.92', 1),
       ('Servidor Secundário', '55757', 'Windows', '193.295.96.12', 1);

-- Tabela UnidadeMedida
CREATE TABLE UnidadeMedida(
    idUnidadeMedida INT PRIMARY KEY IDENTITY(1,1),
    unidadeMedida VARCHAR(45)
);

INSERT INTO UnidadeMedida (unidadeMedida)
VALUES ('%'), ('GB'), ('MB'), ('s'), ('GHz');


-- Tabela UnidadeMedida
SELECT * FROM UnidadeMedida;

-- Tabela TipoComponente
CREATE TABLE TipoComponente(
    idTipoComponente INT PRIMARY KEY IDENTITY(1,1),
    tipoComponente VARCHAR(45)
);

INSERT INTO TipoComponente (tipoComponente)
VALUES ('CPU'), ('RAM'), ('DISCO');

-- Tabela Metrica
CREATE TABLE Metrica(
    idMetrica INT PRIMARY KEY IDENTITY(1,1),
    alerta FLOAT,
    urgente FLOAT,
    critico FLOAT,
    tipo_dado VARCHAR(50)
);

INSERT INTO Metrica (alerta, urgente, critico, tipo_dado)
VALUES
(0.60, 0.70, 0.80, 'Porcentagem de Uso'),
(0.90, 0.93, 0.95, 'Porcentagem de Uso'),
(0.70, 0.80, 0.90, 'Porcentagem de Uso');

-- Tabela Componente
CREATE TABLE Componente(
    idComponente INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(60),
    modelo VARCHAR(45),
    fabricante VARCHAR(45), 
    fkServidor INT, 
    fkUnidadeMedida INT, 
    fkTipoComponente INT,
    fkMetrica INT,
    CONSTRAINT FkServidorComponente FOREIGN KEY(fkServidor)
        REFERENCES Servidor(idServidor),
    CONSTRAINT fkUnidadeMedidaComponente FOREIGN KEY (fkUnidadeMedida)
        REFERENCES UnidadeMedida(idUnidadeMedida),
    CONSTRAINT fkTipoComponenteComponente FOREIGN KEY (fkTipoComponente)
        REFERENCES TipoComponente (idTipoComponente),
    CONSTRAINT FkMetricaComponente FOREIGN KEY(fkMetrica)
        REFERENCES Metrica(idMetrica)
);

INSERT INTO Componente (nome, fkServidor, fkUnidadeMedida, fkTipoComponente, fkMetrica) 
VALUES 
('Porcentagem da CPU', null, 1, 1, 1),
('Velocidade da CPU', null, 5, 1, null),
('Tempo no sistema da CPU', null, 4, 1, null),
('Processos da CPU', null, null, 1, null);

-- Inserir Memória RAM
INSERT INTO Componente (nome, fkServidor, fkUnidadeMedida, fkTipoComponente, fkMetrica) 
VALUES 
('Porcentagem da Memoria', NULL, 1, 2, 2),
('Total da Memoria', NULL, 2, 2, NULL),
('Uso da Memoria', NULL, 2, 2, NULL),
('Porcentagem da Memoria Swap', NULL, 1, 2, NULL),
('Uso da Memoria Swap', NULL, 2, 2, NULL);

-- Inserir Disco
INSERT INTO Componente (nome, fkServidor, fkUnidadeMedida, fkTipoComponente, fkMetrica) 
VALUES 
('Porcentagem do Disco', NULL, 1, 3, 3),
('Total do Disco', NULL, 2, 3, NULL),
('Uso do Disco', NULL, 2, 3, NULL),
('Tempo de Leitura do Disco', NULL, 4, 3, NULL),
('Tempo de Escrita do Disco', NULL, 4, 3, NULL);

-- Consulta na tabela Componente
SELECT * FROM Componente;

-- Tabela Registro
CREATE TABLE Registro(
    idRegistro INT PRIMARY KEY IDENTITY(1,1), 
    valorRegistro FLOAT,
    dataRegistro DATETIME,
    fkComponente INT,
    CONSTRAINT FkComponenteRegistro FOREIGN KEY (fkComponente) 
        REFERENCES Componente (idComponente)    
);

-- Consulta na tabela Registro
SELECT * FROM Registro;

-- Tabela Janelas
CREATE TABLE Janelas (
    id INT PRIMARY KEY IDENTITY(1,1),
    nomeJanelaJson VARCHAR(1000),
    quantidade INT,
    dataHora DATETIME,
    fkServidor INT,
    CONSTRAINT fkServidor FOREIGN KEY (fkServidor) 
        REFERENCES Servidor (idServidor)
);

-- Consulta na tabela Janelas
SELECT * FROM Janelas;

-- Tabela Rede
CREATE TABLE Rede(
    id INT PRIMARY KEY IDENTITY(1,1),
    nomeRede VARCHAR(50),
    bytesEnviados BIGINT,
    bytesRecebidos BIGINT,
    dataHora DATETIME,
    fkServidor INT,
    CONSTRAINT fkRedeServidor FOREIGN KEY (fkServidor) 
        REFERENCES Servidor (idServidor)
);

-- Consulta na tabela Rede
SELECT * FROM Rede;

-- Tabela USB
CREATE TABLE USB(
    id INT PRIMARY KEY IDENTITY(1,1),
    idExclusivo INT,
    qtdConectada INT,
    nomeUSB VARCHAR(50),
    dataHora DATETIME,
    fkServidor INT,
    CONSTRAINT fkUsbServidor FOREIGN KEY (fkServidor) 
        REFERENCES Servidor (idServidor)
);

-- Consulta na tabela USB
SELECT * FROM USB;

-- INSERTS 

-- Descricao de tabelas
EXEC sp_columns 'Permissao';
EXEC sp_columns 'NivelAcesso';
EXEC sp_columns 'Funcionario';
EXEC sp_columns 'Empresa';
EXEC sp_columns 'Endereco';
EXEC sp_columns 'Salas';
EXEC sp_columns 'Servidor';
EXEC sp_columns 'Registro';
EXEC sp_columns 'UnidadeMedida';
EXEC sp_columns 'Componente';
EXEC sp_columns 'TipoComponente';

-- Teste
SELECT * 
FROM Empresa
JOIN Endereco ON fkEmpresa = idEmpresa;

-- Teste
SELECT 
    Funcionario.nome AS Nome,
    Funcionario.CPF AS CPF,
    Funcionario.telefone AS Telefone,
    Funcionario.email AS Email,
    Funcionario.senha AS Senha,
    Empresa.nome AS NomeEmpresa,
    Empresa.CNPJ AS CNPJ,
    Empresa.telefone AS TelefoneEmpresa,
    NivelAcesso.nomeCargo AS Cargo,
    Permissao.visualizar AS Visualizar,
    Permissao.editar AS Editar,
    Permissao.cadastrar AS Cadastrar,
    Permissao.deletar AS Deletar
FROM 
    Funcionario
JOIN 
    Empresa ON Funcionario.fkEmpresa = Empresa.idEmpresa
JOIN 
    NivelAcesso ON Funcionario.fkNivelAcesso = NivelAcesso.idNivelAcesso
JOIN 
    Permissao ON NivelAcesso.fkPermissao = Permissao.idPermissao;

-- Select para ver as salas disponíveis para adicionar um servidor
SELECT 
    Salas.nomeSala AS NomeSala,
    Empresa.nome AS NomeEmpresa,
    Salas.andarSala AS AndarSala
FROM 
    Salas
JOIN 
    Empresa ON Salas.fkEmpresa = Empresa.idEmpresa;

-- Seleções adicionais
SELECT 
    tipoComponente 
FROM 
    TipoComponente;

SELECT 
    unidadeMedida 
FROM 
    UnidadeMedida;

-- Consulta na tabela Componente
SELECT 
    nome AS 'Nome do Componente',
    fkServidor AS 'Servidor do Componente',
    fkUnidadeMedida AS 'Unidade de Medida',
    fkTipoComponente AS 'Tipo do Componente',
    fkMetrica AS 'Metrica de alerta'
FROM 
    Componente;

-- Consulta na tabela Componente (C.idComponente = 5)
SELECT 
    C.idComponente AS 'Id do Componente',
    C.nome AS 'Nome Do Componente',
    S.nome AS 'Nome do Servidor',
    U.unidadeMedida AS 'Unidade De Medida',
    TC.tipoComponente AS 'Tipo De Componente',
    M.alerta AS 'Metrica'
FROM 
    Componente C
LEFT JOIN 
    Servidor S ON C.fkServidor = S.idServidor
LEFT JOIN 
    UnidadeMedida U ON C.fkUnidadeMedida = U.idUnidadeMedida
LEFT JOIN 
    TipoComponente TC ON C.fkTipoComponente = TC.idTipoComponente
LEFT JOIN 
    Metrica M ON C.fkMetrica = M.idMetrica
WHERE 
    C.idComponente = 5;

-- Select principal
SELECT 
    C.idComponente AS ID,
    C.nome AS NomeDoComponente,
    R.valorRegistro AS ValorDoRegistro,
    U.unidadeMedida AS UnidadeDeMedida,
    TC.tipoComponente AS TipoDeComponente,
    M.tipo_dado AS Metrica,
    R.dataRegistro AS DataDoRegistro
FROM 
    Componente C
LEFT JOIN 
    Servidor S ON C.fkServidor = S.idServidor
LEFT JOIN 
    UnidadeMedida U ON C.fkUnidadeMedida = U.idUnidadeMedida
LEFT JOIN 
    TipoComponente TC ON C.fkTipoComponente = TC.idTipoComponente
LEFT JOIN 
    Metrica M ON C.fkMetrica = M.idMetrica
LEFT JOIN 
    Registro R ON C.idComponente = R.fkComponente
WHERE 
    C.idComponente = 1;

-- Consulta na tabela Servidor
SELECT 
    * 
FROM 
    Servidor;

-- Outras seleções
SELECT 
    C.nome AS NomeDoComponente, 
    TC.tipoComponente AS TipoDeComponente
FROM 
    Componente C
JOIN 
    TipoComponente TC ON C.fkTipoComponente = TC.idTipoComponente
WHERE 
    C.fkServidor = 1;

SELECT 
    C.nome AS NomeDoComponente, 
    TC.tipoComponente AS TipoDeComponente, 
    R.dataRegistro AS DataDoRegistro, 
    R.valorRegistro AS ValorDoRegistro, 
    M.alerta AS LimiteDeAlerta
FROM 
    Componente C
JOIN 
    TipoComponente TC ON C.fkTipoComponente = TC.idTipoComponente
JOIN 
    Registro R ON C.idComponente = R.fkComponente
JOIN 
    Metrica M ON C.fkMetrica = M.idMetrica
WHERE 
    R.valorRegistro > M.alerta;

-- Consultas nas tabelas Funcionario, Empresa e Salas
SELECT 
    * 
FROM 
    Funcionario;

SELECT 
    * 
FROM 
    Empresa;
	 --idSalas 
    --nomeSala
    --andarSala 

	INSERT INTO Salas (nomeSala, andarSala, fkEmpresa)
	VALUES
    ('SalaKotlin', 3, 1);

SELECT 
    * 
FROM 
    Salas;

-- Inserções


INSERT INTO 
    Servidor
VALUES
    ('ServidorPrincipalKotlin',

 'X4U9DO', 'UBUNTU', 'hfus283289hf2', 3);

INSERT INTO 
    Servidor
VALUES
    ('ServidorSecundarioKotlin', 'HY7DJ9', 'WINDOWS', 'sad832da283hd', 1);

-- Consulta final
SELECT 
    * 
FROM 
    Servidor
JOIN 
    Salas ON Servidor.fkSalas = Salas.idSalas
JOIN 
    Empresa ON Salas.fkEmpresa = Empresa.idEmpresa 
WHERE 
    Salas.fkEmpresa = 7;

-- EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
-- @membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

-- EXEC sys.sp_addrolemember @rolename = N'db_datareader',
-- @membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
