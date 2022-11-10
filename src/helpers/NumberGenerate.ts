export default class NumberGenerate {
  static oneTo1154(): number[] {
    const numbers = [];
    for (let i = 0; i < 10; i++) {
      const Rng = Math.random() * 1154;
      numbers.push(Math.round(Rng));
    }
    return numbers;
  }
}
