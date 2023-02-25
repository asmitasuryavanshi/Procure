// GET API CALL
function get_call(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}
// POST API CALL
function post_call(url, payload) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export { get_call, post_call };
