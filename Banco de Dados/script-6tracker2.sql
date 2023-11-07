-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/
Create DATABASE sixtracker;
Use sixtracker;

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
ip varchar(45), 
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
            
CREATE TABLE janelas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nomeJanelaJson VARCHAR(1000),
            quantidade INT,
            dataHora TIMESTAMP,
            fkServidor int,
            constraint fkServidor foreign key (fkServidor) 
			references Servidor (idServidor)
        );

            
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
 
 -- Select para ver o Servidor e os componentes monitorados -- 
 
 select 
	Servidor.nome as NomeServidor, 
    Servidor.sistemaOperacional as SoServidor, 
    Servidor.ip as IP, 
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

-- CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
-- WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
-- DEFAULT_SCHEMA = dbo;

-- EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
-- @membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

-- EXEC sys.sp_addrolemember @rolename = N'db_datareader',
-- @membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

select * from Registro
join Componente on fkComponente = idComponente;