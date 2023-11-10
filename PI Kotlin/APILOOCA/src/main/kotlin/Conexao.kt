import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

object Conexao {

    var jdbcTemplate: JdbcTemplate? = null
        get() {
            if (field == null){
                val dataSource = BasicDataSource()
                dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
                dataSource.url= "jdbc:mysql://localhost:3306/sixtracker"
                dataSource.username = "root"
                dataSource.password = "1234"
                val novoJdbcTemplate = JdbcTemplate(dataSource)
                field = novoJdbcTemplate
            }
            return  field
        }

    fun criarTabelas() {
        val jdbcTemplate = Conexao.jdbcTemplate ?: throw IllegalStateException("O jdbcTemplate não foi inicializado corretamente.")

        // Criação da tabela janelas
        fun criarTabelas() {
            val jdbcTemplate = Conexao.jdbcTemplate ?: throw IllegalStateException("O jdbcTemplate não foi inicializado corretamente.")

            // Criação da tabela janelas
            jdbcTemplate.execute("""
        CREATE TABLE IF NOT EXISTS janelas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nomeJanelaJson VARCHAR(1000),
            quantidade INT,
            dataHora TIMESTAMP,
            fkServidor int not null,
            constraint fkServidor foreign key (fkServidor) 
			references Servidor (idServidor)
        )
    """)

            // Criação da tabela rede
            jdbcTemplate.execute("""
        CREATE TABLE IF NOT EXISTS rede (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nomeRede VARCHAR(50),
            bytesEnviados LONG,
            bytesRecebidos LONG,
            dataHora TIMESTAMP,
            fkServidor int not null,
            constraint fkServidor foreign key (fkServidor) 
			references Servidor (idServidor)
        )
    """)
            //Criação Tabela USB
            jdbcTemplate.execute("""
                CREATE TABLE IF NOT EXISTS usb (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    idExclusivo Int,
                    qtdConectada INT,
                    nomeUSB VARCHAR(50),
                    dataHora TIMESTAMP,
                    fkServidor int not null,
                    constraint fkServidor foreign key (fkServidor) 
			        references Servidor (idServidor)
            """)

//            jdbcTemplate.execute("""
//
//                create table Servidor(
//                idServidor int primary key auto_increment,
//                nome varchar(60),
//                codigo varchar(50),
//                sistemaOperacional varchar(45),
//                ip varchar(45)
//           """ );
        }

    }
}