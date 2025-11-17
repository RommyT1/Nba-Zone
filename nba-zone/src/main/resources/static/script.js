const API_BASE_URL = 'http://localhost:8080/api/v1/player';

// Team logo mapping - using NBA.com CDN
const TEAM_LOGOS = {
    'ATL': 'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg',
    'BOS': 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg',
    'BKN': 'https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg',
    'BRK': 'https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg', 
    'CHA': 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg',
    'CHO': 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg',
    'CHI': 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg',
    'CLE': 'https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg',
    'DAL': 'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg',
    'DEN': 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg',
    'DET': 'https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg',
    'GSW': 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg',
    'HOU': 'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg',
    'IND': 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg',
    'LAC': 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg',
    'LAL': 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg',
    'MEM': 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg',
    'MIA': 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg',
    'MIL': 'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg',
    'MIN': 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg',
    'NOP': 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg',
    'NYK': 'https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg',
    'OKC': 'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg',
    'ORL': 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg',
    'PHI': 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg',
    'PHX': 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg',
    'PHO': 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg',
    'POR': 'https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg',
    'SAC': 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg',
    'SAS': 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg',
    'TOR': 'https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg',
    'UTA': 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg',
    'WAS': 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg'
};

let allPlayers = [];
let currentTeam = null;
let filteredPlayers = [];

window.addEventListener('DOMContentLoaded', () => {
    loadAllPlayers();
    
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchPlayers();
        }
    });
});

async function loadAllPlayers() {
    showLoading('loading');
    hideError('error');
    
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allPlayers = await response.json();
        displayTeams();
    } catch (error) {
        showError('error', `Failed to load players: ${error.message}`);
    } finally {
        hideLoading('loading');
    }
}

