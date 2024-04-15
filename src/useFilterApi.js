import {useEffect, useState} from "react";


let oneRequest = false;

export default function useFilterApi({profi}){

    const [filterFound, setFilterFound] = useState(false);

    const filterName = getFilterName();

    const [verboseName, setVerboseName] = useState("");
    const [verboseNamePlural, setVerboseNamePlural] = useState("");
    const [fields, setFields] = useState([])

    const [activeFilters, setActiveFilters] = useState({})
    const [allowedOperations, setAllowedOperations] = useState([])

    useEffect(() => {
        async function fetchFilter(){
            if (!filterFound && !oneRequest){
                oneRequest = true;
                const filtersData = await profi.ApiRequest({path: "get/filter/"+filterName, data:{}});

                if (!filtersData.unsuccess && filtersData.configs){
                    setFilterFound(true);
                    setVerboseName(filtersData.configs.verbose);
                    setVerboseNamePlural(filtersData.configs.verbose_plural);

                    filtersData.configs.fields.forEach((field) => {
                        field.selected = true;
                        fields.push(field);
                    });

                    setAllowedOperations(
                        [[], ...filtersData.configs.allowed_operations]
                    )

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

    function addFilter(name) {
        if (!activeFilters[name]) {
            setActiveFilters({
                ...activeFilters,
                [name]: {params: [], field: fields.find(field => field.name === name)}
            })
        }
    }

    function addParameter(name) {
        const activeFilter = activeFilters[name];
        if (activeFilter && allowedOperations[activeFilter.field.type_id].length != 0) {
            activeFilter.params.push(
                {
                    operator: allowedOperations[activeFilter.field.type_id][0],
                    value: ""
                }
            );
        }
        setActiveFilters({...activeFilters});
    }

    function updateOperation({e, filter, index}) {
        activeFilters[filter].params[index].operator = e.target.value;
        setActiveFilters({...activeFilters});

    }
    function updateValue({e, filter, index}) {
        activeFilters[filter].params[index].value = e.target.value;
        setActiveFilters({...activeFilters});
    }


    function deleteParameter({name, index}) {
        const activeFilter = activeFilters[name];
        if (activeFilter) {
            activeFilter.params.splice(index, 1);
            setActiveFilters({...activeFilters});
        }
    }

    function toggleFieldSelection(field) {
        field.selected = !field.selected;
        setFields([...fields])
    }


    return {
        fields,
        addFilter,
        activeFilters,
        allowedOperations,
        updateOperation,
        updateValue,
        addParameter,
        deleteParameter,
        filterFound,
        toggleFieldSelection
    }
}