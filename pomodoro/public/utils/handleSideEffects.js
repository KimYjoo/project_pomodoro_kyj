export default function handleSideEffects(command, state, post) {
    if (command === "reset") {
        post("tick", { remainingMs: state.originalDurationMs });
        post("reset");
        return;
    }
    if (command === "done") {
        post("tick", { remainingMs: 0 });
        post("done");
        return;
    }
}
