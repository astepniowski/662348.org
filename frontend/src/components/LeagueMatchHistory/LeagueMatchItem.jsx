function LeagueMatchItem({ match }) {
    const minutes = Math.floor(match["game-duration"] / 60);
    const seconds = match["game-duration"] % 60;

    const kda = (match.kills + match.assists) / Math.max(1, match.deaths);

    return (
        <div className="league-list-item">
            <p><u>Timestamp: {match["game-time-end"]}</u></p>
            <h3>{match.champion}</h3>
            <img
            src={`https://ddragon.leagueoflegends.com/cdn/16.9.1/img/champion/${match.champion}.png`}
            alt="no icon"
            />
            <p>Game Type: {match["game-type"]}</p>
            <p>Game Duration: {minutes}m {seconds}s</p>

            <h3 className={match.win ? "win" : "loss"}>{match.win ? "Victory" : "Defeat"}</h3>

            <p className={kda >= 1 ? "pos-kda" : "neg-kda"}>KDA: {match.kills} / {match.deaths} / {match.assists}</p>

            <p>Kill Participation: {(match["kill-participation"] * 100).toFixed(0)}%</p>

            <p>cs: {match.cs} ({(match.cs / minutes).toFixed(1)}/min)</p>

            <div>
                <p>Items:</p>

                    {match["items-array"].map((item, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <img src={item.image} alt={item.name} width="30" />
                            <span> {item.name}</span>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default LeagueMatchItem;

