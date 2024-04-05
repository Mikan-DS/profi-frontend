import {useState} from "react";

export default function Filter({profi}){

    const [filterToggle, setFilterToggle] = useState(false)
    function toggleFilter() {
        setFilterToggle(!filterToggle)
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
        padding: 10,
        minHeight: '150px',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10

    };

    return <div className="Filter">
        <div className="filter-container" style={filterContainerStyle}>
            <div className="switch" style={switchStyle} onClick={toggleFilter}>
                <span>
                    Фильтр
                </span>
            </div>
            {filterToggle ?
                <div className="filter-settings" style={settingsStyle}>
                    Всякие настройки
                </div>
            :null}
        </div>
    </div>
}
