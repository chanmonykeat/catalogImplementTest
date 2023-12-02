export async function getCountriesList() {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const repo = await res.json();
  return repo;
}
