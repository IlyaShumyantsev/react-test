const users = [
  { id: 0, name: "Hank", organizaiton: 0 },
  { id: 1, name: "Abagnale", organizaiton: 0 },
  { id: 3, name: "Frank", organizaiton: 1 },
  { id: 4, name: "Abbey", organizaiton: 1 },
  { id: 5, name: "Edward", organizaiton: 2 },
  { id: 6, name: "Abel", organizaiton: 2 },
  { id: 7, name: "Reuben", organizaiton: 0 },
  { id: 8, name: "Abelson", organizaiton: 1 },
];

const organizations = [
  { id: 0, name: "Accounting department" },
  { id: 1, name: "Development department" },
  { id: 2, name: "Sales department" },
];

const data = {
  "/users": users,
  "/organizations": organizations,
};

function delay(val) {
  return new Promise((res, rej) => setTimeout(val ? res : rej, 500, val));
}

export function mockFetch(url) {
  const payload = data[url];
  return delay(payload);
}