function displayTeams() {
    // Get unique teams and count unique player-game combinations per team
    const teamMap = new Map();
    const seenPlayerGames = new Set();
    
    allPlayers.forEach(player => {
        if (player.team) {
            // Create unique key for player-game combination
            const playerGameKey = `${player.team}_${player.name || ''}_${player.gameDate || ''}`;
            
            // Only count unique player-game combinations
            if (!seenPlayerGames.has(playerGameKey)) {
                seenPlayerGames.add(playerGameKey);
                
                if (!teamMap.has(player.team)) {
                    teamMap.set(player.team, 0);
                }
                teamMap.set(player.team, teamMap.get(player.team) + 1);
            }
        }
    });
    
    // Sort teams alphabetically
    const teams = Array.from(teamMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    
    const container = document.getElementById('teamsGrid');
    
    if (teams.length === 0) {
        container.innerHTML = '<div class="no-results">No teams found.</div>';
        return;
    }
    
    container.innerHTML = teams.map(([teamCode, count]) => {
        // Try to get logo URL, with fallback to alternative codes
        let logoUrl = TEAM_LOGOS[teamCode] || '';
        
        // If no logo found, try common alternative codes
        if (!logoUrl) {
            if (teamCode === 'BRK') logoUrl = TEAM_LOGOS['BKN'];
            else if (teamCode === 'CHO') logoUrl = TEAM_LOGOS['CHA'];
            else if (teamCode === 'PHO') logoUrl = TEAM_LOGOS['PHX'];
        }
        
        // If still no logo, construct URL from team ID
        if (!logoUrl) {
            const teamId = getTeamId(teamCode);
            logoUrl = `https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`;
        }
        
        return `
            <div class="team-card" onclick="selectTeam('${teamCode}')">
                <div class="team-logo-container">
                    <img src="${logoUrl}" alt="${teamCode}" class="team-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
                    <div class="team-code" style="display:none;">${escapeHtml(teamCode)}</div>
                </div>
                <div class="team-count">${count} game${count !== 1 ? 's' : ''}</div>
            </div>
        `;
    }).join('');
}

function selectTeam(teamCode) {
    currentTeam = teamCode;
    const teamPlayers = allPlayers.filter(player => player.team === teamCode);
    
    // Remove duplicates before storing
    filteredPlayers = removeDuplicates(teamPlayers);
    
    // Show players view, hide team selection
    document.getElementById('teamSelectionView').style.display = 'none';
    document.getElementById('playersView').style.display = 'block';
    
    // Update title
    document.getElementById('teamTitle').textContent = `${teamCode} Players`;
    
    // Clear search
    document.getElementById('searchInput').value = '';
    
    // Display players
    displayPlayers(filteredPlayers);
}

function goBackToTeams() {
    currentTeam = null;
    filteredPlayers = [];
    
    // Show team selection, hide players view
    document.getElementById('teamSelectionView').style.display = 'block';
    document.getElementById('playersView').style.display = 'none';
    
    // Clear search
    document.getElementById('searchInput').value = '';
}

function searchPlayers() {
    const searchText = document.getElementById('searchInput').value.trim().toLowerCase();
    
    if (!currentTeam) {
        return;
    }
    
    if (!searchText) {
        // Show all players for the team
        displayPlayers(filteredPlayers);
        return;
    }
    
    // Filter players by search text
    const searchResults = filteredPlayers.filter(player => 
        player.name && player.name.toLowerCase().includes(searchText)
    );
    
    displayPlayers(searchResults);
}

function displayPlayers(players) {
    const container = document.getElementById('playerStats');
    
    if (!players || players.length === 0) {
        container.innerHTML = '<div class="no-results">No players found. Try adjusting your search.</div>';
        return;
    }
    
    // Remove duplicates based on player name + game date combination
    const uniquePlayers = removeDuplicates(players);
    
    // Sort players by points (descending) for better display
    const sortedPlayers = [...uniquePlayers].sort((a, b) => {
        const pointsA = a.points || 0;
        const pointsB = b.points || 0;
        return pointsB - pointsA;
    });
    
    container.innerHTML = sortedPlayers.map(player => createPlayerCard(player)).join('');
}

function removeDuplicates(players) {
    const seen = new Set();
    const unique = [];
    
    for (const player of players) {
        // Create a unique key from player name + game date
        const key = `${player.name || ''}_${player.gameDate || ''}`;
        
        if (!seen.has(key)) {
            seen.add(key);
            unique.push(player);
        }
    }
    
    return unique;
}

function createPlayerCard(player) {
    const resultClass = player.result === 'W' ? '' : 'loss';
    
    return `
        <div class="player-card">
            <div class="player-header">
                <div class="player-name">${escapeHtml(player.name || 'N/A')}</div>
                <div class="player-meta">
                    <span class="meta-item">
                        <span class="team-badge opponent">vs ${escapeHtml(player.opponent || 'N/A')}</span>
                    </span>
                    <span class="meta-item">
                        <span class="team-badge result ${resultClass}">${escapeHtml(player.result || 'N/A')}</span>
                    </span>
                    <span class="meta-item">📅 ${escapeHtml(player.gameDate || 'N/A')}</span>
                </div>
            </div>
            
            <div class="stats-grid">
                <div class="stat-item points-stat">
                    <span class="stat-label">Points</span>
                    <span class="stat-value">${formatNumber(player.points)}</span>
                </div>
                
                <div class="stat-item highlight-stat">
                    <span class="stat-label">Game Score</span>
                    <span class="stat-value">${formatNumber(player.gameScore)}</span>
                </div>
                
                <div class="stat-item">
                    <span class="stat-label">Minutes</span>
                    <span class="stat-value">${formatNumber(player.minutesPlayed)}</span>
                </div>
                
                <div class="stat-item">
                    <span class="stat-label">FG</span>
                    <span class="stat-value">${formatNumber(player.fgm)}/${formatNumber(player.fga)}</span>
                </div>
                
                <div class="stat-item">
                    <span class="stat-label">FG%</span>
                    <span class="stat-value">${formatPercentage(player.fgPct)}</span>
                </div>
                
                <div class="stat-item">
                    <span class="stat-label">3PT</span>
                    <span class="stat-value">${formatNumber(player.threePm)}/${formatNumber(player.threePa)}</span>
                </div>
                
                <div class="stat-item">
                    <span class="stat-label">3PT%</span>
                    <span class="stat-value">${formatPercentage(player.threePct)}</span>
                </div>
                
                <div class="stat-item">
                    <span class="stat-label">FT</span>
                    <span class="stat-value">${formatNumber(player.ftm)}/${formatNumber(player.fta)}</span>
                </div>
                
                <div class="stat-item">
                    <span class="stat-label">FT%</span>
                    <span class="stat-value">${formatPercentage(player.ftPct)}</span>
                </div>
                
                <div class="stat-item">
                    <span class="stat-label">Rebounds</span>
                    <span class="stat-value">${formatNumber(player.totalReb)}</span>
                </div>
                
                <div class="stat-item">
                    <span class="stat-label">Assists</span>
                    <span class="stat-value">${formatNumber(player.assists)}</span>
                </div>
                
                <div class="stat-item">
                    <span class="stat-label">Steals</span>
                    <span class="stat-value">${formatNumber(player.steals)}</span>
                </div>
                
                <div class="stat-item">
                    <span class="stat-label">Blocks</span>
                    <span class="stat-value">${formatNumber(player.blocks)}</span>
                </div>
                
                <div class="stat-item">
                    <span class="stat-label">Turnovers</span>
                    <span class="stat-value">${formatNumber(player.turnovers)}</span>
                </div>
                
                <div class="stat-item">
                    <span class="stat-label">Fouls</span>
                    <span class="stat-value">${formatNumber(player.personalFouls)}</span>
                </div>
            </div>
        </div>
    `;
}

function formatNumber(value) {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'number') {
        return value % 1 === 0 ? value.toString() : value.toFixed(1);
    }
    return value;
}

