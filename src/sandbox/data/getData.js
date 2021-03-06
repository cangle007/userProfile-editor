export default function getData() {
  return fetch(`data/consolidatedData.json`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => console.log(error));
}
