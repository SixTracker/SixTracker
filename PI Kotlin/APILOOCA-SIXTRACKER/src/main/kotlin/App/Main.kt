package App

import com.github.britooo.looca.api.core.Looca // biblioteca para capturar informações do sistema
import java.time.LocalDateTime // biblioteca para lidar com informações de data e hora
import java.util.concurrent.TimeUnit // biblioteca usada para manipulação de unidades de tempo.
import DadosRepositorios
import Janelas
import Redes
import USB
import Conexao
import UsuarioLogin
import Servidor
import java.util.*
import javax.swing.JOptionPane


open class Main {
    companion object {
        @JvmStatic fun main(args: Array<String>) {

            // chamando a função criarTabelas() da classe Conexao, a qual é responsável por criar tabelas no banco de dados.
            Conexao.criarTabelas()

            // criando instância da api de captura
            val looca = Looca()
            //criando instância da classe DadosRepositorios
            val repositorio = DadosRepositorios()
            //criando instância da classe UsuarioLogin
            val login = UsuarioLogin()

            // chamando o método iniciar criado na classe DadosRepositorios para iniciar a conexão com o banco de dados
            repositorio.iniciar()

            login.email = JOptionPane.showInputDialog("Digite o seu email:").toString()
            login.senha = JOptionPane.showInputDialog("Digite a sua senha:").toString()

            // chamando função para fazer o Login para a captura de dados
            if (login.validarLogin(login)) {
                JOptionPane.showMessageDialog(null,login.comprimentar(login))
                var fkEmpresa = login.verificarEmpresa(login)
                var listaDeServidor = fkEmpresa?.let { login.mostrarServidor(it) }
                var idServidor =
                    JOptionPane.showInputDialog("Digite o ID da máquina que você deseja monitorar:\n\r $listaDeServidor").toInt()


                val repositorio = DadosRepositorios()
                repositorio.iniciar()

                JOptionPane.showConfirmDialog(null, "O monitoramento irá inicializar agora!")

                while (true) { // loop infinito
                    // chamando a função capturarDadosJ(looca) para obter dados sobre janelas
                    val novaJanela = capturarDadosJ(looca)
                    // chamando o método cadastrarJanela na instância de DadosRepositorios para armazenar esses dados
                    // cadastrar janelas efetua um insert na tabela janela do bd
                    repositorio.cadastrarJanela(novaJanela,idServidor)

                    // chamando a função capturarDadosR(looca) para obter dados sobre redes
                    val novaRede = capturarDadosR(looca)
                    // chamando o método cadastrarRede na instância de DadosRepositorios para armazenar esses dados no banco
                    // cadastrar rede efetura um insert na tabela rede do bd
                    repositorio.cadastrarRede(novaRede,idServidor)

                    // chamando a função capturarDadosU(looca) para obter dados sobre USB
                    val novoUSB = capturarDadosU(looca)

                    // chamando o método cadastrarUSB na instância de DadosRepositorios para armazenar esses dados no banco
                    // cadastrar usb efetua um insert na tabela usb do bd

                    val listaUsbs = capturarDadosU(looca)

                    listaUsbs.forEach {
                        repositorio.cadastrarUSB(it,idServidor)
                    }


                    // Aguarda 5 segundos antes de capturar os dados novamente
                    TimeUnit.SECONDS.sleep(5)
                }
            }
        }

        fun capturarDadosJ(looca: Looca): Janelas {
            // cria uma função para capturar dados das janelas de aplicativos recebe uma instância de Looca como parâmetro e retorna um objeto do tipo Janelas

            // grupoDeJanelas é um grupo de informações sobre as janelas abertas no sistema, portanto, dadosJanelas contém informações sobre as janelas do sistema
            val dadosJanelas = looca.grupoDeJanelas

            // dadosJanelas possui uma propriedade chamada janelas, a qual é uma lista de objetos representando janelas individuais, sendo assim, listaJanelas é uma lista contendo informações detalhadas sobre cada janela no sistema
            val listaJanelas = dadosJanelas.janelas

            // quantidadeJanelas é uma variável que armazena o número de elementos na lista de janelas, indicando quantas janelas estão abertas no sistema
            val quantidadeJanelas = listaJanelas.size

            // nomesJanelas é uma lista que contém os nomes das janelas, sendo processados
            // método mapNotNull é usado para transformar cada elemento da lista (janela) usando a seguinte lógica:
            //  it.getTitulo() obtém o título da janela
            //  ?.substring(0, minOf(it.getTitulo().length, 255)) pega os primeiros 255 caracteres do título, ou o comprimento total do título se for menor que 255
            //  mapNotNull descarta os elementos que se tornam nulos após o mapeamento
            //  o filtro { it.isNotEmpty() } é usado para filtrar os elementos da lista resultante, removendo aqueles que estão vazios (comprimento zero)
            val nomesJanelas = listaJanelas
                .mapNotNull { it.getTitulo()?.substring(0, minOf(it.getTitulo().length, 255)) }
                .filter { it.isNotEmpty() }

            // printando os resultados no console
            println("Quantidade de janelas: $quantidadeJanelas")
            println("Nomes das janelas: $nomesJanelas")

            // retorna a instância janelas com informações sobre as janelas do sistema
            // 0 -> id
            // LocalDateTime.now() -> data e hora atual
            // nomesJanelas -> nome das janelas abertas
            // quantidadeJanelas -> tamanho da lista

            return Janelas(0, LocalDateTime.now(), nomesJanelas, quantidadeJanelas)
        }

        fun capturarDadosR(looca: Looca): Redes {
            // cria uma função para capturar dados de rede, recebe uma instância de Looca como parâmetro e retorna um objeto do tipo Redes
            // a variável obtem informações sobre as interfaces de rede do sistema
            // looca.rede é um objeto que pega as informações sobre a rede
            // grupoDeInterfaces é uma propriedade desse objeto, e interfaces é uma lista de interfaces de rede
            // o slice(4..5) serve para selecionar as interfaces de rede no índice 4 e 5 da lista
            val redes = looca.rede.grupoDeInterfaces.interfaces


            // criando lista mutáveis para adicionar os bytes e o long serve para armazenar números inteiros de até 64 bits
            val listaBytesRecebidos = mutableListOf<Long>()
            val listaBytesEnviados = mutableListOf<Long>()

            for (rede in redes) {
                // get servem para coletar os dados de rede
                // os dados são adicionados nas listas
                listaBytesRecebidos.add(rede.getBytesRecebidos())
                listaBytesEnviados.add(rede.getBytesEnviados())
            }

            // printando os resultados no console
            println("Bytes enviados: $listaBytesEnviados bytes de ${redes[1].getNome()}")

            // como nós queremos coletar dados apenas de ethernet, eu fixei o nome da rede
            val nomeRede = "eth15"

            // retorna a instância janelas com informações sobre as janelas do sistema
            // 0 -> id
            // LocalDateTime.now() -> data e hora atual
            // nomesRede -> eth15
            // listaBytesEnviados -> pega o número máximo da lista, já que haverá só um por captura
            // listaBytesRecebidos -> pega o número máximo da lista, já que haverá só um por captura
            return Redes(0, LocalDateTime.now(), nomeRede, listaBytesEnviados.max(), listaBytesRecebidos.max())
        }

        fun capturarDadosU(looca: Looca) : List<USB> {
            // cria uma função para capturar dados de USB, recebe uma instância de Looca como parâmetro e retorna um objeto do tipo Redes
            // a variável obtem informações sobre as USB conectadas ao sistema
            // looca.dispositivoUsb é um objeto que pega as informações sobre a rede
            // dispositivosUsbGrupo é uma propriedade desse objeto


            // retorna a instância janelas com informações sobre as janelas do sistema
            // 0 -> id
            // LocalDateTime.now() -> data e hora atual
            // nomesUSB -> nome do USB que é conectado ao dispositivo
            // qtdConectada -> quantidade de USB conectado ao dispositivo
            // idExclusivo -> id exclusivo e unico da USB

            val listaConectados = looca.dispositivosUsbGrupo.dispositivosUsbConectados
            //val qtdConectados = listaConectados.size

            //val qtdConectados2 = looca.dispositivosUsbGrupo.totalDispositvosUsbConectados

            val listaUsbs = mutableListOf<USB>()

            listaConectados.forEach {
                listaUsbs.add(USB(0, it.idDispositivoUsbExclusivo, it.nome, LocalDateTime.now()))
            }
            return listaUsbs
        }

    }
}

