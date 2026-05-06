import { useEffect, useState } from "react"
import LeagueMatchList from "../components/LeagueMatchHistory/LeagueMatchList"
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import LeagueMatchHeader from "../components/LeagueMatchHistory/LeagueMatchHeader";

import '../styles/LeagueHistory.css'

function LeagueHistory() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await fetch(
                    `${API_URL}/api/riot/matches/evoms/iwnl`
                );

                const data = await res.json();
                setMatches(data);
            } 
            catch (err) {
                console.error('error fetching matches: ', err);
            }
            finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, [])

    if(loading) return <h3 className="loading-matches">loading recent matches...</h3>;

    return (
        <div>
            <LeagueMatchHeader/>

            <Link to="/" className="redirect-home">home</Link>

            <LeagueMatchList matches = {matches} />
        </div>
    )
}

export default LeagueHistory