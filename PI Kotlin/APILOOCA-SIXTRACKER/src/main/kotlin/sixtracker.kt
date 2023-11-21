import com.github.britooo.looca.api.core.Looca
import com.github.britooo.looca.api.group.janelas.Janela
import com.github.britooo.looca.api.group.rede.Rede
import com.github.britooo.looca.api.group.dispositivos.DispositivoUsb


fun main() {
    //Cria uma instância da classe `Looca`.
    val looca: Looca = Looca()

    //Declara duas variáveis do tipo `Janela` e `Rede`.
    val janela: Janela
    val rede: Rede
    val usb: DispositivoUsb
    var grupoUsb = looca.dispositivosUsbGrupo

    //Obtém o objeto `dadosJanelas` da classe `Looca`.
    val dadosJanelas = looca.grupoDeJanelas

    //Obtém uma lista de janelas do objeto `dadosJanelas`.
    val listaJanelas = dadosJanelas.janelas

    //Obtém a quantidade de janelas na lista.
    val quantidadeJanelas = listaJanelas.size

    // Cria uma lista de nomes de janelas a partir da lista de janelas.
    // map -> é uma função que transforma uma lista em outra lista e a { it.getTitulo() } é uma função que é usada para transformar cada janela em seu nome.
    val nomesJanelas = listaJanelas.map { it.getTitulo() }

    //Imprime a quantidade de janelas e o nome de cada uma delas na saída do console.
    println("Quantidade de janelas: $quantidadeJanelas")
    println("Nomes das janelas: $nomesJanelas")

    //Obtém uma lista de interfaces de rede do objeto `rede`.
    val redes = looca.rede.grupoDeInterfaces.interfaces.slice(4..5)

    // Declara duas variáveis do tipo `MutableList` para armazenar os bytes recebidos e enviados.
    // Long -> é o tipo de dados nativo do Kotlin para representar valores inteiros de 64 bits.
    val listaBytesRecebidos = mutableListOf<Long>()
    val listaBytesEnviados = mutableListOf<Long>()

    //Percorre a lista de interfaces de rede e adiciona os bytes recebidos e enviados a cada lista.
    for (rede in redes) {
        listaBytesRecebidos.add(rede.getBytesRecebidos())
        listaBytesEnviados.add(rede.getBytesEnviados())
    }

    //Imprime os bytes recebidos e enviados na saída do console.
    println("Bytes recebidos: $listaBytesRecebidos bytes de ${redes[0].getNome()}".toDouble()/1024/1024/1024)
    println("Bytes enviados: $listaBytesEnviados bytes de ${redes[1].getNome()}".toDouble()/1024/1024/1024)

    // USB

    val listaConectados = looca.dispositivosUsbGrupo.dispositivosUsbConectados
    // val qtdConectados = listaConectados.size
    //val qtdConectados2 = looca.dispositivosUsbGrupo.totalDispositvosUsbConectados


    listaConectados.forEach {
        println("""
            
            Nome USB: ${it.nome}
            ID USB: '${it.idDispositivoUsbExclusivo}'
            
            
        """.trimIndent())
    }
//    //Imprimindo valores USB
//    println("Id Exclusivo: $idExclusivo")
//    println("Quantidade de USB Conectados: $qtdConectados2")
//    println("Nomes do USB: $nome")
//
}



