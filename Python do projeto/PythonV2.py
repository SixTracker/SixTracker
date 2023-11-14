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
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import sys

def iniciar():
    mensagem = {"text": "Olá, bem vindo. O sistema da 6TRACKER foi iniciado!"}
    webhook = "https://hooks.slack.com/services/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"
    requests.post(webhook, data=json.dumps(mensagem))

def criar_relatorio_pdf():
    c = canvas.Canvas("relatorio.pdf", pagesize=letter)

def mysql_connection(host, user, passwd, database=None):
    connection = connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    return connection
    
    cursor = connection.cursor(dictionary=True)

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
    
    c.setFont("Helvetica", 12)
    c.drawString(100, 750, "Relatório de Sistema")

    y = 730
    for componente_id, componente_nome in componentes.items():
        c.drawString(100, y, f"{componente_nome}:")

        # Consulta para recuperar dados do banco de dados
        cursor.execute(f"SELECT * FROM Registro WHERE fkComponente = {componente_id} ORDER BY dataRegistro DESC LIMIT 10")
        registros = cursor.fetchall()
        
        y -= 20
        for registro in registros:
            dataRegistro = registro['dataRegistro']
            valorRegistro = registro['valorRegistro']
            c.drawString(100, y, f"{valorRegistro} - {dataRegistro}")
            y -= 20

    # Encerrar a conexão com o banco de dados
    connection.close()

    # Salvar o PDF
    c.save()

if __name__ == "__main__":
    criar_relatorio_pdf()

# Pegando o IP da maquina (servidor) e inserindo no banco de dados.
def get_ip(): # Função responsável por capturar o ip da maquina
    hostname = socket.gethostname() #socket é o nome da biblioteca usada para a captura do IP
    ip = socket.gethostbyname(hostname) #O método gethostbyname() é uma função útil para obter o endereço IP de um host, seja um host remoto ou o host local.
    return ip

# O idioma de nome principal é um truque que permite executar um código específico apenas se o código for executado como um programa.

# Isso significa que, se você copiar e colar o código em um editor de texto e executá-lo,
# o código específico será executado. No entanto, se você importar o código como um módulo
# em outro programa Python, o código específico não será executado.
if __name__ == "__main__":
    ip = get_ip()
    print("O ip da máquina é:", ip)

    SO = platform.system()
    print("O sistema operacional é:", SO)

    hostname = socket.gethostname()
    print("Nome do host da máquina:", hostname)

    connection = mysql_connection('localhost', 'root', 'Isabeol0609!', 'sixtracker')
    cursor = connection.cursor()

def generate_random_code(length):
    characters = string.ascii_letters + string.digits
    code = ''.join(random.choice(characters) for _ in range(length))
    return code

unique_code = generate_random_code(4)
print("O código da sua máquina é:", unique_code)


def bytes_para_gb(bytes_value):
    return bytes_value / (1024 ** 3)

def milissegundos_para_segundos(ms_value):
    return ms_value / 1000

connection = mysql_connection('localhost', 'root', 'Isabeol0609!', 'sixtracker')
cursor = connection.cursor()

# Verifica se a máquina está cadastrada no banco de dados usando o nome do host
cursor.execute("SELECT idServidor FROM Servidor WHERE nome = %s", (hostname,))
result = cursor.fetchone()

if result:
    print(f"O Servidor {hostname} já está cadastrada. Iniciando o monitoramento.")
    iniciar()
else:
    print(f"O Servidor {hostname} não foi cadastrada no site. Cadastre-a para fazer a captura!")
    sys.exit()

# Disco

meu_so = platform.system()
if(meu_so == "Linux"):
    nome_disco = '/'
    disco = psutil.disk_usage(nome_disco)
elif(meu_so == "Windows"):
    nome_disco = 'C:\\'
disco = psutil.disk_usage(nome_disco)
discoPorcentagem = disco.percent
discoTotal = "{:.2f}".format(bytes_para_gb(disco.total))
discoUsado = "{:.2f}".format(bytes_para_gb(disco.used)) 
discoTempoLeitura = milissegundos_para_segundos(psutil.disk_io_counters(perdisk=False, nowrap=True)[4])
discoTempoEscrita = milissegundos_para_segundos(psutil.disk_io_counters(perdisk=False, nowrap=True)[5])

ins = [discoPorcentagem, discoTotal, discoUsado, discoTempoLeitura, discoTempoEscrita]
componentes = [10,11,12,13,14]

horarioAtual = datetime.now()
horarioFormatado = horarioAtual.strftime('%Y-%m-%d %H:%M:%S')

cursor = connection.cursor()
for i in range(len(ins)):
        
    valorRegistro = ins[i]
        
    componente = componentes[i]

    
    query = "INSERT INTO Registro (valorRegistro, dataRegistro, fkComponente) VALUES (%s, %s, %s)"

    
    cursor.execute(query, (valorRegistro, horarioFormatado, componente))


    connection.commit()

print("\n----INFORMAÇÕES DO DISCO: -----")
print(f'\nDisco porcentagem: {discoPorcentagem}%',
      f'\nDisco total: {discoTotal} GB',
      f'\nTempo de leitura do disco em segundos: {discoTempoLeitura} s',
      f'\nTempo de escrita do disco em segundos: {discoTempoEscrita} s')


