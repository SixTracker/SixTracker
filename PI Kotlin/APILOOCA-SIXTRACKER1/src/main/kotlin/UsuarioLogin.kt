import Conexao.jdbcTemplate
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.BeanPropertyRowMapper

class UsuarioLogin {
    var nome:String = ""
    var email:String = ""
    var senha:String = ""
    var fkEmpresa:Int = 0

    fun validarLogin(login: UsuarioLogin): Boolean {
        try {
            val usuario = jdbcTemplate?.queryForObject(
                """
            SELECT nome, email, senha, fkEmpresa FROM Funcionario WHERE (email = '${login.email}' AND senha = '${login.senha}')
            """, BeanPropertyRowMapper(UsuarioLogin::class.java)
            )
            return true
        } catch (e: EmptyResultDataAccessException) {
            println("Seu login não está no banco...")
            return false // Ou outro valor padrão que faça sentido no seu contexto
        }
    }

    fun comprimentar(login: UsuarioLogin): String {
        val usuario = jdbcTemplate?.queryForObject(
            """
            SELECT nome FROM Funcionario WHERE (email = '${login.email}' AND senha = '${login.senha}')
            """, BeanPropertyRowMapper(UsuarioLogin::class.java)
        )
        val mensagem = """
            Boas-vindas, ${usuario?.nome}, seu login foi validado com sucesso!
            Agora você irá prosseguir para etapa de monitoramento. 
        """

        return mensagem
    }

    fun verificarEmpresa(login: UsuarioLogin): Int? {
        val usuario = jdbcTemplate?.queryForObject(
            """
            SELECT fkEmpresa FROM Funcionario WHERE (email = '${login.email}' AND senha = '${login.senha}')  
            """, BeanPropertyRowMapper(UsuarioLogin::class.java)
        )
        val fkEmpresa = usuario?.fkEmpresa

        return fkEmpresa
    }

    fun mostrarServidor(fkEmpresa: Int): String {



        val listaServidores: List<Servidor> = jdbcTemplate!!.query(
            "SELECT Servidor.idServidor, Servidor.nome \n" +
                    "\tFROM Servidor JOIN Salas \n" +
                    "\t\tON Servidor.fkSalas = Salas.idSalas\n" +
                    "        JOIN Empresa ON Salas.fkEmpresa = Empresa.idEmpresa \n" +
                    "        WHERE Salas.fkEmpresa = $fkEmpresa;",
            BeanPropertyRowMapper(Servidor::class.java)
        )

        val servidor = listaServidores.map {
            "Servidor ${it.idServidor} - ${it.nome}"
        }.joinToString("\n")
        return servidor
    }

}