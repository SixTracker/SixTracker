import mysql.connector #biblioteca responsável pela conexão com o mysql
import psutil
import time
import win32com.client as win32 #biblioteca responsável pela integração do e-mail com o python
from datetime import datetime

connection = mysql.connector.connect(
    host='localhost',
    user='root',
    password='ScottPippen33',
    database='sixtracker'
)

cursor = connection.cursor()

#A função Dispatch() é usada para criar uma instância de um objeto COM (Component Object Model)
#cria uma instância da aplicação Microsoft Outlook
outlook = win32.Dispatch('outlook.application')

#Cria um novo objeto que representa um --email em branco no Outlook-- e armazena esse objeto na variável "email"
email = outlook.CreateItem(0)

#Aqui é escolhido o e-mail que será enviado. Se for mais emails, os mesmos serão serparados com ';' mas ainda nas mesmas aspas ("")
email.To = "brudney.ramosjr@sptech.school; brudney13@gmail.com"
email.Subject = "SYSTEM 6TRACKER INICIALIZADO"
email.HTMLBody = """
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
        }

        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
        }

        p {
            color: #555;
            line-height: 1.4;
        }

        strong {
            color: #333;
        }

        .signature {
            color: #888;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
    <img src="https://blogger.googleusercontent.com/img/a/AVvXsEjsZqaXdnFT1JKRVNORzmPpejpFeQnSkxgoJnz_eM7MMc2v1dzLwcTysva4Gy-GUOSzO08bsGOAw81Ei0hSWHcN4sBxc1VrslpWvWHcYm7nlWQi0jBlnQYRkb8elbu6-5K7tIJqhE6AbkGmi1sB0MLFIAlXDdyYuQlsTwPiJ_xEUu1-YjHQPSKAlJ0YiFQ=w566-h159" alt="">
        <h1>Prezado(a) Usuário(a),</h1>

        <p>Seja bem-vindo ao Sistema 6TRACKER.</p>

        <p>Estamos felizes em informar que o seu sistema foi inicializado com sucesso.</p>

        <p>Este sistema está monitorando ativamente o desempenho do seu computador e os dispositivos conectados.</p>

        <p>Em caso de qualquer problema ou anomalia detectada, você receberá notificações imediatas para que aja com rapidez.</p>

        <p>Fique tranquilo(a), estamos cuidando do seu sistema 24 horas por dia, 7 dias por semana.</p>

        <p class="signature">Atenciosamente,<br>Equipe 6TRACKER</p>
    </div>
</body>
</html>
"""
email.Send()
print("Email enviado")


conectado = False
email_enviado = False

#Criando a estrutura de repetição para que os valores dos componentes se atualizam
while True:
    limite_uso_cpu = 80
    limite_uso_disco = 90
    uso_da_cpu = psutil.cpu_percent(interval=1)
    uso_do_disco = psutil.disk_usage('C:\\').percent
    info_disco = psutil.disk_usage('C:\\')
    tamanho_disco = info_disco.total
    disco_em_uso = info_disco.used
    tamanho_em_GB = tamanho_disco / (1024 ** 3)
    uso_em_GB = disco_em_uso / (1024 ** 3)
    mem = psutil.virtual_memory()
    used_memory_mb = mem.used / (1024 * 1024)
    dia = datetime.now()
    dataHora = 'Um dispositivo de dado foi conectado as ' + dia.strftime('%d/%m/%Y %H:%M:%S')
    info = psutil.disk_partitions()

# Valores obtidos das métricas do sistema
    processador = (uso_da_cpu)
    memoriaRAM = (used_memory_mb)
    armazenamento = (uso_em_GB)
    fkUnidade = 1

#Aqui o python está verificando se há uma detecção USB
    #Se a length de info for maior que 1, significa que há um dispositivo de disco conectado
    if len(info) > 1:
        if not conectado: #No caso se conectado for = "True"
            print('Um dispositivo de dado foi conectado as ' + dia.strftime('%d/%m/%Y %H:%M:%S'))
            conectado = True
            conectadosql = "true"

# No caso se email_enviado for = "True"
# Envia o email de alerta apenas na primeira detecção
            if not email_enviado:
                outlook = win32.Dispatch('outlook.application')
                email = outlook.CreateItem(0)
                email.To = "brudney.ramosjr@sptech.school; brudney13@gmail.com"
                email.Subject = "SYSTEM 6TRACKER ALERTA!!"
                email.HTMLBody = f"""
                <html>
                <head>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            background-color: #f2f2f2;
                            margin: 0;
                            padding: 0;
                        }}

                        .container {{
                            background-color: #ffffff;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            border-radius: 5px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }}

                        h1 {{
                            color: #333;
                        }}

                        p {{
                            color: #555;
                            line-height: 1.4;
                        }}

                        strong {{
                            color: #333;
                        }}

                        .signature {{
                            color: #888;
                            font-style: italic;
                        }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <img src="https://blogger.googleusercontent.com/img/a/AVvXsEjsZqaXdnFT1JKRVNORzmPpejpFeQnSkxgoJnz_eM7MMc2v1dzLwcTysva4Gy-GUOSzO08bsGOAw81Ei0hSWHcN4sBxc1VrslpWvWHcYm7nlWQi0jBlnQYRkb8elbu6-5K7tIJqhE6AbkGmi1sB0MLFIAlXDdyYuQlsTwPiJ_xEUu1-YjHQPSKAlJ0YiFQ=w566-h159" alt="">
                        <h1>Alerta em seu Sistema</h1>

                        <p>Um <b>Dispositivo de <span style="color: #FF0000;">DISCO</span></b> foi <span style="color: #00FF00;">CONECTADO</span> em {dia.strftime('%d/%m/%Y %H:%M:%S')}.</p>

                        <p>Recomendamos que você verifique o status do dispositivo o mais rápido possível.</p>

                        <p class="signature">Atenciosamente,<br>Equipe 6TRACKER</p>
                    </div>
                </body>
                </html>
                """
                email.Send()
                print("Email de ALERTA DISPOSITIVO CONECTADO")
                email_enviado = True  # Marca o email como enviado

