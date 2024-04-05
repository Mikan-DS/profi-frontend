export default function Filter({profi}){
    const filterContainerStyle = {
        color: profi.colors.accentColor
    }
    const switchStyle = {
        backgroundColor: profi.colors.secondaryColor,
        padding: '10px',
        display: 'inline-block'
    };
    const settingsStyle = {
        backgroundColor: profi.colors.secondaryColor,
        padding: '10px',
        minHeight: '150px'
    };

    return <div className="Filter">
        <div className="filter-container" style={filterContainerStyle}>
            <div className="switch" style={switchStyle}>Фильтр</div>
            <div className="filter-settings" style={settingsStyle}>
                Всякие настройки
            </div>
        </div>
    </div>
}
