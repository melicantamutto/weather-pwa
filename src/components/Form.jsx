import { useState, useEffect } from "react";

const Form = ({ search, setSearch, setReadyToFetch }) => {
  const { city, country } = search;
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    if (search !== "") {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  }, [search]);

  const handlerInputs = (e) =>
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "" || country.trim() === "") {
      setError(true);
      return;
    }
    localStorage.setItem("lastSearch", JSON.stringify(search));
    setError(false);
    setReadyToFetch(true);
  };
  const handlerClear = () => {
    setSearch("");
    setReadyToFetch(false);
    localStorage.setItem("lastSearch", JSON.stringify(""));
  };

  return (
    <form onSubmit={handlerSubmit}>
      {error && (
        <p className="red darken-4">Todos los campos son obligatorios</p>
      )}
      {showForm ? (
        <div>
          <div className="input-field col s12">
            <input
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={handlerInputs}
            />
            <label htmlFor="city">Ciudad</label>
          </div>
          <div className="input-field col s12">
            <select
              name="country"
              id="country"
              value={country}
              onChange={handlerInputs}
            >
              <option value="">-- Selecciona un país --</option>
              <option value="US">Estados Unidos</option>
              <option value="MX">México</option>
              <option value="AR">Argentina</option>
              <option value="CO">Colombia</option>
              <option value="CR">Costa Rica</option>
              <option value="ES">España</option>
              <option value="PE">Perú</option>
            </select>
            <label htmlFor="country">País</label>
          </div>
          <div className="input-field col s12">
            <input
              type="submit"
              className="waves-effect waves-light btn-large btn-block yellow accent-4"
              value="Buscar clima"
            />
          </div>
        </div>
      ) : (
        <div>
          <p className="red darken-4">
            Ciudad: {city} - País: {country}
          </p>
          <button type="button" onClick={handlerClear}>Limpiar búsqueda</button>
        </div>
      )}
    </form>
  );
};

export default Form;
