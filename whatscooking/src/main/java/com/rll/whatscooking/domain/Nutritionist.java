package com.rll.whatscooking.domain;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Nutritionist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int nutritionist_id;
    @OneToOne
    private User user;

    @OneToMany
    private List<Recipe> recipes;
}
