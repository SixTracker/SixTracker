-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/
create DATABASE sixtracker;
Use sixtracker;

create table Permissao (
	idPermissao INT PRIMARY KEY auto_increment,
	visualizar TINYINT,
	editar TINYINT,
	cadastrar TINYINT,
	deletar TINYINT
);

insert into Permissao values (
null, 1, 1, 1, 1
);

select * from Permissao;

create table NivelAcesso (
idNivelAcesso INT PRIMARY KEY auto_increment,
nomeCargo varchar(45),
fkPermissao INT,
FOREIGN KEY (fkPermissao) REFERENCES Permissao(idPermissao)
);

insert into NivelAcesso values(
null, 'Admin', 1
);

select * from NivelAcesso;

create table Empresa (
idEmpresa INT PRIMARY KEY auto_increment,
nome varchar(45),
CNPJ char(18),
telefone char(11)
);

insert into Empresa (nome, CNPJ) values(
 'Nubank', '123456789012345678'
 );
 
 select * from empresa;

create table funcionario (
idFuncionario INT PRIMARY KEY auto_increment,
Nome varchar(45),
CPF char(14),
email varchar(45),
telefone char(11),
senha varchar(45),
fkEmpresa INT,
fkNivelAcesso INT,
imagem varchar(16000),
descricao varchar(200),
FOREIGN KEY (fkNivelAcesso) REFERENCES NivelAcesso(idNivelAcesso),
FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

insert into Funcionario values(
null, 'Guilherme', '008.539.263-18', 'guilherme.gsantos@sptech.school', '11982206065','Guigon89!', 1, 1
);

select * from funcionario;

UPDATE Funcionario
SET imagem = 'IMAGEM GRANDONA 4K', descricao = 'Hello World'
WHERE idFuncionario = 2;

desc Funcionario;

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

 insert into Endereco (CEP, estado, rua, numero, bairro, cidade) values (
	'04742040', 'São Paulo', 'Santa Zoe', '243', 'Santo Amaro', 'São Paulo'
	);
    
    select * from Endereco;

create table Salas(
idSalas int primary key auto_increment, 
nomeSala varchar(45),
andarSala int,
fkEmpresa int, 
constraint FkEmpresaSalas foreign key(fkEmpresa)
	references Empresa(idEmpresa)
);

insert into Salas values (
null, 'Sala A1', 1, 1
),(
null, 'Sala A2', 2, 1
);

select * from Salas;

create table Servidor(
idServidor int primary key auto_increment,
nome varchar(60),
codigo varchar(50),
sistemaOperacional varchar(45),
ip varchar(45), 
fkSalas int,
constraint FkSalasServidor foreign key (fkSalas)
	references Salas(idSalas)
);

 insert into Servidor values(
 null, 'Servidor Principal', '40345', 'Ubuntu 22.04.03', '22.138.22.92', 1
 );
 insert into Servidor values(
 null, 'Servidor Secundário', '55757', 'Windows', '193.295.96.12', 1
 );

select * from Servidor;

create table UnidadeMedida(
idUnidadeMedida int primary key auto_increment,
unidadeMedida varchar(45)
);

 insert into UnidadeMedida values (
 null, '%'
 ),(
 null, 'GB'
 ),(
 null, 'MB'
 ),
 (null, 's'
 ),
 (null, 'GHz'
 );
 
 select * from UnidadeMedida;

create table TipoComponente(
idTipoComponente int primary key auto_increment,
tipoComponente varchar(45)
);

 insert into TipoComponente values (
 null, 'CPU'
 ),(
 null, 'RAM'
 ),(
 null, 'DISCO'
 ); 
 
 select * from TipoComponente;

create table Metrica(
idMetrica INT PRIMARY KEY auto_increment,
alerta DOUBLE,
urgente DOUBLE,
critico DOUBLE,
tipo_dado VARCHAR(50)
);

INSERT INTO Metrica (alerta, urgente, critico, tipo_dado) VALUES
(0.60, 0.70, 0.80, "Porcentagem de Uso"),
(0.90, 0.93, 0.95, "Porcentagem de Uso"),
(0.70, 0.80, 0.90, "Porcentagem de Uso");
 
create table Componente(
idComponente int primary key auto_increment,
nome varchar(60),
modelo varchar(45),
fabricante varchar(45), 
fkServidor int, 
fkUnidadeMedida int, 
fkTipoComponente int,
fkMetrica int,
constraint FkServidorComponente foreign key(fkServidor)
	references Servidor(idServidor),
constraint fkUnidadeMedidaComponente foreign key (fkUnidadeMedida)
	references UnidadeMedida(idUnidadeMedida),
constraint fkTipoComponenteComponente foreign key (fkTipoComponente)
	references TipoComponente (idTipoComponente),
    constraint FkMetricaComponente foreign key(fkMetrica)
	references Metrica(idMetrica)
);


INSERT INTO Componente (nome, fkServidor, fkUnidadeMedida, fkTipoComponente, fkMetrica) 
VALUES 
('Porcentagem da CPU', null, 1, 1, 1),
("Velocidade da CPU", null,  5, 1, null),
("Tempo no sistema da CPU", null, 4, 1, null),
("Processos da CPU", null, null, 1, null);

-- Inserir Memória RAM
INSERT INTO Componente (nome, fkServidor, fkUnidadeMedida, fkTipoComponente, fkMetrica) 
VALUES 
('Porcentagem da Memoria',null, 1, 2, 2),
('Total da Memoria',null, 2, 2, null),
('Uso da Memoria',null, 2, 2, null),
('Porcentagem da Memoria Swap',null, 1,2,null),
('Uso da Memoria Swap',null, 2, 2, null);

-- Inserir Disco
INSERT INTO Componente (nome, fkServidor, fkUnidadeMedida, fkTipoComponente, fkMetrica) 
VALUES 
('Porcentagem do Disco', null, 1, 3, 3),
('Total do Disco',null,  2, 3, null),
('Uso do Disco',null, 2, 3, null),
('Tempo de Leitura do Disco',null, 4, 3, null),
('Tempo de Escrita do Disco',null, 4, 3, null);


select * from Componente;

create table Registro(
idRegistro int primary key auto_increment, 
valorRegistro double,
dataRegistro datetime,
fkComponente int,
constraint FkComponenteRegistro foreign key (fkComponente) 
	references Componente (idComponente)    
); 

select * from Registro;

            
CREATE TABLE janelas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nomeJanelaJson VARCHAR(1000),
            quantidade INT,
            dataHora TIMESTAMP,
            fkServidor int,
            constraint fkServidor foreign key (fkServidor) 
			references Servidor (idServidor)
        );
        
        select * from janelas;

            
