package edu.university_connect.repository;

import edu.university_connect.domain.entity.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ResourceRepository extends JpaRepository<Resource, Long> {

    @Query("SELECT r FROM Resource r WHERE r.user.id = :id")
    Page<Resource> getUserResourcePage(Long id, Pageable pageable);

    Page<Resource> findAllByTitleContainingIgnoreCase(String title, Pageable pageable);

    Page<Resource> findAll(Pageable pageable);
}
