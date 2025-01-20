package com.example.backend.repository;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.backend.models.Card;

@Repository
public class CardRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void createCard(Card card) {
        String sql = "INSERT INTO board_management.card (id, title, description, list_id) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, card.getId(), card.getTitle(), card.getDescription(), card.getList_id());
    }

    public Card getCardById(long id) {
        String sql = "SELECT * FROM board_management.card WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Card.class), id);
    }

    public List<Card> getAllCards() {
        String sql = "SELECT * FROM board_management.card";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Card.class));
    }

    public void updateCard(Card card) {
        String sql = "UPDATE board_management.card SET title = ?, description = ?, list_id = ? WHERE id = ?";
        jdbcTemplate.update(sql, card.getTitle(), card.getDescription(), card.getList_id(), card.getId());
    }

    public void deleteCard(long id) {
        String sql = "DELETE FROM board_management.card WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}
