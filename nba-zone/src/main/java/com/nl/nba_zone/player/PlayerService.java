package com.nl.nba_zone.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayers() {
        return playerRepository.findAll();
    }

    public List<Player> getPlayersFromTeam(String teamName) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getTeam().equals(teamName))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByName(String searchText) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getName().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByOpponent(String searchText) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getOpponent().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByResult(String result) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getResult().equals(result))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByTeamAndResult(String team, String result) {
        return playerRepository.findAll().stream()
                .filter(player -> team.equals(player.getTeam()) && result.equals(player.getResult()))
                .collect(Collectors.toList());
    }

    public Player addPlayer(Player player) {
        return playerRepository.save(player);
    }

    public Player updatePlayer(Player updatedPlayer) {
        Optional<Player> existingPlayer = playerRepository.findByName(updatedPlayer.getName());
        
        if (existingPlayer.isPresent()) {
            Player playerToUpdate = existingPlayer.get();
            playerToUpdate.setName(updatedPlayer.getName());
            playerToUpdate.setTeam(updatedPlayer.getTeam());
            playerToUpdate.setOpponent(updatedPlayer.getOpponent());
            playerToUpdate.setResult(updatedPlayer.getResult());
            playerToUpdate.setMinutesPlayed(updatedPlayer.getMinutesPlayed());
            playerToUpdate.setFgm(updatedPlayer.getFgm());
            playerToUpdate.setFga(updatedPlayer.getFga());
            playerToUpdate.setFgPct(updatedPlayer.getFgPct());
            playerToUpdate.setThreePm(updatedPlayer.getThreePm());
            playerToUpdate.setThreePa(updatedPlayer.getThreePa());
            playerToUpdate.setThreePct(updatedPlayer.getThreePct());
            playerToUpdate.setFtm(updatedPlayer.getFtm());
            playerToUpdate.setFta(updatedPlayer.getFta());
            playerToUpdate.setFtPct(updatedPlayer.getFtPct());
            playerToUpdate.setOffReb(updatedPlayer.getOffReb());
            playerToUpdate.setDefReb(updatedPlayer.getDefReb());
            playerToUpdate.setTotalReb(updatedPlayer.getTotalReb());
            playerToUpdate.setAssists(updatedPlayer.getAssists());
            playerToUpdate.setSteals(updatedPlayer.getSteals());
            playerToUpdate.setBlocks(updatedPlayer.getBlocks());
            playerToUpdate.setTurnovers(updatedPlayer.getTurnovers());
            playerToUpdate.setPersonalFouls(updatedPlayer.getPersonalFouls());
            playerToUpdate.setPoints(updatedPlayer.getPoints());
            playerToUpdate.setGameScore(updatedPlayer.getGameScore());
            playerToUpdate.setGameDate(updatedPlayer.getGameDate());
            
            return playerRepository.save(playerToUpdate);
        }
        return null;
    }

    @Transactional
    public void deletePlayer(String playerName) {
        playerRepository.deleteByName(playerName);
    }
}

