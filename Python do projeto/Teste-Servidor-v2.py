from mysql.connector import connect
import psutil
import platform
import time
from datetime import datetime

def iniciar():
    print("Olá, bem-vindo. O sistema da 6TRACKER foi iniciado!")

def mysql_connection(host, user, passwd, database=None):
    connection = connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    return connection

def cadastrar_componente(cursor, servidor_id, componente_id, nome, modelo, fabricante, unidade_medida_id, tipo_componente_id):
    cursor.execute(
        "INSERT INTO Componente (idComponente, fkServidor, nome, modelo, fabricante, fkUnidadeMedida, fkTipoComponente) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        (componente_id, servidor_id, nome, modelo, fabricante, unidade_medida_id, tipo_componente_id)
    )

def inserir_registro(cursor, valor_registro, horario_formatado, componente_id):
    cursor.execute(
        "INSERT INTO Registro (valorRegistro, dataRegistro, fkComponente) VALUES (%s, %s, %s)",
        (valor_registro, horario_formatado, componente_id)
    )

def coletar_dados_disco(cursor, servidor_id):
    nome_disco = '/' if platform.system() == 'Linux' else 'C:\\'
    disco = psutil.disk_usage(nome_disco)

    disco_porcentagem = disco.percent
    disco_total = round(disco.total / (1024 ** 3), 2)
    disco_usado = round(disco.used / (1024 ** 3), 2)
    disco_tempo_leitura = psutil.disk_io_counters(perdisk=False, nowrap=True)[4] / 1000
    disco_tempo_escrita = psutil.disk_io_counters(perdisk=False, nowrap=True)[5] / 1000

    ins = [disco_porcentagem, disco_total, disco_usado, disco_tempo_leitura, disco_tempo_escrita]
    componentes_ids = [10, 11, 12, 13, 14]

    horario_atual = datetime.now()
    horario_formatado = horario_atual.strftime('%Y-%m-%d %H:%M:%S')

    for i in range(len(ins)):
        valor_registro = ins[i]
        componente_id = componentes_ids[i]

        cursor.execute(
            "SELECT idComponente FROM Componente WHERE fkServidor = %s AND idComponente = %s",
            (servidor_id, componente_id)
        )
        result_componente = cursor.fetchone()

        if not result_componente:
            cadastrar_componente(cursor, servidor_id, componente_id, f"Componente {componente_id}", "Modelo", "Fabricante", 1, 1)

        inserir_registro(cursor, valor_registro, horario_formatado, componente_id)

    print("\n----INFORMAÇÕES DO DISCO: -----")
    print(f'\nDisco porcentagem: {disco_porcentagem}%',
          f'\nDisco total: {disco_total} GB',
          f'\nTempo de leitura do disco em segundos: {disco_tempo_leitura} s',
          f'\nTempo de escrita do disco em segundos: {disco_tempo_escrita} s')


if __name__ == "__main__":
    iniciar()

    connection = mysql_connection('localhost', 'root', '271815', 'sixtracker')
    cursor = connection.cursor()

    cursor.execute("SELECT idServidor FROM Servidor WHERE nome = %s", (platform.node(),))
    result_servidor = cursor.fetchone()

    if not result_servidor:
        print(f"O Servidor {platform.node()} não foi cadastrado no site. Cadastre-o para fazer a captura!")
        exit()

    while True:
        time.sleep(5)
        coletar_dados_disco(cursor, result_servidor[0])

    connection.close()
