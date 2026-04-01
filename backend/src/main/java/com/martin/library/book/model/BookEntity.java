package com.martin.library.book.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import com.martin.library.genre.model.GenreEntity;
import com.martin.library.liked.model.LikedEntity;
import com.martin.library.userBook.model.UserBookEntity;
import com.martin.library.whishlist.model.WishlistEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "book")
@Entity
public class BookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_book")
    Long id;

    @Column(unique = true, nullable = false)
    private String isbn;

    @Column(name = "title", nullable = false)
    private String name;

    private Integer pages;
    private Integer year;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String image;

    @Column(name = "id_genre")
    private Long idGenre;

    @Column(name = "id_user_books")
    Long idUserBook;

    @Column(name = "id_wishlist")
    Long idWishlist;

    @Column(name = "created_at")
    private LocalDateTime createAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_genre", referencedColumnName = "id_type", insertable = false, updatable = false)
    private GenreEntity genre;

    @OneToMany(mappedBy = "book")
    private List<UserBookEntity> userBooks;

    @OneToMany(mappedBy = "book")
    private List<LikedEntity> likedByUsers;

    @OneToMany(mappedBy = "book")
    private List<WishlistEntity> wishlistedByUsers;
}