
buscarEstadoServidor();

function buscarEstadoServidor() {

  fkServidor = sessionStorage.ID_SERVIDOR;

  if (fkServidor == "" || fkServidor == undefined) {
    alert("Servidor não encontrado!")
  } else {
    fetch("/servidor/buscarEstadoServidor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "fkServidor": fkServidor
      })
    }).then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log("Aconteceu algum erro (res.error = true)")
        }
        else {
          const resultado = res[0][0];
          if (resultado.qtsAlertasCpu > 20) {
            cpuEstado.innerHTML = "Risco";
          } else if (resultado.qtsAlertasCpu <= 20 && resultado.qtsAlertasCpu > 10) {
            cpuEstado.innerHTML = "Alerta";
          } else {
            cpuEstado.innerHTML = "Estável";
          }


          if (resultado.qtsAlertasRam > 20) {
            ramEstado.innerHTML = "Risco";
          } else if (resultado.qtsAlertasRam <= 20 && resultado.qtsAlertasRam > 10) {
            ramEstado.innerHTML = "Alerta";
          } else {
            ramEstado.innerHTML = "Estável";
          }


          if (resultado.qtsAlertasDisco > 20) {
            discoEstado.innerHTML = "Risco";
          } else if (resultado.qtsAlertasDisco <= 20 && resultado.qtsAlertasDisco > 10) {
            discoEstado.innerHTML = "Alerta";
          } else {
            discoEstado.innerHTML = "Estável";
          }

        }
      }).catch(function (res) {

      });
  }
}


