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


    async function ApiRequest({path, data}) {
        try {
            const response = await fetch(configs.backend_url + "API/" + path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            return {message: error, unsuccess: true}
        }
    }


    return {
        configs,
        colors,

        ApiRequest
    }

}