import {useState} from "react";
import useFilterApi from "./useFilterApi";

export default function Filter({profi}){

    const [filterToggle, setFilterToggle] = useState(true)

    const filterApi = useFilterApi({profi})

    function toggleFilter() {
        setFilterToggle(!filterToggle)
    }

    function addFilter(event) {

        if (event.target.value !== ""){
            filterApi.addFilter(event.target.value);
            event.target.value = "";
        }
    }

    const filterContainerStyle = {
        color: profi.colors.accentColor,
        margin: 'auto',
        width: '90%'
    }
    const switchStyle = {
        backgroundColor: profi.colors.secondaryColor,
        padding: 10,
        display: 'inline-block',
        fontSize: 30,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: filterToggle?null:10,
        borderBottomRightRadius: filterToggle?null:10

    };
    const settingsStyle = {
        backgroundColor: profi.colors.secondaryColor,
        display: "flex",
        padding: 10,
        minHeight: '150px',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10

    };

    const leftContainerStyle = {
        flex: "70%",
        padding: 9,
        borderRight: "1px solid "+profi.colors.accentColor,
    };

    const rightContainerStyle = {
        padding: 9,
        flex: "30%",
    };

    const filterStyle = {
        borderTop: '1px solid '+profi.colors.accentColor,
        padding: 3,
    };

    return <div className="Filter">
        <div className="filter-container" style={filterContainerStyle}>
            <div className="switch" style={switchStyle} onClick={toggleFilter}>
                <span>
                    Фильтры
                </span>
            </div>
            {filterToggle ?
                <div className="filter-settings" style={settingsStyle}>
                    <div style={leftContainerStyle}>
                        <select onChange={(event) => {addFilter(event)}}>
                            <option key="Filter_Null" value="">Добавить фильтр</option>
                            {
                                filterApi.fields.map((field) => (
                                    <option
                                        key={"Filter_"+field.name}
                                        value={field.name}>
                                        {field.verbose}
                                    </option>
                                ))
                            }
                        </select>

                        {Object.keys(filterApi.activeFilters).map((filter) => (
                            <div style={filterStyle} key={filter}>
                                {filterApi.activeFilters[filter].field.verbose}:
                                <br/>
                                {
                                    filterApi.allowedOperations[filterApi.activeFilters[filter].field.type_id].length !== 0 ?

                                    <button onClick={()=>{filterApi.addParameter(filter)}}>Добавить</button>:
                                    <span>
                                        Для этого поля невозможно создать фильтры
                                    </span>
                                }
                                <br/>


                                {filterApi.activeFilters[filter].params.map((param, index) => (
                                    <div key={index}>
                                        <button onClick={()=>{filterApi.deleteParameter({name:filter, index})}}>
                                            X
                                        </button>
                                        <select
                                            value={param.operator}
                                            onChange={(e) => {
                                                filterApi.updateOperation({e, filter, index})
                                            }}
                                        >
                                            {filterApi.allowedOperations[filterApi.activeFilters[filter].field.type_id].map((operation) => (
                                                <option value={operation}>{operation}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            value={param.value}
                                            onChange={(e) => {
                                                filterApi.updateValue({e, filter, index})
                                            }}
                                        />
                                    </div>
                                ))}

                            </div>
                        ))}

                    </div>
                    <div style={rightContainerStyle}>
                        HUEST
                    </div>
                </div>
                : null}
        </div>
    </div>
}
