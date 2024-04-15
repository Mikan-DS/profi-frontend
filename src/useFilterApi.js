import {useEffect, useState} from "react";


let oneRequest = false;

export default function useFilterApi({profi}){

    const [filterFound, setFilterFound] = useState(false);

    const filterName = getFilterName();

    const [verboseName, setVerboseName] = useState("");
    const [verboseNamePlural, setVerboseNamePlural] = useState("");
    const [fields, setFields] = useState([])

    useEffect(() => {
        async function fetchFilter(){
            if (!filterFound && !oneRequest){
                oneRequest = true;
                const filtersData = await profi.ApiRequest({path: "get/filter/"+filterName, data:{}});

                if (!filtersData.unsuccess && filtersData.configs){
                    setFilterFound(true);
                    setVerboseName(filtersData.configs.verbose);
                    setVerboseNamePlural(filtersData.configs.verbose_plural);

                    filtersData.configs.fields.forEach(function(field) {
                        field.selected = true;
                        fields.push(field);
                    });

                    document.title = "Фильтр: "+filtersData.configs.verbose_plural

                    setFields([...fields])

                }


            }
        }
        fetchFilter().then();
    }, []);


    function getFilterName() {
        const parts = document.location.pathname.split('/');
        let filterNamePart = parts[parts.length - 1];

        if(filterNamePart.includes('?')) {
            filterNamePart = filterNamePart.split('?')[0];
        }

        return filterNamePart;
    }


    return {

    }
}