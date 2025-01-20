package com.example.backend.repository;

import java.sql.ResultSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.backend.models.Board; 

@Repository
public class BoardRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void createBoard(Board board) {
        String sql = "INSERT INTO board_management.board (title, lists) VALUES (?, ?)";
        jdbcTemplate.update(sql, board.getTitle(), board.getLists());
    }

    public Board getBoardById(long id) {
        String sql = "SELECT * FROM board_management.board WHERE id = ?";
        
        return jdbcTemplate.queryForObject(sql, (ResultSet rs, int rowNum) -> {
        Board board = new Board();
        board.setId(rs.getLong("id"));
        board.setTitle(rs.getString("title"));

        // Convert PgArray to Long[]
        java.sql.Array sqlArray = rs.getArray("lists");
        if (sqlArray != null) {
            Object[] array = (Object[]) sqlArray.getArray();
            Long[] lists = new Long[array.length];
            for (int i = 0; i < array.length; i++) {
                lists[i] = array[i] != null ? ((Number) array[i]).longValue() : null;
            }
            board.setLists(lists);
        }

        return board;
    }, id);    
    }

    public List<Board> getAllBoards() {
        String sql = "SELECT * FROM board_management.board";
        return jdbcTemplate.query(sql, (ResultSet rs, int rowNum) -> {
            Board board = new Board();
            board.setId(rs.getLong("id"));
            board.setTitle(rs.getString("title"));
    
            // Convert PgArray to Long[]
            java.sql.Array sqlArray = rs.getArray("lists");
            if (sqlArray != null) {
                Object[] array = (Object[]) sqlArray.getArray();
                Long[] lists = new Long[array.length];
                for (int i = 0; i < array.length; i++) {
                    lists[i] = array[i] != null ? ((Number) array[i]).longValue() : null;
                }
                board.setLists(lists);
            }
    
            return board;
        });
    }

    public void updateBoard(Board board) {
        String sql = "UPDATE board_management.board SET title = ?, lists = ? WHERE id = ?";
        jdbcTemplate.update(sql, board.getTitle(), board.getLists(), board.getId());
    }

    public void deleteBoard(long id) {
        String sql = "DELETE FROM board_management.board WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}