while True:

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
    
    """
    Por enquanto não será usado
    for particao in particoes:
        try:
            info_dispositivo = psutil.disk_usage(particao.mountpoint)
            print("Ponto de Montagem:", particao.mountpoint)
            print("Sistema de Arquivos:", particao.fstype)
            print("Dispositivo:", particao.device)
            print("Espaço Total: {0:.2f} GB".format(info_dispositivo.total / (1024 ** 3)) )
            print("Espaço Usado: {0:.2f} GB".format(info_dispositivo.used / (1024 ** 3)) )
            print("Espaço Livre: {0:.2f} GB".format(info_dispositivo.free / (1024 ** 3)) )
            print("Porcentagem de Uso: {0:.2f}%".format(info_dispositivo.percent))
            print()
        except PermissionError as e:
            print(f"Erro de permissão ao acessar {particao.mountpoint}: {e}")
        except Exception as e:
            print(f"Erro ao acessar {particao.mountpoint}: {e}")
            """

    # Outros
    boot_time = datetime.fromtimestamp(psutil.boot_time()).strftime("%Y-%m-%d %H:%M:%S")

    horarioAtual = datetime.now()
    horarioFormatado = horarioAtual.strftime('%Y-%m-%d %H:%M:%S')
    
    ins = [cpuPorcentagem, cpuVelocidadeEmGhz, tempoSistema, processos, memoriaPorcentagem,
           memoriaTotal, memoriaUsada, memoriaSwapPorcentagem, memoriaSwapUso]
    componentes = [1,2,3,4,5,6,7,8,9]
    
    cursor = connection.cursor()

    if (cpuPorcentagem >= 70):
            uso_da_cpu_formatado = "{:.2f}".format(cpu)
            mensagem = {"text": f"O uso da CPU está em {uso_da_cpu_formatado}% (CRÍTICO)"}
            requests.post(webhook, data=json.dumps(mensagem))

    if (discoPorcentagem >= 70):
            mensagem = {"text": f"O uso do DISCO está em {disk}% (CRÍTICO)"}
            requests.post(webhook, data=json.dumps(mensagem))

    if (memoriaPorcentagem >= 70):
            memoria_formatado = "{:.2f}".format(mem_used)
            mensagem = {"text": f"O uso da MEMÓRIA RAM está em {memoria_formatado}% (CRÍTICO)"}
            requests.post(webhook, data=json.dumps(mensagem))
    
    for i in range(len(ins)):
        
        valorRegistro = ins[i]
        
        componente = componentes[i]

    
        query = "INSERT INTO Registro (valorRegistro, dataRegistro, fkComponente) VALUES (%s, %s, %s)"

    
        cursor.execute(query, (valorRegistro, horarioFormatado, componente))

        #query = "INSERT INTO Servidor (sistemaOperacional, fkSalas, ip, nome, codigo) VALUES (%s, %s, %s, %s, %s)"
        #data = [(SO, 1, ip, hostname, unique_code)]

        #for record in data:
            #cursor.execute(query, record)


        connection.commit()

    print("\n----INFORMAÇÕES DA CPU: -----")
    print(f'\nPorcentagem da CPU: {cpuPorcentagem}%',
          f'\nVelocidade da CPU: {cpuVelocidadeEmGhz} GHz',
          f'\nNumero de processos: {processos}')

    print("\n----INFORMAÇÕES DA MEMORIA: -----")
    print(f'\nPorcentagem utilizada de memoria: {memoriaPorcentagem}%',
          f'\nQuantidade total de memoria: {memoriaTotal} GB',
          f'\nQuantidade usada de memoria: {memoriaUsada} GB',
          f'\nPorcentagem usada de memoria Swap: {memoriaSwapPorcentagem}%',
          f'\nQuantidade usada de memoria Swap: {memoriaSwapUso} GB')

    print("\n------- INFORMAÇÕES SOBRE PROCESSAMENTO GERAL ---------: ")
    print(f'\nPorcentagem utilizada da CPU: {cpuPorcentagem}%',
          f'\nVelocidade da CPU: {cpuVelocidadeEmGhz} GHz',
          f'\nNumero de processos: {processos}',
          f'\nPorcentagem utilizada de memoria: {memoriaPorcentagem}%',
          f'\nQuantidade Total de memoria: {memoriaTotal} GB',
          f'\nQuantidade usada de memoria: {memoriaUsada} GB',
          f'\nPorcentagem usada de memoria Swap: {memoriaSwapPorcentagem}%',
          f'\nQuantidade usada de memoria Swap: {memoriaSwapUso} GB',
          f'\nDisco porcentagem: {discoPorcentagem}%',
          f'\nDisco total: {discoTotal} GB',
          f'\nTempo de leitura do disco em segundos: {discoTempoLeitura} s',
          f'\nTempo de escrita do disco em segundos: {discoTempoEscrita} s',
          '\n ',
          '\nHorario Atual dos dados: ', horarioFormatado)
          

    time.sleep(3)

cursor.close()
connection.close()
