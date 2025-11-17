export default function handleSideEffects(command, state, post) {
    if (!command) return;
    let payload = {};
    let remainingMs = 0;
    post(command, payload);

    if (command === "reset") {
        post("reset");
        return;
    }
    if (command === "done") {
        post("tick", { remainingMs: 0 });
        post("done");
        return {
            ...state,
            running: false,
        };
    }
}
