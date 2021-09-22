const Climate = ({ respOpenMap: { name, main }, invalidSearch, respGoogle, respTuTiempo}) => {
  if (!name) return null;
  console.log(respGoogle);
  console.log(respTuTiempo);
  const kelvin = 273.15;

  const card = (
    <div className="black-text">
      <h2>El clima de {name} es: </h2>
      <p className="temperature">
        {parseFloat(main.temp - kelvin, 10).toFixed(2)}
        <span>&#x2103;</span>
      </p>
      <p>
        Máxima: {parseFloat(main.temp_max - kelvin, 10).toFixed(2)}
        <span>&#x2103;</span>
      </p>
      <p>
        Mínima: {parseFloat(main.temp_min - kelvin, 10).toFixed(2)}
        <span>&#x2103;</span>
      </p>
      
    </div>
  );
  const noCard = <div className="black-text">Búsqueda inválida</div>;
  return (
    <div className="card-panel white col s12">
      {invalidSearch ? noCard : card}
    </div>
  );
};

export default Climate;
