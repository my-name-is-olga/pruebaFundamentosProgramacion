/* VERIFICACIÓN INPUT */
$("#numeroUsuario").on("click", function (event) {
  event.preventDefault();
  let numeroUsuario = Number($("#inputNumber").val());
  if (numeroUsuario >= 731) {
    alert("Escribe un número hasta 731");
  } else if (numeroUsuario <= 0) {
    alert("Escribe un número mayor a 0");
  } else if (isNaN(numeroUsuario)) {
    alert("Digita números del 1 al 731");
  } else {
    $.ajax({
      type: "GET",
      url: `https://superheroapi.com/api.php/4905856019427443/${numeroUsuario}`,
      dataType: "json",

      /* TARJETA INFORMACIÓN HÉROE */
      success: function (data) {
        limpiarHTMLCard();
        $("#infoHeroes").append(`<div class="container ">
        <div class="row col-sm-6"  >
            <div class="card mb-3 ">
                <div class="row g-0 ">
                <h5> TU SUPERHÉROE: </h5>
                    <div class="col-md-4">                       
                        <img src="${data.image.url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">NOMBRE: ${data.name}</h5>
                            <p class="card-text">CONEXIONES: ${data.connections["group-affiliation"]}</p>
                            <p class="card-text">OCUPACIÓN: ${data.work.occupation}</p>
                            <p class="card-text">PRIMERA APARICIÓN: ${data.biography["first-appearance"]}</p>
                            <p class="card-text">ALTURA: ${data.appearance.height}</p>
                            <p class="card-text">PESO: ${data.appearance.weight}</p>
                            <p class="card-text">ALIAS: ${data.biography.aliases}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`);

        /* GRÁFICO HÉROE */
        let options = {
          animationEnabled: true,
          title: {
            text: `Estadísticas de poder para ${data.name}`,
          },
          data: [
            {
              type: "doughnut",
              innerRadius: "70%",
              showInLegend: true,
              legendText: "{label}",
              indexLabel: "{label} ({y})",
              dataPoints: [
                { label: "INTELIGENCIA", y: `${data.powerstats.intelligence}` },
                { label: "FUERZA", y: `${data.powerstats.strength}` },
                { label: "VELOCIDAD", y: `${data.powerstats.speed}` },
                { label: "RESISTENCIA", y: `${data.powerstats.durability}` },
                { label: "PODER", y: `${data.powerstats.power}` },
                { label: "COMBATE", y: `${data.powerstats.combat}` },
              ],
            },
          ],
        };
        $("#chartContainer").CanvasJSChart(options);
      },
      error: function (error) {
        console.log(error);
        alert(
          "Los recursos no se han cargado correctamente. No hay gráfico para mostrar"
        );
      },
    });
  }
});

/* LIMPIA PARA EVITAR REPETICIÓN DE TARJETAS */
function limpiarHTMLCard() {
  const card = $("#infoHeroes");
  card.empty();
}
