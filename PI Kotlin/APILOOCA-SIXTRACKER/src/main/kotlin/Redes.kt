import java.time.LocalDateTime

data class Redes (
    var id: Int,
    var dataHora: LocalDateTime,
    var nomeRede: String,
    var bytesEnviados: Long,
    var bytesRecebidos: Long,

    ) {

}