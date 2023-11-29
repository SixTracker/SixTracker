from mysql.connector import connect
import psutil
import platform
import time
import mysql.connector
from datetime import datetime
import requests
import json
import string
import socket
import sys

def iniciar():
    mensagem = {"text": "Olá, bem-vindo. O sistema da 6TRACKER foi iniciado!"}
    webhook = "https://hooks.slack.com/services/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"
    
    try:
        requests.post(webhook, data=json.dumps(mensagem))
        print("Mensagem enviada com sucesso para o Slack!")
    except requests.exceptions.ConnectionError as e:
        print(f"Erro de conexão ao enviar mensagem para o Slack: {e}")
        # Adicione qualquer manipulação de erro adicional aqui, se necessário.

# Restante do seu código...


def mysql_connection(host, user, passwd, database=None):
    connection = connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    return connection

def get_ip():
    hostname = socket.gethostname()
    ip = socket.gethostbyname(hostname)
    return ip

def bytes_para_gb(bytes_value):
    return bytes_value / (1024 ** 3)

def milissegundos_para_segundos(ms_value):
    return ms_value / 1000

if __name__ == "__main__":
    iniciar()

    ip = get_ip()
    print("O ip da máquina é:", ip)

    SO = platform.system()
    print("O sistema operacional é:", SO)

    hostname = socket.gethostname()
    print("Nome do host da máquina:", hostname)

    connection = mysql_connection('localhost', 'root', '271815', 'sixtracker')
    cursor = connection.cursor()

    # Verificar se o servidor já está cadastrado
    cursor.execute("SELECT idServidor FROM Servidor WHERE nome = %s", (hostname,))
    result_servidor = cursor.fetchone()

    if not result_servidor:
        print(f"O Servidor {hostname} não foi cadastrado no site. Cadastre-o para fazer a captura!")
        sys.exit()

    # Definindo os componentes
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

    # Buscar os componentes cadastrados para o servidor
    cursor.execute("SELECT idComponente, nome FROM Componente WHERE fkServidor = %s", (result_servidor[0],))
    componentes_servidor = cursor.fetchall()

    while True:
        time.sleep(5)
        # Coleta de dados do Disco
        meu_so = platform.system()
        if meu_so == "Linux":
            nome_disco = '/'
            disco = psutil.disk_usage(nome_disco)
        elif meu_so == "Windows":
            nome_disco = 'C:\\'
            disco = psutil.disk_usage(nome_disco)

        discoPorcentagem = disco.percent
        discoTotal = "{:.2f}".format(bytes_para_gb(disco.total))
        discoUsado = "{:.2f}".format(bytes_para_gb(disco.used))
        discoTempoLeitura = milissegundos_para_segundos(psutil.disk_io_counters(perdisk=False, nowrap=True)[4])
        discoTempoEscrita = milissegundos_para_segundos(psutil.disk_io_counters(perdisk=False, nowrap=True)[5])

        ins = [discoPorcentagem, discoTotal, discoUsado, discoTempoLeitura, discoTempoEscrita]
        componentes = [10, 11, 12, 13, 14]

        horarioAtual = datetime.now()
        horarioFormatado = horarioAtual.strftime('%Y-%m-%d %H:%M:%S')

        # Inserir dados do Disco
        for i in range(len(ins)):
            valorRegistro = ins[i]
            componente = componentes[i]

            # Verificar se o componente já está cadastrado na tabela Componente
            cursor.execute("SELECT idComponente FROM Componente WHERE fkServidor = %s AND idComponente = %s", (result_servidor[0], componente))
            result_componente = cursor.fetchone()

            if not result_componente:
                # Componente não encontrado, adicione à tabela Componente
                cursor.execute("INSERT INTO Componente (idComponente, fkServidor) VALUES (%s, %s)", (componente, result_servidor[0]))

            # Continue com a lógica de inserção na tabela Registro
            query = "INSERT INTO Registro (valorRegistro, dataRegistro, fkComponente) VALUES (%s, %s, %s)"
            cursor.execute(query, (valorRegistro, horarioFormatado, componente))
            connection.commit()

        print("\n----INFORMAÇÕES DO DISCO: -----")
        print(f'\nDisco porcentagem: {discoPorcentagem}%',
              f'\nDisco total: {discoTotal} GB',
              f'\nTempo de leitura do disco em segundos: {discoTempoLeitura} s',
              f'\nTempo de escrita do disco em segundos: {discoTempoEscrita} s')

        # Coleta de dados da CPU e Memória
        cpuPorcentagem = psutil.cpu_percent(None)
        frequenciaCpuMhz = psutil.cpu_freq(percpu=False)
        cpuVelocidadeEmGhz = "{:.2f}".format(frequenciaCpuMhz.current / 1000)
        tempoSistema = psutil.cpu_times()[1]
        processos = len(psutil.pids())

        # Memoria
        memoriaPorcentagem = psutil.virtual_memory()[2]
        memoriaTotal = "{:.2f}".format(bytes_para_gb(psutil.virtual_memory().total))
        memoriaUsada = "{:.2f}".format(bytes_para_gb(psutil.virtual_memory().used))
        memoriaSwapPorcentagem = psutil.swap_memory().percent
        memoriaSwapUso = "{:.2f}".format(bytes_para_gb(psutil.swap_memory().used))

        ins = [cpuPorcentagem, cpuVelocidadeEmGhz, tempoSistema, processos, memoriaPorcentagem,
               memoriaTotal, memoriaUsada, memoriaSwapPorcentagem, memoriaSwapUso]
        componentes = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        # Inserir dados da CPU e Memória
        for i in range(len(ins)):
            valorRegistro
