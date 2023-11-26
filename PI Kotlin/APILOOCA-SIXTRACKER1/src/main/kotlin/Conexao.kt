import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

object Conexao {

    var jdbcTemplate: JdbcTemplate? = null
        get() {
            if (field == null) {

                val dataSource = BasicDataSource()
                dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
                dataSource.url = "jdbc:mysql://localhost:3306/sixtracker"
                dataSource.username = "root"
                dataSource.password = "Isabeol0609!"
                val novoJdbcTemplate = JdbcTemplate(dataSource)
                field = novoJdbcTemplate

            }
            return field
        }
    var jdbcTemplateServer: JdbcTemplate? = null
        get() {
            if (field == null) {
                val dataSourceServer = BasicDataSource()
                dataSourceServer.url = "jdbc:sqlserver://52.7.105.138;databaseName=sixtracker;encrypt=false";
                dataSourceServer.driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
                dataSourceServer.username = "sa"
                dataSourceServer.password = "Sixtracker@"
                val novoJdbcTemplateServer = JdbcTemplate(dataSourceServer)
                field = novoJdbcTemplateServer

            }
            return field
        }

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

        // Criação da tabela USB
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
        )
    """)

        // Exemplo de criação da tabela Servidor
        jdbcTemplate.execute("""
        CREATE TABLE IF NOT EXISTS Servidor (
            idServidor INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(60),
            codigo VARCHAR(50),
            sistemaOperacional VARCHAR(45),
            ip VARCHAR(45)
        )
    """)
    }
}
