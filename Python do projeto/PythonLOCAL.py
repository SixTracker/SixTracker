from mysql.connector import connect
import psutil
import platform
import time
import mysql.connector
from datetime import datetime
import requests
import random
import json
import string
import socket
import sys

def iniciar():
    mensagem = {"text": "Olá, bem-vindo. O sistema da 6TRACKER foi iniciado!"}
    webhook = "https://hooks.slack.com/services/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"
    requests.post(webhook, data=json.dumps(mensagem))

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

def cadastrar_componentes(cursor, result_servidor):
    # Definindo os componentes
    componentes = {
        1: {"nome": "Porcentagem de CPU", "fkUnidadeMedida": 1, "fkTipoComponente": 1},
        2: {"nome": "Velocidade da CPU", "fkUnidadeMedida": 5, "fkTipoComponente": 1},
        4: {"nome": "Número de Processos da CPU", "fkUnidadeMedida": None, "fkTipoComponente": 1},
        5: {"nome": "Porcentagem de Memória", "fkUnidadeMedida": 1, "fkTipoComponente": 2},
        6: {"nome": "Total de Memória", "fkUnidadeMedida": 2, "fkTipoComponente": 2},
        7: {"nome": "Memória Usada", "fkUnidadeMedida": 2, "fkTipoComponente": 2},
        8: {"nome": "Porcentagem de Memória Swap", "fkUnidadeMedida": 1, "fkTipoComponente": 2},
        9: {"nome": "Memória Swap Usada", "fkUnidadeMedida": 2, "fkTipoComponente": 2},
        10: {"nome": "Porcentagem de Disco", "fkUnidadeMedida": 1, "fkTipoComponente": 3},
        11: {"nome": "Disco total", "fkUnidadeMedida": 2, "fkTipoComponente": 3},
        12: {"nome": "Disco Usado", "fkUnidadeMedida": 2, "fkTipoComponente": 3},
        13: {"nome": "Disco Tempo de Leitura", "fkUnidadeMedida": 4, "fkTipoComponente": 3},
        14: {"nome": "Disco Tempo de Escrita", "fkUnidadeMedida": 4, "fkTipoComponente": 3}
    }

    # Verificar se o servidor já está cadastrado
    cursor.execute("SELECT idServidor FROM Servidor WHERE nome = %s", (hostname,))
    result_servidor = cursor.fetchone()

    if not result_servidor:
        print(f"O Servidor {hostname} não foi cadastrado no site. Cadastre-o para fazer a captura!")
        sys.exit()

    # Buscar os componentes cadastrados para o servidor
    cursor.execute("SELECT idComponente, nome, fkTipoComponente, fkUnidadeMedida FROM Componente WHERE fkServidor = %s", (result_servidor[0],))
    componentes_servidor = cursor.fetchall()

    if not componentes_servidor:
        print(f"Não há componentes cadastrados para o Servidor {hostname}. Cadastre componentes para continuar.")
        cadastrar_componentes_padroes(cursor, result_servidor, componentes)
    else:
        print(f"\nComponentes cadastrados para o Servidor {hostname}:")
        for componente in componentes_servidor:
            print(f"ID: {componente[0]}, Nome: {componente[1]}")

        # Atualizar ou inserir componentes
        componentes_ids = cadastrar_componentes_padroes(cursor, result_servidor, componentes)

        # Adicionado a lógica de monitoramento aqui
        monitorar_e_inserir_dados(cursor, result_servidor, componentes_ids)

def cadastrar_componentes_padroes(cursor, result_servidor, componentes):
    print(f"\nCadastrando/atualizando componentes padrões para o Servidor {hostname}:")

    # Verificar o último ID de componente cadastrado
    cursor.execute("SELECT MAX(idComponente) FROM Componente")
    max_id = cursor.fetchone()[0]

    # Inicializar o ID do componente com o próximo número após o último ID
    next_id = max_id + 1 if max_id else 1

    componentes_ids = []

    for info_componente in componentes.values():
        # Verificar se o componente já existe
        cursor.execute("SELECT idComponente FROM Componente WHERE nome = %s AND fkServidor = %s", (info_componente["nome"], result_servidor[0]))
        existing_component = cursor.fetchone()

        if existing_component:
            # Atualizar o valor do componente existente
            try:
                cursor.execute("UPDATE Componente SET nome = %s, fkUnidadeMedida = %s, fkTipoComponente = %s WHERE idComponente = %s", (info_componente["nome"], info_componente["fkUnidadeMedida"], info_componente["fkTipoComponente"], existing_component[0]))
                print(f"Componente {info_componente['nome']} atualizado com sucesso.")
                componentes_ids.append(existing_component[0])
            except Exception as e:
                print(f"Erro ao atualizar o componente {info_componente['nome']}: {e}")
        else:
            # Inserir um novo componente com o ID correto
            try:
                componente_values = (next_id, info_componente["nome"], info_componente["fkUnidadeMedida"], info_componente["fkTipoComponente"], result_servidor[0])
                cursor.execute("INSERT INTO Componente (idComponente, nome, fkUnidadeMedida, fkTipoComponente, fkServidor) VALUES (%s, %s, %s, %s, %s)", componente_values)
                print(f"Componente {info_componente['nome']} cadastrado com sucesso.")
                componentes_ids.append(next_id)
                next_id += 1  # Incrementar o próximo ID para o próximo componente
            except Exception as e:
                print(f"Erro ao cadastrar o componente {info_componente['nome']}: {e}")

    # Commit após o loop para garantir que todas as inserções/atualizações sejam efetivadas
    connection.commit()

    return componentes_ids

