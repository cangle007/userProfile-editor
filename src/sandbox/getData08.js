export default function getData08() {
  return fetch(`/data/data08.json`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => console.log(error));
}
