#!/bin/bash
NC='\033[0m' 
VERSAO=18
REPOSITORIO=home/ubuntu/Desktop
	
echo "[Assistente 6Tracker]: Seja bem vindo, usuário. Sou o assistente da 6Tracker e vou te auxiliar no processo de instalação! :D ;"
sleep 1.5
echo "[Assistente 6Tracker]: Primeiro, vamos criar um usuário e um grupo com as permissões de administrador(a) para o senhor(a) em sua máquina;"
sleep 1.5

echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Agora, vamos colocar o repositório na sua máquina, ou atualizá-lo caso ele já esteja aqui;"
sleep 1.5

if [ -f "$REPOSITORIO" ]
	then
    	echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Você já tem o repositório no seu computador. Vamos atualizá-lo."
		git pull
	else
		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Repositório não encontrado! Vamos cloná-lo."
		git clone https://github.com/Monitoramento-Dados-Sensiveis/6tracker.git
fi

# Instalção do ODBC
echo  "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Vamos checar se o ODBC está instalado... (Etapa 1 de 4);"
sleep 1.5

odbcinst -q -d -n
if [ $? -eq 0 ]
	then
		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Parece que seu ODBC já está instalado! :D "
		sleep 1.5
	else
		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Ops! Não encontramos o ODBC na sua máquina, mas vamos resolver isso agora."
		sleep 1.5
		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Você deseja instalar o ODBC? (S/N)?"
		sleep 1.5
	read inst
	if [ \"$inst\" == \"S\" ]
		then
			echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Instalando o ODBC..."
			sleep 1.5
            curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
            curl https://packages.microsoft.com/config/ubuntu/$(lsb_release -rs)/prod.list > /etc/apt/sources.list.d/mssql-release.list
            sudo apt-get update
            sudo ACCEPT_EULA=Y apt-get install -y msodbcsql18
            sudo ACCEPT_EULA=Y apt-get install -y mssql-tools18
            echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> ~/.bashrc
            source ~/.bashrc
            sudo apt-get install -y unixodbc-dev
			clear
			echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15)  Atualizando! Quase lá."
			sleep 2
			sudo apt update -y
			clear
			if [ $VERSAO -eq 18 ]
				then
					echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Preparando para instalar a versão 18 do ODBC. Confirme a instalação quando solicitado ;D"
					sudo apt-get update
					clear
					echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) ODBC instalado com sucesso!"
					echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Atualizando pacotes..."
                    sudo apt update -y 
                    echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Pacotes atualizados"
				fi
		else 	
		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Você optou por não instalar o ODBC (Saiba que é recomendado para o funcionamento das outras ferramentas)."
	fi
fi



# Instalação do Java
sleep 1.5
echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Agora, vamos checar se o Java já está instalado. (Etapa: 2 de 4);"
sleep 1.5

java -version
if [ $? -eq 0 ]
	then
		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) O Java já está instalado! Prosseguindo..."
	else
 		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Parece que o Java não está instalado... :("
 		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Você deseja instalá-lo? (S/N)?"
	read inst
	if [ \"$inst\" == \"S\" ]
		then
			echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Entendido! Instalando o Java e adicionando seu repositório!"
			sleep 1.5
			sudo add-apt-repository ppa:webupd8team/java -y
			clear
			echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Repositório adicionado! Atualizando..."
			sleep 1.5
			sudo apt update -y
			clear
			
			if [ $VERSAO -eq 11 ]
				then
					echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Instalando a versão 18 do Java!"
					sudo apt install default-jre ; apt install openjdk-18-jre-headless; -y
					clear
					echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Java instalado com sucesso! Prosseguindo para a próxima etapa..."
				fi
		else 	
		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Você escolheu não instalar o Java por enquanto (Saiba que é recomendado para o funcionamento das outras ferramentas)."
	fi
			sleep 1.5
			clear
fi



# Instalação do Python3
sleep 1.5
echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Estamos quase lá! Vamos agora checar se o Python está instalado. (Etapa: 3 de 4);"
sleep 1.5

python3 --version
if [ $? -eq 0 ]
	then
		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) O Python já está instalado, então, prosseguiremos para a última etapa. "
	else
 		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Ops! O Python não está instalado.. :( "
 		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Mas sem problemas! Você deseja instalá-lo? (S/N)?"
		sleep 1.5
	read inst
	if [ \"$inst\" == \"S\" ]
		then
			echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Entendido! Instalando o Python..."
			sleep 1.5
			sudo apt install python-is-python3
			sleep 1
			clear
			echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Atualizando! Quase lá."
			sleep 1.5
			sudo apt update -y
			sleep 1
			clear
			echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Python3 instalado com sucesso! Prosseguindo para a etapa final."
		else 	
		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Você escolheu não instalar o Python por enquanto (Saiba que é recomendado para o funcionamento das outras ferramentas)."
	fi
			sleep 1.5
			clear
fi



# Instalação do Pip
sleep 1.5
echo  "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Para finalizar, vamos ver se o Pip já está instalado. (Etapa: 4 de 4);"
sleep 1.5

pip --version
if [ $? -eq 0 ]
	then
		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Que ótimo! O Pip já está instalado!"
	else
		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Parece que o Pip não está instalado. Mas não se preocupe, vamos resolver isso!"
		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Deseja instalar o Pip e suas bibliotecas? (S/N)?"
		sleep 1.5
	read inst
	if [ \"$inst\" == \"S\" ]
		then
			echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Ok! Você escolheu instalar o PIP ;D"
			sleep 1.5
			sudo apt install python3-pip
			clear
			echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Atualizando! Quase lá."
			sleep 1.5
			sudo apt update -y
			clear
			echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) O Pip foi instalado com sucesso! Agora vamos adicionar as bibliotecas..."
			sleep 1.5
			pip install psutil
			pip install -U textwrap3
			pip install pyodbc
			sleep 1.5
			clear			
			echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Todas as bibliotecas do Pip foram instaladas com sucesso!"
		else 	
		echo "$(tput setaf 52)[Assistente 6Tracker]:$(tput setaf 15) Parece que você optou por não instalar o Pip por enquanto (Saiba que é recomendado para o funcionamento das outras ferramentas)."
	fi
			sleep 1.5
			clear
fi

# ===================================================================
# Todos direitos reservados para o autor: Dra. Profa. Marise Miranda.
# Sob licença Creative Commons @2020
# Podera modificar e reproduzir para uso pessoal.
# Proibida a comercialização e a exclusão da autoria.
# ===================================================================