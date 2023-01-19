// Reusable function to generate a random number from 0 to (input - 1)
export default function randomNumberGenerator(input) {
    return Math.floor(Math.random() * input);
}