#Aqui estamos ATRIBUINDO os valores de detecção ao Banco
        sqlUSB = "INSERT INTO dados (processador, memoriaRAM, disco, dataHora, deteccaoUSB, fkUnidade, fkServidor) VALUES (%s ,%s, %s, %s, %s, %s, %s)"
        valuesUSB = (processador, memoriaRAM, uso_do_disco, dia.strftime('%Y-%m-%d %H:%M:%S'), conectadosql, fkUnidade, 1)
        cursor.execute(sqlUSB, valuesUSB)

# Aqui ele está INSERINDO os valores de detecção ao Banco
        try:
            # Executa a inserção
            cursor.execute(sqlUSB, valuesUSB)

            # Confirma as alterações no banco de dados
            connection.commit()
            print("Inserção de USB realizada com sucesso!")

        except mysql.connector.Error as err:
            print("Erro ao inserir na tabela dados:", err)

        mensagem = 1

#Aqui ele está enviando prints de desde quando o Dispositivo está conectado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            #Código escrito e estudado por Brudney JR Junior
        if (conectado == True):
            time.sleep(5)
            dia = datetime.now()

            if mensagem == 5:
                print('A um dispositivo conectado desde as ' + dia.strftime('%d/%m/%Y %H:%M:%S'))
                mensagem = 0
            info = psutil.disk_partitions()

#Aqui é onde ele mostra quando o Dispositivo foi desconectado
            if len(info) < 2:
                dia = datetime.now()
                print('O dispositivo foi desconectado as ' + dia.strftime('%d/%m/%Y %H:%M:%S'))
                conectado = False
                conectadosql = "false"

                # Envia o email de alerta apenas uma vez quando o dispositivo é desconectado
                outlook = win32.Dispatch('outlook.application')
                email = outlook.CreateItem(0)
                email.To = "brudney.ramosjr@sptech.school; brudney13@gmail.com"
                email.Subject = "SYSTEM 6TRACKER ALERTA!!"
                email.HTMLBody = f"""
                <html>
                <head>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            background-color: #f2f2f2;
                            margin: 0;
                            padding: 0;
                        }}

                        .container {{
                            background-color: #ffffff;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            border-radius: 5px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }}

                        h1 {{
                            color: #333;
                        }}

                        p {{
                            color: #555;
                            line-height: 1.4;
                        }}

                        strong {{
                            color: #333;
                        }}

                        .signature {{
                            color: #888;
                            font-style: italic;
                        }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <img src="https://blogger.googleusercontent.com/img/a/AVvXsEjsZqaXdnFT1JKRVNORzmPpejpFeQnSkxgoJnz_eM7MMc2v1dzLwcTysva4Gy-GUOSzO08bsGOAw81Ei0hSWHcN4sBxc1VrslpWvWHcYm7nlWQi0jBlnQYRkb8elbu6-5K7tIJqhE6AbkGmi1sB0MLFIAlXDdyYuQlsTwPiJ_xEUu1-YjHQPSKAlJ0YiFQ=w566-h159" alt="">
                        <h1>Alerta em seu Sistema</h1>

                        <p>Um <b>Dispositivo</b> de <b>DISCO</b> foi <span style="color: #FF0000;">DESCONECTADO</span> em {dia.strftime('%d/%m/%Y %H:%M:%S')}.</p>

                        <p>Recomendamos que você verifique o status do dispositivo o mais rápido possível.</p>

                        <p class="signature">Atenciosamente,<br>Equipe 6TRACKER</p>
                    </div>
                </body>
                </html>
                """
                email.Send()
                print("Email de ALERTA DISPOSITIVO DESCONECTADO")
                email_enviado = True  # Marca o email como enviado

# Aqui estamos ATRIBUINDO os valores de detecção ao Banco
                sqlUSB2 = "INSERT INTO dados (processador, memoriaRAM, disco, dataHora, deteccaoUSB, fkUnidadefk, Servidor) VALUES (%s ,%s, %s, %s, %s, %s, %s)"
                valuesUSB2 = (processador, memoriaRAM, uso_do_disco, dia.strftime('%Y-%m-%d %H:%M:%S'), conectadosql, fkUnidade, 1)
                cursor.execute(sqlUSB2, valuesUSB2)

