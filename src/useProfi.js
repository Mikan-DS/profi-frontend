import appVariables from './variables.json'

export default function useProfi(){

    // Collect and check configs
    const configs = appVariables;
    if (typeof configs["backend_url"] !== "string"){
        configs.backend_url = document.location.protocol+"//"+document.location.host
    }
    if (!configs.backend_url.endsWith("/")){
        configs.backend_url += "/"
    }


    const colors = {
        primaryColor: "#076ADD",
        secondaryColor: "#0193F8",
        accentColor: "#FFFFFF"
    }

    return {
        configs,
        colors
    }

}