export default function loadingAnimation(dataError) {
    return(
        {
            text: !dataError ? 'Loading' : `Error, try another filter`,
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: 'Inter',
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: 'transparent',
            stroke: '#000',
            lineWidth: !dataError ? 10: 0
        }
    )

}