CREATE TABLE rede (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nomeRede VARCHAR(50),
            bytesEnviados LONG,
            bytesRecebidos LONG,
            dataHora TIMESTAMP,
            fkServidor int,
            constraint fkRedeServidor foreign key (fkServidor) 
			references Servidor (idServidor)
        );
    
    select * from rede;
		
CREATE TABLE usb (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    idExclusivo Int,
                    qtdConectada INT,
                    nomeUSB VARCHAR(50),
                    dataHora TIMESTAMP,
                    fkServidor int,
                    constraint fkUsbServidor foreign key (fkServidor) 
			        references Servidor (idServidor)
                    );
                    
                    select * from usb;
		

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

-- Teste -- 
 select * 
	from Empresa join Endereco 
    on fkEmpresa = idEmpresa;
    
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
        

-- Select para ver as salas disponiveis para adicionar um servidor -- 

select 
	Salas.nomeSala as NomeSala, 
    Empresa.nome as NomeEmpresa,
    Salas.andarSala as andarSala
		from Salas join Empresa 
        on fkEmpresa = idEmpresa;
        

 select tipoComponente from TipoComponente; 
 select unidadeMedida from UnidadeMedida;
 
 
 SELECT
    nome AS 'Nome do Componente',
    fkServidor AS 'Servidor do Componente',
    fkUnidadeMedida AS 'Unidade de Medida',
    fkTipoComponente AS 'Tipo do Componente',
    fkMetrica AS 'Metrica de alerta'
