function hello() {
  return "Olá, Ana!";
}

test("função hello retorna a saudação correta", () => {
  expect(hello()).toBe("Olá, Ana!");
});