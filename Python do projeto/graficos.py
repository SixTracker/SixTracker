import psutil
import matplotlib.pyplot as plt
from datetime import datetime
#biblioteca para plotar os graficos, FuncAnimation serve para a animação de atualização do grafico aconteça
from matplotlib.animation import FuncAnimation


# Configurar o gráfico de CPU
#Cada "ax" é essencialmente um espaço onde você pode criar e personalizar um gráfico.
# Aqui, você está chamando a função plt.subplots() do Matplotlib para criar três subplots empilhados verticalmente.
#3: Indica que você deseja criar três subplots na vertical
#1: Indica que deseja criar uma única coluna de subplots.
#figsize=(10, 8): Define o tamanho da figura geral em polegadas.
# Neste caso, a largura é 10 polegadas e a altura é 8 polegadas.
fig, (ax1, ax2, ax3) = plt.subplots(3, 1, figsize=(10, 8))
ax1.set_title('Uso da CPU ao Longo do Tempo')
ax1.set_ylabel('Uso da CPU (%)')
ax1.tick_params(axis='x', rotation=45)

#Listas Vazias
tempos_cpu = []
uso_cpu = []

# Função de atualização do gráfico de CPU
def update_plot(i):
    global tempos_cpu, uso_cpu

    uso_da_cpu = psutil.cpu_percent(interval=1)

#Inserindo os dados na lista
    tempos_cpu.append(datetime.now())
    uso_cpu.append(uso_da_cpu)

#O método clear() é usado para remover todos os elementos desenhados anteriormente no subplot ax1.
    ax1.clear()
    ax1.plot(tempos_cpu, uso_cpu, marker='o')
    ax1.set_title('Uso da CPU ao Longo do Tempo')
    ax1.set_ylabel('Uso da CPU (%)')
    ax1.tick_params(axis='x', rotation=45)

# Configurar o gráfico de RAM
ax2.set_title('Uso de RAM ao Longo do Tempo')
ax2.set_ylabel('Uso de RAM (MB)')
ax2.tick_params(axis='x', rotation=45)

tempos_ram = []
uso_ram = []

# Função de atualização do gráfico de RAM
def update_plot_ram(i):
    global tempos_ram, uso_ram

    uso_da_ram = psutil.virtual_memory().used / (1024 * 1024)

    tempos_ram.append(datetime.now())
    uso_ram.append(uso_da_ram)

    ax2.clear()
    ax2.plot(tempos_ram, uso_ram, marker='o')
    ax2.set_title('Uso de RAM ao Longo do Tempo')
    ax2.set_ylabel('Uso de RAM (MB)')
    ax2.tick_params(axis='x', rotation=45)

# Configurar o gráfico de RAM
ax2.set_title('Uso de RAM ao Longo do Tempo')
ax2.set_ylabel('Uso de RAM (MB)')
ax2.tick_params(axis='x', rotation=45)

# Configurar o gráfico do Disco
ax3.set_title('Uso do Disco ao Longo do Tempo')
ax3.set_ylabel('Uso do Disco (%)')
ax3.tick_params(axis='x', rotation=45)

tempos_disco = []
uso_disco = []

# Função de atualização do gráfico de RAM
def update_plot_disco(i):
    global tempos_disco, uso_disco

    uso_do_disco = psutil.disk_usage('C:\\').percent

    tempos_disco.append(datetime.now())
    uso_disco.append(uso_do_disco)

    ax3.clear()
    ax3.plot(tempos_disco, uso_disco, marker='o')
    ax3.set_title('Uso do Disco ao Longo do Tempo')
    ax3.set_ylabel('Uso de Disco (%)')  # O rótulo está correto como "Uso de Disco (%)"
    ax3.tick_params(axis='x', rotation=45)

# Configuração da animação
animation_interval = 1000  # Tempo em milissegundos entre cada atualização

#Essas linhas de código criam três animações separadas,
#cada uma atualizando um subplot diferente na sua figura fig. Cada animação chama sua respectiva função de atualização
ani = FuncAnimation(fig, update_plot, interval=animation_interval, repeat=False)
ani_ram = FuncAnimation(fig, update_plot_ram, interval=animation_interval, repeat=False)
ani_disco = FuncAnimation(fig, update_plot_disco, interval=animation_interval, repeat=False)

# Exibir o gráfico
plt.tight_layout()
plt.show()