export async function getCountriesList() {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const countries = await res.json();
  const modifyCountries = countries.map((country) => {
    return {
      officialName: country.name.official,
      ...country,
    };
  });
  return modifyCountries;
}
