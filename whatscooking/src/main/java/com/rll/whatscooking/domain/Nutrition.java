package com.rll.whatscooking.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Nutrition {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer calories;
    private Double protein;
    private Double fat;
    private Double carbs;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "nutritionist_id")
    private User user;

}