def monitorar_e_inserir_dados(cursor, result_servidor, componentes_ids):
    while True:
        def bytes_para_gb(bytes_value):
            return bytes_value / (1024 ** 3)

        def milissegundos_para_segundos(ms_value):
            return ms_value / 1000

         # CPU
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

        # Disco
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

        ins = [
            cpuPorcentagem, cpuVelocidadeEmGhz, processos, memoriaPorcentagem,
            memoriaTotal, memoriaUsada, memoriaSwapPorcentagem, memoriaSwapUso, discoPorcentagem,
            discoTotal, discoUsado, discoTempoLeitura, discoTempoEscrita
        ]
        componentes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

        horarioAtual = datetime.now()
        horarioFormatado = horarioAtual.strftime('%Y-%m-%d %H:%M:%S')


        print("\n----INFORMAÇÕES DO DISCO: -----")
        print(
            f'\nPorcentagem do Disco: {discoPorcentagem}%',
            f'\nDisco total: {discoTotal} GB',
            f'\nDisco usado: {discoUsado} GB',
            f'\nTempo de leitura do disco em segundos: {discoTempoLeitura} s',
            f'\nTempo de escrita do disco em segundos: {discoTempoEscrita} s'
        )

        print("\n----INFORMAÇÕES DA CPU: -----")
        print(
            f'\nPorcentagem da CPU: {cpuPorcentagem}%',
            f'\nVelocidade da CPU: {cpuVelocidadeEmGhz} GHz',
            f'\nNumero de processos: {processos}'
        )

        print("\n----INFORMAÇÕES DA MEMORIA: -----")
        print(
            f'\nPorcentagem de memoria: {memoriaPorcentagem}%',
            f'\nQuantidade total de memoria: {memoriaTotal} GB',
            f'\nQuantidade usada de memoria: {memoriaUsada} GB',
            f'\nPorcentagem usada de memoria Swap: {memoriaSwapPorcentagem}%',
            f'\nQuantidade usada de memoria Swap: {memoriaSwapUso} GB'
        )

        print(f'\nHorario atual dos dados: {horarioFormatado}')


        for i, componente_id in enumerate(componentes_ids):
            valor_registro = ins[i]
            horario_atual = datetime.now()
            horario_formatado = horario_atual.strftime('%Y-%m-%d %H:%M:%S')
            query = "INSERT INTO Registro (valorRegistro, dataRegistro, fkComponente) VALUES (%s, %s, %s)"
            cursor.execute(query, (valor_registro, horario_formatado, componente_id))
            connection.commit()

        time.sleep(10)

if __name__ == "__main__":
    ip = get_ip()
    print("O ip da máquina é:", ip)

    SO = platform.system()
    print("O sistema operacional é:", SO)

    hostname = socket.gethostname()
    print("Nome do host da máquina:", hostname)

    connection = mysql_connection('localhost', 'root', 'Isabeol0609!', 'sixtracker')
    cursor = connection.cursor()

    # Verificar se o servidor já está cadastrado
    cursor.execute("SELECT idServidor FROM Servidor WHERE nome = %s", (hostname,))
    result_servidor = cursor.fetchone()

    if not result_servidor:
        print(f"O Servidor {hostname} não foi cadastrado no site. Cadastre-o para fazer a captura!")
        sys.exit()

    # Modificar a chamada da função cadastrar_componentes_padroes para incluir a variável componentes
    componentes_servidor = cadastrar_componentes(cursor, result_servidor)

    if not componentes_servidor:
        sys.exit()

    print(f"\nComponentes cadastrados para o Servidor {hostname}:")
    for componente in componentes_servidor:
        print(f"ID: {componente[0]}, Nome: {componente[1]}")

    # Adicionado a lógica de monitoramento aqui
    monitorar_e_inserir_dados(cursor, result_servidor, componentes_servidor)

    if (cpuPorcentagem >= 50):
            uso_da_cpu_formatado = "{:.2f}".format(cpuPorcentagem)
            mensagem = {"text": f"O uso da CPU está em {uso_da_cpu_formatado}% (CRÍTICO)"}
            requests.post(webhook, data=json.dumps(mensagem))

    if (discoPorcentagem >= 50):
            mensagem = {"text": f"O uso do DISCO está em {disk}% (CRÍTICO)"}
            requests.post(webhook, data=json.dumps(mensagem))

    if (memoriaPorcentagem >= 50):
            memoria_formatado = "{:.2f}".format(memoriaPorcentagem)
            mensagem = {"text": f"O uso da MEMÓRIA RAM está em {memoria_formatado}% (CRÍTICO)"}
            requests.post(webhook, data=json.dumps(mensagem))
