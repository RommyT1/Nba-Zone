package com.nl.nba_zone.player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "nba_player_stats")
public class Player {
    @Id
    @Column(name = "player_name", unique = true)
    private String name;

    @Column(name = "team")
    private String team;

    @Column(name = "opponent")
    private String opponent;

    @Column(name = "result")
    private String result;

    @Column(name = "minutes_played")
    private Double minutesPlayed;

    @Column(name = "fgm")
    private Integer fgm;

    @Column(name = "fga")
    private Integer fga;

    @Column(name = "fg_pct")
    private Double fgPct;

    @Column(name = "three_pm")
    private Integer threePm;

    @Column(name = "three_pa")
    private Integer threePa;

    @Column(name = "three_pct")
    private Double threePct;

    @Column(name = "ftm")
    private Integer ftm;

    @Column(name = "fta")
    private Integer fta;

    @Column(name = "ft_pct")
    private Double ftPct;

    @Column(name = "off_reb")
    private Integer offReb;

    @Column(name = "def_reb")
    private Integer defReb;

    @Column(name = "total_reb")
    private Integer totalReb;

    @Column(name = "assists")
    private Integer assists;

    @Column(name = "steals")
    private Integer steals;

    @Column(name = "blocks")
    private Integer blocks;

    @Column(name = "turnovers")
    private Integer turnovers;

    @Column(name = "personal_fouls")
    private Integer personalFouls;

    @Column(name = "points")
    private Integer points;

    @Column(name = "game_score")
    private Double gameScore;

    @Column(name = "game_date")
    private String gameDate;


    public Player() {
    }

    public Player(Double minutesPlayed, String result, String opponent, String team, String name, Integer fgm, Integer fga, Double fgPct, Integer threePa, Integer threePm, Double threePct, Integer ftm, Integer fta, Double ftPct, Integer offReb, Integer defReb, Integer totalReb, Integer assists, Integer steals, String gameDate, Integer points, Double gameScore, Integer personalFouls, Integer turnovers, Integer blocks) {
        this.minutesPlayed = minutesPlayed;
        this.result = result;
        this.opponent = opponent;
        this.team = team;
        this.name = name;
        this.fgm = fgm;
        this.fga = fga;
        this.fgPct = fgPct;
        this.threePa = threePa;
        this.threePm = threePm;
        this.threePct = threePct;
        this.ftm = ftm;
        this.fta = fta;
        this.ftPct = ftPct;
        this.offReb = offReb;
        this.defReb = defReb;
        this.totalReb = totalReb;
        this.assists = assists;
        this.steals = steals;
        this.gameDate = gameDate;
        this.points = points;
        this.gameScore = gameScore;
        this.personalFouls = personalFouls;
        this.turnovers = turnovers;
        this.blocks = blocks;
    }

    public Player(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getOpponent() {
        return opponent;
    }

    public void setOpponent(String opponent) {
        this.opponent = opponent;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Double getMinutesPlayed() {
        return minutesPlayed;
    }

    public void setMinutesPlayed(Double minutesPlayed) {
        this.minutesPlayed = minutesPlayed;
    }

    public Integer getFgm() {
        return fgm;
    }

    public void setFgm(Integer fgm) {
        this.fgm = fgm;
    }

    public String getGameDate() {
        return gameDate;
    }

    public void setGameDate(String gameDate) {
        this.gameDate = gameDate;
    }

    public Double getGameScore() {
        return gameScore;
    }

    public void setGameScore(Double gameScore) {
        this.gameScore = gameScore;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Integer getPersonalFouls() {
        return personalFouls;
    }

    public void setPersonalFouls(Integer personalFouls) {
        this.personalFouls = personalFouls;
    }

    public Integer getTurnovers() {
        return turnovers;
    }

    public void setTurnovers(Integer turnovers) {
        this.turnovers = turnovers;
    }

    public Integer getBlocks() {
        return blocks;
    }

    public void setBlocks(Integer blocks) {
        this.blocks = blocks;
    }

    public Integer getSteals() {
        return steals;
    }

    public void setSteals(Integer steals) {
        this.steals = steals;
    }

    public Integer getAssists() {
        return assists;
    }

    public void setAssists(Integer assists) {
        this.assists = assists;
    }

    public Integer getOffReb() {
        return offReb;
    }

    public void setOffReb(Integer offReb) {
        this.offReb = offReb;
    }

    public Integer getDefReb() {
        return defReb;
    }

    public void setDefReb(Integer defReb) {
        this.defReb = defReb;
    }

    public Integer getTotalReb() {
        return totalReb;
    }

    public void setTotalReb(Integer totalReb) {
        this.totalReb = totalReb;
    }

    public Double getFtPct() {
        return ftPct;
    }

    public void setFtPct(Double ftPct) {
        this.ftPct = ftPct;
    }

    public Integer getFta() {
        return fta;
    }

    public void setFta(Integer fta) {
        this.fta = fta;
    }

    public Integer getFtm() {
        return ftm;
    }

    public void setFtm(Integer ftm) {
        this.ftm = ftm;
    }

    public Double getThreePct() {
        return threePct;
    }

    public void setThreePct(Double threePct) {
        this.threePct = threePct;
    }

    public Integer getThreePa() {
        return threePa;
    }

    public void setThreePa(Integer threePa) {
        this.threePa = threePa;
    }

    public Integer getThreePm() {
        return threePm;
    }

    public void setThreePm(Integer threePm) {
        this.threePm = threePm;
    }

    public Double getFgPct() {
        return fgPct;
    }

    public void setFgPct(Double fgPct) {
        this.fgPct = fgPct;
    }

    public Integer getFga() {
        return fga;
    }

    public void setFga(Integer fga) {
        this.fga = fga;
    }
}
