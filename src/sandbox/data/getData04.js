export default function getData04() {
  return fetch(`/data/data04.json`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => console.log(error));
}
