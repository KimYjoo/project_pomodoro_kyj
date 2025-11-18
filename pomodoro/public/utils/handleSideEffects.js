export default function handleSideEffects(command, state) {
    if (!command) return;

    if (command === "done") {
        return {
            ...state,
            running: false,
        };
    }
}