FROM Componente;

SELECT
    C.idComponente AS 'Id do Componente',
    C.nome AS 'Nome Do Componente',
    S.nome AS 'Nome do Servidor',
    U.unidadeMedida AS 'Unidade De Medida',
    TC.tipoComponente AS 'Tipo De Componente',
    M.alerta AS 'Metrica'
FROM Componente C
LEFT JOIN Servidor S ON C.fkServidor = S.idServidor
LEFT JOIN UnidadeMedida U ON C.fkUnidadeMedida = U.idUnidadeMedida
LEFT JOIN TipoComponente TC ON C.fkTipoComponente = TC.idTipoComponente
LEFT JOIN Metrica M ON C.fkMetrica = M.idMetrica
WHERE C.idComponente = 5;


-- ESSE É O SELECT QUE TEM QUE USAR
SELECT
    C.idComponente AS ID,
    C.nome AS NomeDoComponente,
    R.valorRegistro AS ValorDoRegistro,
    U.unidadeMedida AS UnidadeDeMedida,
    TC.tipoComponente AS TipoDeComponente,
    M.tipo_dado AS Metrica,
    R.dataRegistro AS DataDoRegistro
FROM Componente C
LEFT JOIN Servidor S ON C.fkServidor = S.idServidor
LEFT JOIN UnidadeMedida U ON C.fkUnidadeMedida = U.idUnidadeMedida
LEFT JOIN TipoComponente TC ON C.fkTipoComponente = TC.idTipoComponente
LEFT JOIN Metrica M ON C.fkMetrica = M.idMetrica
LEFT JOIN Registro R ON C.idComponente = R.fkComponente
WHERE C.idComponente = 1;

select * from Servidor;

SELECT C.nome AS NomeDoComponente, TC.tipoComponente AS TipoDeComponente
FROM Componente C
JOIN TipoComponente TC ON C.fkTipoComponente = TC.idTipoComponente
WHERE C.fkServidor = 1;


SELECT C.nome AS NomeDoComponente, TC.tipoComponente AS TipoDeComponente, R.dataRegistro AS DataDoRegistro, R.valorRegistro AS ValorDoRegistro, M.alerta AS LimiteDeAlerta
FROM Componente C
JOIN TipoComponente TC ON C.fkTipoComponente = TC.idTipoComponente
JOIN Registro R ON C.idComponente = R.fkComponente
JOIN Metrica M ON C.fkMetrica = M.idMetrica
WHERE R.valorRegistro > M.alerta;

SELECT * FROM Funcionario;
SELECT * FROM Empresa;
SELECT * FROM Salas;
 
 -- 7 é o valor do id da Empresa que você fez o login 
 insert into Salas values(
 null, 'SalaKotlin', 14, 7
 );
 
 -- 9 é o valor do id da Sala que você cadastrou 
 insert into Servidor values(
 null, 'ServidorPrincipalKotlin', 'X4U9DO','UBUNTU','hfus283289hf2', 9
 );
 
 insert into Servidor values(
 null, 'ServidorSecundarioKotlin', 'HY7DJ9','WINDOWS','sad832da283hd', 9
 );
 
 -- 7 é o valor do id que está da empresa que vc fez o login
 SELECT * 
	FROM Servidor JOIN Salas 
		ON Servidor.fkSalas = Salas.idSalas
        JOIN Empresa ON Salas.fkEmpresa = Empresa.idEmpresa 
        WHERE Salas.fkEmpresa = 7;
        

 
-- /*
-- comandos para criar usuário em banco de dados azure, sqlserver,
-- com permissão de insert + update + delete + select
-- */

-- CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
-- WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
-- DEFAULT_SCHEMA = dbo;

-- EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
-- @membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

-- EXEC sys.sp_addrolemember @rolename = N'db_datareader',
-- @membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';