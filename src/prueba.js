const mont = [
  { year: 1997, month: 1, variance: -1.25 },
  { year: 1998, month: 2, variance: -1.25 },
  { year: 1999, month: 3, variance: -1.25 },
  { year: 2000, month: 4, variance: -1.25 },
  { year: 2001, month: 5, variance: -1.25 },
];

const modifiedMont = mont.map((m) => ({ ...m, month: m.month - 1 }));

console.log(modifiedMont);
console.log(mont); // El array original no debería haber cambiado
