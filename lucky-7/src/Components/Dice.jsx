export default function Dice({ numberOfDice  }) {
    return(
        <div>
            {numberOfDice.map((value, index) => (
                <Die key={index} value={value} />
            ))}
        </div>
    )
}