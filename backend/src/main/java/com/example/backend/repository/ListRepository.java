package com.example.backend.repository;

import java.sql.ResultSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.backend.models.ListT;

@Repository
public class ListRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void createList(ListT listT) {
        String sql = "INSERT INTO board_management.list (title, board_id, cards) VALUES (?, ?, ?);";
        jdbcTemplate.update(sql, listT.getTitle(), listT.getBoard_id(), listT.getCards());
    }

    public ListT getListById(long id) { 
        String sql = "SELECT * FROM board_management.list WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, (ResultSet rs, int rowNum) -> {
        ListT list = new ListT();
        list.setId(rs.getLong("id"));
        list.setTitle(rs.getString("title"));

        // Convert PgArray to Long[]
        java.sql.Array sqlArray = rs.getArray("cards");
        if (sqlArray != null) {
            Object[] array = (Object[]) sqlArray.getArray();
            Long[] cards = new Long[array.length];
            for (int i = 0; i < array.length; i++) {
                cards[i] = array[i] != null ? ((Number) array[i]).longValue() : null;
            }
            list.setCards(cards);
        }

        return list;
    }, id);    
    }

    public List<ListT> getAllLists() {
        String sql = "SELECT * FROM board_management.list";
        return jdbcTemplate.query(sql, (ResultSet rs, int rowNum) -> {
        ListT list = new ListT();
        list.setId(rs.getLong("id"));
        list.setTitle(rs.getString("title"));

        // Convert PgArray to Long[]
        java.sql.Array sqlArray = rs.getArray("cards");
        if (sqlArray != null) {
            Object[] array = (Object[]) sqlArray.getArray();
            Long[] cards = new Long[array.length];
            for (int i = 0; i < array.length; i++) {
                cards[i] = array[i] != null ? ((Number) array[i]).longValue() : null;
            }
            list.setCards(cards);
        }
    
        return list;
        });
    }

    public void updateList(ListT listT) {
        String sql = "UPDATE board_management.list SET title = ?, board_id = ? WHERE id = ?";
        jdbcTemplate.update(sql, listT.getTitle(), listT.getBoard_id(), listT.getId());
    }

    public void deleteList(long id) {
        String sql = "DELETE FROM board_management.list WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}
