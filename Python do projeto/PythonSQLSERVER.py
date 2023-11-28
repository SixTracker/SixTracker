import psutil
import platform
import time
from datetime import datetime
import json
import requests
import socket
import sys
import pyodbc

def iniciar():
    mensagem = {"text": "Olá, bem-vindo. O sistema da 6TRACKER foi iniciado!"}
    webhook = "https://hooks.slack.com/services/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"
    requests.post(webhook, data=json.dumps(mensagem))

def sql_server_connection(server, database, username, password):
    connection_string = f'DRIVER={{SQL Server}};SERVER={'54.146.1.25'};DATABASE={'sixtracker'};UID={'sa'};PWD={'Sixtracker@'}'
    try:
        connection = pyodbc.connect(connection_string)
        return connection
    except pyodbc.Error as ex:
        print(f"Erro ao conectar ao banco de dados: {ex}")
        sys.exit()

def get_ip():
    hostname = socket.gethostname()
    ip = socket.gethostbyname(hostname)
    return ip

def cadastrar_componentes(connection, result_servidor):
    cursor = connection.cursor()
    componentes = {
        10: "Porcentagem de Disco",
        11: "Disco total",
        12: "Disco Usado",
        13: "Disco Tempo de Leitura",
        14: "Disco Tempo de Escrita",
        1: "Porcentagem de CPU",
        2: "Velocidade da CPU",
        4: "Número de Processos da CPU",
        5: "Porcentagem de Memória",
        6: "Total de Memória",
        7: "Memória Usada",
        8: "Porcentagem de Memória Swap",
        9: "Memória Swap Usada"
    }

    try:
        cursor.execute("SELECT idComponente, nome FROM Componente WHERE fkServidor = ?", (result_servidor[0],))
        componentes_servidor = cursor.fetchall()

        for componente_id, componente_nome in componentes.items():
            if not any(componente_id == comp[0] for comp in componentes_servidor):
                cursor.execute("INSERT INTO Componente (nome, fkServidor) VALUES (?, ?)", (componente_nome, result_servidor[0]))

        if not componentes_servidor:
            print(f"Não há componentes cadastrados para o Servidor {hostname}. Cadastre componentes para continuar.")
            sys.exit()
        else:
            print(f"\nComponentes cadastrados para o Servidor {hostname}:")
            for componente in componentes_servidor:
                print(f"ID: {componente[0]}, Nome: {componente[1]}")

        connection.commit()
    except pyodbc.Error as ex:
        print(f"Erro ao cadastrar componentes: {ex}")
    finally:
        cursor.close()

def bytes_para_gb(bytes_value):
    return bytes_value / (1024 ** 3)

def milissegundos_para_segundos(ms_value):
    return ms_value / 1000

def registrar_dados_disco(connection, disco, horarioFormatado):
    cursor = connection.cursor()
    ins = [
        disco.percent,
        "{:.2f}".format(bytes_para_gb(disco.total)),
        "{:.2f}".format(bytes_para_gb(disco.used)),
        milissegundos_para_segundos(psutil.disk_io_counters(perdisk=False, nowrap=True)[4]),
        milissegundos_para_segundos(psutil.disk_io_counters(perdisk=False, nowrap=True)[5])
    ]
    componentes = [10, 11, 12, 13, 14]

    try:
        for i in range(len(ins)):
            valorRegistro = ins[i]
            componente = componentes[i]
            query = "INSERT INTO Registro (valorRegistro, dataRegistro, fkComponente) VALUES (?, ?, ?)"
            cursor.execute(query, (valorRegistro, horarioFormatado, componente))

        connection.commit()
    except pyodbc.Error as ex:
        print(f"Erro ao registrar dados de disco: {ex}")
    finally:
        cursor.close()

def registrar_dados_cpu_memoria(connection, cpuPorcentagem, cpuVelocidadeEmGhz, processos, memoriaPorcentagem, horarioFormatado):
    cursor = connection.cursor()
    ins = [
        cpuPorcentagem,
        cpuVelocidadeEmGhz,
        processos,
        memoriaPorcentagem,
        "{:.2f}".format(bytes_para_gb(psutil.virtual_memory().total)),
        "{:.2f}".format(bytes_para_gb(psutil.virtual_memory().used)),
        psutil.swap_memory().percent,
        "{:.2f}".format(bytes_para_gb(psutil.swap_memory().used))
    ]
    componentes = [1, 2, 4, 5, 6, 7, 8, 9]

    try:
        for i in range(len(ins)):
            valorRegistro = ins[i]
            componente = componentes[i]
            query = "INSERT INTO Registro (valorRegistro, dataRegistro, fkComponente) VALUES (?, ?, ?)"
            cursor.execute(query, (valorRegistro, horarioFormatado, componente))

        connection.commit()
    except pyodbc.Error as ex:
        print(f"Erro ao registrar dados de CPU e memória: {ex}")
    finally:
        cursor.close()

