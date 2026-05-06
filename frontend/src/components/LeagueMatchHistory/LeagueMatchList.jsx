import LeagueMatchItem from "./LeagueMatchItem";


function LeagueMatchList({ matches }) {
    if(!matches || matches.length === 0) {
        return <h3 className="loading-matches">no matches found</h3>;
    }

    return (
        <div className = "league-list-wrapper">
            {matches.map((match) => (
                <LeagueMatchItem
                key={`${match.champion}-${match["game-time-end"]}`}
                match={match}
                />
            ))}
        </div>
    )
}

export default LeagueMatchList