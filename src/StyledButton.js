export default function StyledButton({profi, onClick, fontSize, children}){

    const buttonStyle = {
        backgroundColor: profi.colors.secondaryColor,
        padding: 10,
        color: profi.colors.accentColor,
        fontSize: fontSize?fontSize:20,
        borderRadius: 10,
        border: 0

    }

    return <button onClick={onClick} style={buttonStyle}>
        {children}
    </button>
}