if __name__ == "__main__":
    ip = get_ip()
    print("O ip da máquina é:", ip)

    SO = platform.system()
    print("O sistema operacional é:", SO)

    hostname = socket.gethostname()
    print("Nome do host da máquina:", hostname)

    # Substitua 'seu_servidor', 'seu_usuario', 'sua_senha' e 'sixtracker' pelos seus valores
    connection = sql_server_connection('54.146.1.25', 'sixtracker', 'sa', 'Sixtracker@')
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT idServidor FROM Servidor WHERE nome = ?", (hostname,))
        result_servidor = cursor.fetchone()

        if not result_servidor:
            print(f"O Servidor {hostname} não foi cadastrado no site. Cadastre-o para fazer a captura!")
            sys.exit()

        cadastrar_componentes(connection, result_servidor)

        while True:
            if SO == "Linux":
                nome_disco = '/'
            elif SO == "Windows":
                nome_disco = 'C:\\'

            disco = psutil.disk_usage(nome_disco)
            horarioAtual = datetime.now()
            horarioFormatado = horarioAtual.strftime('%Y-%m-%d %H:%M:%S')

            registrar_dados_disco(connection, disco, horarioFormatado)

            ins = [disco.percent, "{:.2f}".format(bytes_para_gb(disco.total)),
                   "{:.2f}".format(bytes_para_gb(disco.used)),
                   milissegundos_para_segundos(psutil.disk_io_counters(perdisk=False, nowrap=True)[4]),
                   milissegundos_para_segundos(psutil.disk_io_counters(perdisk=False, nowrap=True)[5])]
            componentes = [10, 11, 12, 13, 14]

            for i in range(len(ins)):
                valorRegistro = ins[i]
                componente = componentes[i]
                query = "INSERT INTO Registro (valorRegistro, dataRegistro, fkComponente) VALUES (?, ?, ?)"
                cursor.execute(query, (valorRegistro, horarioFormatado, componente))

            connection.commit()

            print("\n----INFORMAÇÕES DO DISCO: -----")
            print(f'\nDisco porcentagem: {disco.percent}%',
                  f'\nDisco total: {bytes_para_gb(disco.total):.2f} GB',
                  f'\nTempo de leitura do disco em segundos: {milissegundos_para_segundos(psutil.disk_io_counters(perdisk=False, nowrap=True)[4]):.2f} s',
                  f'\nTempo de escrita do disco em segundos: {milissegundos_para_segundos(psutil.disk_io_counters(perdisk=False, nowrap=True)[5]):.2f} s')

            # Registrar dados de CPU e Memória
            cpuPorcentagem = psutil.cpu_percent(None)
            frequenciaCpuMhz = psutil.cpu_freq(percpu=False)
            cpuVelocidadeEmGhz = "{:.2f}".format(frequenciaCpuMhz.current / 1000)
            tempoSistema = psutil.cpu_times()[1]
            processos = len(psutil.pids())

            memoriaPorcentagem = psutil.virtual_memory()[2]

            registrar_dados_cpu_memoria(connection, cpuPorcentagem, cpuVelocidadeEmGhz, processos, memoriaPorcentagem,
                                        horarioFormatado)

            ins = [cpuPorcentagem, cpuVelocidadeEmGhz, tempoSistema, processos, memoriaPorcentagem,
                   "{:.2f}".format(bytes_para_gb(psutil.virtual_memory().total)),
                   "{:.2f}".format(bytes_para_gb(psutil.virtual_memory().used)),
                   psutil.swap_memory().percent, "{:.2f}".format(bytes_para_gb(psutil.swap_memory().used))]
            componentes = [1, 2, 4, 5, 6, 7, 8, 9]

            for i in range(len(ins)):
                valorRegistro = ins[i]
                componente = componentes[i]
                query = "INSERT INTO Registro (valorRegistro, dataRegistro, fkComponente) VALUES (?, ?, ?)"
                cursor.execute(query, (valorRegistro, horarioFormatado, componente))

            connection.commit()

            # Imprimir informações (opcional)
            print("\n----INFORMAÇÕES DA CPU: -----")
            print(f'\nPorcentagem da CPU: {cpuPorcentagem}%',
                  f'\nVelocidade da CPU: {cpuVelocidadeEmGhz} GHz',
                  f'\nNumero de processos: {processos}')

            print("\n----INFORMAÇÕES DA MEMORIA: -----")
            print(f'\nPorcentagem utilizada de memoria: {memoriaPorcentagem}%')

            print("\n------- INFORMAÇÕES SOBRE PROCESSAMENTO GERAL ---------: ")
            print(f'\nPorcentagem utilizada da CPU: {cpuPorcentagem}%',
                  f'\nVelocidade da CPU: {cpuVelocidadeEmGhz} GHz',
                  f'\nNumero de processos: {processos}',
                  f'\nPorcentagem utilizada de memoria: {memoriaPorcentagem}%',
                  f'\nQuantidade Total de memoria: {bytes_para_gb(psutil.virtual_memory().total):.2f} GB',
                  f'\nQuantidade usada de memoria: {bytes_para_gb(psutil.virtual_memory().used):.2f} GB',
                  f'\nPorcentagem usada de memoria Swap: {psutil.swap_memory().percent}%',
                  f'\nQuantidade usada de memoria Swap: {bytes_para_gb(psutil.swap_memory().used):.2f} GB',
                  f'\nDisco porcentagem: {disco.percent}%',
                  f'\nDisco total: {bytes_para_gb(disco.total):.2f} GB',
                  f'\nTempo de leitura do disco em segundos: {milissegundos_para_segundos(psutil.disk_io_counters(perdisk=False, nowrap=True)[4]):.2f} s',
                  f'\nTempo de escrita do disco em segundos: {milissegundos_para_segundos(psutil.disk_io_counters(perdisk=False, nowrap=True)[5]):.2f} s',
                  '\n ',
                  '\nHorario Atual dos dados: ', horarioFormatado)

            # Intervalo de espera antes da próxima iteração (opcional)
            time.sleep(10)

    except pyodbc.Error as ex:
        print(f"Erro geral: {ex}")
    finally:
        cursor.close()
        connection.close()
