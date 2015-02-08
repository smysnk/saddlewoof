package com.psidox.saddlewoof.web.model;


import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "owner")
public class Owner {

    private String uuid;
    private String nameDog;
    private String nameOwner;
    private List<Dog> dogs;

    @Id
    @Column(name = "id", unique = true, nullable = false)
    public String getUuid() {
        return this.uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    @Column(name = "name_dog")
    public String getNameDog() {
        return nameDog;
    }

    public void setNameDog(String nameDog) {
        this.nameDog = nameDog;
    }

    @Column(name = "name_owner")
    public String getNameOwner() {
        return nameOwner;
    }

    public void setNameOwner(String nameOwner) {
        this.nameOwner = nameOwner;
    }

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "owner")
    public List<Dog> getDogs() {
        return dogs;
    }

    public void setDogs(List<Dog> dogs) {
        this.dogs = dogs;
    }
}
