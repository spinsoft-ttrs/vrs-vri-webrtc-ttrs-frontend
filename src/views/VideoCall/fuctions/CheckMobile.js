const { detect } = require("detect-browser");
const browser = detect();

const CheckMobile = () => {
    var isMobile = false;
    switch (browser.os) {
        case "Android OS":
            isMobile = true;
            break;
        case "iOS":
            isMobile = true;
            break;
        default:
            break;
    }

    return isMobile;
};

export default CheckMobile;