function formatPercentage(value) {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'number') {
        return (value * 100).toFixed(1) + '%';
    }
    return value;
}

function getTeamId(teamCode) {
    // NBA team IDs mapping
    const teamIds = {
        'ATL': '1610612737', 'BOS': '1610612738', 'BKN': '1610612751', 'BRK': '1610612751',
        'CHA': '1610612766', 'CHO': '1610612766', 'CHI': '1610612741', 'CLE': '1610612739',
        'DAL': '1610612742', 'DEN': '1610612743', 'DET': '1610612765', 'GSW': '1610612744',
        'HOU': '1610612745', 'IND': '1610612754', 'LAC': '1610612746', 'LAL': '1610612747',
        'MEM': '1610612763', 'MIA': '1610612748', 'MIL': '1610612749', 'MIN': '1610612750',
        'NOP': '1610612740', 'NYK': '1610612752', 'OKC': '1610612760', 'ORL': '1610612753',
        'PHI': '1610612755', 'PHX': '1610612756', 'PHO': '1610612756', 'POR': '1610612757',
        'SAC': '1610612758', 'SAS': '1610612759', 'TOR': '1610612761', 'UTA': '1610612762',
        'WAS': '1610612764'
    };
    return teamIds[teamCode] || '1610612737'; // Default to Hawks if not found
}

function escapeHtml(text) {
    if (text === null || text === undefined) return 'N/A';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showLoading(elementId) {
    document.getElementById(elementId).style.display = 'block';
    if (elementId === 'playersLoading') {
        document.getElementById('playerStats').innerHTML = '';
    }
}

function hideLoading(elementId) {
    document.getElementById(elementId).style.display = 'none';
}

function showError(elementId, message) {
    const errorDiv = document.getElementById(elementId);
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function hideError(elementId) {
    document.getElementById(elementId).style.display = 'none';
}
