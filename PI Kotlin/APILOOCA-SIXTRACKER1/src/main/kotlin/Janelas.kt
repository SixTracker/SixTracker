import java.time.LocalDateTime

// data class é uma classe especialmente designada para armazenar dados
data class Janelas(
    var id: Int,
    var dataHora: LocalDateTime,
    var nomesJanelas: List<String>,
    var quantidade: Int,

    ) {

}