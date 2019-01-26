export default function log(s, ...args) {
    console.log(s, args.map(v => JSON.stringify(v)));
}