# Aqui ele está INSERINDO os valores de detecção ao Banco
                try:
                    # Executa a inserção
                    cursor.execute(sqlUSB2, valuesUSB2)

                    # Confirma as alterações no banco de dados
                    connection.commit()
                    print("Inserção de USB realizada com sucesso!")

                except mysql.connector.Error as err:
                    print("Erro ao inserir na tabela dados:", err)

            mensagem += 1


        time.sleep(5)

#Aqui, se caso NENHUM dispositivo de Disco for conectado ele entra nesse else
    else:
        print("Nenhum dispositivo de DISCO conectado")
        conectadosql = "false"

#Aqui é um if de verficação do uso do CPU
    if processador >= limite_uso_cpu:
        outlook = win32.Dispatch('outlook.application')

        email = outlook.CreateItem(0)

        email.To = "brudney.ramosjr@sptech.school; brudney13@gmail.com"
        email.Subject = "SYSTEM 6TRACKER ALERTA!!"
        email.HTMLBody = f"""
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                    margin: 0;
                    padding: 0;
                }}

                .container {{
                    background-color: #ffffff;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }}

                h1 {{
                    color: #333;
                }}

                p {{
                    color: #555;
                    line-height: 1.4;
                }}

                strong {{
                    color: #333;
                }}

                .signature {{
                    color: #888;
                    font-style: italic;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <img src="https://blogger.googleusercontent.com/img/a/AVvXsEjsZqaXdnFT1JKRVNORzmPpejpFeQnSkxgoJnz_eM7MMc2v1dzLwcTysva4Gy-GUOSzO08bsGOAw81Ei0hSWHcN4sBxc1VrslpWvWHcYm7nlWQi0jBlnQYRkb8elbu6-5K7tIJqhE6AbkGmi1sB0MLFIAlXDdyYuQlsTwPiJ_xEUu1-YjHQPSKAlJ0YiFQ=w566-h159" alt="">

                <h1>Alerta em seu Sistema</h1>

                <p>O uso do processador está <span style="color: #FF0000; font-weight: bold;">Crítico!</span> Usando {processador}%.</p>

                <p>Recomendamos que você verifique o sistema imediatamente.</p>

                <p class="signature">Atenciosamente,<br>Equipe 6TRACKER</p>
            </div>
        </body>
        </html>
        """
        email.Send()
        print("Email de ALERTA PROCESSADOR")

# Aqui é um if de verficação do uso de DISCO
    if uso_do_disco >= limite_uso_disco:
        outlook = win32.Dispatch('outlook.application')

        email = outlook.CreateItem(0)

        email.To = "brudney.ramosjr@sptech.school; brudney13@gmail.com"
        email.Subject = "SYSTEM 6TRACKER INICIALIZADO"
        email.HTMLBody = f"""
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                    margin: 0;
                    padding: 0;
                }}

                .container {{
                    background-color: #ffffff;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }}

                h1 {{
                    color: #333;
                }}

                p {{
                    color: #555;
                    line-height: 1.4;
                }}

                strong {{
                    color: #333;
                }}

                .signature {{
                    color: #888;
                    font-style: italic;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <img src="https://blogger.googleusercontent.com/img/a/AVvXsEjsZqaXdnFT1JKRVNORzmPpejpFeQnSkxgoJnz_eM7MMc2v1dzLwcTysva4Gy-GUOSzO08bsGOAw81Ei0hSWHcN4sBxc1VrslpWvWHcYm7nlWQi0jBlnQYRkb8elbu6-5K7tIJqhE6AbkGmi1sB0MLFIAlXDdyYuQlsTwPiJ_xEUu1-YjHQPSKAlJ0YiFQ=w566-h159" alt="">

                <h1>Alerta em seu Sistema</h1>

                <p>O uso do disco está <span style="color: #FF0000; font-weight: bold;">Crítico!</span> Usando {uso_do_disco}%.</p>

                <p>Recomendamos que você verifique o sistema imediatamente.</p>

                <p class="signature">Atenciosamente,<br>Equipe 6TRACKER</p>
            </div>
        </body>
        </html>
        """
        email.Send()
        print("Email de ALERTA DISCO")

    # SQL para inserir na tabela dados
    sql = "INSERT INTO dados (processador, memoriaRAM, disco, dataHora, deteccaoUSB, fkUnidade, fkServidor) VALUES (%s ,%s, %s, %s, %s, %s, %s)"
    values = (processador, memoriaRAM, uso_do_disco, dia.strftime('%Y-%m-%d %H:%M:%S'), conectadosql, fkUnidade, 1)

#Aqui, independente do valor e dos alertas os dados serão inseridos
    try:
        # Executa a inserção
        cursor.execute(sql, values)

        # Confirma as alterações no banco de dados
        connection.commit()
        print("Inserção de dados realizada com sucesso!")

    except mysql.connector.Error as err:
        print("Erro ao inserir na tabela dados:", err)

    time.sleep(5)
