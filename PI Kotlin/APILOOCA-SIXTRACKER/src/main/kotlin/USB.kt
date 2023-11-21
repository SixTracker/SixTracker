import java.time.LocalDateTime

data class USB(
    var id: Int,
    var idExclusivo: String = "",
    var nomeUSB: String,
    var dataHora: LocalDateTime,
) {

}