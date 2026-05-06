import { useEffect, useState } from "react";
import { API_URL } from "../../config";

function LeagueMatchHeader() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${API_URL}/api/riot/profile/evoms/iwnl`);
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error(err);
            }
        }

        fetchData();
    }, []);

    return (
        <div className = "mastery-header-wrapper">
            
            <div className="mastery-card-wrapper">
                {data?.mastery?.map((champ, index) => (
                    <div key={index} className = "mastery-card">
                        <div className="mastery-text">
                            <p>Name: {champ.name.replace(/([A-Z])/g, " $1").trim()}</p>
                            <p>Mastery Level: {champ.level} </p>
                            <p>Mastery Points: {champ.points} </p>
                            <p>Last Played: {champ.last_played_date}</p>
                            <br/>
                        </div>
                        <img
                        src={`https://ddragon.leagueoflegends.com/cdn/16.9.1/img/champion/${champ.name}.png`}
                        alt="no icon"
                        />
                    </div>
                ))}
            </div>
            
            <div className="summoner-header-info-wrapper">
                <p>Summoner Name: {data?.account_name}#{data?.tagLine} </p>
                <p>Current Rank (Solo/Duo): {data?.ranked_info.tier} {data?.ranked_info.rank} {data?.ranked_info.lp} LP <a href="https://op.gg/lol/summoners/na/evoms-iwnl" target="_blank">[op.gg]</a></p>
            </div>
        </div>
    );
}

export default LeagueMatchHeader;