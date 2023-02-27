// PLEASE DO NOT CHANGE

Nui = {};
// send messages to the script
Nui.Send = (_call, _object, _cb) => {
    fetch(`https://${GetParentResourceName()}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8', },
        body: JSON.stringify({ call = _call, data = _object }),
    }).then(_json => _json.json()).then(_object => _cb(_object));
}
Nui.Calls = [];
// handle incomming messages from the script
window.addEventListener('message', (event) => {
    const call = event.data.call;
    if (typeof (call) == "string") {
        for (var key in Nui.Calls) {
            if (key == call) Nui.Calls[key](event);
        }
    }
});
// tell the script the nui is ready
Nui.Send({ type: "ready" }, _object => console.log(_object));



/* Nui examples

// example script > nui call
Nui.Calls["Test"] = (_object) => { console.log(_object); };

// example nui > scropt call
Nui.Send({ test = "Test sendt from the nui" }, (_object) => { console.log(_object); });

*/