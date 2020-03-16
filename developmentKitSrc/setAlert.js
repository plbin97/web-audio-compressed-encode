/**
 *
 * @param type
 *      There are four types of alert: primary (blue color), success (green color), warning (orange color), danger (red color)
 *          value 0 stand for primary
 *          value 1 stand for success
 *          value 2 stand for warning
 *          value 3 stand for danger
 * @param message
 */
let setAlert = (type, message) => {
    let alertBox = document.getElementById("pageAlert");
    alertBox.innerHTML = "";
    let alertFrame = document.createElement("div");
    switch (type) {
        case 0: {
            alertFrame.className = "uk-alert-primary";
            break;
        }
        case 1: {
            alertFrame.className = "uk-alert-success";
            break;
        }
        case 2: {
            alertFrame.className = "uk-alert-warning";
            break;
        }
        case 3: {
            alertFrame.className = "uk-alert-danger";
            break;
        }
    }
    alertFrame.setAttribute("uk-alert","");
    let closeButton = document.createElement("a");
    closeButton.className = "uk-alert-close";
    closeButton.setAttribute("uk-close", "");
    let text = document.createElement("p");
    text.innerText = message;
    alertFrame.appendChild(closeButton);
    alertFrame.appendChild(text);
    alertBox.appendChild(alertFrame);
};

export default setAlert;