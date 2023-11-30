function apiPlanetas() {
  axios
    .get("https://api.le-systeme-solaire.net/rest/bodies")
    .then((result) => {
      //1
      console.log(`1. Consuma a API:`);
      const allPlanets = result.data.bodies;

      //2
      console.log(`2. Filtre os Planetas:`);
      const planets = allPlanets.filter((planet) => planet.isPlanet === true);
      console.log(planets);

      //3
      console.log(`3. Encontre a Terra:`);
      const findEarth = planets.find(
        (planet) => planet.englishName === "Earth"
      );
      console.log(findEarth);

      //4
      console.log(`4. Verifique Condições com some:`);
      const hasMoon = planets.some((planet) => planet.moons === null);
      console.log(hasMoon);

      //5
      console.log(`5. Transforme os Dados com map:`);
      const planetNames = planets.map((planet) => planet.englishName);
      console.log(planetNames);

      //6
      console.log("6. Classificação por Tamanho: ");
      const classTamanho = planets
        .sort((a, b) => b.meanRadius - a.meanRadius)
        .map((planetas) => planetas.englishName);
      console.log(classTamanho);

      //7
      console.log(`7. Informações Concatenadas:`);
      const jointPlanets = planetNames.join(", ");
      console.log(jointPlanets);

      //8
      console.log(`8. Sistema Solar Compacto:`);
      let shortPlannetsName = planets
        .sort((a, b) => a.meanRadius - b.meanRadius)
        .slice(0, 5);
      let shortPlannetsMass = planets.reduce(
        (acc, planet) => acc + planet.mass.massValue,
        0
      );

      console.log(shortPlannetsName);
      console.log(shortPlannetsMass);

      //9
      console.log(`9. Luas e Desidade:`);
      const moonsDensity = planets.filter(
        (planet) =>
          planet.moons && planet.moons.length > 2 && planet.density > 1
      );
      console.log(moonsDensity);

      // 10
      console.log("10. Ordem de descobrimento:");
      const ordemDescobrimento = allPlanets.filter(
        (corpse) => corpse.discoveryDate !== ""
      );
      const sortDescobrimento = ordemDescobrimento.sort(
        (a, b) =>
          new Date(a.discoveryDate.split("/").reverse().join("-")) -
          new Date(b.discoveryDate.split("/").reverse())
      );
      sortDescobrimento.forEach((astro) =>
        console.log(`${astro.englishName}: ${astro.discoveryDate}`)
      );

      // 11
      console.log(`11. Encontrando Astro:`);
      procurarAstro();
      function procurarAstro() {
        const name = prompt("Digite o nome do Planeta: ");
        const findPlanet = allPlanets.find(
          (corpse) => corpse.englishName === name
        );
        if (findPlanet) {
          console.log(`Aphelion: ${findPlanet.aphelion}`);
          console.log(`Perihelio: ${findPlanet.perihelion}`);
          console.log(`Massa: ${findPlanet.mass.massValue}`);
          console.log(`Gravidade: ${findPlanet.gravity}`);
          console.log(`Densidade ${findPlanet.density}`);
        }
      }

      //12
      console.log(`12. Filtro de Temperatura:`);
      const minTemp = 8 + 273.15;
      const maxTemp = 30 + 273.15;

      const kelvinTemp = allPlanets.filter(
        (corpse) => corpse.avgTemp <= maxTemp && corpse.avgTemp >= minTemp
      );
      const tempOrder = kelvinTemp.sort((a, b) => a.avgTemp - b.avgTemp);
      console.log(tempOrder);

      //13
      console.log(`13. Separando Planetas:`);
      planetByBody();
      function planetByBody() {
        const separatedByType = {};

        allPlanets.forEach((corpse) => {
          const bodyType = corpse.bodyType;

          if (separatedByType[bodyType]) {
            separatedByType[bodyType].push(corpse.englishName);
          } else {
            separatedByType[bodyType] = [corpse.englishName];
          }
        });
        return console.log(separatedByType);
      }
      //14
      console.log(`14. Ordenação Complexa:`);
      sortAndFilterPlanets();
      function sortAndFilterPlanets() {
        allPlanets.sort((a, b) => {
          const typeComparison = a.bodyType.localeCompare(b.bodyType);
          if (typeComparison !== 0) {
            return typeComparison;
          }
          return b.meanRadius - a.meanRadius;
        });

        const result = {};
        allPlanets.forEach((planet) => {
          const planetType = planet.bodyType;
          if (!result[planetType]) {
            result[planetType] = [];
          }

          if (result[planetType].length < 3) {
            result[planetType].push({
              name: planet.englishName,
              radius: planet.meanRadius,
            });
          }
        });

        console.log(result);
        return result;
      }

      //15
      console.log(`15 Encontrando planetas orbitados.. :`);
      const planetMoons = [...allPlanets].filter((corpse) => {
        if (corpse.moons !== null) {
          console.log(`Planeta: ${corpse.englishName}`);
          corpse.moons.forEach((moon) => console.log(`Lua: ${moon.moon}`));
        }
      });

      //16
      console.log(`16. Média da Massa dos Planetas:`);
      const totalMass = planets.reduce(
        (total, planet) =>
          total +
          planet.mass.massValue * Math.pow(10, planet.mass.massExponent),
        0
      );
      const averageMass = totalMass / planets.length;
      console.log(
        `A média da massa de todos os planetas é: ${Number(averageMass).toFixed(
          2
        )}`
      );

      //17
      console.log(`17. Calcule a distância entre Saturno e Plutão:`);
      const saturno = allPlanets.find((body) => body.englishName === "Saturn");
      const plutao = allPlanets.find((body) => body.englishName === "Pluto");
      const distanciaEntreEles = Math.abs(saturno.aphelion - plutao.perihelion);
      console.log(
        `A menor distância entre eles em relação ao sol é ${distanciaEntreEles}`
      );

      //18
      console.log(`18. Planetas com Luas:`);
      const planetasComLuas = allPlanets.filter(
        (planet) => planet.moons && planet.moons.length > 0
      );
      planetasComLuas.forEach((planet) => {
        console.log(`${planet.englishName}: ${planet.moons.length} lua(s)`);
      });

      // 19. O Desafio Final em Manipulação de Dados e Cálculos
      console.log(`19. Análise Estatística do Sistema Solar:`);

      // Crie um novo array que contém apenas planetas (excluindo luas, asteroides, etc.).
      let planetas = allPlanets.filter((body) => body.isPlanet === true);

      // Crie um novo array que contém apenas as massas dos planetas.
      let massas = planetas.map(
        (planet) =>
          planet.mass.massValue * Math.pow(10, planet.mass.massExponent)
      );

      // Ordene o array de massas em ordem crescente.
      massas.sort((a, b) => a - b);

      // Calcule a mediana das massas dos planetas.
      let mediana;
      if (massas.length % 2 === 0) {
        mediana =
          (massas[massas.length / 2 - 1] + massas[massas.length / 2]) / 2;
      } else {
        mediana = massas[(massas.length - 1) / 2];
      }
      console.log(`A mediana das massas dos planetas é ${mediana}`);

      // Encontrar Planeta Mais Próximo da Mediana: encontre o planeta cuja massa é mais próxima da mediana calculada.
      let planetaMaisProximo = planetas.reduce((prev, curr) => {
        return Math.abs(
          curr.mass.massValue * Math.pow(10, curr.mass.massExponent) - mediana
        ) <
          Math.abs(
            prev.mass.massValue * Math.pow(10, prev.mass.massExponent) - mediana
          )
          ? curr
          : prev;
      });
      console.log(
        `O planeta com massa mais próxima da mediana é ${planetaMaisProximo.englishName}`
      );
    })
    .catch((err) => {
      console.log(err);
    });
}
apiPlanetas();
