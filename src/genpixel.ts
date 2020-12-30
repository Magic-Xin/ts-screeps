export default function (): void {
    if (Game.cpu.bucket >= 5000) {
        Game.cpu.generatePixel();
    }
}